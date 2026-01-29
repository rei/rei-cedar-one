import type { Rule } from 'eslint';
import type { ImageTagAnalysis } from '../types.js';
import {
  buildMeta,
  createModifierRule,
  includesDynamicValue,
  reportClasses,
  unique,
} from '../utils.js';

const BASE_CLASS = 'cdr-image';
const MODIFIER_PREFIX = `${BASE_CLASS}--`;
const RATIO_MODIFIERS = new Set([
  `${BASE_CLASS}--ratio-1-1`,
  `${BASE_CLASS}--ratio-1-2`,
  `${BASE_CLASS}--ratio-3-4`,
  `${BASE_CLASS}--ratio-9-16`,
  `${BASE_CLASS}--ratio-2-1`,
  `${BASE_CLASS}--ratio-4-3`,
  `${BASE_CLASS}--ratio-16-9`,
]);
const FIT_MODIFIERS = new Set([
  `${BASE_CLASS}--fit-cover`,
  `${BASE_CLASS}--fit-contain`,
  `${BASE_CLASS}--fit-none`,
  `${BASE_CLASS}--fit-fill`,
  `${BASE_CLASS}--fit-scale-down`,
]);
const POSITION_MODIFIERS = new Set([
  `${BASE_CLASS}--position-center`,
  `${BASE_CLASS}--position-top`,
  `${BASE_CLASS}--position-right`,
  `${BASE_CLASS}--position-bottom`,
  `${BASE_CLASS}--position-left`,
]);
const RADIUS_MODIFIERS = new Set([
  `${BASE_CLASS}--radius-sharp`,
  `${BASE_CLASS}--radius-soft`,
  `${BASE_CLASS}--radius-softer`,
  `${BASE_CLASS}--radius-round`,
]);
const ALLOWED_MODIFIERS = new Set([
  ...RATIO_MODIFIERS,
  ...FIT_MODIFIERS,
  ...POSITION_MODIFIERS,
  ...RADIUS_MODIFIERS,
]);
const VALID_TAGS = new Set(['img']);

/**
 * Build an image rule wrapper.
 * @param options - Rule options.
 * @returns ESLint rule module.
 */
function createImageRule(options: {
  meta: Rule.RuleMetaData;
  check: (
    analysis: ImageTagAnalysis,
    node: Rule.Node,
    context: Rule.RuleContext,
  ) => void;
}) {
  /**
   * Build analysis payload from modifier parsing.
   * @param input - Parsed modifier input.
   * @returns Image tag analysis.
   */
  const buildAnalysis = (input: {
    classes: string[];
    info: ImageTagAnalysis['info'];
    tagName: string;
    attrs: Map<string, string>;
  }): ImageTagAnalysis => ({
    tagName: input.tagName,
    attrs: input.attrs,
    classes: input.classes,
    info: input.info,
  });

  return createModifierRule<ImageTagAnalysis>({
    ...options,
    baseClass: BASE_CLASS,
    modifierPrefix: MODIFIER_PREFIX,
    allowedModifiers: ALLOWED_MODIFIERS,
    build: buildAnalysis,
  });
}

const ruleMissingBase = createImageRule({
  /**
   * Require the base class when modifiers are present.
   */
  meta: buildMeta('Require cdr-image base class for modifiers.', {
    missingBase: 'cdr-image modifiers require the base class.',
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

const ruleInvalidModifier = createImageRule({
  /**
   * Validate image modifier values.
   */
  meta: buildMeta('Validate cdr-image modifier values.', {
    invalidModifier: 'Unknown image modifier "{{className}}".',
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

const ruleInvalidPrefix = createImageRule({
  /**
   * Validate the modifier prefix separator.
   */
  meta: buildMeta('Validate cdr-image modifier prefixes.', {
    invalidPrefix:
      'cdr-image modifiers must use the "--" separator (for example, cdr-image--ratio-16-9).',
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

const ruleDuplicate = createImageRule({
  /**
   * Prevent duplicate image classes.
   */
  meta: buildMeta('Prevent duplicate cdr-image classes.', {
    duplicateClass: 'Duplicate image class "{{className}}" is not allowed.',
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

const ruleMultipleModifiers = createImageRule({
  /**
   * Prevent conflicting modifier combinations.
   */
  meta: buildMeta('Prevent multiple image modifiers of the same type.', {
    multipleModifier:
      'cdr-image should include only one {{modifierType}} modifier (found: {{classList}}).',
  }),
  /**
   * @param analysis - Tag analysis.
   * @param node - AST node.
   * @param context - Rule context.
   */
  check(analysis, node, context) {
    const categoryChecks = [
      { name: 'ratio', modifiers: RATIO_MODIFIERS },
      { name: 'fit', modifiers: FIT_MODIFIERS },
      { name: 'position', modifiers: POSITION_MODIFIERS },
      { name: 'radius', modifiers: RADIUS_MODIFIERS },
    ];

    for (const category of categoryChecks) {
      const matches = analysis.classes.filter((cls) =>
        category.modifiers.has(cls),
      );
      const uniqueMatches = unique(matches);
      if (uniqueMatches.length > 1) {
        context.report({
          node,
          messageId: 'multipleModifier',
          data: {
            modifierType: category.name,
            classList: uniqueMatches.join(', '),
          },
        });
      }
    }
  },
});

const ruleInvalidTag = createImageRule({
  /**
   * Restrict image classes to <img>.
   */
  meta: buildMeta('Restrict cdr-image classes to <img>.', {
    invalidTag: 'cdr-image classes are only valid on <img> elements.',
  }),
  /**
   * @param analysis - Tag analysis.
   * @param node - AST node.
   * @param context - Rule context.
   */
  check(analysis, node, context) {
    if (!VALID_TAGS.has(analysis.tagName)) {
      context.report({ node, messageId: 'invalidTag' });
    }
  },
});

const ruleMissingSrc = createImageRule({
  /**
   * Require src on images.
   */
  meta: buildMeta('Require src on images.', {
    missingSrc: '<img> elements with cdr-image must include a src.',
  }),
  /**
   * @param analysis - Tag analysis.
   * @param node - AST node.
   * @param context - Rule context.
   */
  check(analysis, node, context) {
    if (analysis.tagName !== 'img') {
      return;
    }
    const src = analysis.attrs.get('src') ?? '';
    if (!src || includesDynamicValue(src)) {
      context.report({ node, messageId: 'missingSrc' });
    }
  },
});

const ruleMissingAlt = createImageRule({
  /**
   * Require alt on images.
   */
  meta: buildMeta('Require alt on images.', {
    missingAlt: '<img> elements with cdr-image must include an alt attribute.',
  }),
  /**
   * @param analysis - Tag analysis.
   * @param node - AST node.
   * @param context - Rule context.
   */
  check(analysis, node, context) {
    if (analysis.tagName !== 'img') {
      return;
    }
    if (!analysis.attrs.has('alt')) {
      context.report({ node, messageId: 'missingAlt' });
    }
  },
});

export default {
  rules: {
    'image-missing-base': ruleMissingBase,
    'image-invalid-modifier': ruleInvalidModifier,
    'image-invalid-prefix': ruleInvalidPrefix,
    'image-duplicate': ruleDuplicate,
    'image-multiple-modifier': ruleMultipleModifiers,
    'image-invalid-tag': ruleInvalidTag,
    'image-missing-src': ruleMissingSrc,
    'image-missing-alt': ruleMissingAlt,
  },
  configs: {
    recommended: {
      rules: {
        'cedar/image-missing-base': 'error',
        'cedar/image-invalid-modifier': 'error',
        'cedar/image-invalid-prefix': 'error',
        'cedar/image-duplicate': 'error',
        'cedar/image-multiple-modifier': 'error',
        'cedar/image-invalid-tag': 'error',
        'cedar/image-missing-src': 'error',
        'cedar/image-missing-alt': 'error',
      },
    },
  },
};
