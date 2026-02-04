import type { Rule } from 'eslint';
import type { AccordionTagAnalysis } from '../types.js';
import {
  analyzeModifiers,
  buildMeta,
  createRule,
  findDuplicateClasses,
  getClassValue,
  includesDynamicValue,
  reportClasses,
  splitClasses,
  unique,
} from '../utils.js';

const BASE_CLASS = 'cdr-accordion';
const MODIFIER_PREFIX = `${BASE_CLASS}--`;
const ELEMENT_PREFIX = `${BASE_CLASS}__`;
const HEADER_CLASS = `${BASE_CLASS}__header`;
const HEADER_UNWRAPPED_CLASS = `${BASE_CLASS}__header--unwrapped`;
const BUTTON_CLASS = `${BASE_CLASS}__button`;
const LABEL_CLASS = `${BASE_CLASS}__label`;
const ICON_CLASS = `${BASE_CLASS}__icon`;
const CONTENT_CONTAINER_CLASS = `${BASE_CLASS}__content-container`;
const CONTENT_CLASS = `${BASE_CLASS}__content`;

const ALLOWED_MODIFIERS = new Set([
  `${BASE_CLASS}--compact`,
  `${BASE_CLASS}--border-aligned`,
  `${BASE_CLASS}--no-spacing`,
  `${BASE_CLASS}--unwrap`,
  `${BASE_CLASS}--open`,
  `${BASE_CLASS}--closed`,
]);

const ALLOWED_ELEMENT_CLASSES = new Set([
  HEADER_CLASS,
  HEADER_UNWRAPPED_CLASS,
  BUTTON_CLASS,
  LABEL_CLASS,
  ICON_CLASS,
  CONTENT_CONTAINER_CLASS,
  CONTENT_CLASS,
]);

const BASE_REQUIRED_MODIFIERS = new Set([
  `${BASE_CLASS}--compact`,
  `${BASE_CLASS}--border-aligned`,
  `${BASE_CLASS}--no-spacing`,
]);

const VALID_BASE_TAGS = new Set(['div', 'li']);
const VALID_BUTTON_TAGS = new Set(['button', 'div']);
const VALID_ICON_TAGS = new Set(['span', 'svg']);

/**
 * Detect accordion-related class names.
 * @param className - Class name.
 * @returns True when accordion class is present.
 */
function isAccordionClass(className: string): boolean {
  return (
    className === BASE_CLASS ||
    className.startsWith(`${BASE_CLASS}__`) ||
    className.startsWith(`${BASE_CLASS}--`)
  );
}

/**
 * Build accordion tag analysis data.
 * @param tagName - Tag name.
 * @param attrs - Attribute map.
 * @returns Accordion analysis or null.
 */
function analyzeAccordionTag(
  tagName: string | null,
  attrs: Map<string, string>,
): AccordionTagAnalysis | null {
  if (!tagName) {
    return null;
  }
  const classValue = getClassValue(attrs);
  if (!classValue || includesDynamicValue(classValue)) {
    return null;
  }
  const classes = splitClasses(classValue);
  const accordionClasses = classes.filter(isAccordionClass);
  if (accordionClasses.length === 0) {
    return null;
  }
  const invalidElementClasses = accordionClasses.filter(
    (className) =>
      className.startsWith(ELEMENT_PREFIX) &&
      !ALLOWED_ELEMENT_CLASSES.has(className),
  );
  const duplicateClasses = findDuplicateClasses(accordionClasses);
  const modifierClasses = accordionClasses.filter(
    (className) => !className.startsWith(ELEMENT_PREFIX),
  );
  const info = analyzeModifiers({
    baseClass: BASE_CLASS,
    modifierPrefix: MODIFIER_PREFIX,
    allowedModifiers: ALLOWED_MODIFIERS,
    classes: modifierClasses,
  });

  return {
    tagName: tagName.toLowerCase(),
    classes,
    accordionClasses,
    invalidElementClasses,
    duplicateClasses,
    info,
    hasBase: accordionClasses.includes(BASE_CLASS),
    hasHeader: accordionClasses.includes(HEADER_CLASS),
    hasHeaderUnwrapped: accordionClasses.includes(HEADER_UNWRAPPED_CLASS),
    hasButton: accordionClasses.includes(BUTTON_CLASS),
    hasLabel: accordionClasses.includes(LABEL_CLASS),
    hasIcon: accordionClasses.includes(ICON_CLASS),
    hasContentContainer: accordionClasses.includes(CONTENT_CONTAINER_CLASS),
    hasContent: accordionClasses.includes(CONTENT_CLASS),
  };
}

/**
 * Build an accordion rule wrapper.
 * @param options - Rule options.
 * @returns ESLint rule module.
 */
function createAccordionRule(options: {
  meta: Rule.RuleMetaData;
  check: (
    analysis: AccordionTagAnalysis,
    node: Rule.Node,
    context: Rule.RuleContext,
  ) => void;
}) {
  return createRule<AccordionTagAnalysis>({
    ...options,
    baseClass: BASE_CLASS,
    analyzeTag: analyzeAccordionTag,
  });
}

const ruleMissingBase = createAccordionRule({
  meta: buildMeta('Require cdr-accordion base class for modifiers.', {
    missingBase: 'cdr-accordion modifiers require the base class.',
  }),
  check(analysis, node, context) {
    const baseRequired = analysis.info.modifiers.filter((modifier) =>
      BASE_REQUIRED_MODIFIERS.has(modifier),
    );
    if (!analysis.info.hasBase && baseRequired.length > 0) {
      context.report({ node, messageId: 'missingBase' });
    }
  },
});

const ruleInvalidModifier = createAccordionRule({
  meta: buildMeta('Validate cdr-accordion modifier values.', {
    invalidModifier: 'Unknown accordion modifier "{{className}}".',
  }),
  check(analysis, node, context) {
    reportClasses(
      context,
      node,
      'invalidModifier',
      unique(analysis.info.invalidModifiers),
    );
  },
});

const ruleInvalidPrefix = createAccordionRule({
  meta: buildMeta('Validate cdr-accordion modifier prefixes.', {
    invalidPrefix:
      'cdr-accordion modifiers must use the "--" separator (for example, cdr-accordion--compact).',
  }),
  check(analysis, node, context) {
    reportClasses(
      context,
      node,
      'invalidPrefix',
      unique(analysis.info.invalidPrefixes),
    );
  },
});

const ruleInvalidElementClass = createAccordionRule({
  meta: buildMeta('Validate cdr-accordion element class usage.', {
    invalidClass: 'Unknown accordion element class "{{className}}".',
  }),
  check(analysis, node, context) {
    reportClasses(
      context,
      node,
      'invalidClass',
      unique(analysis.invalidElementClasses),
    );
  },
});

const ruleDuplicate = createAccordionRule({
  meta: buildMeta('Prevent duplicate cdr-accordion classes.', {
    duplicateClass: 'Duplicate accordion class "{{className}}" is not allowed.',
  }),
  check(analysis, node, context) {
    reportClasses(context, node, 'duplicateClass', analysis.duplicateClasses);
  },
});

const ruleBaseTag = createAccordionRule({
  meta: buildMeta('Restrict cdr-accordion to valid tags.', {
    invalidTag: 'cdr-accordion should be used on <div> or <li> elements.',
  }),
  check(analysis, node, context) {
    if (analysis.hasBase && !VALID_BASE_TAGS.has(analysis.tagName)) {
      context.report({ node, messageId: 'invalidTag' });
    }
  },
});

const ruleHeaderTag = createAccordionRule({
  meta: buildMeta('Restrict cdr-accordion__header to heading tags.', {
    invalidHeaderTag:
      'cdr-accordion__header should be used on a heading element.',
  }),
  check(analysis, node, context) {
    if (analysis.hasHeader || analysis.hasHeaderUnwrapped) {
      if (!/^h[1-6]$/.test(analysis.tagName)) {
        context.report({ node, messageId: 'invalidHeaderTag' });
      }
    }
  },
});

const ruleHeaderModifier = createAccordionRule({
  meta: buildMeta('Require cdr-accordion__header for header modifiers.', {
    missingHeader:
      'cdr-accordion__header--unwrapped should be used with cdr-accordion__header.',
  }),
  check(analysis, node, context) {
    if (analysis.hasHeaderUnwrapped && !analysis.hasHeader) {
      context.report({ node, messageId: 'missingHeader' });
    }
  },
});

const ruleButtonTag = createAccordionRule({
  meta: buildMeta('Restrict cdr-accordion__button to button tags.', {
    invalidButtonTag:
      'cdr-accordion__button should be used on a <button> or <div> element.',
  }),
  check(analysis, node, context) {
    if (analysis.hasButton && !VALID_BUTTON_TAGS.has(analysis.tagName)) {
      context.report({ node, messageId: 'invalidButtonTag' });
    }
  },
});

const ruleLabelTag = createAccordionRule({
  meta: buildMeta('Restrict cdr-accordion__label to <span>.', {
    invalidLabelTag: 'cdr-accordion__label should be used on a <span> element.',
  }),
  check(analysis, node, context) {
    if (analysis.hasLabel && analysis.tagName !== 'span') {
      context.report({ node, messageId: 'invalidLabelTag' });
    }
  },
});

const ruleIconTag = createAccordionRule({
  meta: buildMeta('Restrict cdr-accordion__icon to valid tags.', {
    invalidIconTag:
      'cdr-accordion__icon should be used on a <span> or <svg> element.',
  }),
  check(analysis, node, context) {
    if (analysis.hasIcon && !VALID_ICON_TAGS.has(analysis.tagName)) {
      context.report({ node, messageId: 'invalidIconTag' });
    }
  },
});

const ruleContentContainerTag = createAccordionRule({
  meta: buildMeta('Restrict cdr-accordion__content-container to <div>.', {
    invalidContainerTag:
      'cdr-accordion__content-container should be used on a <div> element.',
  }),
  check(analysis, node, context) {
    if (analysis.hasContentContainer && analysis.tagName !== 'div') {
      context.report({ node, messageId: 'invalidContainerTag' });
    }
  },
});

const ruleContentTag = createAccordionRule({
  meta: buildMeta('Restrict cdr-accordion__content to <div>.', {
    invalidContentTag:
      'cdr-accordion__content should be used on a <div> element.',
  }),
  check(analysis, node, context) {
    if (analysis.hasContent && analysis.tagName !== 'div') {
      context.report({ node, messageId: 'invalidContentTag' });
    }
  },
});

const rules = {
  'accordion/invalid-class': ruleInvalidElementClass,
  'accordion/invalid-modifier': ruleInvalidModifier,
  'accordion/invalid-prefix': ruleInvalidPrefix,
  'accordion/duplicate': ruleDuplicate,
  'accordion/missing-base': ruleMissingBase,
  'accordion/base-tag': ruleBaseTag,
  'accordion/header-tag': ruleHeaderTag,
  'accordion/header-modifier': ruleHeaderModifier,
  'accordion/button-tag': ruleButtonTag,
  'accordion/label-tag': ruleLabelTag,
  'accordion/icon-tag': ruleIconTag,
  'accordion/content-container-tag': ruleContentContainerTag,
  'accordion/content-tag': ruleContentTag,
};

const configs = {
  recommended: {
    rules: {
      'cedar/accordion/invalid-class': 'error',
      'cedar/accordion/invalid-modifier': 'error',
      'cedar/accordion/invalid-prefix': 'error',
      'cedar/accordion/duplicate': 'error',
      'cedar/accordion/missing-base': 'error',
      'cedar/accordion/base-tag': 'error',
      'cedar/accordion/header-tag': 'error',
      'cedar/accordion/header-modifier': 'error',
      'cedar/accordion/button-tag': 'error',
      'cedar/accordion/label-tag': 'error',
      'cedar/accordion/icon-tag': 'error',
      'cedar/accordion/content-container-tag': 'error',
      'cedar/accordion/content-tag': 'error',
    },
  },
};

export default { rules, configs };
export { rules, configs };
