// @ts-check

/** @typedef {{ tagName: string | null, attrs: Map<string, string> }} ParsedTag */

const TAG_RE = /<\s*([a-zA-Z0-9-]+)\b[^>]*>/gi;
const ATTR_RE = /([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g;

/** Parse tag name and attributes from a raw HTML tag string. */
/** @param {string} tagSource @returns {ParsedTag} */
export function parseAttributes(tagSource) {
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
export function splitClasses(classValue) {
  return classValue
    .split(/\s+/)
    .map((value) => value.trim())
    .filter(Boolean);
}

/** Extract raw tag strings from HTML text. */
/** @param {string} text @returns {string[]} */
export function extractTagStrings(text) {
  const tags = [];
  let match;
  while ((match = TAG_RE.exec(text)) !== null) {
    tags.push(match[0]);
  }
  return tags;
}

/** Detect placeholder or template values that indicate a dynamic class. */
/** @param {string} value @returns {boolean} */
export function includesDynamicValue(value) {
  return (
    value.includes('__EXPR__') || value.includes('${') || value.includes('{{')
  );
}

/** Return a static JSX attribute value or "__EXPR__" for dynamic expressions. */
/** @param {any} attr @returns {string | null} */
export function getJsxAttributeValue(attr) {
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
export function getVueAttributes(element) {
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

/**
 * @param {string} description
 * @param {Record<string, string>} messages
 * @returns {import('eslint').Rule.RuleMetaData}
 */
export function buildMeta(description, messages) {
  return {
    type: /** @type {import('eslint').Rule.RuleMetaData['type']} */ ('problem'),
    docs: { description },
    schema: [],
    messages,
  };
}

/** @param {string[]} items @returns {string[]} */
export function unique(items) {
  return Array.from(new Set(items));
}

/**
 * @param {import('eslint').Rule.RuleContext} context
 * @param {any} node
 * @param {string} messageId
 * @param {string[]} items
 */
export function reportClasses(context, node, messageId, items) {
  for (const className of items) {
    context.report({ node, messageId, data: { className } });
  }
}

/**
 * @param {{
 *   meta: import('eslint').Rule.RuleMetaData,
 *   baseClass: string,
 *   analyzeTag: (tagName: string | null, attrs: Map<string, string>) => any,
 *   check: (analysis: any, node: any, context: import('eslint').Rule.RuleContext) => void,
 * }} options
 */
export function createRule({ meta, baseClass, analyzeTag, check }) {
  return {
    meta,
    /** @param {import('eslint').Rule.RuleContext} context */
    create(context) {
      const filename = context.getFilename();
      const isHtml = filename.endsWith('.html') || filename.endsWith('.htm');
      const isStorySource = filename.endsWith('.stories.ts');

      /** @param {string | null} tagName @param {Map<string, string>} attrs @param {any} node */
      function handleTag(tagName, attrs, node) {
        const analysis = analyzeTag(tagName, attrs);
        if (!analysis) {
          return;
        }
        check(analysis, node, context);
      }

      /** @param {string} tagSource @param {any} node */
      function checkTag(tagSource, node) {
        const { tagName, attrs } = parseAttributes(tagSource);
        handleTag(tagName, attrs, node);
      }

      /** @param {string} text @param {any} node */
      function checkText(text, node) {
        if (!text.includes(baseClass)) {
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
                handleTag(String(tagName), attrs, node);
              },
            })
          : {};

      return {
        /** @param {any} node */
        Program(node) {
          if (!isHtml) {
            return;
          }
          checkText(context.getSourceCode().text, node);
        },
        /** @param {any} node */
        Literal(node) {
          if (!isStorySource || typeof node.value !== 'string') {
            return;
          }
          checkText(node.value, node);
        },
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
          handleTag(tagName, attrs, node);
        },
        ...templateVisitor,
      };
    },
  };
}
