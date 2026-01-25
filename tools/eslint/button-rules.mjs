// @ts-check

/**
 * Cedar button rules derived from the original CdrButton.vue class logic:
 * - Require exactly one variant class: cdr-button--primary|secondary|sale|dark|link.
 * - Size classes must be cdr-button--small|medium|large (optionally @xs|@sm|@md|@lg); only one base size allowed.
 * - Full-width classes must be cdr-button--full-width (optionally @xs|@sm|@md|@lg).
 * - Icon-only buttons may optionally include cdr-button--icon-only-(small|medium|large).
 * - Icon-only buttons must include aria-label or aria-labelledby.
 * - Icon-only buttons cannot use text size classes or icon-left/right classes.
 * - Text buttons cannot use icon-only size classes.
 * - cdr-button--with-background requires cdr-button--icon-only.
 * - cdr-button--full-width cannot be used with cdr-button--icon-only.
 * - cdr-button classes are only valid on <button> or <a> elements.
 * - cdr-button modifier classes must be known (size, variant, icon, full-width, etc.).
 * - cdr-button modifiers must use the "--" separator (for example, cdr-button--primary).
 * - cdr-button classes should not be duplicated.
 * - <a> elements must include an href.
 * - <a> elements should not include a type attribute.
 * - <button> type attributes must be button, submit, or reset.
 */
/** @typedef {{ tagName: string | null, attrs: Map<string, string> }} ParsedTag */

const VARIANT_CLASSES = new Set([
  'cdr-button--primary',
  'cdr-button--secondary',
  'cdr-button--sale',
  'cdr-button--dark',
  'cdr-button--link',
]);

const SIZE_CLASS_RE = /^cdr-button--(small|medium|large)(@xs|@sm|@md|@lg)?$/;
const BASE_SIZE_CLASS_RE = /^cdr-button--(small|medium|large)$/;
const FULL_WIDTH_CLASS_RE = /^cdr-button--full-width(@xs|@sm|@md|@lg)?$/;
const ICON_ONLY_SIZE_CLASS_RE = /^cdr-button--icon-only-(small|medium|large)$/;

import {
  createRule,
  buildMeta,
  includesDynamicValue,
  reportClasses,
  splitClasses,
  unique,
} from './utils.mjs';

const BASE_CLASS = 'cdr-button';
const MODIFIER_PREFIX = `${BASE_CLASS}--`;
const FULL_WIDTH_PREFIX = `${MODIFIER_PREFIX}full-width`;
const ICON_ONLY_PREFIX = `${MODIFIER_PREFIX}icon-only-`;
const ICON_ONLY_CLASS = 'cdr-button--icon-only';
const WITH_BACKGROUND_CLASS = 'cdr-button--with-background';
const ICON_LEFT_CLASS = 'cdr-button--has-icon-left';
const ICON_RIGHT_CLASS = 'cdr-button--has-icon-right';
const KNOWN_EXACT_MODIFIERS = new Set([
  ...VARIANT_CLASSES,
  ICON_ONLY_CLASS,
  WITH_BACKGROUND_CLASS,
  ICON_LEFT_CLASS,
  ICON_RIGHT_CLASS,
]);
const BUTTON_TYPE_VALUES = new Set(['button', 'submit', 'reset']);
const VALID_TAGS = new Set(['button', 'a']);

/** @param {string} cls */
const isSizeClass = (cls) => SIZE_CLASS_RE.test(cls);
/** @param {string} cls */
const isBaseSizeClass = (cls) => BASE_SIZE_CLASS_RE.test(cls);
/** @param {string} cls */
const isFullWidthClass = (cls) => FULL_WIDTH_CLASS_RE.test(cls);
/** @param {string} cls */
const isIconOnlySizeClass = (cls) => ICON_ONLY_SIZE_CLASS_RE.test(cls);
/** @param {string} cls */
const isModifierClass = (cls) => cls.startsWith(MODIFIER_PREFIX);

/** @param {Map<string, string>} attrs @returns {string} */
function getClassValue(attrs) {
  return attrs.get('class') ?? attrs.get('classname') ?? '';
}

/**
 * @typedef {{
 *   hasIconOnly: boolean,
 *   hasWithBackground: boolean,
 *   hasIconSide: boolean,
 *   variantClasses: string[],
 *   sizeClasses: string[],
 *   baseSizeClasses: string[],
 *   iconOnlySizeClasses: string[],
 *   fullWidthClasses: string[],
 *   duplicateClasses: string[],
 *   invalidModifierPrefixes: string[],
 *   invalidSizeClasses: string[],
 *   invalidFullWidthClasses: string[],
 *   invalidIconOnlySizeClasses: string[],
 *   unknownModifierClasses: string[],
 * }} ClassInfo
 */

/** @param {string[]} classes @returns {ClassInfo} */
function analyzeClasses(classes) {
  const duplicateClasses = new Set();
  const seenClasses = new Set();
  /** @type {ClassInfo} */
  const info = {
    hasIconOnly: false,
    hasWithBackground: false,
    hasIconSide: false,
    variantClasses: [],
    sizeClasses: [],
    baseSizeClasses: [],
    iconOnlySizeClasses: [],
    fullWidthClasses: [],
    duplicateClasses: [],
    invalidModifierPrefixes: [],
    invalidSizeClasses: [],
    invalidFullWidthClasses: [],
    invalidIconOnlySizeClasses: [],
    unknownModifierClasses: [],
  };

  for (const cls of classes) {
    if (seenClasses.has(cls)) {
      duplicateClasses.add(cls);
    } else {
      seenClasses.add(cls);
    }

    if (
      cls.startsWith(BASE_CLASS) &&
      cls !== BASE_CLASS &&
      !isModifierClass(cls)
    ) {
      info.invalidModifierPrefixes.push(cls);
    }

    if (VARIANT_CLASSES.has(cls)) {
      info.variantClasses.push(cls);
    }
    if (isSizeClass(cls)) {
      info.sizeClasses.push(cls);
    }
    if (isBaseSizeClass(cls)) {
      info.baseSizeClasses.push(cls);
    }
    if (isIconOnlySizeClass(cls)) {
      info.iconOnlySizeClasses.push(cls);
    }
    if (cls.startsWith(FULL_WIDTH_PREFIX)) {
      info.fullWidthClasses.push(cls);
      if (!isFullWidthClass(cls)) {
        info.invalidFullWidthClasses.push(cls);
      }
    }
    if (cls.startsWith(ICON_ONLY_PREFIX) && !isIconOnlySizeClass(cls)) {
      info.invalidIconOnlySizeClasses.push(cls);
    }
    if (isModifierClass(cls)) {
      if (cls.includes('@') && !isSizeClass(cls) && !isFullWidthClass(cls)) {
        info.invalidSizeClasses.push(cls);
      } else if (
        !isSizeClass(cls) &&
        !isFullWidthClass(cls) &&
        !isIconOnlySizeClass(cls) &&
        !KNOWN_EXACT_MODIFIERS.has(cls)
      ) {
        info.unknownModifierClasses.push(cls);
      }
    }

    if (cls === ICON_ONLY_CLASS) {
      info.hasIconOnly = true;
    }
    if (cls === WITH_BACKGROUND_CLASS) {
      info.hasWithBackground = true;
    }
    if (cls === ICON_LEFT_CLASS || cls === ICON_RIGHT_CLASS) {
      info.hasIconSide = true;
    }
  }

  info.duplicateClasses = Array.from(duplicateClasses);
  return info;
}

/**
 * @typedef {{
 *   normalizedTag: string,
 *   isValidTag: boolean,
 *   attrs: Map<string, string>,
 *   classes: string[],
 *   info: ClassInfo,
 * }} TagAnalysis
 */

/** @param {string | null} tagName @param {Map<string, string>} attrs @returns {TagAnalysis | null} */
function analyzeTag(tagName, attrs) {
  if (!tagName) {
    return null;
  }

  const normalizedTag = String(tagName).toLowerCase();
  const classValue = getClassValue(attrs);
  if (!classValue || includesDynamicValue(classValue)) {
    return null;
  }

  const classes = splitClasses(classValue);
  const hasBase = classes.includes(BASE_CLASS) || classes.some(isModifierClass);
  if (!hasBase) {
    return null;
  }

  return {
    normalizedTag,
    isValidTag: VALID_TAGS.has(normalizedTag),
    attrs,
    classes,
    info: analyzeClasses(classes),
  };
}

/**
 * @param {{
 *   meta: import('eslint').Rule.RuleMetaData,
 *   check: (analysis: TagAnalysis, node: any, context: import('eslint').Rule.RuleContext) => void,
 * }} options
 */
function createButtonRule(options) {
  return createRule({
    ...options,
    baseClass: BASE_CLASS,
    analyzeTag,
  });
}

const ruleVariant = createButtonRule({
  meta: buildMeta('Validate cdr-button variant class usage.', {
    missingVariant:
      'Button must include exactly one variant class: cdr-button--primary|secondary|sale|dark|link.',
    multipleVariants:
      'Button has multiple variant classes; keep only one of cdr-button--primary|secondary|sale|dark|link.',
  }),
  check(analysis, node, context) {
    if (!analysis.isValidTag) {
      return;
    }
    const uniqueVariants = unique(analysis.info.variantClasses);
    if (uniqueVariants.length === 0) {
      context.report({ node, messageId: 'missingVariant' });
    } else if (uniqueVariants.length > 1) {
      context.report({ node, messageId: 'multipleVariants' });
    }
  },
});

const ruleSize = createButtonRule({
  meta: buildMeta('Validate cdr-button size and full-width classes.', {
    invalidSizeClass:
      'Invalid size class "{{className}}". Use cdr-button--small|medium|large with optional @xs|@sm|@md|@lg.',
    invalidFullWidth:
      'Invalid full-width class "{{className}}". Use cdr-button--full-width with optional @xs|@sm|@md|@lg.',
    multipleBaseSizes:
      'Button has multiple base size classes; keep only one of cdr-button--small|medium|large.',
  }),
  check(analysis, node, context) {
    if (!analysis.isValidTag) {
      return;
    }
    reportClasses(
      context,
      node,
      'invalidFullWidth',
      unique(analysis.info.invalidFullWidthClasses),
    );
    const invalidSizeClasses = unique([
      ...analysis.info.invalidSizeClasses,
      ...analysis.info.invalidIconOnlySizeClasses,
    ]);
    reportClasses(context, node, 'invalidSizeClass', invalidSizeClasses);
    if (unique(analysis.info.baseSizeClasses).length > 1) {
      context.report({ node, messageId: 'multipleBaseSizes' });
    }
  },
});

const ruleIcon = createButtonRule({
  meta: buildMeta(
    'Validate icon-only and icon placement rules for cdr-button.',
    {
      iconOnlyWithTextSize:
        'Icon-only button must not use text size classes (cdr-button--small|medium|large).',
      textSizeWithIconOnlyClass:
        'Text button must not use icon-only size classes (cdr-button--icon-only-*).',
      withBackgroundRequiresIconOnly:
        'cdr-button--with-background only applies to icon-only buttons; add cdr-button--icon-only.',
      fullWidthWithIconOnly:
        'cdr-button--full-width cannot be combined with cdr-button--icon-only.',
      iconOnlyWithIconSide:
        'Icon-only button must not use cdr-button--has-icon-left/right.',
      iconOnlyNeedsLabel:
        'Icon-only button must include aria-label or aria-labelledby for an accessible name.',
    },
  ),
  check(analysis, node, context) {
    if (!analysis.isValidTag) {
      return;
    }
    const { info, attrs } = analysis;
    const hasFullWidth = info.fullWidthClasses.length > 0;

    if (info.hasWithBackground && !info.hasIconOnly) {
      context.report({ node, messageId: 'withBackgroundRequiresIconOnly' });
    }
    if (info.hasIconOnly && hasFullWidth) {
      context.report({ node, messageId: 'fullWidthWithIconOnly' });
    }
    if (info.hasIconOnly && info.hasIconSide) {
      context.report({ node, messageId: 'iconOnlyWithIconSide' });
    }

    if (info.hasIconOnly) {
      if (info.sizeClasses.length > 0) {
        context.report({ node, messageId: 'iconOnlyWithTextSize' });
      }
      const ariaLabel = attrs.get('aria-label');
      const ariaLabelledBy = attrs.get('aria-labelledby');
      const hasDynamicLabel =
        (ariaLabel && includesDynamicValue(ariaLabel)) ||
        (ariaLabelledBy && includesDynamicValue(ariaLabelledBy));
      if (!hasDynamicLabel) {
        if (
          (!ariaLabel && !ariaLabelledBy) ||
          (ariaLabel === '' && ariaLabelledBy === '')
        ) {
          context.report({ node, messageId: 'iconOnlyNeedsLabel' });
        }
      }
    }

    if (!info.hasIconOnly && info.iconOnlySizeClasses.length > 0) {
      context.report({ node, messageId: 'textSizeWithIconOnlyClass' });
    }
  },
});

const ruleModifier = createButtonRule({
  meta: buildMeta('Validate cdr-button modifier class names.', {
    invalidModifier:
      'Unknown cdr-button modifier "{{className}}". Use a valid size, variant, icon, or full-width class.',
    invalidModifierPrefix:
      'cdr-button modifiers must use the "--" separator (found "{{className}}").',
  }),
  check(analysis, node, context) {
    if (!analysis.isValidTag) {
      return;
    }
    reportClasses(
      context,
      node,
      'invalidModifierPrefix',
      unique(analysis.info.invalidModifierPrefixes),
    );
    reportClasses(
      context,
      node,
      'invalidModifier',
      unique(analysis.info.unknownModifierClasses),
    );
  },
});

const ruleDuplicate = createButtonRule({
  meta: buildMeta('Prevent duplicate cdr-button classes.', {
    duplicateClass:
      'Duplicate class "{{className}}" is not allowed on cdr-button elements.',
  }),
  check(analysis, node, context) {
    if (!analysis.isValidTag) {
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

const ruleTag = createButtonRule({
  meta: buildMeta('Restrict cdr-button usage to <button> or <a>.', {
    invalidTag:
      'cdr-button classes may only be used on <button> or <a> elements (found <{{tagName}}>).',
  }),
  check(analysis, node, context) {
    if (analysis.isValidTag) {
      return;
    }
    context.report({
      node,
      messageId: 'invalidTag',
      data: { tagName: analysis.normalizedTag },
    });
  },
});

const ruleType = createButtonRule({
  meta: buildMeta('Validate button type attributes for cdr-button.', {
    invalidButtonType:
      'Button type must be "button", "submit", or "reset" (found {{typeValue}}).',
    missingButtonType:
      'Button must include type="button", "submit", or "reset".',
  }),
  check(analysis, node, context) {
    if (!analysis.isValidTag || analysis.normalizedTag !== 'button') {
      return;
    }
    const typeValue = analysis.attrs.get('type');
    if (!typeValue) {
      context.report({ node, messageId: 'missingButtonType' });
      return;
    }
    if (includesDynamicValue(typeValue)) {
      return;
    }
    if (!BUTTON_TYPE_VALUES.has(typeValue)) {
      context.report({
        node,
        messageId: 'invalidButtonType',
        data: { typeValue },
      });
    }
  },
});

const ruleAnchor = createButtonRule({
  meta: buildMeta('Validate anchor usage for cdr-button links.', {
    anchorWithType:
      'Anchor tags (<a>) should not include a type attribute; use <button> instead.',
    anchorMissingHref: 'Anchor tags (<a>) must include an href attribute.',
  }),
  check(analysis, node, context) {
    if (!analysis.isValidTag || analysis.normalizedTag !== 'a') {
      return;
    }
    const href = analysis.attrs.get('href');
    if (!href) {
      context.report({ node, messageId: 'anchorMissingHref' });
    } else if (includesDynamicValue(href)) {
      return;
    }
    const typeValue = analysis.attrs.get('type');
    if (typeValue && !includesDynamicValue(typeValue)) {
      context.report({ node, messageId: 'anchorWithType' });
    }
  },
});

/** @type {import('eslint').ESLint.Plugin} */
export default {
  rules: {
    'button-variant': ruleVariant,
    'button-size': ruleSize,
    'button-icon': ruleIcon,
    'button-modifier': ruleModifier,
    'button-duplicate': ruleDuplicate,
    'button-tag': ruleTag,
    'button-type': ruleType,
    'button-anchor': ruleAnchor,
  },
  configs: {
    recommended: {
      rules: {
        'cedar/button-variant': 'error',
        'cedar/button-size': 'error',
        'cedar/button-icon': 'error',
        'cedar/button-modifier': 'error',
        'cedar/button-duplicate': 'error',
        'cedar/button-tag': 'error',
        'cedar/button-type': 'error',
        'cedar/button-anchor': 'error',
      },
    },
  },
};
