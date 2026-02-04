import type { Rule } from 'eslint';
import type { AccordionGroupTagAnalysis } from '../types.js';
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

const BASE_CLASS = 'cdr-accordion-group';
const MODIFIER_PREFIX = `${BASE_CLASS}--`;
const VALID_TAGS = new Set(['div', 'ul', 'ol']);

/**
 * Detect accordion group class names.
 * @param className - Class name.
 * @returns True when accordion group class is present.
 */
function isAccordionGroupClass(className: string): boolean {
  return (
    className === BASE_CLASS ||
    className.startsWith(MODIFIER_PREFIX) ||
    className.startsWith(`${BASE_CLASS}__`)
  );
}

/**
 * Build accordion group tag analysis data.
 * @param tagName - Tag name.
 * @param attrs - Attribute map.
 * @returns Accordion group analysis or null.
 */
function analyzeAccordionGroupTag(
  tagName: string | null,
  attrs: Map<string, string>,
): AccordionGroupTagAnalysis | null {
  if (!tagName) {
    return null;
  }
  const classValue = getClassValue(attrs);
  if (!classValue || includesDynamicValue(classValue)) {
    return null;
  }
  const classes = splitClasses(classValue);
  const groupClasses = classes.filter(isAccordionGroupClass);
  if (groupClasses.length === 0) {
    return null;
  }
  const invalidClasses = groupClasses.filter(
    (className) => className !== BASE_CLASS,
  );
  const duplicateClasses = findDuplicateClasses(groupClasses);

  return {
    tagName: tagName.toLowerCase(),
    classes,
    groupClasses,
    invalidClasses,
    duplicateClasses,
    hasBase: groupClasses.includes(BASE_CLASS),
  };
}

/**
 * Build an accordion group rule wrapper.
 * @param options - Rule options.
 * @returns ESLint rule module.
 */
function createAccordionGroupRule(options: {
  meta: Rule.RuleMetaData;
  check: (
    analysis: AccordionGroupTagAnalysis,
    node: Rule.Node,
    context: Rule.RuleContext,
  ) => void;
}) {
  return createRule<AccordionGroupTagAnalysis>({
    ...options,
    baseClass: BASE_CLASS,
    analyzeTag: analyzeAccordionGroupTag,
  });
}

const ruleInvalidClass = createAccordionGroupRule({
  meta: buildMeta('Validate cdr-accordion-group class usage.', {
    invalidClass: 'Unknown accordion group class "{{className}}".',
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

const ruleDuplicate = createAccordionGroupRule({
  meta: buildMeta('Prevent duplicate cdr-accordion-group classes.', {
    duplicateClass:
      'Duplicate accordion group class "{{className}}" is not allowed.',
  }),
  check(analysis, node, context) {
    reportClasses(context, node, 'duplicateClass', analysis.duplicateClasses);
  },
});

const ruleInvalidTag = createAccordionGroupRule({
  meta: buildMeta('Restrict cdr-accordion-group to valid tags.', {
    invalidTag:
      'cdr-accordion-group should be used on <div>, <ul>, or <ol> elements.',
  }),
  check(analysis, node, context) {
    if (analysis.hasBase && !VALID_TAGS.has(analysis.tagName)) {
      context.report({ node, messageId: 'invalidTag' });
    }
  },
});

const rules = {
  'accordion-group/invalid-class': ruleInvalidClass,
  'accordion-group/duplicate': ruleDuplicate,
  'accordion-group/invalid-tag': ruleInvalidTag,
};

const configs = {
  recommended: {
    rules: {
      'cedar/accordion-group/invalid-class': 'error',
      'cedar/accordion-group/duplicate': 'error',
      'cedar/accordion-group/invalid-tag': 'error',
    },
  },
};

export default { rules, configs };
export { rules, configs };
