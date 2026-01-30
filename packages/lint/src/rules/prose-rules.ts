import type { Rule } from 'eslint';
import type { ProseTagAnalysis } from '../types.js';
import {
  buildMeta,
  createModifierRule,
  reportClasses,
  unique,
} from '../utils.js';

const BASE_CLASS = 'cdr-prose';
const MODIFIER_PREFIX = `${BASE_CLASS}--`;
const SIZE_MODIFIERS = new Set([`${BASE_CLASS}--sm`, `${BASE_CLASS}--lg`]);
const ALLOWED_MODIFIERS = new Set([
  ...SIZE_MODIFIERS,
  `${BASE_CLASS}--measure`,
  `${BASE_CLASS}--serif-headings`,
  `${BASE_CLASS}--invert`,
]);

/**
 * Build a prose rule wrapper.
 * @param options - Rule options.
 * @returns ESLint rule module.
 */
function createProseRule(options: {
  meta: Rule.RuleMetaData;
  check: (
    analysis: ProseTagAnalysis,
    node: Rule.Node,
    context: Rule.RuleContext,
  ) => void;
}) {
  /**
   * Build analysis payload from modifier parsing.
   * @param input - Parsed modifier input.
   * @returns Prose tag analysis.
   */
  const buildAnalysis = (input: {
    classes: string[];
    info: ProseTagAnalysis['info'];
  }): ProseTagAnalysis => ({ classes: input.classes, info: input.info });

  return createModifierRule<ProseTagAnalysis>({
    ...options,
    baseClass: BASE_CLASS,
    modifierPrefix: MODIFIER_PREFIX,
    allowedModifiers: ALLOWED_MODIFIERS,
    build: buildAnalysis,
  });
}

const ruleMissingBase = createProseRule({
  /**
   * Require the base class when modifiers are present.
   */
  meta: buildMeta('Require cdr-prose base class for modifiers.', {
    missingBase: 'cdr-prose modifiers require the base class.',
  }),
  /**
   * @param analysis - Tag analysis.
   * @param node - AST node.
   * @param context - Rule context.
   */
  check(analysis, node, context) {
    if (!analysis.info.hasBase && analysis.info.modifiers.length > 0) {
      context.report({ node, messageId: 'missingBase' });
    }
  },
});

const ruleInvalidModifier = createProseRule({
  /**
   * Validate prose modifier values.
   */
  meta: buildMeta('Validate cdr-prose modifier values.', {
    invalidModifier: 'Unknown prose modifier "{{className}}".',
  }),
  /**
   * @param analysis - Tag analysis.
   * @param node - AST node.
   * @param context - Rule context.
   */
  check(analysis, node, context) {
    reportClasses(
      context,
      node,
      'invalidModifier',
      unique(analysis.info.invalidModifiers),
    );
  },
});

const ruleInvalidPrefix = createProseRule({
  /**
   * Validate the modifier prefix separator.
   */
  meta: buildMeta('Validate cdr-prose modifier prefixes.', {
    invalidPrefix:
      'cdr-prose modifiers must use the "--" separator (for example, cdr-prose--measure).',
  }),
  /**
   * @param analysis - Tag analysis.
   * @param node - AST node.
   * @param context - Rule context.
   */
  check(analysis, node, context) {
    reportClasses(
      context,
      node,
      'invalidPrefix',
      unique(analysis.info.invalidPrefixes),
    );
  },
});

const ruleDuplicate = createProseRule({
  /**
   * Prevent duplicate prose classes.
   */
  meta: buildMeta('Prevent duplicate cdr-prose classes.', {
    duplicateClass: 'Duplicate prose class "{{className}}" is not allowed.',
  }),
  /**
   * @param analysis - Tag analysis.
   * @param node - AST node.
   * @param context - Rule context.
   */
  check(analysis, node, context) {
    reportClasses(
      context,
      node,
      'duplicateClass',
      analysis.info.duplicateClasses,
    );
  },
});

const ruleConflictingSizes = createProseRule({
  /**
   * Prevent conflicting prose size modifiers.
   */
  meta: buildMeta('Prevent conflicting cdr-prose size modifiers.', {
    conflictingSizes:
      'cdr-prose should include only one size modifier (found: {{classList}}).',
  }),
  /**
   * @param analysis - Tag analysis.
   * @param node - AST node.
   * @param context - Rule context.
   */
  check(analysis, node, context) {
    const matches = analysis.classes.filter((cls) => SIZE_MODIFIERS.has(cls));
    const uniqueMatches = unique(matches);
    if (uniqueMatches.length > 1) {
      context.report({
        node,
        messageId: 'conflictingSizes',
        data: { classList: uniqueMatches.join(', ') },
      });
    }
  },
});

export default {
  rules: {
    'prose-missing-base': ruleMissingBase,
    'prose-invalid-modifier': ruleInvalidModifier,
    'prose-invalid-prefix': ruleInvalidPrefix,
    'prose-duplicate': ruleDuplicate,
    'prose-conflicting-size': ruleConflictingSizes,
  },
  configs: {
    recommended: {
      rules: {
        'cedar/prose-missing-base': 'error',
        'cedar/prose-invalid-modifier': 'error',
        'cedar/prose-invalid-prefix': 'error',
        'cedar/prose-duplicate': 'error',
        'cedar/prose-conflicting-size': 'error',
      },
    },
  },
};
