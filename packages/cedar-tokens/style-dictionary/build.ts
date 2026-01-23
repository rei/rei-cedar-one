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
  filter: (token) => isSizeToken(token) && getTokenStringValue(token) !== null,
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

const sd = new StyleDictionary({
  source: ['tokens/**/*.json'],
  usesDtcg: true,
  platforms: {
    web: {
      transforms: [
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
      ],
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
      ],
    },
  },
});

sd.buildAllPlatforms();
