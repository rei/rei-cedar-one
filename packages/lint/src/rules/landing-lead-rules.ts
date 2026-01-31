import type { Rule } from 'eslint';
import type {
  HeadingSubheadingBlockTagAnalysis,
  LandingLeadTagAnalysis,
} from '../types.js';
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

const LANDING_LEAD_BASE = 'cdr-landing-lead';
const LANDING_LEAD_ELEMENT_CLASSES = new Set([
  `${LANDING_LEAD_BASE}__image`,
  `${LANDING_LEAD_BASE}__copy-block`,
]);
const LANDING_LEAD_ALLOWED_CLASSES = new Set([
  LANDING_LEAD_BASE,
  ...LANDING_LEAD_ELEMENT_CLASSES,
]);

const HEADING_BLOCK_BASE = 'cdr-heading-subheading-block';
const HEADING_BLOCK_ELEMENT_CLASSES = new Set([
  `${HEADING_BLOCK_BASE}__heading`,
  `${HEADING_BLOCK_BASE}__subheading`,
]);
const HEADING_BLOCK_ALLOWED_CLASSES = new Set([
  HEADING_BLOCK_BASE,
  ...HEADING_BLOCK_ELEMENT_CLASSES,
]);

function isLandingLeadClass(className: string): boolean {
  return (
    className === LANDING_LEAD_BASE ||
    className.startsWith(`${LANDING_LEAD_BASE}__`) ||
    className.startsWith(`${LANDING_LEAD_BASE}--`)
  );
}

function isHeadingBlockClass(className: string): boolean {
  return (
    className === HEADING_BLOCK_BASE ||
    className.startsWith(`${HEADING_BLOCK_BASE}__`) ||
    className.startsWith(`${HEADING_BLOCK_BASE}--`)
  );
}

function analyzeLandingLeadTag(
  tagName: string | null,
  attrs: Map<string, string>,
): LandingLeadTagAnalysis | null {
  if (!tagName) {
    return null;
  }
  const classValue = getClassValue(attrs);
  if (!classValue || includesDynamicValue(classValue)) {
    return null;
  }
  const classes = splitClasses(classValue);
  const landingLeadClasses = classes.filter(isLandingLeadClass);
  if (landingLeadClasses.length === 0) {
    return null;
  }
  const invalidClasses = landingLeadClasses.filter(
    (className) => !LANDING_LEAD_ALLOWED_CLASSES.has(className),
  );
  const duplicateClasses = findDuplicateClasses(landingLeadClasses);
  const hasBase = landingLeadClasses.includes(LANDING_LEAD_BASE);
  const hasElement = landingLeadClasses.some((className) =>
    className.startsWith(`${LANDING_LEAD_BASE}__`),
  );

  return {
    tagName: tagName.toLowerCase(),
    classes,
    landingLeadClasses,
    invalidClasses,
    duplicateClasses,
    hasBase,
    hasElement,
  };
}

function analyzeHeadingBlockTag(
  tagName: string | null,
  attrs: Map<string, string>,
): HeadingSubheadingBlockTagAnalysis | null {
  if (!tagName) {
    return null;
  }
  const classValue = getClassValue(attrs);
  if (!classValue || includesDynamicValue(classValue)) {
    return null;
  }
  const classes = splitClasses(classValue);
  const blockClasses = classes.filter(isHeadingBlockClass);
  if (blockClasses.length === 0) {
    return null;
  }
  const invalidClasses = blockClasses.filter(
    (className) => !HEADING_BLOCK_ALLOWED_CLASSES.has(className),
  );
  const duplicateClasses = findDuplicateClasses(blockClasses);
  const hasBase = blockClasses.includes(HEADING_BLOCK_BASE);
  const hasElement = blockClasses.some((className) =>
    className.startsWith(`${HEADING_BLOCK_BASE}__`),
  );

  return {
    tagName: tagName.toLowerCase(),
    classes,
    blockClasses,
    invalidClasses,
    duplicateClasses,
    hasBase,
    hasElement,
  };
}

function createLandingLeadRule(options: {
  meta: Rule.RuleMetaData;
  check: (
    analysis: LandingLeadTagAnalysis,
    node: Rule.Node,
    context: Rule.RuleContext,
  ) => void;
}) {
  return createRule<LandingLeadTagAnalysis>({
    ...options,
    baseClass: LANDING_LEAD_BASE,
    analyzeTag: analyzeLandingLeadTag,
  });
}

function createHeadingBlockRule(options: {
  meta: Rule.RuleMetaData;
  check: (
    analysis: HeadingSubheadingBlockTagAnalysis,
    node: Rule.Node,
    context: Rule.RuleContext,
  ) => void;
}) {
  return createRule<HeadingSubheadingBlockTagAnalysis>({
    ...options,
    baseClass: HEADING_BLOCK_BASE,
    analyzeTag: analyzeHeadingBlockTag,
  });
}

const ruleLandingLeadInvalidClass = createLandingLeadRule({
  meta: buildMeta('Validate cdr-landing-lead class usage.', {
    invalidClass: 'Unknown landing lead class "{{className}}".',
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

const ruleLandingLeadDuplicate = createLandingLeadRule({
  meta: buildMeta('Prevent duplicate landing lead classes.', {
    duplicateClass:
      'Duplicate landing lead class "{{className}}" is not allowed.',
  }),
  check(analysis, node, context) {
    reportClasses(context, node, 'duplicateClass', analysis.duplicateClasses);
  },
});

const ruleHeadingBlockInvalidClass = createHeadingBlockRule({
  meta: buildMeta('Validate cdr-heading-subheading-block class usage.', {
    invalidClass: 'Unknown heading/subheading block class "{{className}}".',
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

const ruleHeadingBlockDuplicate = createHeadingBlockRule({
  meta: buildMeta('Prevent duplicate heading/subheading block classes.', {
    duplicateClass:
      'Duplicate heading/subheading block class "{{className}}" is not allowed.',
  }),
  check(analysis, node, context) {
    reportClasses(context, node, 'duplicateClass', analysis.duplicateClasses);
  },
});

export default {
  rules: {
    'landing-lead-invalid-class': ruleLandingLeadInvalidClass,
    'landing-lead-duplicate': ruleLandingLeadDuplicate,
    'heading-subheading-block-invalid-class': ruleHeadingBlockInvalidClass,
    'heading-subheading-block-duplicate': ruleHeadingBlockDuplicate,
  },
  configs: {
    recommended: {
      rules: {
        'cedar/landing-lead-invalid-class': 'error',
        'cedar/landing-lead-duplicate': 'error',
        'cedar/heading-subheading-block-invalid-class': 'error',
        'cedar/heading-subheading-block-duplicate': 'error',
      },
    },
  },
};
