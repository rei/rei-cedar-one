import type { Rule } from 'eslint';
import type { TitleTagAnalysis } from '../types.js';
import {
  buildMeta,
  createModifierRule,
  reportClasses,
  unique,
} from '../utils.js';

const BASE_CLASS = 'cdr-title';
const MODIFIER_PREFIX = `${BASE_CLASS}--`;
const ALLOWED_MODIFIERS = new Set<string>();

/**
 * Build a title rule wrapper.
 * @param options - Rule options.
 * @returns ESLint rule module.
 */
function createTitleRule(options: {
  meta: Rule.RuleMetaData;
  check: (
    analysis: TitleTagAnalysis,
    node: Rule.Node,
    context: Rule.RuleContext,
  ) => void;
}) {
  const buildAnalysis = (input: {
    classes: string[];
    info: TitleTagAnalysis['info'];
  }): TitleTagAnalysis => ({ classes: input.classes, info: input.info });

  return createModifierRule<TitleTagAnalysis>({
    ...options,
    baseClass: BASE_CLASS,
    modifierPrefix: MODIFIER_PREFIX,
    allowedModifiers: ALLOWED_MODIFIERS,
    build: buildAnalysis,
  });
}

const ruleMissingBase = createTitleRule({
  meta: buildMeta('Require cdr-title base class for modifiers.', {
    missingBase: 'cdr-title modifiers require the base class.',
  }),
  check(analysis, node, context) {
    if (!analysis.info.hasBase && analysis.info.modifiers.length > 0) {
      context.report({ node, messageId: 'missingBase' });
    }
  },
});

const ruleInvalidModifier = createTitleRule({
  meta: buildMeta('Validate cdr-title modifier values.', {
    invalidModifier: 'Unknown title modifier "{{className}}".',
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

const ruleInvalidPrefix = createTitleRule({
  meta: buildMeta('Validate cdr-title modifier prefixes.', {
    invalidPrefix:
      'cdr-title modifiers must use the "--" separator (for example, cdr-title--foo).',
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

const ruleDuplicate = createTitleRule({
  meta: buildMeta('Prevent duplicate cdr-title classes.', {
    duplicateClass: 'Duplicate title class "{{className}}" is not allowed.',
  }),
  check(analysis, node, context) {
    reportClasses(
      context,
      node,
      'duplicateClass',
      analysis.info.duplicateClasses,
    );
  },
});

export default {
  rules: {
    'title-missing-base': ruleMissingBase,
    'title-invalid-modifier': ruleInvalidModifier,
    'title-invalid-prefix': ruleInvalidPrefix,
    'title-duplicate': ruleDuplicate,
  },
  configs: {
    recommended: {
      rules: {
        'cedar/title-missing-base': 'error',
        'cedar/title-invalid-modifier': 'error',
        'cedar/title-invalid-prefix': 'error',
        'cedar/title-duplicate': 'error',
      },
    },
  },
};
