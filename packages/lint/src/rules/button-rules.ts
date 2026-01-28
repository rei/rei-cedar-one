import type { Rule } from 'eslint';
import type { ButtonClassInfo, ButtonTagAnalysis } from '../types.js';
import {
  createComponentRule,
  buildMeta,
  findDuplicateClasses,
  getClassValue,
  hasIconLabel,
  isDynamicValue,
  reportClasses,
  reportUniqueClasses,
  splitClasses,
  unique,
} from '../utils.js';

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

/** @param cls - Class name. */
const isSizeClass = (cls: string) => SIZE_CLASS_RE.test(cls);
/** @param cls - Class name. */
const isBaseSizeClass = (cls: string) => BASE_SIZE_CLASS_RE.test(cls);
/** @param cls - Class name. */
const isFullWidthClass = (cls: string) => FULL_WIDTH_CLASS_RE.test(cls);
/** @param cls - Class name. */
const isIconOnlySizeClass = (cls: string) => ICON_ONLY_SIZE_CLASS_RE.test(cls);
/** @param cls - Class name. */
const isModifierClass = (cls: string) => cls.startsWith(MODIFIER_PREFIX);
/** @param cls - Class name. */
const isIconSideClass = (cls: string) =>
  cls === ICON_LEFT_CLASS || cls === ICON_RIGHT_CLASS;

/**
 * Analyze classes for button-specific metadata.
 * @param classes - Class list.
 * @returns Button class info.
 */
function analyzeClasses(classes: string[]): ButtonClassInfo {
  const duplicateClasses = findDuplicateClasses(classes);
  const info: ButtonClassInfo = {
    hasIconOnly: false,
    hasWithBackground: false,
    hasIconSide: false,
    variantClasses: [],
    sizeClasses: [],
    baseSizeClasses: [],
    iconOnlySizeClasses: [],
    fullWidthClasses: [],
    duplicateClasses,
    invalidModifierPrefixes: [],
    invalidSizeClasses: [],
    invalidFullWidthClasses: [],
    invalidIconOnlySizeClasses: [],
    unknownModifierClasses: [],
  };

  /**
   * Push a class name into a list when the condition is true.
   * @param condition - Condition check.
   * @param list - Destination list.
   * @param value - Class name.
   */
  const pushIf = (condition: boolean, list: string[], value: string) => {
    if (condition) {
      list.push(value);
    }
  };

  /**
   * Set boolean flags for core button modifiers.
   * @param cls - Class name.
   */
  const markCoreFlags = (cls: string) => {
    if (cls === ICON_ONLY_CLASS) {
      info.hasIconOnly = true;
      return;
    }
    if (cls === WITH_BACKGROUND_CLASS) {
      info.hasWithBackground = true;
      return;
    }
    if (isIconSideClass(cls)) {
      info.hasIconSide = true;
    }
  };

  /**
   * Collect invalid modifier prefixes.
   * @param cls - Class name.
   */
  const pushModifierClass = (cls: string) => {
    if (
      cls.startsWith(BASE_CLASS) &&
      cls !== BASE_CLASS &&
      !isModifierClass(cls)
    ) {
      info.invalidModifierPrefixes.push(cls);
    }
  };

  /**
   * Collect size-related class names.
   * @param cls - Class name.
   */
  const collectSizeClasses = (cls: string) => {
    pushIf(isSizeClass(cls), info.sizeClasses, cls);
    pushIf(isBaseSizeClass(cls), info.baseSizeClasses, cls);
    pushIf(isIconOnlySizeClass(cls), info.iconOnlySizeClasses, cls);
  };

  /**
   * Collect variant class names.
   * @param cls - Class name.
   */
  const collectVariantClasses = (cls: string) => {
    pushIf(VARIANT_CLASSES.has(cls), info.variantClasses, cls);
  };

  /**
   * Collect full-width classes and invalid values.
   * @param cls - Class name.
   */
  const collectFullWidthClasses = (cls: string) => {
    if (!cls.startsWith(FULL_WIDTH_PREFIX)) {
      return;
    }
    info.fullWidthClasses.push(cls);
    if (!isFullWidthClass(cls)) {
      info.invalidFullWidthClasses.push(cls);
    }
  };

  /**
   * Collect invalid icon-only sizing classes.
   * @param cls - Class name.
   */
  const collectIconOnlySizing = (cls: string) => {
    if (cls.startsWith(ICON_ONLY_PREFIX) && !isIconOnlySizeClass(cls)) {
      info.invalidIconOnlySizeClasses.push(cls);
    }
  };

  /**
   * Collect invalid and unknown modifiers.
   * @param cls - Class name.
   */
  const collectUnknownModifiers = (cls: string) => {
    if (!isModifierClass(cls)) {
      return;
    }
    if (cls.includes('@') && !isSizeClass(cls) && !isFullWidthClass(cls)) {
      info.invalidSizeClasses.push(cls);
      return;
    }
    if (
      !isSizeClass(cls) &&
      !isFullWidthClass(cls) &&
      !isIconOnlySizeClass(cls) &&
      !KNOWN_EXACT_MODIFIERS.has(cls)
    ) {
      info.unknownModifierClasses.push(cls);
    }
  };

  for (const cls of classes) {
    pushModifierClass(cls);
    collectVariantClasses(cls);
    collectSizeClasses(cls);
    collectFullWidthClasses(cls);
    collectIconOnlySizing(cls);
    collectUnknownModifiers(cls);
    markCoreFlags(cls);
  }

  return info;
}

/**
 * Analyze a tag into a button rule payload.
 * @param tagName - Tag name.
 * @param attrs - Attribute map.
 * @returns Tag analysis or null.
 */
function analyzeTag(
  tagName: string | null,
  attrs: Map<string, string>,
): ButtonTagAnalysis | null {
  if (!tagName) {
    return null;
  }

  const normalizedTag = String(tagName).toLowerCase();
  const classValue = getClassValue(attrs);
  if (!classValue || isDynamicValue(classValue)) {
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
 * Build a button rule wrapper.
 * @param options - Rule options.
 * @returns ESLint rule module.
 */
function createButtonRule(options: {
  meta: Rule.RuleMetaData;
  check: (
    analysis: ButtonTagAnalysis,
    node: Rule.Node,
    context: Rule.RuleContext,
  ) => void;
}) {
  return createComponentRule<ButtonTagAnalysis>({
    ...options,
    baseClass: BASE_CLASS,
    analyzeTag,
  });
}

const ruleVariant = createButtonRule({
  /**
   * Require exactly one variant class:
   * cdr-button--primary|secondary|sale|dark|link.
   */
  meta: buildMeta('Validate cdr-button variant class usage.', {
    missingVariant:
      'Button must include exactly one variant class: cdr-button--primary|secondary|sale|dark|link.',
    multipleVariants:
      'Button has multiple variant classes; keep only one of cdr-button--primary|secondary|sale|dark|link.',
  }),
  /**
   * @param analysis - Tag analysis.
   * @param node - AST node.
   * @param context - Rule context.
   */
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
  /**
   * Validate size + full-width classes:
   * - cdr-button--small|medium|large (optionally @xs|@sm|@md|@lg)
   * - cdr-button--full-width (optionally @xs|@sm|@md|@lg)
   */
  meta: buildMeta('Validate cdr-button size and full-width classes.', {
    invalidSizeClass:
      'Invalid size class "{{className}}". Use cdr-button--small|medium|large with optional @xs|@sm|@md|@lg.',
    invalidFullWidth:
      'Invalid full-width class "{{className}}". Use cdr-button--full-width with optional @xs|@sm|@md|@lg.',
    multipleBaseSizes:
      'Button has multiple base size classes; keep only one of cdr-button--small|medium|large.',
  }),
  /**
   * @param analysis - Tag analysis.
   * @param node - AST node.
   * @param context - Rule context.
   */
  check(analysis, node, context) {
    if (!analysis.isValidTag) {
      return;
    }
    reportUniqueClasses(
      context,
      node,
      'invalidFullWidth',
      analysis.info.invalidFullWidthClasses,
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
  /**
   * Icon-only rules:
   * - icon-only requires aria-label/aria-labelledby
   * - icon-only cannot use text size or icon-left/right classes
   * - text buttons cannot use icon-only size classes
   * - with-background requires icon-only
   * - full-width cannot be icon-only
   */
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
  /**
   * @param analysis - Tag analysis.
   * @param node - AST node.
   * @param context - Rule context.
   */
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
      if (!hasIconLabel(attrs)) {
        context.report({ node, messageId: 'iconOnlyNeedsLabel' });
      }
    }

    if (!info.hasIconOnly && info.iconOnlySizeClasses.length > 0) {
      context.report({ node, messageId: 'textSizeWithIconOnlyClass' });
    }
  },
});

const ruleModifier = createButtonRule({
  /**
   * Validate modifier class names and prefixes.
   */
  meta: buildMeta('Validate cdr-button modifier class names.', {
    invalidModifier:
      'Unknown cdr-button modifier "{{className}}". Use a valid size, variant, icon, or full-width class.',
    invalidModifierPrefix:
      'cdr-button modifiers must use the "--" separator (found "{{className}}").',
  }),
  /**
   * @param analysis - Tag analysis.
   * @param node - AST node.
   * @param context - Rule context.
   */
  check(analysis, node, context) {
    if (!analysis.isValidTag) {
      return;
    }
    reportUniqueClasses(
      context,
      node,
      'invalidModifierPrefix',
      analysis.info.invalidModifierPrefixes,
    );
    reportUniqueClasses(
      context,
      node,
      'invalidModifier',
      analysis.info.unknownModifierClasses,
    );
  },
});

const ruleDuplicate = createButtonRule({
  /**
   * Prevent duplicate cdr-button classes.
   */
  meta: buildMeta('Prevent duplicate cdr-button classes.', {
    duplicateClass:
      'Duplicate class "{{className}}" is not allowed on cdr-button elements.',
  }),
  /**
   * @param analysis - Tag analysis.
   * @param node - AST node.
   * @param context - Rule context.
   */
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
  /**
   * Restrict cdr-button usage to <button> and <a>.
   */
  meta: buildMeta('Restrict cdr-button usage to <button> or <a>.', {
    invalidTag:
      'cdr-button classes may only be used on <button> or <a> elements (found <{{tagName}}>).',
  }),
  /**
   * @param analysis - Tag analysis.
   * @param node - AST node.
   * @param context - Rule context.
   */
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
  /**
   * Validate <button> type values.
   */
  meta: buildMeta('Validate button type attributes for cdr-button.', {
    invalidButtonType:
      'Button type must be "button", "submit", or "reset" (found {{typeValue}}).',
    missingButtonType:
      'Button must include type="button", "submit", or "reset".',
  }),
  /**
   * @param analysis - Tag analysis.
   * @param node - AST node.
   * @param context - Rule context.
   */
  check(analysis, node, context) {
    if (!analysis.isValidTag || analysis.normalizedTag !== 'button') {
      return;
    }
    const typeValue = analysis.attrs.get('type');
    if (!typeValue) {
      context.report({ node, messageId: 'missingButtonType' });
      return;
    }
    if (isDynamicValue(typeValue)) {
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
  /**
   * Validate <a> usage for cdr-button.
   */
  meta: buildMeta('Validate anchor usage for cdr-button links.', {
    anchorWithType:
      'Anchor tags (<a>) should not include a type attribute; use <button> instead.',
    anchorMissingHref: 'Anchor tags (<a>) must include an href attribute.',
  }),
  /**
   * @param analysis - Tag analysis.
   * @param node - AST node.
   * @param context - Rule context.
   */
  check(analysis, node, context) {
    if (!analysis.isValidTag || analysis.normalizedTag !== 'a') {
      return;
    }
    const href = analysis.attrs.get('href');
    if (!href) {
      context.report({ node, messageId: 'anchorMissingHref' });
    } else if (isDynamicValue(href)) {
      return;
    }
    const typeValue = analysis.attrs.get('type');
    if (typeValue && !isDynamicValue(typeValue)) {
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
