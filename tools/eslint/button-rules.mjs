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

const TAG_RE = /<\s*([a-zA-Z0-9-]+)\b[^>]*>/gi;
const ATTR_RE = /([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g;

const BASE_CLASS = 'cdr-button';
const ICON_ONLY_CLASS = 'cdr-button--icon-only';
const WITH_BACKGROUND_CLASS = 'cdr-button--with-background';
const ICON_LEFT_CLASS = 'cdr-button--has-icon-left';
const ICON_RIGHT_CLASS = 'cdr-button--has-icon-right';
const BUTTON_TYPE_VALUES = new Set(['button', 'submit', 'reset']);

/** Parse tag name and attributes from a raw HTML tag string. */
/** @param {string} tagSource @returns {ParsedTag} */
function parseAttributes(tagSource) {
  const tagMatch = tagSource.match(/^<\s*([a-zA-Z0-9-]+)/);
  if (!tagMatch) {
    return { tagName: null, attrs: new Map() };
  }
  const tagName = tagMatch[1].toLowerCase();
  const attrSource = tagSource.slice(tagMatch[0].length);
  const attrs = new Map();

  let match;
  while ((match = ATTR_RE.exec(attrSource)) !== null) {
    const name = match[1].toLowerCase();
    const value = match[2] ?? match[3] ?? match[4] ?? '';
    attrs.set(name, value);
  }

  return { tagName, attrs };
}

/** Split a class attribute into individual class names. */
/** @param {string} classValue @returns {string[]} */
function splitClasses(classValue) {
  return classValue
    .split(/\s+/)
    .map((value) => value.trim())
    .filter(Boolean);
}

/** Extract raw <button>/<a> tag strings from HTML text. */
/** @param {string} text @returns {string[]} */
function extractTagStrings(text) {
  const tags = [];
  let match;
  while ((match = TAG_RE.exec(text)) !== null) {
    tags.push(match[0]);
  }
  return tags;
}

/** Detect placeholder or template values that indicate a dynamic class. */
/** @param {string} value @returns {boolean} */
function includesDynamicValue(value) {
  return (
    value.includes('__EXPR__') || value.includes('${') || value.includes('{{')
  );
}

/** Return a static JSX attribute value or "__EXPR__" for dynamic expressions. */
/** @param {any} attr @returns {string | null} */
function getJsxAttributeValue(attr) {
  if (!attr || attr.type !== 'JSXAttribute') {
    return null;
  }
  if (!attr.value) {
    return '';
  }
  if (attr.value.type === 'Literal' && typeof attr.value.value === 'string') {
    return attr.value.value;
  }
  if (attr.value.type === 'JSXExpressionContainer') {
    const expression = attr.value.expression;
    if (
      expression &&
      expression.type === 'Literal' &&
      typeof expression.value === 'string'
    ) {
      return expression.value;
    }
    if (
      expression &&
      expression.type === 'TemplateLiteral' &&
      expression.expressions.length === 0
    ) {
      return expression.quasis
        .map(/** @param {any} quasi */ (quasi) => quasi.value.raw)
        .join('');
    }
  }
  return '__EXPR__';
}

/** Collect static Vue template attributes from a VElement. */
/** @param {any} element @returns {Map<string, string>} */
function getVueAttributes(element) {
  const attrs = new Map();
  const startTag = element && element.startTag;
  if (!startTag || !Array.isArray(startTag.attributes)) {
    return attrs;
  }
  for (const attr of startTag.attributes) {
    if (!attr || attr.type !== 'VAttribute') {
      continue;
    }
    const key = attr.key || {};
    const name = key.name || key.rawName;
    if (!name) {
      continue;
    }
    if (!attr.value || typeof attr.value.value !== 'string') {
      attrs.set(String(name).toLowerCase(), '__EXPR__');
      continue;
    }
    attrs.set(String(name).toLowerCase(), attr.value.value);
  }
  return attrs;
}

/** Apply Cedar button rules to a parsed tag and attributes. */
/** @param {string | null} tagName @param {Map<string, string>} attrs @param {any} node @param {import('eslint').Rule.RuleContext} context */
function checkTagWithAttrs(tagName, attrs, node, context) {
  if (!tagName) {
    return;
  }

  const normalizedTag = tagName.toLowerCase();
  const classValue = attrs.get('class') ?? attrs.get('classname') ?? '';
  if (!classValue || includesDynamicValue(classValue)) {
    return;
  }

  const classes = splitClasses(classValue);
  const hasBase =
    classes.includes(BASE_CLASS) ||
    classes.some((cls) => cls.startsWith('cdr-button--'));
  if (!hasBase) {
    return;
  }

  if (normalizedTag !== 'button' && normalizedTag !== 'a') {
    context.report({
      node,
      messageId: 'invalidTag',
      data: { tagName: normalizedTag },
    });
    return;
  }

  const variantClasses = classes.filter((cls) => VARIANT_CLASSES.has(cls));
  if (variantClasses.length === 0) {
    context.report({ node, messageId: 'missingVariant' });
  } else if (variantClasses.length > 1) {
    context.report({ node, messageId: 'multipleVariants' });
  }

  const sizeClasses = classes.filter((cls) => SIZE_CLASS_RE.test(cls));
  const baseSizeClasses = classes.filter((cls) => BASE_SIZE_CLASS_RE.test(cls));
  const iconOnlySizeClasses = classes.filter((cls) =>
    ICON_ONLY_SIZE_CLASS_RE.test(cls),
  );
  const fullWidthClasses = classes.filter((cls) =>
    cls.startsWith('cdr-button--full-width'),
  );

  for (const cls of classes) {
    if (
      cls.startsWith('cdr-button--full-width') &&
      !FULL_WIDTH_CLASS_RE.test(cls)
    ) {
      context.report({
        node,
        messageId: 'invalidFullWidth',
        data: { className: cls },
      });
    }
    if (
      cls.startsWith('cdr-button--icon-only-') &&
      !ICON_ONLY_SIZE_CLASS_RE.test(cls)
    ) {
      context.report({
        node,
        messageId: 'invalidSizeClass',
        data: { className: cls },
      });
    }
    if (
      cls.startsWith('cdr-button--') &&
      cls.includes('@') &&
      !SIZE_CLASS_RE.test(cls) &&
      !FULL_WIDTH_CLASS_RE.test(cls)
    ) {
      context.report({
        node,
        messageId: 'invalidSizeClass',
        data: { className: cls },
      });
    }
  }

  if (baseSizeClasses.length > 1) {
    context.report({ node, messageId: 'multipleBaseSizes' });
  }

  const hasIconOnly = classes.includes(ICON_ONLY_CLASS);
  const hasWithBackground = classes.includes(WITH_BACKGROUND_CLASS);
  const hasFullWidth = fullWidthClasses.length > 0;
  const hasIconSide =
    classes.includes(ICON_LEFT_CLASS) || classes.includes(ICON_RIGHT_CLASS);

  if (hasWithBackground && !hasIconOnly) {
    context.report({ node, messageId: 'withBackgroundRequiresIconOnly' });
  }

  if (hasIconOnly && hasFullWidth) {
    context.report({ node, messageId: 'fullWidthWithIconOnly' });
  }

  if (hasIconOnly && hasIconSide) {
    context.report({ node, messageId: 'iconOnlyWithIconSide' });
  }

  if (hasIconOnly) {
    if (sizeClasses.length > 0) {
      context.report({ node, messageId: 'iconOnlyWithTextSize' });
    }
    const ariaLabel = attrs.get('aria-label');
    const ariaLabelledBy = attrs.get('aria-labelledby');
    if (
      (!ariaLabel && !ariaLabelledBy) ||
      (ariaLabel === '' && ariaLabelledBy === '')
    ) {
      context.report({ node, messageId: 'iconOnlyNeedsLabel' });
    }
  }

  if (!hasIconOnly && iconOnlySizeClasses.length > 0) {
    context.report({ node, messageId: 'textSizeWithIconOnlyClass' });
  }

  if (normalizedTag === 'button') {
    const typeValue = attrs.get('type');
    if (!typeValue) {
      context.report({ node, messageId: 'missingButtonType' });
    } else if (includesDynamicValue(typeValue)) {
      return;
    } else if (!BUTTON_TYPE_VALUES.has(typeValue)) {
      context.report({
        node,
        messageId: 'invalidButtonType',
        data: { typeValue },
      });
    }
  }

  if (normalizedTag === 'a' && attrs.has('type')) {
    context.report({ node, messageId: 'anchorWithType' });
  }
}

/** @type {import('eslint').Rule.RuleModule} */
const rule = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Validate cdr-button class combinations, tag usage, and attributes.',
    },
    schema: [],
    messages: {
      missingVariant:
        'Button must include exactly one variant class: cdr-button--primary|secondary|sale|dark|link.',
      multipleVariants:
        'Button has multiple variant classes; keep only one of cdr-button--primary|secondary|sale|dark|link.',
      invalidSizeClass:
        'Invalid size class "{{className}}". Use cdr-button--small|medium|large with optional @xs|@sm|@md|@lg.',
      multipleBaseSizes:
        'Button has multiple base size classes; keep only one of cdr-button--small|medium|large.',
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
      invalidFullWidth:
        'Invalid full-width class "{{className}}". Use cdr-button--full-width with optional @xs|@sm|@md|@lg.',
      invalidTag:
        'cdr-button classes may only be used on <button> or <a> elements (found <{{tagName}}>).',
      invalidButtonType:
        'Button type must be "button", "submit", or "reset" (found {{typeValue}}).',
      missingButtonType:
        'Button must include type="button", "submit", or "reset".',
      anchorWithType:
        'Anchor tags (<a>) should not include a type attribute; use <button> instead.',
    },
  },
  /** @param {import('eslint').Rule.RuleContext} context */
  create(context) {
    const filename = context.getFilename();
    const isHtml = filename.endsWith('.html') || filename.endsWith('.htm');
    const isStorySource = filename.endsWith('.stories.ts');

    /** Parse and validate a single tag string. */
    /** @param {string} tagSource @param {any} node */
    function checkTag(tagSource, node) {
      const { tagName, attrs } = parseAttributes(tagSource);
      checkTagWithAttrs(tagName, attrs, node, context);
    }

    /** Scan text for tags and validate each one. */
    /** @param {string} text @param {any} node */
    function checkText(text, node) {
      if (!text.includes('cdr-button')) {
        return;
      }
      const tags = extractTagStrings(text);
      for (const tagSource of tags) {
        checkTag(tagSource, node);
      }
    }

    const sourceCode =
      /** @type {any} */ (context).sourceCode ?? context.getSourceCode();
    const parserServices =
      sourceCode && sourceCode.parserServices
        ? sourceCode.parserServices
        : null;
    const templateVisitor =
      parserServices &&
      typeof parserServices.defineTemplateBodyVisitor === 'function'
        ? parserServices.defineTemplateBodyVisitor({
            /** @param {any} node */
            VElement(node) {
              const tagName =
                node.rawName || (node.name && node.name.name) || '';
              const attrs = getVueAttributes(node);
              checkTagWithAttrs(String(tagName), attrs, node, context);
            },
          })
        : {};

    return {
      /** Scan HTML files for button markup. */
      /** @param {any} node */
      Program(node) {
        if (!isHtml) {
          return;
        }
        checkText(context.getSourceCode().text, node);
      },
      /** Scan static string literals in stories for button markup. */
      /** @param {any} node */
      Literal(node) {
        if (!isStorySource || typeof node.value !== 'string') {
          return;
        }
        checkText(node.value, node);
      },
      /** Scan static template literals in stories for button markup. */
      /** @param {any} node */
      TemplateLiteral(node) {
        if (!isStorySource) {
          return;
        }
        const text = node.quasis
          .map(/** @param {any} quasi */ (quasi) => quasi.value.raw)
          .join('__EXPR__');
        checkText(text, node);
      },
      /** Validate JSX <button>/<a> elements. */
      /** @param {any} node */
      JSXElement(node) {
        const opening = node.openingElement;
        if (
          !opening ||
          !opening.name ||
          opening.name.type !== 'JSXIdentifier'
        ) {
          return;
        }
        const tagName = opening.name.name;
        const attrs = new Map();
        for (const attr of opening.attributes || []) {
          if (!attr || attr.type !== 'JSXAttribute') {
            continue;
          }
          const attrName =
            attr.name && attr.name.name ? String(attr.name.name) : '';
          if (!attrName) {
            continue;
          }
          const value = getJsxAttributeValue(attr);
          if (value === null) {
            continue;
          }
          attrs.set(attrName.toLowerCase(), value);
        }
        checkTagWithAttrs(tagName, attrs, node, context);
      },
      ...templateVisitor,
    };
  },
};

/** @type {import('eslint').ESLint.Plugin} */
export default {
  rules: {
    button: rule,
  },
};
