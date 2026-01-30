import type { Rule } from 'eslint';
import type { CaptionTagAnalysis } from '../types.js';
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

const BASE_CLASS = 'cdr-caption';
const SUMMARY_CLASS = `${BASE_CLASS}__summary`;
const CITE_CLASS = `${BASE_CLASS}__cite`;
const ALLOWED_CLASSES = new Set([BASE_CLASS, SUMMARY_CLASS, CITE_CLASS]);

/**
 * Detect caption-related class names.
 * @param className - Class name.
 * @returns True when caption class is present.
 */
function isCaptionClass(className: string): boolean {
  return (
    className === BASE_CLASS ||
    className.startsWith(`${BASE_CLASS}__`) ||
    className.startsWith(`${BASE_CLASS}--`)
  );
}

/**
 * Build caption tag analysis data.
 * @param tagName - Tag name.
 * @param attrs - Attribute map.
 * @returns Caption analysis or null.
 */
function analyzeCaptionTag(
  tagName: string | null,
  attrs: Map<string, string>,
): CaptionTagAnalysis | null {
  if (!tagName) {
    return null;
  }
  const classValue = getClassValue(attrs);
  if (!classValue || includesDynamicValue(classValue)) {
    return null;
  }
  const classes = splitClasses(classValue);
  const captionClasses = classes.filter(isCaptionClass);
  if (captionClasses.length === 0) {
    return null;
  }
  const invalidClasses = captionClasses.filter(
    (className) => !ALLOWED_CLASSES.has(className),
  );
  const duplicateClasses = findDuplicateClasses(captionClasses);

  return {
    tagName: tagName.toLowerCase(),
    classes,
    captionClasses,
    invalidClasses,
    duplicateClasses,
    hasSummary: captionClasses.includes(SUMMARY_CLASS),
    hasCite: captionClasses.includes(CITE_CLASS),
  };
}

/**
 * Build a caption rule wrapper.
 * @param options - Rule options.
 * @returns ESLint rule module.
 */
function createCaptionRule(options: {
  meta: Rule.RuleMetaData;
  check: (
    analysis: CaptionTagAnalysis,
    node: Rule.Node,
    context: Rule.RuleContext,
  ) => void;
}) {
  return createRule<CaptionTagAnalysis>({
    ...options,
    baseClass: BASE_CLASS,
    analyzeTag: analyzeCaptionTag,
  });
}

const ruleInvalidClass = createCaptionRule({
  meta: buildMeta('Validate cdr-caption class usage.', {
    invalidClass: 'Unknown caption class "{{className}}".',
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

const ruleDuplicate = createCaptionRule({
  meta: buildMeta('Prevent duplicate cdr-caption classes.', {
    duplicateClass: 'Duplicate caption class "{{className}}" is not allowed.',
  }),
  check(analysis, node, context) {
    reportClasses(context, node, 'duplicateClass', analysis.duplicateClasses);
  },
});

const ruleSummaryTag = createCaptionRule({
  meta: buildMeta('Restrict cdr-caption__summary to <p>.', {
    invalidSummaryTag: 'cdr-caption__summary should be used on a <p> element.',
  }),
  check(analysis, node, context) {
    if (analysis.hasSummary && analysis.tagName !== 'p') {
      context.report({ node, messageId: 'invalidSummaryTag' });
    }
  },
});

const ruleCiteTag = createCaptionRule({
  meta: buildMeta('Restrict caption cite usage to <cite>.', {
    invalidCiteTag: 'Caption credit should be rendered with a <cite> element.',
  }),
  check(analysis, node, context) {
    if (analysis.hasCite && analysis.tagName !== 'cite') {
      context.report({ node, messageId: 'invalidCiteTag' });
    }
  },
});

export default {
  rules: {
    'caption-invalid-class': ruleInvalidClass,
    'caption-duplicate': ruleDuplicate,
    'caption-summary-tag': ruleSummaryTag,
    'caption-cite-tag': ruleCiteTag,
  },
  configs: {
    recommended: {
      rules: {
        'cedar/caption-invalid-class': 'error',
        'cedar/caption-duplicate': 'error',
        'cedar/caption-summary-tag': 'error',
        'cedar/caption-cite-tag': 'error',
      },
    },
  },
};
