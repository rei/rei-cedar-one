import type { Rule, SourceCode } from 'eslint';
import { getBaseClassAliases, resolveClassAlias } from './class-aliases.js';
import type { ModifierAnalysis, ParsedTag } from './types.js';

const TAG_RE = /<\s*([a-zA-Z0-9-]+)\b[^>]*>/gi;
const ATTR_RE = /([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g;

/**
 * Narrow unknown values to records.
 * @param value - Value to check.
 * @returns True when the value is a non-null object.
 */
export const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

/**
 * Extract a string literal value from an AST node.
 * @param value - AST node candidate.
 * @returns Literal string or null.
 */
export const getLiteralStringValue = (value: unknown): string | null =>
  isRecord(value) && value.type === 'Literal' && typeof value.value === 'string'
    ? value.value
    : null;

/**
 * Parse a raw HTML tag string into a tag name and attributes.
 * @param tagSource - Raw tag string.
 * @returns Parsed tag name and attributes.
 */
export function parseAttributes(tagSource: string): ParsedTag {
  const tagMatch = tagSource.match(/^<\s*([a-zA-Z0-9-]+)/);
  if (!tagMatch) {
    return { tagName: null, attrs: new Map() };
  }
  const tagName = tagMatch[1].toLowerCase();
  const attrSource = tagSource.slice(tagMatch[0].length);
  const attrs = new Map<string, string>();

  let match: RegExpExecArray | null;
  while ((match = ATTR_RE.exec(attrSource)) !== null) {
    const name = match[1].toLowerCase();
    const value = match[2] ?? match[3] ?? match[4] ?? '';
    attrs.set(name, value);
  }

  return { tagName, attrs };
}

/**
 * Read class/className from an attribute map.
 * @param attrs - Attribute map.
 * @returns Class value or empty string.
 */
export function getClassValue(attrs: Map<string, string>): string {
  return attrs.get('class') ?? attrs.get('classname') ?? '';
}

/**
 * Split a class string into tokens.
 * @param classValue - Class attribute value.
 * @returns Array of class names.
 */
export function splitClasses(classValue: string): string[] {
  return classValue
    .split(/\s+/)
    .map((value) => value.trim())
    .map((value) => resolveClassAlias(value))
    .filter(Boolean);
}

/**
 * Normalize and set an attribute on the map.
 * @param attrs - Attribute map.
 * @param name - Attribute name.
 * @param value - Attribute value.
 */
export function setAttr(
  attrs: Map<string, string>,
  name: string,
  value: string,
): void {
  attrs.set(name.toLowerCase(), value);
}

/**
 * Extract a string value from a JSX attribute.
 * @param attr - JSX attribute node.
 * @returns String value, "__EXPR__", or null.
 */
export function getJsxAttributeValue(attr: unknown): string | null {
  if (!isRecord(attr) || attr.type !== 'JSXAttribute') {
    return null;
  }
  if (!('value' in attr) || attr.value == null) {
    return '';
  }
  const value = attr.value;
  const literalValue = getLiteralStringValue(value);
  if (literalValue !== null) {
    return literalValue;
  }
  if (isRecord(value) && value.type === 'JSXExpressionContainer') {
    const expression = value.expression;
    const expressionLiteral = getLiteralStringValue(expression);
    if (expressionLiteral !== null) {
      return expressionLiteral;
    }
    if (
      isRecord(expression) &&
      expression.type === 'TemplateLiteral' &&
      Array.isArray(expression.expressions) &&
      expression.expressions.length === 0
    ) {
      const quasis = expression.quasis;
      if (!Array.isArray(quasis)) {
        return '__EXPR__';
      }
      return quasis
        .map((quasi) => {
          if (!isRecord(quasi) || !isRecord(quasi.value)) {
            return '';
          }
          const raw = quasi.value.raw;
          return typeof raw === 'string' ? raw : '';
        })
        .join('');
    }
  }
  return '__EXPR__';
}

/**
 * Extract attributes from a JSX opening element.
 * @param element - JSX opening element node.
 * @returns Attribute map.
 */
export function getJsxAttributes(
  element: Record<string, unknown>,
): Map<string, string> {
  const attrs = new Map<string, string>();
  const attributes = Array.isArray(element.attributes)
    ? element.attributes
    : [];
  for (const attr of attributes) {
    if (!isRecord(attr) || attr.type !== 'JSXAttribute') {
      continue;
    }
    const attrName =
      isRecord(attr) &&
      isRecord(attr.name) &&
      typeof attr.name.name === 'string'
        ? attr.name.name
        : '';
    if (!attrName) {
      continue;
    }
    const value = getJsxAttributeValue(attr);
    if (value === null) {
      continue;
    }
    setAttr(attrs, attrName, value);
  }
  return attrs;
}

/**
 * Read attributes from an HTML AST tag node.
 * @param node - HTML tag node.
 * @returns Attribute map.
 */
export function getHtmlAttributes(node: unknown): Map<string, string> {
  const attrs = new Map<string, string>();
  if (!isRecord(node) || !Array.isArray(node.attributes)) {
    return attrs;
  }
  for (const attr of node.attributes) {
    if (!isRecord(attr) || !isRecord(attr.key)) {
      continue;
    }
    const name =
      typeof attr.key.value === 'string'
        ? attr.key.value
        : typeof attr.key.name === 'string'
          ? attr.key.name
          : undefined;
    if (!name) {
      continue;
    }
    if (isRecord(attr.value) && typeof attr.value.value === 'string') {
      setAttr(attrs, name, attr.value.value);
      continue;
    }
    setAttr(attrs, name, '');
  }
  return attrs;
}

/**
 * Extract raw tag strings from text.
 * @param text - Source text.
 * @returns Array of tag strings.
 */
export function extractTagStrings(text: string): string[] {
  const tags: string[] = [];
  let match: RegExpExecArray | null;
  while ((match = TAG_RE.exec(text)) !== null) {
    tags.push(match[0]);
  }
  return tags;
}

/**
 * Detect dynamic placeholders in a value.
 * @param value - Attribute value.
 * @returns True when dynamic placeholders are present.
 */
export function includesDynamicValue(value: string): boolean {
  return (
    value.includes('__EXPR__') || value.includes('${') || value.includes('{{')
  );
}

/**
 * Detect dynamic placeholders in an optional value.
 * @param value - Attribute value.
 * @returns True when dynamic placeholders are present.
 */
export function isDynamicValue(value?: string): boolean {
  return typeof value === 'string' && includesDynamicValue(value);
}

/**
 * Find duplicate class names.
 * @param classes - Class list.
 * @returns Duplicated class names.
 */
export function findDuplicateClasses(classes: string[]): string[] {
  const seen = new Set<string>();
  const duplicates = new Set<string>();
  for (const cls of classes) {
    if (seen.has(cls)) {
      duplicates.add(cls);
    } else {
      seen.add(cls);
    }
  }
  return Array.from(duplicates);
}

/**
 * Analyze modifier classes for a component base class.
 * @param options - Analysis options.
 * @returns Modifier analysis summary.
 */
export function analyzeModifiers(options: {
  baseClass: string;
  modifierPrefix: string;
  allowedModifiers: Set<string>;
  classes: string[];
}): ModifierAnalysis {
  const { baseClass, modifierPrefix, allowedModifiers, classes } = options;
  const modifiers: string[] = [];
  const invalidPrefixes: string[] = [];
  const invalidModifiers: string[] = [];
  const duplicateClasses = findDuplicateClasses(classes);

  for (const cls of classes) {
    if (cls.startsWith(baseClass) && cls !== baseClass) {
      if (!cls.startsWith(modifierPrefix)) {
        invalidPrefixes.push(cls);
      } else {
        modifiers.push(cls);
        if (!allowedModifiers.has(cls)) {
          invalidModifiers.push(cls);
        }
      }
    }
  }

  return {
    hasBase: classes.includes(baseClass),
    modifiers,
    duplicateClasses,
    invalidPrefixes,
    invalidModifiers,
  };
}

/**
 * Analyze a tag and build a modifier-based analysis payload.
 * @param options - Analysis options.
 * @returns Built analysis object or null.
 */
export function analyzeTagWithModifiers<T>(options: {
  tagName: string | null;
  attrs: Map<string, string>;
  baseClass: string;
  modifierPrefix: string;
  allowedModifiers: Set<string>;
  build: (input: {
    tagName: string;
    attrs: Map<string, string>;
    classes: string[];
    info: ModifierAnalysis;
  }) => T;
}): T | null {
  const { tagName, attrs, baseClass, modifierPrefix, allowedModifiers, build } =
    options;
  if (!tagName) {
    return null;
  }
  const classValue = getClassValue(attrs);
  if (!classValue || includesDynamicValue(classValue)) {
    return null;
  }
  const classes = splitClasses(classValue);
  if (
    !classes.some((cls) => cls === baseClass || cls.startsWith(modifierPrefix))
  ) {
    return null;
  }
  const info = analyzeModifiers({
    baseClass,
    modifierPrefix,
    allowedModifiers,
    classes,
  });
  return build({ tagName: String(tagName), attrs, classes, info });
}

/**
 * Create a modifier-based rule from shared analysis.
 * @param options - Rule options.
 * @returns ESLint rule module.
 */
export function createModifierRule<T>(options: {
  meta: Rule.RuleMetaData;
  baseClass: string;
  modifierPrefix: string;
  allowedModifiers: Set<string>;
  build: (input: {
    tagName: string;
    attrs: Map<string, string>;
    classes: string[];
    info: ModifierAnalysis;
  }) => T;
  check: (analysis: T, node: Rule.Node, context: Rule.RuleContext) => void;
}): Rule.RuleModule {
  const { meta, baseClass, modifierPrefix, allowedModifiers, build, check } =
    options;
  return createComponentRule<T>({
    meta,
    baseClass,
    analyzeTag: (tagName, attrs) =>
      analyzeTagWithModifiers({
        tagName,
        attrs,
        baseClass,
        modifierPrefix,
        allowedModifiers,
        build,
      }),
    check,
  });
}

/**
 * Extract attributes from a Vue VElement.
 * @param element - Vue AST element.
 * @returns Attribute map.
 */
export function getVueAttributes(element: unknown): Map<string, string> {
  const attrs = new Map<string, string>();
  if (!isRecord(element)) {
    return attrs;
  }
  const startTag = element.startTag;
  if (!isRecord(startTag) || !Array.isArray(startTag.attributes)) {
    return attrs;
  }
  for (const attr of startTag.attributes) {
    if (!isRecord(attr) || attr.type !== 'VAttribute') {
      continue;
    }
    const key = attr.key;
    const name =
      isRecord(key) && typeof key.name === 'string'
        ? key.name
        : isRecord(key) && typeof key.rawName === 'string'
          ? key.rawName
          : undefined;
    if (typeof name !== 'string') {
      continue;
    }
    const value = attr.value;
    if (!isRecord(value) || typeof value.value !== 'string') {
      setAttr(attrs, name, '__EXPR__');
      continue;
    }
    setAttr(attrs, name, value.value);
  }
  return attrs;
}

/**
 * Build HTML listener for tag scanning.
 * @param options - Listener options.
 * @returns HTML rule listener.
 */
export function createHtmlListener(options: {
  isHtml: boolean;
  handleTag: (
    tagName: string | null,
    attrs: Map<string, string>,
    node: Rule.Node,
  ) => void;
}): Rule.RuleListener {
  const { isHtml, handleTag } = options;
  return {
    /**
     * Handle HTML tag nodes to report precise locations.
     * @param node - Tag node.
     */
    Tag(node: unknown) {
      if (!isHtml) {
        return;
      }
      if (!isRecord(node) || typeof node.name !== 'string') {
        return;
      }
      const attrs = getHtmlAttributes(node);
      handleTag(node.name, attrs, node as unknown as Rule.Node);
    },
  };
}

/**
 * Build story template listener for literal/template strings.
 * @param options - Listener options.
 * @returns Story template listener.
 */
export function createStoryTemplateListener(options: {
  isStorySource: boolean;
  scanTextTags: (text: string, node: Rule.Node) => void;
}): Rule.RuleListener {
  const { isStorySource, scanTextTags } = options;
  return {
    /**
     * Handle literal nodes (storybook string templates).
     * @param node - Literal node.
     */
    Literal(node) {
      if (!isStorySource || !isRecord(node) || typeof node.value !== 'string') {
        return;
      }
      scanTextTags(node.value, node as Rule.Node);
    },
    /**
     * Handle template literals (storybook string templates).
     * @param node - TemplateLiteral node.
     */
    TemplateLiteral(node) {
      if (!isStorySource) {
        return;
      }
      if (!isRecord(node) || !Array.isArray(node.quasis)) {
        return;
      }
      const quasis = node.quasis;
      const text = quasis
        .map((quasi) => {
          if (!isRecord(quasi) || !isRecord(quasi.value)) {
            return '';
          }
          const raw = quasi.value.raw;
          return typeof raw === 'string' ? raw : '';
        })
        .join('__EXPR__');
      scanTextTags(text, node as Rule.Node);
    },
  };
}

/**
 * Build JSX listener for template scanning.
 * @param options - Listener options.
 * @returns JSX rule listener.
 */
export function createJsxListener(options: {
  handleTag: (
    tagName: string | null,
    attrs: Map<string, string>,
    node: Rule.Node,
  ) => void;
}): Rule.RuleListener {
  const { handleTag } = options;
  return {
    /**
     * Handle JSX elements.
     * @param node - JSX element node.
     */
    JSXElement(node: unknown) {
      if (!isRecord(node) || !isRecord(node.openingElement)) {
        return;
      }
      const opening = node.openingElement as Record<string, unknown>;
      const name = opening.name;
      if (
        !isRecord(name) ||
        name.type !== 'JSXIdentifier' ||
        typeof name.name !== 'string'
      ) {
        return;
      }
      const tagName = name.name;
      const attrs = getJsxAttributes(opening);
      handleTag(tagName, attrs, node as unknown as Rule.Node);
    },
  };
}

/**
 * Build Vue template listener for template scanning.
 * @param options - Listener options.
 * @returns Vue rule listener.
 */
export function createVueListener(options: {
  sourceCode: SourceCode;
  handleTag: (
    tagName: string | null,
    attrs: Map<string, string>,
    node: Rule.Node,
  ) => void;
}): Rule.RuleListener {
  const { sourceCode, handleTag } = options;
  const parserServices = (
    sourceCode as {
      parserServices?: {
        defineTemplateBodyVisitor?: (
          visitor: Record<string, (node: unknown) => void>,
        ) => Record<string, unknown>;
      };
    }
  ).parserServices;
  if (
    !parserServices ||
    typeof parserServices.defineTemplateBodyVisitor !== 'function'
  ) {
    return {};
  }
  return parserServices.defineTemplateBodyVisitor({
    /**
     * Handle Vue template elements.
     * @param node - Vue element node.
     */
    VElement(node: unknown) {
      if (!isRecord(node)) {
        return;
      }
      const rawName = typeof node.rawName === 'string' ? node.rawName : '';
      const name =
        isRecord(node.name) && typeof node.name.name === 'string'
          ? node.name.name
          : '';
      const tagName = rawName || name || '';
      const attrs = getVueAttributes(node);
      handleTag(String(tagName), attrs, node as unknown as Rule.Node);
    },
  }) as Rule.RuleListener;
}

/**
 * Build ESLint rule metadata.
 * @param description - Rule description.
 * @param messages - Message map.
 * @returns Rule meta data.
 */
export function buildMeta(
  description: string,
  messages: Record<string, string>,
): Rule.RuleMetaData {
  return {
    type: 'problem',
    docs: { description },
    schema: [],
    messages,
  };
}

/**
 * Deduplicate items preserving order.
 * @param items - Input list.
 * @returns Unique list.
 */
export function unique(items: string[]): string[] {
  return Array.from(new Set(items));
}

/**
 * Report a violation for each class name.
 * @param context - ESLint rule context.
 * @param node - AST node.
 * @param messageId - Message id.
 * @param items - Class names.
 */
export function reportClasses(
  context: Rule.RuleContext,
  node: Rule.Node,
  messageId: string,
  items: string[],
): void {
  for (const className of items) {
    context.report({ node: node as Rule.Node, messageId, data: { className } });
  }
}

/**
 * Report a violation for each unique class name.
 * @param context - ESLint rule context.
 * @param node - AST node.
 * @param messageId - Message id.
 * @param items - Class names.
 */
export function reportUniqueClasses(
  context: Rule.RuleContext,
  node: Rule.Node,
  messageId: string,
  items: string[],
): void {
  reportClasses(context, node, messageId, unique(items));
}

/**
 * Check for accessible icon-only labels.
 * @param attrs - Attribute map.
 * @returns True when aria-label/aria-labelledby is valid.
 */
export function hasIconLabel(attrs: Map<string, string>): boolean {
  const ariaLabel = attrs.get('aria-label');
  const ariaLabelledBy = attrs.get('aria-labelledby');
  const hasDynamicLabel =
    (ariaLabel && includesDynamicValue(ariaLabel)) ||
    (ariaLabelledBy && includesDynamicValue(ariaLabelledBy));
  if (hasDynamicLabel) {
    return true;
  }
  return !(
    (!ariaLabel && !ariaLabelledBy) ||
    (ariaLabel === '' && ariaLabelledBy === '')
  );
}

/**
 * Create a component rule from an analyzer and checker.
 * @param options - Rule options.
 * @returns ESLint rule module.
 */
export function createComponentRule<TAnalysis>(options: {
  meta: Rule.RuleMetaData;
  baseClass: string;
  analyzeTag: (
    tagName: string | null,
    attrs: Map<string, string>,
  ) => TAnalysis | null;
  check: (
    analysis: TAnalysis,
    node: Rule.Node,
    context: Rule.RuleContext,
  ) => void;
}): Rule.RuleModule {
  return createRule(options);
}

/**
 * Create a rule that scans HTML/JSX/Vue templates for class usage.
 * @param options - Rule options.
 * @returns ESLint rule module.
 */
export function createRule<TAnalysis>(options: {
  meta: Rule.RuleMetaData;
  baseClass: string;
  analyzeTag: (
    tagName: string | null,
    attrs: Map<string, string>,
  ) => TAnalysis | null;
  check: (
    analysis: TAnalysis,
    node: Rule.Node,
    context: Rule.RuleContext,
  ) => void;
}): Rule.RuleModule {
  const { meta, baseClass, analyzeTag, check } = options;
  return {
    meta,
    create(context) {
      const filename = context.getFilename();
      const isHtml = filename.endsWith('.html') || filename.endsWith('.htm');
      const isStorySource = filename.endsWith('.stories.ts');

      const handleTag = (
        tagName: string | null,
        attrs: Map<string, string>,
        node: Rule.Node,
      ) => {
        const analysis = analyzeTag(tagName, attrs);
        if (!analysis) {
          return;
        }
        check(analysis, node, context);
      };

      const scanTextTags = (text: string, node: Rule.Node) => {
        const aliases = getBaseClassAliases(baseClass);
        if (
          !text.includes(baseClass) &&
          !aliases.some((alias) => text.includes(alias))
        ) {
          return;
        }
        const tags = extractTagStrings(text);
        for (const tagSource of tags) {
          const { tagName, attrs } = parseAttributes(tagSource);
          handleTag(tagName, attrs, node);
        }
      };

      const sourceCode = context.getSourceCode();
      const listener: Rule.RuleListener = {
        ...createHtmlListener({ isHtml, handleTag }),
        ...createStoryTemplateListener({ isStorySource, scanTextTags }),
        ...createJsxListener({ handleTag }),
        ...createVueListener({ sourceCode, handleTag }),
      };
      return listener;
    },
  };
}
