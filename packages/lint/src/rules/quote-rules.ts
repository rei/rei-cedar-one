import type { Rule } from 'eslint';
import type { QuoteTagAnalysis } from '../types.js';
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

const BASE_CLASS = 'cdr-quote';
const MODIFIER_PREFIX = `${BASE_CLASS}--`;
const SUMMARY_CLASS = `${BASE_CLASS}__summary`;
const CITATION_CLASS = `${BASE_CLASS}__citation`;
const ELEMENT_PREFIX = `${BASE_CLASS}__`;
const ALLOWED_MODIFIERS = new Set([`${BASE_CLASS}--pull`]);
const ALLOWED_ELEMENT_CLASSES = new Set([SUMMARY_CLASS, CITATION_CLASS]);
const VALID_TAGS = new Set(['blockquote', 'aside', 'q', 'div']);

/**
 * Detect quote-related class names.
 * @param className - Class name.
 * @returns True when quote class is present.
 */
function isQuoteClass(className: string): boolean {
  return (
    className === BASE_CLASS ||
    className.startsWith(`${BASE_CLASS}__`) ||
    className.startsWith(`${BASE_CLASS}--`)
  );
}

/**
 * Build quote tag analysis data.
 * @param tagName - Tag name.
 * @param attrs - Attribute map.
 * @returns Quote analysis or null.
 */
function analyzeQuoteTag(
  tagName: string | null,
  attrs: Map<string, string>,
): QuoteTagAnalysis | null {
  if (!tagName) {
    return null;
  }
  const classValue = getClassValue(attrs);
  if (!classValue || includesDynamicValue(classValue)) {
    return null;
  }
  const classes = splitClasses(classValue);
  const quoteClasses = classes.filter(isQuoteClass);
  if (quoteClasses.length === 0) {
    return null;
  }
  const invalidElementClasses = quoteClasses.filter(
    (className) =>
      className.startsWith(ELEMENT_PREFIX) &&
      !ALLOWED_ELEMENT_CLASSES.has(className),
  );
  const duplicateClasses = findDuplicateClasses(quoteClasses);
  const modifierClasses = quoteClasses.filter(
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
    quoteClasses,
    invalidElementClasses,
    duplicateClasses,
    info,
    hasSummary: quoteClasses.includes(SUMMARY_CLASS),
    hasCitation: quoteClasses.includes(CITATION_CLASS),
  };
}

/**
 * Build a quote rule wrapper.
 * @param options - Rule options.
 * @returns ESLint rule module.
 */
function createQuoteRule(options: {
  meta: Rule.RuleMetaData;
  check: (
    analysis: QuoteTagAnalysis,
    node: Rule.Node,
    context: Rule.RuleContext,
  ) => void;
}) {
  return createRule<QuoteTagAnalysis>({
    ...options,
    baseClass: BASE_CLASS,
    analyzeTag: analyzeQuoteTag,
  });
}

const ruleMissingBase = createQuoteRule({
  meta: buildMeta('Require cdr-quote base class for modifiers.', {
    missingBase: 'cdr-quote modifiers require the base class.',
  }),
  check(analysis, node, context) {
    if (!analysis.info.hasBase && analysis.info.modifiers.length > 0) {
      context.report({ node, messageId: 'missingBase' });
    }
  },
});

const ruleInvalidModifier = createQuoteRule({
  meta: buildMeta('Validate cdr-quote modifier values.', {
    invalidModifier: 'Unknown quote modifier "{{className}}".',
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

const ruleInvalidPrefix = createQuoteRule({
  meta: buildMeta('Validate cdr-quote modifier prefixes.', {
    invalidPrefix:
      'cdr-quote modifiers must use the "--" separator (for example, cdr-quote--pull).',
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

const ruleInvalidElementClass = createQuoteRule({
  meta: buildMeta('Validate cdr-quote element class usage.', {
    invalidClass: 'Unknown quote element class "{{className}}".',
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

const ruleDuplicate = createQuoteRule({
  meta: buildMeta('Prevent duplicate cdr-quote classes.', {
    duplicateClass: 'Duplicate quote class "{{className}}" is not allowed.',
  }),
  check(analysis, node, context) {
    reportClasses(context, node, 'duplicateClass', analysis.duplicateClasses);
  },
});

const ruleSummaryTag = createQuoteRule({
  meta: buildMeta('Restrict cdr-quote__summary to <p>.', {
    invalidSummaryTag: 'cdr-quote__summary should be used on a <p> element.',
  }),
  check(analysis, node, context) {
    if (analysis.hasSummary && analysis.tagName !== 'p') {
      context.report({ node, messageId: 'invalidSummaryTag' });
    }
  },
});

const ruleCitationTag = createQuoteRule({
  meta: buildMeta('Restrict cdr-quote__citation to <cite>.', {
    invalidCitationTag: 'Quote citations should be rendered with <cite>.',
  }),
  check(analysis, node, context) {
    if (analysis.hasCitation && analysis.tagName !== 'cite') {
      context.report({ node, messageId: 'invalidCitationTag' });
    }
  },
});

const ruleInvalidTag = createQuoteRule({
  meta: buildMeta('Restrict cdr-quote to valid tags.', {
    invalidTag:
      'cdr-quote classes are only valid on <blockquote>, <aside>, <q>, or <div>.',
  }),
  check(analysis, node, context) {
    if (analysis.info.hasBase || analysis.info.modifiers.length > 0) {
      if (!VALID_TAGS.has(analysis.tagName)) {
        context.report({ node, messageId: 'invalidTag' });
      }
    }
  },
});

export default {
  rules: {
    'quote-missing-base': ruleMissingBase,
    'quote-invalid-modifier': ruleInvalidModifier,
    'quote-invalid-prefix': ruleInvalidPrefix,
    'quote-invalid-element-class': ruleInvalidElementClass,
    'quote-duplicate': ruleDuplicate,
    'quote-summary-tag': ruleSummaryTag,
    'quote-citation-tag': ruleCitationTag,
    'quote-invalid-tag': ruleInvalidTag,
  },
  configs: {
    recommended: {
      rules: {
        'cedar/quote-missing-base': 'error',
        'cedar/quote-invalid-modifier': 'error',
        'cedar/quote-invalid-prefix': 'error',
        'cedar/quote-invalid-element-class': 'error',
        'cedar/quote-duplicate': 'error',
        'cedar/quote-summary-tag': 'error',
        'cedar/quote-citation-tag': 'error',
        'cedar/quote-invalid-tag': 'error',
      },
    },
  },
};
