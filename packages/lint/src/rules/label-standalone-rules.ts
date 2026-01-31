import type { Rule } from 'eslint';
import type { LabelStandaloneTagAnalysis } from '../types.js';
import {
  buildMeta,
  createRule,
  findDuplicateClasses,
  getClassValue,
  includesDynamicValue,
  reportClasses,
  splitClasses,
  unique,
} from '../utils.js';

const BASE_CLASS = 'cdr-label-standalone';
const LABEL_WRAPPER_CLASS = `${BASE_CLASS}__label-wrapper`;
const LABEL_CLASS = `${BASE_CLASS}__label`;
const LABEL_SR_ONLY_CLASS = `${LABEL_CLASS}--sr-only`;
const LABEL_DISABLED_CLASS = `${LABEL_CLASS}--disabled`;
const OPTIONAL_CLASS = `${BASE_CLASS}__optional`;
const HELPER_CLASS = `${BASE_CLASS}__helper`;
const INFO_CLASS = `${BASE_CLASS}__info`;
const POST_CONTENT_CLASS = `${BASE_CLASS}__post-content`;
const INFO_ACTION_CLASS = `${BASE_CLASS}__info-action`;
const INPUT_WRAP_CLASS = `${BASE_CLASS}__input-wrap`;
const INPUT_SPACING_CLASS = `${BASE_CLASS}__input-spacing`;

const ALLOWED_CLASSES = new Set([
  BASE_CLASS,
  LABEL_WRAPPER_CLASS,
  LABEL_CLASS,
  LABEL_SR_ONLY_CLASS,
  LABEL_DISABLED_CLASS,
  OPTIONAL_CLASS,
  HELPER_CLASS,
  INFO_CLASS,
  POST_CONTENT_CLASS,
  INFO_ACTION_CLASS,
  INPUT_WRAP_CLASS,
  INPUT_SPACING_CLASS,
]);

/**
 * Detect label-standalone-related class names.
 * @param className - Class name.
 * @returns True when label-standalone class is present.
 */
function isLabelStandaloneClass(className: string): boolean {
  return (
    className === BASE_CLASS ||
    className.startsWith(`${BASE_CLASS}__`) ||
    className.startsWith(`${BASE_CLASS}--`)
  );
}

/**
 * Build label-standalone tag analysis data.
 * @param tagName - Tag name.
 * @param attrs - Attribute map.
 * @returns Label-standalone analysis or null.
 */
function analyzeLabelStandaloneTag(
  tagName: string | null,
  attrs: Map<string, string>,
): LabelStandaloneTagAnalysis | null {
  if (!tagName) {
    return null;
  }
  const classValue = getClassValue(attrs);
  if (!classValue || includesDynamicValue(classValue)) {
    return null;
  }
  const classes = splitClasses(classValue);
  const labelStandaloneClasses = classes.filter(isLabelStandaloneClass);
  if (labelStandaloneClasses.length === 0) {
    return null;
  }
  const invalidClasses = labelStandaloneClasses.filter(
    (className) => !ALLOWED_CLASSES.has(className),
  );
  const duplicateClasses = findDuplicateClasses(labelStandaloneClasses);

  return {
    tagName: tagName.toLowerCase(),
    classes,
    labelStandaloneClasses,
    invalidClasses,
    duplicateClasses,
    hasLabelWrapper: labelStandaloneClasses.includes(LABEL_WRAPPER_CLASS),
    hasLabel:
      labelStandaloneClasses.includes(LABEL_CLASS) ||
      labelStandaloneClasses.includes(LABEL_SR_ONLY_CLASS) ||
      labelStandaloneClasses.includes(LABEL_DISABLED_CLASS),
    hasOptional: labelStandaloneClasses.includes(OPTIONAL_CLASS),
    hasHelper: labelStandaloneClasses.includes(HELPER_CLASS),
    hasInfo: labelStandaloneClasses.includes(INFO_CLASS),
    hasPostContent: labelStandaloneClasses.includes(POST_CONTENT_CLASS),
    hasInfoAction: labelStandaloneClasses.includes(INFO_ACTION_CLASS),
    hasInputWrap: labelStandaloneClasses.includes(INPUT_WRAP_CLASS),
    hasInputSpacing: labelStandaloneClasses.includes(INPUT_SPACING_CLASS),
  };
}

/**
 * Build a label-standalone rule wrapper.
 * @param options - Rule options.
 * @returns ESLint rule module.
 */
function createLabelStandaloneRule(options: {
  meta: Rule.RuleMetaData;
  check: (
    analysis: LabelStandaloneTagAnalysis,
    node: Rule.Node,
    context: Rule.RuleContext,
  ) => void;
}) {
  return createRule<LabelStandaloneTagAnalysis>({
    ...options,
    baseClass: BASE_CLASS,
    analyzeTag: analyzeLabelStandaloneTag,
  });
}

const ruleInvalidClass = createLabelStandaloneRule({
  meta: buildMeta('Validate cdr-label-standalone class usage.', {
    invalidClass: 'Unknown label-standalone class "{{className}}".',
  }),
  check(analysis, node, context) {
    reportClasses(
      context,
      node,
      'invalidClass',
      unique(analysis.invalidClasses),
    );
  },
});

const ruleDuplicate = createLabelStandaloneRule({
  meta: buildMeta('Prevent duplicate cdr-label-standalone classes.', {
    duplicateClass:
      'Duplicate label-standalone class "{{className}}" is not allowed.',
  }),
  check(analysis, node, context) {
    reportClasses(context, node, 'duplicateClass', analysis.duplicateClasses);
  },
});

const ruleLabelWrapperTag = createLabelStandaloneRule({
  meta: buildMeta('Restrict cdr-label-standalone__label-wrapper to <div>.', {
    invalidLabelWrapperTag:
      'cdr-label-standalone__label-wrapper should be used on a <div> element.',
  }),
  check(analysis, node, context) {
    if (analysis.hasLabelWrapper && analysis.tagName !== 'div') {
      context.report({ node, messageId: 'invalidLabelWrapperTag' });
    }
  },
});

const ruleLabelTag = createLabelStandaloneRule({
  meta: buildMeta('Restrict cdr-label-standalone__label to <label>.', {
    invalidLabelTag:
      'cdr-label-standalone__label should be used on a <label> element.',
  }),
  check(analysis, node, context) {
    if (analysis.hasLabel && analysis.tagName !== 'label') {
      context.report({ node, messageId: 'invalidLabelTag' });
    }
  },
});

const ruleOptionalTag = createLabelStandaloneRule({
  meta: buildMeta('Restrict cdr-label-standalone__optional to <span>.', {
    invalidOptionalTag:
      'cdr-label-standalone__optional should be used on a <span> element.',
  }),
  check(analysis, node, context) {
    if (analysis.hasOptional && analysis.tagName !== 'span') {
      context.report({ node, messageId: 'invalidOptionalTag' });
    }
  },
});

const ruleHelperTag = createLabelStandaloneRule({
  meta: buildMeta('Restrict cdr-label-standalone__helper to <span>.', {
    invalidHelperTag:
      'cdr-label-standalone__helper should be used on a <span> element.',
  }),
  check(analysis, node, context) {
    if (analysis.hasHelper && analysis.tagName !== 'span') {
      context.report({ node, messageId: 'invalidHelperTag' });
    }
  },
});

const ruleInfoTag = createLabelStandaloneRule({
  meta: buildMeta('Restrict cdr-label-standalone__info to <span>.', {
    invalidInfoTag:
      'cdr-label-standalone__info should be used on a <span> element.',
  }),
  check(analysis, node, context) {
    if (analysis.hasInfo && analysis.tagName !== 'span') {
      context.report({ node, messageId: 'invalidInfoTag' });
    }
  },
});

const ruleInputWrapTag = createLabelStandaloneRule({
  meta: buildMeta('Restrict cdr-label-standalone__input-wrap to <div>.', {
    invalidInputWrapTag:
      'cdr-label-standalone__input-wrap should be used on a <div> element.',
  }),
  check(analysis, node, context) {
    if (analysis.hasInputWrap && analysis.tagName !== 'div') {
      context.report({ node, messageId: 'invalidInputWrapTag' });
    }
  },
});

const ruleInputSpacingTag = createLabelStandaloneRule({
  meta: buildMeta('Restrict cdr-label-standalone__input-spacing to <div>.', {
    invalidInputSpacingTag:
      'cdr-label-standalone__input-spacing should be used on a <div> element.',
  }),
  check(analysis, node, context) {
    if (analysis.hasInputSpacing && analysis.tagName !== 'div') {
      context.report({ node, messageId: 'invalidInputSpacingTag' });
    }
  },
});

const ruleInfoActionTag = createLabelStandaloneRule({
  meta: buildMeta('Restrict cdr-label-standalone__info-action to <div>.', {
    invalidInfoActionTag:
      'cdr-label-standalone__info-action should be used on a <div> element.',
  }),
  check(analysis, node, context) {
    if (analysis.hasInfoAction && analysis.tagName !== 'div') {
      context.report({ node, messageId: 'invalidInfoActionTag' });
    }
  },
});

const rulePostContentTag = createLabelStandaloneRule({
  meta: buildMeta('Restrict cdr-label-standalone__post-content to <div>.', {
    invalidPostContentTag:
      'cdr-label-standalone__post-content should be used on a <div> element.',
  }),
  check(analysis, node, context) {
    if (analysis.hasPostContent && analysis.tagName !== 'div') {
      context.report({ node, messageId: 'invalidPostContentTag' });
    }
  },
});

export default {
  rules: {
    'label-standalone-invalid-class': ruleInvalidClass,
    'label-standalone-duplicate': ruleDuplicate,
    'label-standalone-label-wrapper-tag': ruleLabelWrapperTag,
    'label-standalone-label-tag': ruleLabelTag,
    'label-standalone-optional-tag': ruleOptionalTag,
    'label-standalone-helper-tag': ruleHelperTag,
    'label-standalone-info-tag': ruleInfoTag,
    'label-standalone-input-wrap-tag': ruleInputWrapTag,
    'label-standalone-input-spacing-tag': ruleInputSpacingTag,
    'label-standalone-info-action-tag': ruleInfoActionTag,
    'label-standalone-post-content-tag': rulePostContentTag,
  },
  configs: {
    recommended: {
      rules: {
        'cedar/label-standalone-invalid-class': 'error',
        'cedar/label-standalone-duplicate': 'error',
        'cedar/label-standalone-label-wrapper-tag': 'error',
        'cedar/label-standalone-label-tag': 'error',
        'cedar/label-standalone-optional-tag': 'error',
        'cedar/label-standalone-helper-tag': 'error',
        'cedar/label-standalone-info-tag': 'error',
        'cedar/label-standalone-input-wrap-tag': 'error',
        'cedar/label-standalone-input-spacing-tag': 'error',
        'cedar/label-standalone-info-action-tag': 'error',
        'cedar/label-standalone-post-content-tag': 'error',
      },
    },
  },
};
