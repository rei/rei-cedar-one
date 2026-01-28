import type { Rule } from 'eslint';
import type { ContainerTagAnalysis } from '../types.js';
import {
  createModifierRule,
  buildMeta,
  reportClasses,
  unique,
} from '../utils.js';

const BASE_CLASS = 'cdr-container';
const MODIFIER_PREFIX = `${BASE_CLASS}--`;
const ALLOWED_MODIFIERS = new Set([
  `${BASE_CLASS}--static`,
  `${BASE_CLASS}--fluid`,
]);

/**
 * Build a container rule wrapper.
 * @param options - Rule options.
 * @returns ESLint rule module.
 */
function createContainerRule(options: {
  meta: Rule.RuleMetaData;
  check: (
    analysis: ContainerTagAnalysis,
    node: Rule.Node,
    context: Rule.RuleContext,
  ) => void;
}) {
  /**
   * Build analysis payload from modifier parsing.
   * @param input - Parsed modifier input.
   * @returns Container tag analysis.
   */
  const buildAnalysis = (input: {
    classes: string[];
    info: ContainerTagAnalysis['info'];
  }): ContainerTagAnalysis => ({ classes: input.classes, info: input.info });

  return createModifierRule<ContainerTagAnalysis>({
    ...options,
    baseClass: BASE_CLASS,
    modifierPrefix: MODIFIER_PREFIX,
    allowedModifiers: ALLOWED_MODIFIERS,
    build: buildAnalysis,
  });
}

const ruleMissingBase = createContainerRule({
  /**
   * Require the base class when modifiers are present.
   */
  meta: buildMeta('Require cdr-container base class for modifiers.', {
    missingBase: 'cdr-container modifiers require the base class.',
  }),
  /**
   * @param analysis - Tag analysis.
   * @param node - AST node.
   * @param context - Rule context.
   */
  check(analysis, node, context) {
    if (!analysis) {
      return;
    }
    if (!analysis.info.hasBase && analysis.info.modifiers.length > 0) {
      context.report({ node, messageId: 'missingBase' });
    }
  },
});

const ruleMissingModifier = createContainerRule({
  /**
   * Require a single container modifier (static or fluid).
   */
  meta: buildMeta('Require a cdr-container modifier.', {
    missingModifier:
      'cdr-container should include cdr-container--static or cdr-container--fluid.',
  }),
  /**
   * @param analysis - Tag analysis.
   * @param node - AST node.
   * @param context - Rule context.
   */
  check(analysis, node, context) {
    if (!analysis) {
      return;
    }
    if (analysis.info.hasBase && analysis.info.modifiers.length === 0) {
      context.report({ node, messageId: 'missingModifier' });
    }
  },
});

const ruleInvalidModifier = createContainerRule({
  /**
   * Validate container modifier values.
   */
  meta: buildMeta('Validate cdr-container modifier values.', {
    invalidModifier: 'Unknown container modifier "{{className}}".',
  }),
  /**
   * @param analysis - Tag analysis.
   * @param node - AST node.
   * @param context - Rule context.
   */
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

const ruleInvalidPrefix = createContainerRule({
  /**
   * Validate the modifier prefix separator.
   */
  meta: buildMeta('Validate cdr-container modifier prefixes.', {
    invalidPrefix:
      'cdr-container modifiers must use the "--" separator (for example, cdr-container--static).',
  }),
  /**
   * @param analysis - Tag analysis.
   * @param node - AST node.
   * @param context - Rule context.
   */
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

const ruleDuplicate = createContainerRule({
  /**
   * Prevent duplicate container classes.
   */
  meta: buildMeta('Prevent duplicate cdr-container classes.', {
    duplicateClass: 'Duplicate container class "{{className}}" is not allowed.',
  }),
  /**
   * @param analysis - Tag analysis.
   * @param node - AST node.
   * @param context - Rule context.
   */
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

const ruleConflictingModifiers = createContainerRule({
  /**
   * Prevent conflicting container modifiers.
   */
  meta: buildMeta('Prevent conflicting cdr-container modifiers.', {
    conflictingModifiers:
      'cdr-container should not include multiple modifiers: {{className}}.',
  }),
  /**
   * @param analysis - Tag analysis.
   * @param node - AST node.
   * @param context - Rule context.
   */
  check(analysis, node, context) {
    if (!analysis) {
      return;
    }
    const modifiers = unique(analysis.info.modifiers);
    if (modifiers.length > 1) {
      context.report({
        node,
        messageId: 'conflictingModifiers',
        data: { className: modifiers.join(', ') },
      });
    }
  },
});

export default {
  rules: {
    'container-missing-base': ruleMissingBase,
    'container-missing-modifier': ruleMissingModifier,
    'container-invalid-modifier': ruleInvalidModifier,
    'container-invalid-prefix': ruleInvalidPrefix,
    'container-duplicate': ruleDuplicate,
    'container-conflicting-modifiers': ruleConflictingModifiers,
  },
  configs: {
    recommended: {
      rules: {
        'cedar/container-missing-base': 'error',
        'cedar/container-missing-modifier': 'error',
        'cedar/container-invalid-modifier': 'error',
        'cedar/container-invalid-prefix': 'error',
        'cedar/container-duplicate': 'error',
        'cedar/container-conflicting-modifiers': 'error',
      },
    },
  },
};
