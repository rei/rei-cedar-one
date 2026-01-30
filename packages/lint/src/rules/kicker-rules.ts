import type { Rule } from 'eslint';
import type { KickerTagAnalysis } from '../types.js';
import {
  buildMeta,
  createModifierRule,
  reportClasses,
  unique,
} from '../utils.js';

const BASE_CLASS = 'cdr-kicker';
const MODIFIER_PREFIX = `${BASE_CLASS}--`;
const ALLOWED_MODIFIERS = new Set<string>();

/**
 * Build a kicker rule wrapper.
 * @param options - Rule options.
 * @returns ESLint rule module.
 */
function createKickerRule(options: {
  meta: Rule.RuleMetaData;
  check: (
    analysis: KickerTagAnalysis,
    node: Rule.Node,
    context: Rule.RuleContext,
  ) => void;
}) {
  const buildAnalysis = (input: {
    classes: string[];
    info: KickerTagAnalysis['info'];
  }): KickerTagAnalysis => ({ classes: input.classes, info: input.info });

  return createModifierRule<KickerTagAnalysis>({
    ...options,
    baseClass: BASE_CLASS,
    modifierPrefix: MODIFIER_PREFIX,
    allowedModifiers: ALLOWED_MODIFIERS,
    build: buildAnalysis,
  });
}

const ruleMissingBase = createKickerRule({
  meta: buildMeta('Require cdr-kicker base class for modifiers.', {
    missingBase: 'cdr-kicker modifiers require the base class.',
  }),
  check(analysis, node, context) {
    if (!analysis.info.hasBase && analysis.info.modifiers.length > 0) {
      context.report({ node, messageId: 'missingBase' });
    }
  },
});

const ruleInvalidModifier = createKickerRule({
  meta: buildMeta('Validate cdr-kicker modifier values.', {
    invalidModifier: 'Unknown kicker modifier "{{className}}".',
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

const ruleInvalidPrefix = createKickerRule({
  meta: buildMeta('Validate cdr-kicker modifier prefixes.', {
    invalidPrefix:
      'cdr-kicker modifiers must use the "--" separator (for example, cdr-kicker--foo).',
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

const ruleDuplicate = createKickerRule({
  meta: buildMeta('Prevent duplicate cdr-kicker classes.', {
    duplicateClass: 'Duplicate kicker class "{{className}}" is not allowed.',
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
    'kicker-missing-base': ruleMissingBase,
    'kicker-invalid-modifier': ruleInvalidModifier,
    'kicker-invalid-prefix': ruleInvalidPrefix,
    'kicker-duplicate': ruleDuplicate,
  },
  configs: {
    recommended: {
      rules: {
        'cedar/kicker-missing-base': 'error',
        'cedar/kicker-invalid-modifier': 'error',
        'cedar/kicker-invalid-prefix': 'error',
        'cedar/kicker-duplicate': 'error',
      },
    },
  },
};
