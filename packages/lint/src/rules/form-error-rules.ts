import type { Rule } from 'eslint';
import type { FormErrorTagAnalysis } from '../types.js';
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

const BASE_CLASS = 'cdr-form-error';
const ICON_CLASS = `${BASE_CLASS}__icon`;
const ACTIVE_CLASS = '--active-error';
const ALLOWED_CLASSES = new Set([BASE_CLASS, ICON_CLASS, ACTIVE_CLASS]);
const VALID_BASE_TAGS = new Set(['div']);

/**
 * Detect form-error-related class names.
 * @param className - Class name.
 * @returns True when form-error class is present.
 */
function isFormErrorClass(className: string): boolean {
  return (
    className === BASE_CLASS ||
    className === ICON_CLASS ||
    className === ACTIVE_CLASS
  );
}

/**
 * Build form-error tag analysis data.
 * @param tagName - Tag name.
 * @param attrs - Attribute map.
 * @returns Form-error analysis or null.
 */
function analyzeFormErrorTag(
  tagName: string | null,
  attrs: Map<string, string>,
): FormErrorTagAnalysis | null {
  if (!tagName) {
    return null;
  }
  const classValue = getClassValue(attrs);
  if (!classValue || includesDynamicValue(classValue)) {
    return null;
  }
  const classes = splitClasses(classValue);
  const formErrorClasses = classes.filter(isFormErrorClass);
  if (formErrorClasses.length === 0) {
    return null;
  }
  const invalidClasses = formErrorClasses.filter(
    (className) => !ALLOWED_CLASSES.has(className),
  );
  const duplicateClasses = findDuplicateClasses(formErrorClasses);

  return {
    tagName: tagName.toLowerCase(),
    classes,
    formErrorClasses,
    invalidClasses,
    duplicateClasses,
    hasBase: formErrorClasses.includes(BASE_CLASS),
    hasActive: formErrorClasses.includes(ACTIVE_CLASS),
    hasIcon: formErrorClasses.includes(ICON_CLASS),
  };
}

/**
 * Build a form-error rule wrapper.
 * @param options - Rule options.
 * @returns ESLint rule module.
 */
function createFormErrorRule(options: {
  meta: Rule.RuleMetaData;
  check: (
    analysis: FormErrorTagAnalysis,
    node: Rule.Node,
    context: Rule.RuleContext,
  ) => void;
}) {
  return createRule<FormErrorTagAnalysis>({
    ...options,
    baseClass: BASE_CLASS,
    analyzeTag: analyzeFormErrorTag,
  });
}

const ruleInvalidClass = createFormErrorRule({
  meta: buildMeta('Validate cdr-form-error class usage.', {
    invalidClass: 'Unknown form-error class "{{className}}".',
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

const ruleDuplicate = createFormErrorRule({
  meta: buildMeta('Prevent duplicate cdr-form-error classes.', {
    duplicateClass:
      'Duplicate form-error class "{{className}}" is not allowed.',
  }),
  check(analysis, node, context) {
    reportClasses(context, node, 'duplicateClass', analysis.duplicateClasses);
  },
});

const ruleMissingBase = createFormErrorRule({
  meta: buildMeta('Require cdr-form-error base class for active state.', {
    missingBase: 'Active form errors require the cdr-form-error base class.',
  }),
  check(analysis, node, context) {
    if (!analysis.hasBase && analysis.hasActive) {
      context.report({ node, messageId: 'missingBase' });
    }
  },
});

const ruleBaseTag = createFormErrorRule({
  meta: buildMeta('Restrict cdr-form-error to <div>.', {
    invalidTag: 'cdr-form-error classes are only valid on <div> elements.',
  }),
  check(analysis, node, context) {
    if (analysis.hasBase && !VALID_BASE_TAGS.has(analysis.tagName)) {
      context.report({ node, messageId: 'invalidTag' });
    }
  },
});

const ruleIconTag = createFormErrorRule({
  meta: buildMeta('Restrict cdr-form-error__icon to <span>.', {
    invalidIconTag: 'cdr-form-error__icon should be used on a <span> element.',
  }),
  check(analysis, node, context) {
    if (analysis.hasIcon && analysis.tagName !== 'span') {
      context.report({ node, messageId: 'invalidIconTag' });
    }
  },
});

export default {
  rules: {
    'form-error-invalid-class': ruleInvalidClass,
    'form-error-duplicate': ruleDuplicate,
    'form-error-missing-base': ruleMissingBase,
    'form-error-base-tag': ruleBaseTag,
    'form-error-icon-tag': ruleIconTag,
  },
  configs: {
    recommended: {
      rules: {
        'cedar/form-error-invalid-class': 'error',
        'cedar/form-error-duplicate': 'error',
        'cedar/form-error-missing-base': 'error',
        'cedar/form-error-base-tag': 'error',
        'cedar/form-error-icon-tag': 'error',
      },
    },
  },
};
