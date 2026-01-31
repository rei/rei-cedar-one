import type { Rule } from 'eslint';
import type { SplitSurfaceTagAnalysis } from '../types.js';
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

const BASE_CLASS = 'cdr-split-surface';
const MODIFIER_PREFIX = `${BASE_CLASS}--`;
const ALLOWED_MODIFIERS = new Set([
  `${BASE_CLASS}--top`,
  `${BASE_CLASS}--bottom`,
]);
const ELEMENT_CLASSES = new Set([
  `${BASE_CLASS}__top`,
  `${BASE_CLASS}__bottom`,
]);

function isSplitSurfaceClass(className: string): boolean {
  return (
    className === BASE_CLASS ||
    className.startsWith(`${BASE_CLASS}__`) ||
    className.startsWith(`${BASE_CLASS}--`)
  );
}

function analyzeSplitSurfaceTag(
  tagName: string | null,
  attrs: Map<string, string>,
): SplitSurfaceTagAnalysis | null {
  if (!tagName) {
    return null;
  }
  const classValue = getClassValue(attrs);
  if (!classValue || includesDynamicValue(classValue)) {
    return null;
  }
  const classes = splitClasses(classValue);
  const splitSurfaceClasses = classes.filter(isSplitSurfaceClass);
  if (splitSurfaceClasses.length === 0) {
    return null;
  }
  const elementClasses = splitSurfaceClasses.filter((className) =>
    className.startsWith(`${BASE_CLASS}__`),
  );
  const modifierClasses = splitSurfaceClasses.filter(
    (className) => !className.startsWith(`${BASE_CLASS}__`),
  );
  const info = analyzeModifiers({
    baseClass: BASE_CLASS,
    modifierPrefix: MODIFIER_PREFIX,
    allowedModifiers: ALLOWED_MODIFIERS,
    classes: modifierClasses,
  });
  const invalidElementClasses = elementClasses.filter(
    (className) => !ELEMENT_CLASSES.has(className),
  );
  const duplicateClasses = findDuplicateClasses(splitSurfaceClasses);

  return {
    tagName: tagName.toLowerCase(),
    classes,
    splitSurfaceClasses,
    invalidElementClasses,
    duplicateClasses,
    info,
    hasElement: elementClasses.length > 0,
  };
}

function createSplitSurfaceRule(options: {
  meta: Rule.RuleMetaData;
  check: (
    analysis: SplitSurfaceTagAnalysis,
    node: Rule.Node,
    context: Rule.RuleContext,
  ) => void;
}) {
  return createRule<SplitSurfaceTagAnalysis>({
    ...options,
    baseClass: BASE_CLASS,
    analyzeTag: analyzeSplitSurfaceTag,
  });
}

const ruleMissingBase = createSplitSurfaceRule({
  meta: buildMeta('Require cdr-split-surface base class for modifiers.', {
    missingBase: 'cdr-split-surface modifiers require the base class.',
  }),
  check(analysis, node, context) {
    if (!analysis.info.hasBase && analysis.info.modifiers.length > 0) {
      context.report({ node, messageId: 'missingBase' });
    }
  },
});

const ruleMissingModifier = createSplitSurfaceRule({
  meta: buildMeta('Require a split surface modifier.', {
    missingModifier:
      'cdr-split-surface should include cdr-split-surface--top or cdr-split-surface--bottom.',
  }),
  check(analysis, node, context) {
    if (analysis.info.hasBase && analysis.info.modifiers.length === 0) {
      context.report({ node, messageId: 'missingModifier' });
    }
  },
});

const ruleInvalidModifier = createSplitSurfaceRule({
  meta: buildMeta('Validate cdr-split-surface modifier values.', {
    invalidModifier: 'Unknown split surface modifier "{{className}}".',
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

const ruleInvalidPrefix = createSplitSurfaceRule({
  meta: buildMeta('Validate cdr-split-surface modifier prefixes.', {
    invalidPrefix:
      'cdr-split-surface modifiers must use the "--" separator (for example, cdr-split-surface--bottom).',
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

const ruleInvalidElementClass = createSplitSurfaceRule({
  meta: buildMeta('Validate cdr-split-surface element class usage.', {
    invalidClass: 'Unknown split surface element class "{{className}}".',
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

const ruleDuplicate = createSplitSurfaceRule({
  meta: buildMeta('Prevent duplicate split surface classes.', {
    duplicateClass:
      'Duplicate split surface class "{{className}}" is not allowed.',
  }),
  check(analysis, node, context) {
    reportClasses(context, node, 'duplicateClass', analysis.duplicateClasses);
  },
});

export default {
  rules: {
    'split-surface-missing-base': ruleMissingBase,
    'split-surface-missing-modifier': ruleMissingModifier,
    'split-surface-invalid-modifier': ruleInvalidModifier,
    'split-surface-invalid-prefix': ruleInvalidPrefix,
    'split-surface-invalid-element-class': ruleInvalidElementClass,
    'split-surface-duplicate': ruleDuplicate,
  },
  configs: {
    recommended: {
      rules: {
        'cedar/split-surface-missing-base': 'error',
        'cedar/split-surface-missing-modifier': 'error',
        'cedar/split-surface-invalid-modifier': 'error',
        'cedar/split-surface-invalid-prefix': 'error',
        'cedar/split-surface-invalid-element-class': 'error',
        'cedar/split-surface-duplicate': 'error',
      },
    },
  },
};
