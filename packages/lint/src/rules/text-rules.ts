import type { Rule } from 'eslint';
import type { TextComponentInfo, TextTagAnalysis } from '../types.js';
import {
  analyzeModifiers,
  buildMeta,
  createRule,
  findDuplicateClasses,
  getClassValue,
  includesDynamicValue,
  reportClasses,
  reportUniqueClasses,
  splitClasses,
  unique,
} from '../utils.js';

type TextComponentSpec = {
  baseClass: string;
  modifiers: string[];
};

const TEXT_COMPONENTS: TextComponentSpec[] = [
  { baseClass: 'cdr-text', modifiers: [] },
  {
    baseClass: 'cdr-body',
    modifiers: ['cdr-body--scale-0', 'cdr-body--scale-1', 'cdr-body--strong'],
  },
  { baseClass: 'cdr-eyebrow', modifiers: [] },
  {
    baseClass: 'cdr-heading-display',
    modifiers: [
      'cdr-heading-display--scale-2',
      'cdr-heading-display--scale-3',
      'cdr-heading-display--scale-4',
      'cdr-heading-display--scale-5',
      'cdr-heading-display--scale-6',
      'cdr-heading-display--scale-7',
    ],
  },
  {
    baseClass: 'cdr-heading-sans',
    modifiers: [
      'cdr-heading-sans--scale-1',
      'cdr-heading-sans--scale-2',
      'cdr-heading-sans--scale-3',
    ],
  },
  {
    baseClass: 'cdr-heading-serif',
    modifiers: [
      'cdr-heading-serif--scale-1',
      'cdr-heading-serif--scale-2',
      'cdr-heading-serif--scale-3',
      'cdr-heading-serif--scale-4',
      'cdr-heading-serif--scale-5',
      'cdr-heading-serif--strong',
    ],
  },
  {
    baseClass: 'cdr-subheading-sans',
    modifiers: [
      'cdr-subheading-sans--scale-minus-1',
      'cdr-subheading-sans--scale-0',
      'cdr-subheading-sans--scale-1',
      'cdr-subheading-sans--scale-2',
    ],
  },
  {
    baseClass: 'cdr-utility-sans',
    modifiers: [
      'cdr-utility-sans--scale-minus-1',
      'cdr-utility-sans--scale-0',
      'cdr-utility-sans--scale-1',
      'cdr-utility-sans--scale-2',
      'cdr-utility-sans--scale-3',
      'cdr-utility-sans--strong',
    ],
  },
  {
    baseClass: 'cdr-utility-serif',
    modifiers: [
      'cdr-utility-serif--scale-minus-1',
      'cdr-utility-serif--scale-0',
      'cdr-utility-serif--scale-1',
      'cdr-utility-serif--scale-2',
      'cdr-utility-serif--scale-3',
      'cdr-utility-serif--strong',
    ],
  },
];

const BASE_CLASSES = TEXT_COMPONENTS.map((component) => component.baseClass);

/**
 * Detect whether a class belongs to the text preset system.
 * @param className - Class name.
 * @returns True when the class is a text class.
 */
function isTextClass(className: string): boolean {
  return BASE_CLASSES.some(
    (base) => className === base || className.startsWith(`${base}--`),
  );
}

/**
 * Extract text-related classes from a class list.
 * @param classes - Class list.
 * @returns List of text classes.
 */
function getTextClasses(classes: string[]): string[] {
  return classes.filter((className) =>
    BASE_CLASSES.some(
      (base) => className === base || className.startsWith(base),
    ),
  );
}

/**
 * Build text component analysis payload.
 * @param classes - Class list.
 * @returns Component analysis entries.
 */
function buildTextComponents(classes: string[]): TextComponentInfo[] {
  return TEXT_COMPONENTS.flatMap((component) => {
    const { baseClass, modifiers } = component;
    const modifierPrefix = `${baseClass}--`;
    const allowedModifiers = new Set(modifiers);
    const isRelevant = classes.some(
      (className) => className === baseClass || className.startsWith(baseClass),
    );
    if (!isRelevant) {
      return [];
    }
    const info = analyzeModifiers({
      baseClass,
      modifierPrefix,
      allowedModifiers,
      classes,
    });
    const scaleModifiers = classes.filter((className) =>
      className.startsWith(`${baseClass}--scale-`),
    );
    return [{ baseClass, info, scaleModifiers }];
  });
}

/**
 * Build a text rule wrapper.
 * @param options - Rule options.
 * @returns ESLint rule module.
 */
function createTextRule(options: {
  meta: Rule.RuleMetaData;
  check: (
    analysis: TextTagAnalysis,
    node: Rule.Node,
    context: Rule.RuleContext,
  ) => void;
}): Rule.RuleModule {
  /**
   * Build analysis payload from text classes.
   * @param tagName - Tag name.
   * @param attrs - Attribute map.
   * @returns Text tag analysis or null.
   */
  const analyzeTag = (
    tagName: string | null,
    attrs: Map<string, string>,
  ): TextTagAnalysis | null => {
    if (!tagName) {
      return null;
    }
    const classValue = getClassValue(attrs);
    if (!classValue || includesDynamicValue(classValue)) {
      return null;
    }
    const classes = splitClasses(classValue);
    if (!classes.some(isTextClass)) {
      return null;
    }
    return {
      tagName: String(tagName),
      attrs,
      classes,
      textClasses: getTextClasses(classes),
      duplicateTextClasses: findDuplicateClasses(getTextClasses(classes)),
      components: buildTextComponents(classes),
    };
  };

  return createRule<TextTagAnalysis>({
    meta: options.meta,
    baseClass: 'cdr-',
    analyzeTag,
    check: options.check,
  });
}

const ruleMissingBase = createTextRule({
  /**
   * Require base classes when modifiers are present.
   */
  meta: buildMeta('Require text base classes for modifiers.', {
    missingBase: '"{{baseClass}}" modifiers require the base class.',
  }),
  /**
   * @param analysis - Tag analysis.
   * @param node - AST node.
   * @param context - Rule context.
   */
  check(analysis, node, context) {
    for (const component of analysis.components) {
      if (!component.info.hasBase && component.info.modifiers.length > 0) {
        context.report({
          node,
          messageId: 'missingBase',
          data: { baseClass: component.baseClass },
        });
      }
    }
  },
});

const ruleInvalidModifier = createTextRule({
  /**
   * Validate text modifier values.
   */
  meta: buildMeta('Validate text modifier values.', {
    invalidModifier: 'Unknown text modifier "{{className}}".',
  }),
  /**
   * @param analysis - Tag analysis.
   * @param node - AST node.
   * @param context - Rule context.
   */
  check(analysis, node, context) {
    const invalidModifiers = analysis.components.flatMap(
      (component) => component.info.invalidModifiers,
    );
    reportClasses(context, node, 'invalidModifier', unique(invalidModifiers));
  },
});

const ruleInvalidPrefix = createTextRule({
  /**
   * Validate text modifier prefixes.
   */
  meta: buildMeta('Validate text modifier prefixes.', {
    invalidPrefix:
      'Text modifiers must use the "--" separator (for example, cdr-heading-sans--scale-2).',
  }),
  /**
   * @param analysis - Tag analysis.
   * @param node - AST node.
   * @param context - Rule context.
   */
  check(analysis, node, context) {
    const invalidPrefixes = analysis.components.flatMap(
      (component) => component.info.invalidPrefixes,
    );
    reportClasses(context, node, 'invalidPrefix', unique(invalidPrefixes));
  },
});

const ruleDuplicate = createTextRule({
  /**
   * Prevent duplicate text classes.
   */
  meta: buildMeta('Prevent duplicate text classes.', {
    duplicateClass: 'Duplicate text class "{{className}}" is not allowed.',
  }),
  /**
   * @param analysis - Tag analysis.
   * @param node - AST node.
   * @param context - Rule context.
   */
  check(analysis, node, context) {
    reportUniqueClasses(
      context,
      node,
      'duplicateClass',
      analysis.duplicateTextClasses,
    );
  },
});

const ruleMultipleScale = createTextRule({
  /**
   * Ensure only one scale modifier is applied per preset.
   */
  meta: buildMeta('Prevent multiple text scale modifiers.', {
    multipleScale:
      '"{{baseClass}}" should only include one scale modifier (found: {{classList}}).',
  }),
  /**
   * @param analysis - Tag analysis.
   * @param node - AST node.
   * @param context - Rule context.
   */
  check(analysis, node, context) {
    for (const component of analysis.components) {
      const uniqueScales = unique(component.scaleModifiers);
      if (uniqueScales.length > 1) {
        context.report({
          node,
          messageId: 'multipleScale',
          data: {
            baseClass: component.baseClass,
            classList: uniqueScales.join(', '),
          },
        });
      }
    }
  },
});

export default {
  rules: {
    'text-missing-base': ruleMissingBase,
    'text-invalid-modifier': ruleInvalidModifier,
    'text-invalid-prefix': ruleInvalidPrefix,
    'text-duplicate': ruleDuplicate,
    'text-multiple-scale': ruleMultipleScale,
  },
  configs: {
    recommended: {
      rules: {
        'cedar/text-missing-base': 'error',
        'cedar/text-invalid-modifier': 'error',
        'cedar/text-invalid-prefix': 'error',
        'cedar/text-duplicate': 'error',
        'cedar/text-multiple-scale': 'error',
      },
    },
  },
};
