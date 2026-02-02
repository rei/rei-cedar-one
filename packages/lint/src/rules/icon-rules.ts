import type { Rule } from 'eslint';
import type { IconTagAnalysis } from '../types.js';
import {
  buildMeta,
  createModifierRule,
  reportClasses,
  unique,
} from '../utils.js';

const BASE_CLASS = 'cdr-icon';
const MODIFIER_PREFIX = `${BASE_CLASS}--`;
const ALLOWED_MODIFIERS = new Set([
  `${BASE_CLASS}--small`,
  `${BASE_CLASS}--medium`,
  `${BASE_CLASS}--large`,
  `${BASE_CLASS}--inherit-color`,
  `${BASE_CLASS}--small@xs`,
  `${BASE_CLASS}--small@sm`,
  `${BASE_CLASS}--small@md`,
  `${BASE_CLASS}--small@lg`,
  `${BASE_CLASS}--medium@xs`,
  `${BASE_CLASS}--medium@sm`,
  `${BASE_CLASS}--medium@md`,
  `${BASE_CLASS}--medium@lg`,
  `${BASE_CLASS}--large@xs`,
  `${BASE_CLASS}--large@sm`,
  `${BASE_CLASS}--large@md`,
  `${BASE_CLASS}--large@lg`,
]);

/**
 * Build an icon rule wrapper.
 * @param options - Rule options.
 * @returns ESLint rule module.
 */
function createIconRule(options: {
  meta: Rule.RuleMetaData;
  check: (
    analysis: IconTagAnalysis,
    node: Rule.Node,
    context: Rule.RuleContext,
  ) => void;
}) {
  /**
   * Build analysis payload from modifier parsing.
   * @param input - Parsed modifier input.
   * @returns Icon tag analysis.
   */
  const buildAnalysis = (input: {
    classes: string[];
    info: IconTagAnalysis['info'];
  }): IconTagAnalysis => ({ classes: input.classes, info: input.info });

  return createModifierRule<IconTagAnalysis>({
    ...options,
    baseClass: BASE_CLASS,
    modifierPrefix: MODIFIER_PREFIX,
    allowedModifiers: ALLOWED_MODIFIERS,
    build: buildAnalysis,
  });
}

const ruleMissingBase = createIconRule({
  meta: buildMeta('Require cdr-icon base class for modifiers.', {
    missingBase: 'cdr-icon modifiers require the base class.',
  }),
  check(analysis, node, context) {
    if (!analysis) {
      return;
    }
    if (!analysis.info.hasBase && analysis.info.modifiers.length > 0) {
      context.report({ node, messageId: 'missingBase' });
    }
  },
});

const ruleInvalidModifier = createIconRule({
  meta: buildMeta('Validate cdr-icon modifier values.', {
    invalidModifier: 'Unknown icon modifier "{{className}}".',
  }),
  check(analysis, node, context) {
    if (!analysis) {
      return;
    }
    reportClasses(
      context,
      node,
      'invalidModifier',
      unique(analysis.info.invalidModifiers),
    );
  },
});

const ruleInvalidPrefix = createIconRule({
  meta: buildMeta('Validate cdr-icon modifier prefixes.', {
    invalidPrefix:
      'cdr-icon modifiers must use the "--" separator (for example, cdr-icon--small).',
  }),
  check(analysis, node, context) {
    if (!analysis) {
      return;
    }
    reportClasses(
      context,
      node,
      'invalidPrefix',
      unique(analysis.info.invalidPrefixes),
    );
  },
});

const ruleDuplicate = createIconRule({
  meta: buildMeta('Prevent duplicate cdr-icon classes.', {
    duplicateClass: 'Duplicate icon class "{{className}}" is not allowed.',
  }),
  check(analysis, node, context) {
    if (!analysis) {
      return;
    }
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
    'icon-missing-base': ruleMissingBase,
    'icon-invalid-modifier': ruleInvalidModifier,
    'icon-invalid-prefix': ruleInvalidPrefix,
    'icon-duplicate': ruleDuplicate,
  },
  configs: {
    recommended: {
      rules: {
        'cedar/icon-missing-base': 'error',
        'cedar/icon-invalid-modifier': 'error',
        'cedar/icon-invalid-prefix': 'error',
        'cedar/icon-duplicate': 'error',
      },
    },
  },
};
