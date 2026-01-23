import StyleDictionary from 'style-dictionary';
import { register } from '@tokens-studio/sd-transforms';

register(StyleDictionary);

/** Token types that should be treated as size-like values. */
const sizeTokenTypes = new Set(['dimension', 'fontSize', 'borderRadius']);

/**
 * Extracts a string value from DTCG or legacy token shapes.
 * @param token - Token with optional `$value` or `value` fields.
 * @returns The string value or null when not a string.
 */
const getTokenStringValue = (token: { $value?: unknown; value?: unknown }) => {
  const value = token.$value ?? token.value;
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
  filter: (token) =>
    isSizeToken(token) &&
    getTokenStringValue(token) !== null &&
    !isRootTextSize(token),
  transform: (token) => {
    const value = getTokenStringValue(token);
    if (!value) return token.$value ?? token.value;
    return value.replace(/(\d+(\.\d+)?)px/g, (_, num) => {
      const rem = Number.parseFloat(num) / 10;
      const remStr = rem.toFixed(4).replace(/0+$/, '').replace(/\.$/, '');
      return `${remStr}rem`;
    });
  },
});

/**
 * Filters out internal "options" tokens from outputs.
 * @param token - Token with a computed path.
 * @returns True when the token should be included in outputs.
 */
const withoutOptions = (token: { path: string[] }) =>
  !token.path.includes('options');

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
          destination: 'tokens.css',
          format: 'css/variables',
          filter: withoutOptions,
          options: {
            outputReferences: false,
          },
        },
        {
          destination: 'tokens.json',
          format: 'json/nested',
          filter: withoutOptions,
        },
        {
          destination: 'base.css',
          format: 'css/variables',
          filter: (token) => withoutOptions(token) && isBaseToken(token),
          options: {
            outputReferences: false,
          },
        },
        {
          destination: 'base.json',
          format: 'json/nested',
          filter: (token) => withoutOptions(token) && isBaseToken(token),
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
            outputReferences: true,
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
          destination: 'base.json',
          format: 'json/nested',
          filter: (token) => withoutOptions(token) && isBaseToken(token),
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
