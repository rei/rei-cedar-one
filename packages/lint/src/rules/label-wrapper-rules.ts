import type { Rule } from 'eslint';
import type { LabelWrapperTagAnalysis } from '../types.js';
import {
  analyzeModifiers,
  buildMeta,
  createRule,
  findDuplicateClasses,
  getClassValue,
  includesDynamicValue,
  reportClasses,
  splitClasses,
  unique,
} from '../utils.js';

const BASE_CLASS = 'cdr-label-wrapper';
const MODIFIER_PREFIX = `${BASE_CLASS}--`;
const ELEMENT_PREFIX = `${BASE_CLASS}__`;
const CONTAINER_CLASS = `${BASE_CLASS}__container`;
const FIGURE_CLASS = `${BASE_CLASS}__figure`;
const CONTENT_CLASS = `${BASE_CLASS}__content`;
const VALID_TAGS = new Set(['label']);
const ALLOWED_ELEMENT_CLASSES = new Set([
  CONTAINER_CLASS,
  FIGURE_CLASS,
  CONTENT_CLASS,
]);

const ALLOWED_MODIFIERS = new Set<string>([
  `${BASE_CLASS}--primary`,
  `${BASE_CLASS}--secondary`,
  `${BASE_CLASS}--disabled`,
  `${BASE_CLASS}--hide-figure`,
  `${BASE_CLASS}--small`,
  `${BASE_CLASS}--medium`,
  `${BASE_CLASS}--large`,
  `${BASE_CLASS}--small@xs`,
  `${BASE_CLASS}--medium@xs`,
  `${BASE_CLASS}--large@xs`,
  `${BASE_CLASS}--small@sm`,
  `${BASE_CLASS}--medium@sm`,
  `${BASE_CLASS}--large@sm`,
  `${BASE_CLASS}--small@md`,
  `${BASE_CLASS}--medium@md`,
  `${BASE_CLASS}--large@md`,
  `${BASE_CLASS}--small@lg`,
  `${BASE_CLASS}--medium@lg`,
  `${BASE_CLASS}--large@lg`,
]);

/**
 * Detect label-wrapper-related class names.
 * @param className - Class name.
 * @returns True when label-wrapper class is present.
 */
function isLabelWrapperClass(className: string): boolean {
  return (
    className === BASE_CLASS ||
    className.startsWith(ELEMENT_PREFIX) ||
    className.startsWith(MODIFIER_PREFIX)
  );
}

/**
 * Build label-wrapper tag analysis data.
 * @param tagName - Tag name.
 * @param attrs - Attribute map.
 * @returns Label-wrapper analysis or null.
 */
function analyzeLabelWrapperTag(
  tagName: string | null,
  attrs: Map<string, string>,
): LabelWrapperTagAnalysis | null {
  if (!tagName) {
    return null;
  }
  const classValue = getClassValue(attrs);
  if (!classValue || includesDynamicValue(classValue)) {
    return null;
  }
  const classes = splitClasses(classValue);
  const labelWrapperClasses = classes.filter(isLabelWrapperClass);
  if (labelWrapperClasses.length === 0) {
    return null;
  }

  const invalidElementClasses = labelWrapperClasses.filter(
    (className) =>
      className.startsWith(ELEMENT_PREFIX) &&
      !ALLOWED_ELEMENT_CLASSES.has(className),
  );
  const duplicateClasses = findDuplicateClasses(labelWrapperClasses);
  const modifierClasses = labelWrapperClasses.filter(
    (className) => !className.startsWith(ELEMENT_PREFIX),
  );
  const info = analyzeModifiers({
    baseClass: BASE_CLASS,
    modifierPrefix: MODIFIER_PREFIX,
    allowedModifiers: ALLOWED_MODIFIERS,
    classes: modifierClasses,
  });

  return {
    tagName: tagName.toLowerCase(),
    classes,
    labelWrapperClasses,
    invalidElementClasses,
    duplicateClasses,
    info,
    hasContainer: labelWrapperClasses.includes(CONTAINER_CLASS),
    hasFigure: labelWrapperClasses.includes(FIGURE_CLASS),
    hasContent: labelWrapperClasses.includes(CONTENT_CLASS),
  };
}

/**
 * Build a label-wrapper rule wrapper.
 * @param options - Rule options.
 * @returns ESLint rule module.
 */
function createLabelWrapperRule(options: {
  meta: Rule.RuleMetaData;
  check: (
    analysis: LabelWrapperTagAnalysis,
    node: Rule.Node,
    context: Rule.RuleContext,
  ) => void;
}) {
  return createRule<LabelWrapperTagAnalysis>({
    ...options,
    baseClass: BASE_CLASS,
    analyzeTag: analyzeLabelWrapperTag,
  });
}

const ruleMissingBase = createLabelWrapperRule({
  meta: buildMeta('Require cdr-label-wrapper base class for modifiers.', {
    missingBase: 'cdr-label-wrapper modifiers require the base class.',
  }),
  check(analysis, node, context) {
    if (!analysis.info.hasBase && analysis.info.modifiers.length > 0) {
      context.report({ node, messageId: 'missingBase' });
    }
  },
});

const ruleInvalidModifier = createLabelWrapperRule({
  meta: buildMeta('Validate cdr-label-wrapper modifier values.', {
    invalidModifier: 'Unknown label-wrapper modifier "{{className}}".',
  }),
  check(analysis, node, context) {
    reportClasses(
      context,
      node,
      'invalidModifier',
      unique(analysis.info.invalidModifiers),
    );
  },
});

const ruleInvalidPrefix = createLabelWrapperRule({
  meta: buildMeta('Validate cdr-label-wrapper modifier prefixes.', {
    invalidPrefix:
      'cdr-label-wrapper modifiers must use the "--" separator (for example, cdr-label-wrapper--small).',
  }),
  check(analysis, node, context) {
    reportClasses(
      context,
      node,
      'invalidPrefix',
      unique(analysis.info.invalidPrefixes),
    );
  },
});

const ruleInvalidElementClass = createLabelWrapperRule({
  meta: buildMeta('Validate cdr-label-wrapper element class usage.', {
    invalidClass: 'Unknown label-wrapper element class "{{className}}".',
  }),
  check(analysis, node, context) {
    reportClasses(
      context,
      node,
      'invalidClass',
      unique(analysis.invalidElementClasses),
    );
  },
});

const ruleDuplicate = createLabelWrapperRule({
  meta: buildMeta('Prevent duplicate cdr-label-wrapper classes.', {
    duplicateClass:
      'Duplicate label-wrapper class "{{className}}" is not allowed.',
  }),
  check(analysis, node, context) {
    reportClasses(context, node, 'duplicateClass', analysis.duplicateClasses);
  },
});

const ruleInvalidTag = createLabelWrapperRule({
  meta: buildMeta('Restrict cdr-label-wrapper to <label>.', {
    invalidTag: 'cdr-label-wrapper classes are only valid on <label> elements.',
  }),
  check(analysis, node, context) {
    if (analysis.info.hasBase || analysis.info.modifiers.length > 0) {
      if (!VALID_TAGS.has(analysis.tagName)) {
        context.report({ node, messageId: 'invalidTag' });
      }
    }
  },
});

const ruleContainerTag = createLabelWrapperRule({
  meta: buildMeta('Restrict cdr-label-wrapper__container to <div>.', {
    invalidContainerTag:
      'cdr-label-wrapper__container should be used on a <div> element.',
  }),
  check(analysis, node, context) {
    if (analysis.hasContainer && analysis.tagName !== 'div') {
      context.report({ node, messageId: 'invalidContainerTag' });
    }
  },
});

const ruleFigureTag = createLabelWrapperRule({
  meta: buildMeta('Restrict cdr-label-wrapper__figure to <span>.', {
    invalidFigureTag:
      'cdr-label-wrapper__figure should be used on a <span> element.',
  }),
  check(analysis, node, context) {
    if (analysis.hasFigure && analysis.tagName !== 'span') {
      context.report({ node, messageId: 'invalidFigureTag' });
    }
  },
});

const ruleContentTag = createLabelWrapperRule({
  meta: buildMeta('Restrict cdr-label-wrapper__content to <span>.', {
    invalidContentTag:
      'cdr-label-wrapper__content should be used on a <span> element.',
  }),
  check(analysis, node, context) {
    if (analysis.hasContent && analysis.tagName !== 'span') {
      context.report({ node, messageId: 'invalidContentTag' });
    }
  },
});

export default {
  rules: {
    'label-wrapper-missing-base': ruleMissingBase,
    'label-wrapper-invalid-modifier': ruleInvalidModifier,
    'label-wrapper-invalid-prefix': ruleInvalidPrefix,
    'label-wrapper-invalid-element-class': ruleInvalidElementClass,
    'label-wrapper-duplicate': ruleDuplicate,
    'label-wrapper-invalid-tag': ruleInvalidTag,
    'label-wrapper-container-tag': ruleContainerTag,
    'label-wrapper-figure-tag': ruleFigureTag,
    'label-wrapper-content-tag': ruleContentTag,
  },
  configs: {
    recommended: {
      rules: {
        'cedar/label-wrapper-missing-base': 'error',
        'cedar/label-wrapper-invalid-modifier': 'error',
        'cedar/label-wrapper-invalid-prefix': 'error',
        'cedar/label-wrapper-invalid-element-class': 'error',
        'cedar/label-wrapper-duplicate': 'error',
        'cedar/label-wrapper-invalid-tag': 'error',
        'cedar/label-wrapper-container-tag': 'error',
        'cedar/label-wrapper-figure-tag': 'error',
        'cedar/label-wrapper-content-tag': 'error',
      },
    },
  },
};
