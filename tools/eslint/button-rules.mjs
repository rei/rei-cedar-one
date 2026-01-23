// @ts-check

/**
 * Cedar button rules derived from the original CdrButton.vue class logic:
 * - Require exactly one variant class: cedar-btn--primary|secondary|sale|dark|link.
 * - Size classes must be cedar-btn--small|medium|large (optionally @xs|@sm|@md|@lg); only one base size allowed.
 * - Full-width classes must be cedar-btn--full-width (optionally @xs|@sm|@md|@lg).
 * - Icon-only buttons require cedar-btn--icon-only plus cedar-btn--icon-only-(small|medium|large).
 * - Icon-only buttons must include aria-label or aria-labelledby.
 * - Icon-only buttons cannot use text size classes or icon-left/right classes.
 * - Text buttons cannot use icon-only size classes.
 * - cedar-btn--with-background requires cedar-btn--icon-only.
 * - cedar-btn--full-width cannot be used with cedar-btn--icon-only.
 * - <a> elements should not include a type attribute.
 */
/** @typedef {{ tagName: string | null, attrs: Map<string, string> }} ParsedTag */

const VARIANT_CLASSES = new Set([
  'cedar-btn--primary',
  'cedar-btn--secondary',
  'cedar-btn--sale',
  'cedar-btn--dark',
  'cedar-btn--link',
]);

const SIZE_CLASS_RE = /^cedar-btn--(small|medium|large)(@xs|@sm|@md|@lg)?$/;
const BASE_SIZE_CLASS_RE = /^cedar-btn--(small|medium|large)$/;
const FULL_WIDTH_CLASS_RE = /^cedar-btn--full-width(@xs|@sm|@md|@lg)?$/;
const ICON_ONLY_SIZE_CLASS_RE = /^cedar-btn--icon-only-(small|medium|large)$/;

const TAG_RE = /<\s*(button|a)\b[^>]*>/gi;
const ATTR_RE = /([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g;

const BASE_CLASS = 'cedar-btn';
const ICON_ONLY_CLASS = 'cedar-btn--icon-only';
const WITH_BACKGROUND_CLASS = 'cedar-btn--with-background';
const ICON_LEFT_CLASS = 'cedar-btn--has-icon-left';
const ICON_RIGHT_CLASS = 'cedar-btn--has-icon-right';

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
  if (normalizedTag !== 'button' && normalizedTag !== 'a') {
    return;
  }

  const classValue = attrs.get('class') ?? attrs.get('classname') ?? '';
  if (!classValue || includesDynamicValue(classValue)) {
    return;
  }

  const classes = splitClasses(classValue);
  const hasBase =
    classes.includes(BASE_CLASS) ||
    classes.some((cls) => cls.startsWith('cedar-btn--'));
  if (!hasBase) {
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
    cls.startsWith('cedar-btn--full-width'),
  );

  for (const cls of classes) {
    if (
      cls.startsWith('cedar-btn--full-width') &&
      !FULL_WIDTH_CLASS_RE.test(cls)
    ) {
      context.report({
        node,
        messageId: 'invalidFullWidth',
        data: { className: cls },
      });
    }
    if (
      cls.startsWith('cedar-btn--') &&
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
    if (iconOnlySizeClasses.length === 0) {
      context.report({ node, messageId: 'iconOnlyRequiresSize' });
    }
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
        'Validate cedar button class combinations in static HTML strings.',
    },
    schema: [],
    messages: {
      missingVariant:
        'Button is missing a variant class (primary, secondary, sale, dark, link).',
      multipleVariants: 'Button has multiple variant classes; use only one.',
      invalidSizeClass: 'Invalid button size class "{{className}}".',
      multipleBaseSizes: 'Button has multiple base size classes; use only one.',
      iconOnlyRequiresSize:
        'Icon-only button must include a size class like cedar-btn--icon-only-medium.',
      iconOnlyWithTextSize: 'Icon-only button must not use text size classes.',
      textSizeWithIconOnlyClass:
        'Text button must not use icon-only size classes.',
      withBackgroundRequiresIconOnly:
        'cedar-btn--with-background requires cedar-btn--icon-only.',
      fullWidthWithIconOnly:
        'cedar-btn--full-width cannot be used with cedar-btn--icon-only.',
      iconOnlyWithIconSide:
        'Icon-only button must not use icon-left/right classes.',
      iconOnlyNeedsLabel:
        'Icon-only button must include aria-label or aria-labelledby.',
      invalidFullWidth: 'Invalid full-width class "{{className}}".',
      anchorWithType: 'Anchor tags should not include a type attribute.',
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

    /** Scan text for <button>/<a> tags and validate each one. */
    /** @param {string} text @param {any} node */
    function checkText(text, node) {
      if (!text.includes('cedar-btn')) {
        return;
      }
      const tags = extractTagStrings(text);
      for (const tagSource of tags) {
        checkTag(tagSource, node);
      }
    }

    const parserServices = /** @type {any} */ (context).parserServices;
    const templateVisitor =
      parserServices && parserServices.defineTemplateBodyVisitor
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
