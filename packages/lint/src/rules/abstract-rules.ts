import type { Rule } from 'eslint';
import type { AbstractTagAnalysis } from '../types.js';
import {
  buildMeta,
  createModifierRule,
  reportClasses,
  unique,
} from '../utils.js';

const BASE_CLASS = 'cdr-abstract';
const MODIFIER_PREFIX = `${BASE_CLASS}--`;
const ALLOWED_MODIFIERS = new Set<string>();

/**
 * Build an abstract rule wrapper.
 * @param options - Rule options.
 * @returns ESLint rule module.
 */
function createAbstractRule(options: {
  meta: Rule.RuleMetaData;
  check: (
    analysis: AbstractTagAnalysis,
    node: Rule.Node,
    context: Rule.RuleContext,
  ) => void;
}) {
  const buildAnalysis = (input: {
    classes: string[];
    info: AbstractTagAnalysis['info'];
  }): AbstractTagAnalysis => ({ classes: input.classes, info: input.info });

  return createModifierRule<AbstractTagAnalysis>({
    ...options,
    baseClass: BASE_CLASS,
    modifierPrefix: MODIFIER_PREFIX,
    allowedModifiers: ALLOWED_MODIFIERS,
    build: buildAnalysis,
  });
}

const ruleMissingBase = createAbstractRule({
  meta: buildMeta('Require cdr-abstract base class for modifiers.', {
    missingBase: 'cdr-abstract modifiers require the base class.',
  }),
  check(analysis, node, context) {
    if (!analysis.info.hasBase && analysis.info.modifiers.length > 0) {
      context.report({ node, messageId: 'missingBase' });
    }
  },
});

const ruleInvalidModifier = createAbstractRule({
  meta: buildMeta('Validate cdr-abstract modifier values.', {
    invalidModifier: 'Unknown abstract modifier "{{className}}".',
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

const ruleInvalidPrefix = createAbstractRule({
  meta: buildMeta('Validate cdr-abstract modifier prefixes.', {
    invalidPrefix:
      'cdr-abstract modifiers must use the "--" separator (for example, cdr-abstract--foo).',
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

const ruleDuplicate = createAbstractRule({
  meta: buildMeta('Prevent duplicate cdr-abstract classes.', {
    duplicateClass: 'Duplicate abstract class "{{className}}" is not allowed.',
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
    'abstract-missing-base': ruleMissingBase,
    'abstract-invalid-modifier': ruleInvalidModifier,
    'abstract-invalid-prefix': ruleInvalidPrefix,
    'abstract-duplicate': ruleDuplicate,
  },
  configs: {
    recommended: {
      rules: {
        'cedar/abstract-missing-base': 'error',
        'cedar/abstract-invalid-modifier': 'error',
        'cedar/abstract-invalid-prefix': 'error',
        'cedar/abstract-duplicate': 'error',
      },
    },
  },
};
