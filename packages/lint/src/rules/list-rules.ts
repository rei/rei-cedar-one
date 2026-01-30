import type { Rule } from 'eslint';
import type { ListTagAnalysis } from '../types.js';
import {
  createModifierRule,
  buildMeta,
  reportClasses,
  unique,
} from '../utils.js';

const BASE_CLASS = 'cdr-list';
const MODIFIER_PREFIX = `${BASE_CLASS}--`;
const ALLOWED_MODIFIERS = new Set([
  `${BASE_CLASS}--ordered`,
  `${BASE_CLASS}--unordered`,
  `${BASE_CLASS}--compact`,
  `${BASE_CLASS}--inline`,
]);
const VALID_TAGS = new Set(['ul', 'ol']);

/**
 * Build a list rule wrapper.
 * @param options - Rule options.
 * @returns ESLint rule module.
 */
function createListRule(options: {
  meta: Rule.RuleMetaData;
  check: (
    analysis: ListTagAnalysis,
    node: Rule.Node,
    context: Rule.RuleContext,
  ) => void;
}) {
  /**
   * Build analysis payload from modifier parsing.
   * @param input - Parsed modifier input.
   * @returns List tag analysis.
   */
  const buildAnalysis = (input: {
    classes: string[];
    info: ListTagAnalysis['info'];
    tagName: string;
    attrs: Map<string, string>;
  }): ListTagAnalysis => ({
    tagName: input.tagName,
    attrs: input.attrs,
    classes: input.classes,
    info: input.info,
  });

  return createModifierRule<ListTagAnalysis>({
    ...options,
    baseClass: BASE_CLASS,
    modifierPrefix: MODIFIER_PREFIX,
    allowedModifiers: ALLOWED_MODIFIERS,
    build: buildAnalysis,
  });
}

const ruleMissingBase = createListRule({
  /**
   * Require the base class when modifiers are present.
   */
  meta: buildMeta('Require cdr-list base class for modifiers.', {
    missingBase: 'cdr-list modifiers require the base class.',
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

const ruleInvalidModifier = createListRule({
  /**
   * Validate list modifier values.
   */
  meta: buildMeta('Validate cdr-list modifier values.', {
    invalidModifier: 'Unknown list modifier "{{className}}".',
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

const ruleInvalidPrefix = createListRule({
  /**
   * Validate the modifier prefix separator.
   */
  meta: buildMeta('Validate cdr-list modifier prefixes.', {
    invalidPrefix:
      'cdr-list modifiers must use the "--" separator (for example, cdr-list--unordered).',
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

const ruleDuplicate = createListRule({
  /**
   * Prevent duplicate list classes.
   */
  meta: buildMeta('Prevent duplicate cdr-list classes.', {
    duplicateClass: 'Duplicate list class "{{className}}" is not allowed.',
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

const ruleInvalidTag = createListRule({
  /**
   * Restrict list classes to <ul> and <ol>.
   */
  meta: buildMeta('Restrict cdr-list classes to valid tags.', {
    invalidTag: 'cdr-list classes are only valid on <ul> or <ol> elements.',
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
    if (!VALID_TAGS.has(analysis.tagName)) {
      context.report({ node, messageId: 'invalidTag' });
    }
  },
});

export default {
  rules: {
    'list-missing-base': ruleMissingBase,
    'list-invalid-modifier': ruleInvalidModifier,
    'list-invalid-prefix': ruleInvalidPrefix,
    'list-duplicate': ruleDuplicate,
    'list-invalid-tag': ruleInvalidTag,
  },
  configs: {
    recommended: {
      rules: {
        'cedar/list-missing-base': 'error',
        'cedar/list-invalid-modifier': 'error',
        'cedar/list-invalid-prefix': 'error',
        'cedar/list-duplicate': 'error',
        'cedar/list-invalid-tag': 'error',
      },
    },
  },
};
