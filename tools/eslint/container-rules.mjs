// @ts-check

import {
  createRule,
  buildMeta,
  includesDynamicValue,
  reportClasses,
  splitClasses,
  unique,
} from './utils.mjs';

const BASE_CLASS = 'cdr-container';
const MODIFIER_PREFIX = `${BASE_CLASS}--`;
const ALLOWED_MODIFIERS = new Set([
  `${BASE_CLASS}--static`,
  `${BASE_CLASS}--fluid`,
]);

/** @param {Map<string, string>} attrs @returns {string} */
function getClassValue(attrs) {
  return attrs.get('class') ?? attrs.get('classname') ?? '';
}

/**
 * @typedef {{
 *   hasBase: boolean,
 *   modifiers: string[],
 *   duplicateClasses: string[],
 *   invalidPrefixes: string[],
 *   invalidModifiers: string[],
 * }} ClassInfo
 */

/** @param {string[]} classes @returns {ClassInfo} */
function analyzeClasses(classes) {
  const seen = new Set();
  const duplicates = new Set();
  const modifiers = [];
  const invalidPrefixes = [];
  const invalidModifiers = [];

  for (const cls of classes) {
    if (seen.has(cls)) {
      duplicates.add(cls);
    }
    seen.add(cls);

    if (cls.startsWith(BASE_CLASS) && cls !== BASE_CLASS) {
      if (!cls.startsWith(MODIFIER_PREFIX)) {
        invalidPrefixes.push(cls);
      } else {
        modifiers.push(cls);
        if (!ALLOWED_MODIFIERS.has(cls)) {
          invalidModifiers.push(cls);
        }
      }
    }
  }

  return {
    hasBase: classes.includes(BASE_CLASS),
    modifiers,
    duplicateClasses: Array.from(duplicates),
    invalidPrefixes,
    invalidModifiers,
  };
}

/**
 * @typedef {{
 *   classes: string[],
 *   info: ClassInfo,
 * }} TagAnalysis
 */

/** @param {string | null} tagName @param {Map<string, string>} attrs @returns {TagAnalysis | null} */
function analyzeTag(tagName, attrs) {
  if (!tagName) {
    return null;
  }
  const classValue = getClassValue(attrs);
  if (!classValue || includesDynamicValue(classValue)) {
    return null;
  }
  const classes = splitClasses(classValue);
  if (
    !classes.some(
      (cls) => cls === BASE_CLASS || cls.startsWith(MODIFIER_PREFIX),
    )
  ) {
    return null;
  }
  return { classes, info: analyzeClasses(classes) };
}

/**
 * @param {{
 *   meta: import('eslint').Rule.RuleMetaData,
 *   check: (analysis: TagAnalysis, node: any, context: import('eslint').Rule.RuleContext) => void,
 * }} options
 */
function createContainerRule(options) {
  return createRule({
    ...options,
    baseClass: BASE_CLASS,
    analyzeTag,
  });
}

const ruleMissingBase = createContainerRule({
  meta: buildMeta('Require cdr-container base class for modifiers.', {
    missingBase: 'cdr-container modifiers require the base class.',
  }),
  check(analysis, node, context) {
    if (!analysis) {
      return;
    }
    if (!analysis.info.hasBase && analysis.info.modifiers.length > 0) {
      context.report({ node, messageId: 'missingBase' });
    }
  },
});

const ruleMissingModifier = createContainerRule({
  meta: buildMeta('Require a cdr-container modifier.', {
    missingModifier:
      'cdr-container should include cdr-container--static or cdr-container--fluid.',
  }),
  check(analysis, node, context) {
    if (!analysis) {
      return;
    }
    if (analysis.info.hasBase && analysis.info.modifiers.length === 0) {
      context.report({ node, messageId: 'missingModifier' });
    }
  },
});

const ruleInvalidModifier = createContainerRule({
  meta: buildMeta('Validate cdr-container modifier values.', {
    invalidModifier: 'Unknown container modifier "{{className}}".',
  }),
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

const ruleInvalidPrefix = createContainerRule({
  meta: buildMeta('Validate cdr-container modifier prefixes.', {
    invalidPrefix:
      'cdr-container modifiers must use the "--" separator (for example, cdr-container--static).',
  }),
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

const ruleDuplicate = createContainerRule({
  meta: buildMeta('Prevent duplicate cdr-container classes.', {
    duplicateClass: 'Duplicate container class "{{className}}" is not allowed.',
  }),
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

const ruleConflictingModifiers = createContainerRule({
  meta: buildMeta('Prevent conflicting cdr-container modifiers.', {
    conflictingModifiers:
      'cdr-container should not include multiple modifiers: {{className}}.',
  }),
  check(analysis, node, context) {
    if (!analysis) {
      return;
    }
    const modifiers = unique(analysis.info.modifiers);
    if (modifiers.length > 1) {
      context.report({
        node,
        messageId: 'conflictingModifiers',
        data: { className: modifiers.join(', ') },
      });
    }
  },
});

export default {
  rules: {
    'container-missing-base': ruleMissingBase,
    'container-missing-modifier': ruleMissingModifier,
    'container-invalid-modifier': ruleInvalidModifier,
    'container-invalid-prefix': ruleInvalidPrefix,
    'container-duplicate': ruleDuplicate,
    'container-conflicting-modifiers': ruleConflictingModifiers,
  },
  configs: {
    recommended: {
      rules: {
        'cedar/container-missing-base': 'error',
        'cedar/container-missing-modifier': 'error',
        'cedar/container-invalid-modifier': 'error',
        'cedar/container-invalid-prefix': 'error',
        'cedar/container-duplicate': 'error',
        'cedar/container-conflicting-modifiers': 'error',
      },
    },
  },
};
