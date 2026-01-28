import type { Rule } from 'eslint';
import type { LinkTagAnalysis } from '../types.js';
import {
  createModifierRule,
  buildMeta,
  includesDynamicValue,
  reportClasses,
  unique,
} from '../utils.js';

const BASE_CLASS = 'cdr-link';
const MODIFIER_PREFIX = `${BASE_CLASS}--`;
const ALLOWED_MODIFIERS = new Set([
  `${BASE_CLASS}--standalone`,
  `${BASE_CLASS}--neutral`,
  `${BASE_CLASS}--inherit-color`,
]);
const VALID_TAGS = new Set(['a', 'button']);

/**
 * Build a link rule wrapper.
 * @param options - Rule options.
 * @returns ESLint rule module.
 */
function createLinkRule(options: {
  meta: Rule.RuleMetaData;
  check: (
    analysis: LinkTagAnalysis,
    node: Rule.Node,
    context: Rule.RuleContext,
  ) => void;
}) {
  /**
   * Build analysis payload from modifier parsing.
   * @param input - Parsed modifier input.
   * @returns Link tag analysis.
   */
  const buildAnalysis = (input: {
    classes: string[];
    info: LinkTagAnalysis['info'];
    tagName: string;
    attrs: Map<string, string>;
  }): LinkTagAnalysis => ({
    tagName: input.tagName,
    attrs: input.attrs,
    classes: input.classes,
    info: input.info,
  });

  return createModifierRule<LinkTagAnalysis>({
    ...options,
    baseClass: BASE_CLASS,
    modifierPrefix: MODIFIER_PREFIX,
    allowedModifiers: ALLOWED_MODIFIERS,
    build: buildAnalysis,
  });
}

const ruleMissingBase = createLinkRule({
  /**
   * Require the base class when modifiers are present.
   */
  meta: buildMeta('Require cdr-link base class for modifiers.', {
    missingBase: 'cdr-link modifiers require the base class.',
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

const ruleInvalidModifier = createLinkRule({
  /**
   * Validate link modifier values.
   */
  meta: buildMeta('Validate cdr-link modifier values.', {
    invalidModifier: 'Unknown link modifier "{{className}}".',
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

const ruleInvalidPrefix = createLinkRule({
  /**
   * Validate the modifier prefix separator.
   */
  meta: buildMeta('Validate cdr-link modifier prefixes.', {
    invalidPrefix:
      'cdr-link modifiers must use the "--" separator (for example, cdr-link--standalone).',
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

const ruleDuplicate = createLinkRule({
  /**
   * Prevent duplicate link classes.
   */
  meta: buildMeta('Prevent duplicate cdr-link classes.', {
    duplicateClass: 'Duplicate link class "{{className}}" is not allowed.',
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

const ruleInvalidTag = createLinkRule({
  /**
   * Restrict link classes to <a> and <button>.
   */
  meta: buildMeta('Restrict cdr-link classes to valid tags.', {
    invalidTag: 'cdr-link classes are only valid on <a> or <button> elements.',
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

const ruleAnchorHref = createLinkRule({
  /**
   * Require href on anchor links.
   */
  meta: buildMeta('Require href on anchor links.', {
    missingHref: '<a> elements with cdr-link must include an href.',
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
    if (analysis.tagName !== 'a') {
      return;
    }
    const href = analysis.attrs.get('href') ?? '';
    if (!href || includesDynamicValue(href)) {
      context.report({ node, messageId: 'missingHref' });
    }
  },
});

const ruleBlankRel = createLinkRule({
  /**
   * Require rel when target is _blank.
   */
  meta: buildMeta('Require rel when target is _blank.', {
    missingRel:
      'Links with target="_blank" should include rel="noopener noreferrer".',
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
    if (analysis.tagName !== 'a') {
      return;
    }
    const target = analysis.attrs.get('target') ?? '';
    if (!target || includesDynamicValue(target)) {
      return;
    }
    if (target !== '_blank') {
      return;
    }
    const rel = analysis.attrs.get('rel') ?? '';
    if (!rel || includesDynamicValue(rel)) {
      context.report({ node, messageId: 'missingRel' });
    }
  },
});

export default {
  rules: {
    'link-missing-base': ruleMissingBase,
    'link-invalid-modifier': ruleInvalidModifier,
    'link-invalid-prefix': ruleInvalidPrefix,
    'link-duplicate': ruleDuplicate,
    'link-invalid-tag': ruleInvalidTag,
    'link-anchor-href': ruleAnchorHref,
    'link-blank-rel': ruleBlankRel,
  },
  configs: {
    recommended: {
      rules: {
        'cedar/link-missing-base': 'error',
        'cedar/link-invalid-modifier': 'error',
        'cedar/link-invalid-prefix': 'error',
        'cedar/link-duplicate': 'error',
        'cedar/link-invalid-tag': 'error',
        'cedar/link-anchor-href': 'error',
        'cedar/link-blank-rel': 'error',
      },
    },
  },
};
