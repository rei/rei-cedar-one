import type { Rule } from 'eslint';
import type { InputTagAnalysis } from '../types.js';
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

const BASE_CLASS = 'cdr-input';
const WRAP_CLASS = 'cdr-input-wrap';
const PRE_ICON_CLASS = `${BASE_CLASS}__pre-icon`;
const POST_ICON_CLASS = `${BASE_CLASS}__post-icon`;
const HELPER_TEXT_CLASS = `${BASE_CLASS}__helper-text`;
const BUTTON_CLASS = `${BASE_CLASS}__button`;
const FOCUS_CLASS = `${BASE_CLASS}--focus`;

const MODIFIER_CLASSES = new Set([
  FOCUS_CLASS,
  `${BASE_CLASS}--multiline`,
  `${BASE_CLASS}--preicon`,
  `${BASE_CLASS}--posticon`,
  `${BASE_CLASS}--posticons`,
  `${BASE_CLASS}--primary`,
  `${BASE_CLASS}--secondary`,
  `${BASE_CLASS}--error`,
  `${BASE_CLASS}--large`,
  `${BASE_CLASS}--large@xs`,
  `${BASE_CLASS}--large@sm`,
  `${BASE_CLASS}--large@md`,
  `${BASE_CLASS}--large@lg`,
]);

const ALLOWED_CLASSES = new Set([
  BASE_CLASS,
  WRAP_CLASS,
  PRE_ICON_CLASS,
  POST_ICON_CLASS,
  HELPER_TEXT_CLASS,
  BUTTON_CLASS,
  ...MODIFIER_CLASSES,
]);

const VALID_INPUT_TAGS = new Set(['input', 'textarea']);

/**
 * Detect input-related class names.
 * @param className - Class name.
 * @returns True when input class is present.
 */
function isInputClass(className: string): boolean {
  return (
    className === BASE_CLASS ||
    className === WRAP_CLASS ||
    className.startsWith(`${BASE_CLASS}__`) ||
    className.startsWith(`${BASE_CLASS}--`)
  );
}

/**
 * Build input tag analysis data.
 * @param tagName - Tag name.
 * @param attrs - Attribute map.
 * @returns Input analysis or null.
 */
function analyzeInputTag(
  tagName: string | null,
  attrs: Map<string, string>,
): InputTagAnalysis | null {
  if (!tagName) {
    return null;
  }
  const classValue = getClassValue(attrs);
  if (!classValue || includesDynamicValue(classValue)) {
    return null;
  }
  const classes = splitClasses(classValue);
  const inputClasses = classes.filter(isInputClass);
  if (inputClasses.length === 0) {
    return null;
  }
  const invalidClasses = inputClasses.filter(
    (className) => !ALLOWED_CLASSES.has(className),
  );
  const duplicateClasses = findDuplicateClasses(inputClasses);
  const modifiers = inputClasses.filter((className) =>
    className.startsWith(`${BASE_CLASS}--`),
  );

  return {
    tagName: tagName.toLowerCase(),
    classes,
    inputClasses,
    invalidClasses,
    duplicateClasses,
    modifiers,
    hasBase: inputClasses.includes(BASE_CLASS),
    hasWrap: inputClasses.includes(WRAP_CLASS),
    hasPreIcon: inputClasses.includes(PRE_ICON_CLASS),
    hasPostIcon: inputClasses.includes(POST_ICON_CLASS),
    hasHelperText: inputClasses.includes(HELPER_TEXT_CLASS),
  };
}

/**
 * Build an input rule wrapper.
 * @param options - Rule options.
 * @returns ESLint rule module.
 */
function createInputRule(options: {
  meta: Rule.RuleMetaData;
  check: (
    analysis: InputTagAnalysis,
    node: Rule.Node,
    context: Rule.RuleContext,
  ) => void;
}) {
  return createRule<InputTagAnalysis>({
    ...options,
    baseClass: BASE_CLASS,
    analyzeTag: analyzeInputTag,
  });
}

const ruleInvalidClass = createInputRule({
  meta: buildMeta('Validate cdr-input class usage.', {
    invalidClass: 'Unknown input class "{{className}}".',
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

const ruleDuplicate = createInputRule({
  meta: buildMeta('Prevent duplicate cdr-input classes.', {
    duplicateClass: 'Duplicate input class "{{className}}" is not allowed.',
  }),
  check(analysis, node, context) {
    reportClasses(context, node, 'duplicateClass', analysis.duplicateClasses);
  },
});

const ruleMissingBase = createInputRule({
  meta: buildMeta('Require cdr-input base class for modifiers.', {
    missingBase: 'cdr-input modifiers require the base class.',
  }),
  check(analysis, node, context) {
    const nonFocusModifiers = analysis.modifiers.filter(
      (modifier) => modifier !== FOCUS_CLASS,
    );
    if (!analysis.hasBase && nonFocusModifiers.length > 0) {
      context.report({ node, messageId: 'missingBase' });
    }
  },
});

const ruleBaseTag = createInputRule({
  meta: buildMeta('Restrict cdr-input base class to input elements.', {
    invalidTag: 'cdr-input should be used on <input> or <textarea> elements.',
  }),
  check(analysis, node, context) {
    if (analysis.hasBase && !VALID_INPUT_TAGS.has(analysis.tagName)) {
      context.report({ node, messageId: 'invalidTag' });
    }
  },
});

const ruleWrapTag = createInputRule({
  meta: buildMeta('Restrict cdr-input-wrap to <div>.', {
    invalidWrapTag: 'cdr-input-wrap should be used on a <div> element.',
  }),
  check(analysis, node, context) {
    if (analysis.hasWrap && analysis.tagName !== 'div') {
      context.report({ node, messageId: 'invalidWrapTag' });
    }
  },
});

const rulePreIconTag = createInputRule({
  meta: buildMeta('Restrict cdr-input__pre-icon to <span>.', {
    invalidPreIconTag:
      'cdr-input__pre-icon should be used on a <span> element.',
  }),
  check(analysis, node, context) {
    if (analysis.hasPreIcon && analysis.tagName !== 'span') {
      context.report({ node, messageId: 'invalidPreIconTag' });
    }
  },
});

const rulePostIconTag = createInputRule({
  meta: buildMeta('Restrict cdr-input__post-icon to <span>.', {
    invalidPostIconTag:
      'cdr-input__post-icon should be used on a <span> element.',
  }),
  check(analysis, node, context) {
    if (analysis.hasPostIcon && analysis.tagName !== 'span') {
      context.report({ node, messageId: 'invalidPostIconTag' });
    }
  },
});

const ruleHelperTextTag = createInputRule({
  meta: buildMeta('Restrict cdr-input__helper-text to <span>.', {
    invalidHelperTextTag:
      'cdr-input__helper-text should be used on a <span> element.',
  }),
  check(analysis, node, context) {
    if (analysis.hasHelperText && analysis.tagName !== 'span') {
      context.report({ node, messageId: 'invalidHelperTextTag' });
    }
  },
});

export default {
  rules: {
    'input-invalid-class': ruleInvalidClass,
    'input-duplicate': ruleDuplicate,
    'input-missing-base': ruleMissingBase,
    'input-base-tag': ruleBaseTag,
    'input-wrap-tag': ruleWrapTag,
    'input-pre-icon-tag': rulePreIconTag,
    'input-post-icon-tag': rulePostIconTag,
    'input-helper-text-tag': ruleHelperTextTag,
  },
  configs: {
    recommended: {
      rules: {
        'cedar/input-invalid-class': 'error',
        'cedar/input-duplicate': 'error',
        'cedar/input-missing-base': 'error',
        'cedar/input-base-tag': 'error',
        'cedar/input-wrap-tag': 'error',
        'cedar/input-pre-icon-tag': 'error',
        'cedar/input-post-icon-tag': 'error',
        'cedar/input-helper-text-tag': 'error',
      },
    },
  },
};
