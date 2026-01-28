import StyleDictionary from 'style-dictionary';
import { register } from '@tokens-studio/sd-transforms';

register(StyleDictionary);

/** Token types that should be treated as size-like values. */
const sizeTokenTypes = new Set([
  'dimension',
  'fontSize',
  'borderRadius',
  'letterSpacing',
]);

/**
 * Extracts a string value from DTCG or legacy token shapes.
 * @param token - Token with optional `$value` or `value` fields.
 * @returns The string value or null when not a string.
 */
const getTokenStringValue = (token: { $value?: unknown; value?: unknown }) => {
  const value = token.value ?? token.$value;
  return typeof value === 'string' ? value : null;
};

/**
 * Checks whether a token declares a size-like type.
 * @param token - Token with optional `$type` or `type` fields.
 * @returns True when the token type is a size-like token type.
 */
const isSizeToken = (token: { $type?: unknown; type?: unknown }) => {
  const type = token.$type ?? token.type;
  return typeof type === 'string' && sizeTokenTypes.has(type);
};

/**
 * Checks if the token is the root text size token (keeps px values for html root).
 * @param token - Token with an optional path.
 * @returns True when the token path matches text.size.root.
 */
const isRootTextSize = (token: { path?: string[] }) =>
  Array.isArray(token.path) && token.path.join('.') === 'text.size.root';

/**
 * Checks if the token belongs to breakpoint tokens.
 * @param token - Token with an optional path.
 * @returns True when the token path starts with breakpoint.
 */
const isBreakpointToken = (token: { path?: string[] }) =>
  Array.isArray(token.path) && token.path[0] === 'breakpoint';

/** Matches any token in tokens/components. */
const componentPathRe = /(^|[\\/])tokens[\\/]components[\\/]/;
/** Matches the button component token file. */
const buttonPathRe = /(^|[\\/])tokens[\\/]components[\\/]button\.json$/;

/**
 * Checks if a token comes from the components token folder.
 * @param token - Token with an optional file path.
 * @returns True when the token file path is in tokens/components.
 */
const isComponentToken = (token: { filePath?: string }) =>
  componentPathRe.test(token.filePath ?? '');

/**
 * Checks if a token belongs to the button component token file.
 * @param token - Token with an optional file path.
 * @returns True when the token file path matches button.json.
 */
const isButtonToken = (token: { filePath?: string }) =>
  buttonPathRe.test(token.filePath ?? '');

/**
 * Checks if a token should be part of the base token bundle.
 * @param token - Token with an optional file path.
 * @returns True when the token is not a component token.
 */
const isBaseToken = (token: { filePath?: string }) => !isComponentToken(token);

/** Extracts the top-level token path segment. */
const getTokenHead = (token: { path?: string[] }) =>
  Array.isArray(token.path) ? token.path[0] : undefined;

/** Checks if a token is part of a text-related group. */
const isTextTokenHead = (head?: string) =>
  typeof head === 'string' && head.startsWith('text-');

/** Category filters for optional bundles. */
const categoryFilters = {
  color: (token: { path?: string[] }) => getTokenHead(token) === 'color',
  icon: (token: { path?: string[] }) => getTokenHead(token) === 'icon',
  space: (token: { path?: string[] }) => getTokenHead(token) === 'space',
  radius: (token: { path?: string[] }) => getTokenHead(token) === 'radius',
  elevation: (token: { path?: string[] }) =>
    getTokenHead(token) === 'prominence',
  motion: (token: { path?: string[] }) => {
    const head = getTokenHead(token);
    return head === 'duration' || head === 'timing';
  },
  type: (token: { path?: string[] }) => {
    const head = getTokenHead(token);
    return (
      head === 'font' ||
      head === 'type-scale' ||
      head === 'line-height-ratio' ||
      isTextTokenHead(head)
    );
  },
  breakpoints: (token: { path?: string[] }) =>
    getTokenHead(token) === 'breakpoint',
};

/**
 * Transform px sizes to numbers for React Native output.
 */
StyleDictionary.registerTransform({
  name: 'size/px-to-number',
  type: 'value',
  filter: (token) => isSizeToken(token) && getTokenStringValue(token) !== null,
  transform: (token) => {
    const value = getTokenStringValue(token);
    if (!value) return token.$value ?? token.value;
    if (!/^\d+(\.\d+)?px$/.test(value)) return value;
    return Number.parseFloat(value);
  },
});

/**
 * Transform px sizes to rem values (1rem = 10px) for web output.
 */
StyleDictionary.registerTransform({
  name: 'size/px-to-rem-10',
  type: 'value',
  transitive: true,
  filter: (token) =>
    isSizeToken(token) && !isRootTextSize(token) && !isBreakpointToken(token),
  transform: (token) => {
    const raw = token.$value ?? token.value;
    if (typeof raw !== 'string') return raw;
    return raw
      .split(' ')
      .map((part) => {
        const value = part.trim();
        if (!value) return value;
        if (value === '0' || value === '0px') return '0';
        if (value.includes('rem')) return value;
        const parsed = Number.parseFloat(value);
        if (Number.isNaN(parsed)) return value;
        if (!value.includes('px')) return value;
        const rem = parsed / 10;
        const remStr = rem.toFixed(4).replace(/0+$/, '').replace(/\.$/, '');
        return `${remStr}rem`;
      })
      .join(' ');
  },
});

/**
 * Outputs CSS custom media definitions from breakpoint tokens.
 */
StyleDictionary.registerFormat({
  name: 'css/custom-media',
  format: ({ dictionary }) => {
    const header = [
      '/**',
      ' * Do not edit directly, this file was auto-generated.',
      ' */',
      '',
    ].join('\n');
    const byPath = new Map(
      dictionary.allTokens.map((token) => [token.path.join('.'), token]),
    );
    const getValue = (path: string) =>
      byPath.get(path)?.value ?? byPath.get(path)?.$value;

    const sm = getValue('breakpoint.sm');
    const md = getValue('breakpoint.md');
    const lg = getValue('breakpoint.lg');

    const toPx = (value: string | undefined | null) => {
      if (!value) return null;
      const numeric = Number.parseFloat(String(value));
      if (Number.isNaN(numeric)) return null;
      return numeric;
    };

    const pxMinusOne = (value: string | undefined | null) => {
      const numeric = toPx(value);
      if (numeric === null) return null;
      return `${numeric - 1}px`;
    };

    const xsMax = pxMinusOne(sm);
    const smMin = sm ?? null;
    const smMax = pxMinusOne(md);
    const mdMin = md ?? null;
    const mdMax = pxMinusOne(lg);
    const lgMin = lg ?? null;

    const lines: string[] = [];
    if (xsMax) lines.push(`@custom-media --cdr-xs (max-width: ${xsMax});`);
    if (smMin && smMax) {
      lines.push(
        `@custom-media --cdr-sm (min-width: ${smMin}) and (max-width: ${smMax});`,
      );
    }
    if (mdMin && mdMax) {
      lines.push(
        `@custom-media --cdr-md (min-width: ${mdMin}) and (max-width: ${mdMax});`,
      );
    }
    if (lgMin) lines.push(`@custom-media --cdr-lg (min-width: ${lgMin});`);
    if (smMin) lines.push(`@custom-media --cdr-sm-up (min-width: ${smMin});`);
    if (mdMin) lines.push(`@custom-media --cdr-md-up (min-width: ${mdMin});`);
    if (lgMin) lines.push(`@custom-media --cdr-lg-up (min-width: ${lgMin});`);

    return `${header}${lines.join('\n')}\n`;
  },
});

/**
 * Outputs CSS variables for a dictionary.
 * @param dictionary - Style Dictionary token dictionary.
 * @returns CSS variables string.
 */
const formatCssVariables = (dictionary: {
  allTokens: Array<{ name: string; value?: unknown; $value?: unknown }>;
}) => {
  const header = [
    '/**',
    ' * Do not edit directly, this file was auto-generated.',
    ' */',
    '',
  ].join('\n');
  const lines = dictionary.allTokens.map((token) => {
    const value = token.value ?? token.$value;
    return `  --${token.name}: ${value};`;
  });

  return `${header}:root {\n${lines.join('\n')}\n}\n`;
};

/**
 * Outputs CSS variables with Cedar legacy alias tokens for negative scales.
 */
StyleDictionary.registerFormat({
  name: 'css/variables-with-aliases',
  format: ({ dictionary }) => {
    const baseOutput = formatCssVariables(dictionary);
    const tokenNames = new Set(dictionary.allTokens.map((token) => token.name));
    const aliasLines: string[] = [];

    if (tokenNames.has('cdr-type-scale-minus-1')) {
      aliasLines.push('  --cdr-type-scale--1: var(--cdr-type-scale-minus-1);');
    }
    if (tokenNames.has('cdr-type-scale-minus-2')) {
      aliasLines.push('  --cdr-type-scale--2: var(--cdr-type-scale-minus-2);');
    }
    if (tokenNames.has('cdr-line-height-ratio-utility-minus-1')) {
      aliasLines.push(
        '  --cdr-line-height-ratio-utility--1: var(--cdr-line-height-ratio-utility-minus-1);',
      );
    }

    if (aliasLines.length === 0) {
      return baseOutput;
    }

    return baseOutput.replace(/\n}\s*$/, `\n${aliasLines.join('\n')}\n}\n`);
  },
});

/**
 * Filters out internal "options" tokens from outputs.
 * @param token - Token with a computed path.
 * @returns True when the token should be included in outputs.
 */
const withoutOptions = (token: { path: string[] }) =>
  !token.path.includes('options');

/**
 * Checks if a token belongs to the color palette.
 * @param token - Token with an optional path.
 * @returns True when the token path matches color.palette.*.
 */
const isPaletteToken = (token: { path?: string[] }) =>
  Array.isArray(token.path) &&
  token.path.length >= 2 &&
  token.path[0] === 'color' &&
  token.path[1] === 'palette';

/**
 * Exclude palette tokens and root text size from legacy-parity outputs.
 */
const withoutLegacyGaps = (token: { path: string[] }) =>
  withoutOptions(token) && !isPaletteToken(token) && !isRootTextSize(token);

/** Shared transform list for web CSS outputs. */
const webTransforms = [
  'attribute/cti',
  'name/kebab',
  'time/seconds',
  'html/icon',
  'size/px-to-rem-10',
  'color/css',
  'asset/url',
  'cubicBezier/css',
  'strokeStyle/css/shorthand',
  'border/css/shorthand',
  'typography/css/shorthand',
  'transition/css/shorthand',
  'shadow/css/shorthand',
];

/**
 * Builds Cedar token outputs.
 * - web: full and base bundles with concrete values
 * - webComponents: component bundles referencing base variables
 * - rn: JSON outputs with resolved values
 */
const sd = new StyleDictionary({
  source: ['tokens/**/*.json'],
  usesDtcg: true,
  platforms: {
    web: {
      transforms: webTransforms,
      prefix: 'cdr',
      buildPath: 'dist/web/',
      files: [
        {
          destination: 'core.css',
          format: 'css/variables-with-aliases',
          filter: (token) => withoutLegacyGaps(token) && isBaseToken(token),
          options: {
            outputReferences: false,
          },
        },
        {
          destination: 'tokens.json',
          format: 'json/nested',
          filter: withoutLegacyGaps,
        },
        {
          destination: 'components.css',
          format: 'css/variables-with-aliases',
          filter: (token) => withoutOptions(token) && isComponentToken(token),
          options: {
            outputReferences: false,
          },
        },
        {
          destination: 'categories/color.css',
          format: 'css/variables-with-aliases',
          filter: (token) =>
            withoutLegacyGaps(token) &&
            isBaseToken(token) &&
            categoryFilters.color(token),
          options: {
            outputReferences: false,
          },
        },
        {
          destination: 'categories/type.css',
          format: 'css/variables-with-aliases',
          filter: (token) =>
            withoutLegacyGaps(token) &&
            isBaseToken(token) &&
            categoryFilters.type(token),
          options: {
            outputReferences: false,
          },
        },
        {
          destination: 'categories/space.css',
          format: 'css/variables-with-aliases',
          filter: (token) =>
            withoutLegacyGaps(token) &&
            isBaseToken(token) &&
            categoryFilters.space(token),
          options: {
            outputReferences: false,
          },
        },
        {
          destination: 'categories/radius.css',
          format: 'css/variables-with-aliases',
          filter: (token) =>
            withoutLegacyGaps(token) &&
            isBaseToken(token) &&
            categoryFilters.radius(token),
          options: {
            outputReferences: false,
          },
        },
        {
          destination: 'categories/motion.css',
          format: 'css/variables-with-aliases',
          filter: (token) =>
            withoutLegacyGaps(token) &&
            isBaseToken(token) &&
            categoryFilters.motion(token),
          options: {
            outputReferences: false,
          },
        },
        {
          destination: 'categories/elevation.css',
          format: 'css/variables-with-aliases',
          filter: (token) =>
            withoutLegacyGaps(token) &&
            isBaseToken(token) &&
            categoryFilters.elevation(token),
          options: {
            outputReferences: false,
          },
        },
        {
          destination: 'categories/icon.css',
          format: 'css/variables-with-aliases',
          filter: (token) =>
            withoutLegacyGaps(token) &&
            isBaseToken(token) &&
            categoryFilters.icon(token),
          options: {
            outputReferences: false,
          },
        },
        {
          destination: 'categories/breakpoints.css',
          format: 'css/variables-with-aliases',
          filter: (token) =>
            withoutLegacyGaps(token) &&
            isBaseToken(token) &&
            categoryFilters.breakpoints(token),
          options: {
            outputReferences: false,
          },
        },
      ],
    },
    webComponents: {
      transforms: webTransforms,
      prefix: 'cdr',
      buildPath: 'dist/web/',
      log: {
        warnings: 'disabled',
      },
      files: [
        {
          destination: 'components/button.css',
          format: 'css/variables',
          filter: (token) => withoutOptions(token) && isButtonToken(token),
          options: {
            outputReferences: false,
          },
        },
        {
          destination: 'components/button.json',
          format: 'json/nested',
          filter: (token) => withoutOptions(token) && isButtonToken(token),
        },
      ],
    },
    rn: {
      transforms: ['size/px-to-number'],
      buildPath: 'dist/react-native/',
      files: [
        {
          destination: 'tokens.json',
          format: 'json/nested',
          filter: withoutOptions,
        },
        {
          destination: 'components/button.json',
          format: 'json/nested',
          filter: (token) => withoutOptions(token) && isButtonToken(token),
        },
      ],
    },
  },
});

/**
 * Runs platform builds sequentially to keep log warnings scoped per platform.
 * @returns Promise<void>
 */
const run = async () => {
  await sd.buildPlatform('web');
  await sd.buildPlatform('webComponents');
  await sd.buildPlatform('rn');
};

run();
