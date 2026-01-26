// @ts-check

import {
  createRule,
  buildMeta,
  includesDynamicValue,
  reportClasses,
  splitClasses,
  unique,
} from './utils.mjs';

const BASE_CLASS = 'cdr-link';
const MODIFIER_PREFIX = `${BASE_CLASS}--`;
const ALLOWED_MODIFIERS = new Set([
  `${BASE_CLASS}--standalone`,
  `${BASE_CLASS}--neutral`,
  `${BASE_CLASS}--inherit-color`,
]);
const VALID_TAGS = new Set(['a', 'button']);

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
 *   tagName: string,
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
  return {
    tagName,
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
function createLinkRule(options) {
  return createRule({
    ...options,
    baseClass: BASE_CLASS,
    analyzeTag,
  });
}

const ruleMissingBase = createLinkRule({
  meta: buildMeta('Require cdr-link base class for modifiers.', {
    missingBase: 'cdr-link modifiers require the base class.',
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

const ruleInvalidModifier = createLinkRule({
  meta: buildMeta('Validate cdr-link modifier values.', {
    invalidModifier: 'Unknown link modifier "{{className}}".',
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

const ruleInvalidPrefix = createLinkRule({
  meta: buildMeta('Validate cdr-link modifier prefixes.', {
    invalidPrefix:
      'cdr-link modifiers must use the "--" separator (for example, cdr-link--standalone).',
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

const ruleDuplicate = createLinkRule({
  meta: buildMeta('Prevent duplicate cdr-link classes.', {
    duplicateClass: 'Duplicate link class "{{className}}" is not allowed.',
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

const ruleInvalidTag = createLinkRule({
  meta: buildMeta('Restrict cdr-link classes to valid tags.', {
    invalidTag: 'cdr-link classes are only valid on <a> or <button> elements.',
  }),
  check(analysis, node, context) {
    if (!analysis) {
      return;
    }
    if (!VALID_TAGS.has(analysis.tagName)) {
      context.report({ node, messageId: 'invalidTag' });
    }
  },
});

const ruleAnchorHref = createLinkRule({
  meta: buildMeta('Require href on anchor links.', {
    missingHref: '<a> elements with cdr-link must include an href.',
  }),
  check(analysis, node, context) {
    if (!analysis) {
      return;
    }
    if (analysis.tagName !== 'a') {
      return;
    }
    const href = analysis.attrs.get('href') ?? '';
    if (!href || includesDynamicValue(href)) {
      context.report({ node, messageId: 'missingHref' });
    }
  },
});

const ruleBlankRel = createLinkRule({
  meta: buildMeta('Require rel when target is _blank.', {
    missingRel:
      'Links with target="_blank" should include rel="noopener noreferrer".',
  }),
  check(analysis, node, context) {
    if (!analysis) {
      return;
    }
    if (analysis.tagName !== 'a') {
      return;
    }
    const target = analysis.attrs.get('target') ?? '';
    if (!target || includesDynamicValue(target)) {
      return;
    }
    if (target !== '_blank') {
      return;
    }
    const rel = analysis.attrs.get('rel') ?? '';
    if (!rel || includesDynamicValue(rel)) {
      context.report({ node, messageId: 'missingRel' });
    }
  },
});

export default {
  rules: {
    'link-missing-base': ruleMissingBase,
    'link-invalid-modifier': ruleInvalidModifier,
    'link-invalid-prefix': ruleInvalidPrefix,
    'link-duplicate': ruleDuplicate,
    'link-invalid-tag': ruleInvalidTag,
    'link-anchor-href': ruleAnchorHref,
    'link-blank-rel': ruleBlankRel,
  },
  configs: {
    recommended: {
      rules: {
        'cedar/link-missing-base': 'error',
        'cedar/link-invalid-modifier': 'error',
        'cedar/link-invalid-prefix': 'error',
        'cedar/link-duplicate': 'error',
        'cedar/link-invalid-tag': 'error',
        'cedar/link-anchor-href': 'error',
        'cedar/link-blank-rel': 'error',
      },
    },
  },
};
