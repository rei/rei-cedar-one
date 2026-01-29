# c1-tokens

Design tokens source of truth for Cedar. Tokens are authored in DTCG format and built with Style Dictionary to produce web (CSS/JSON) and React Native (JSON) outputs.

Build:

- `pnpm build` (from this package) generates `dist/css` and `dist/json`.

Outputs:

- Full bundles: `@rei/c1-tokens/json/tokens.json`, `@rei/c1-tokens/json/tokens.native.json`
- Core bundle: `@rei/c1-tokens/css/core.css`
- Category bundles: `@rei/c1-tokens/css/categories/*.css`
- Component bundles: `@rei/c1-tokens/css/components/button.css`, `@rei/c1-tokens/json/components/button.json`, `@rei/c1-tokens/json/components/button.native.json`

Notes:

- The native JSON output only converts single size values to numbers. Composite spacing tokens (for example, `"6px 12px"`) remain strings for now while the native consumption shape is defined.
- TODO: Consider converting typography token fields (`size`, `height`, `spacing`) from px strings to numbers in the native JSON output once the native spec is finalized (this applies to text-body, headings, utilities, and eyebrow presets).

Token organization:

- Base tokens live in `tokens/global` and `tokens/web` and should contain shared primitives (space, radius, motion, font, global colors).
- Component tokens live in `tokens/components/*` and should prefer references to base tokens.
- Component CSS bundles emit references (`var(--cdr-...)`) so they depend on the core bundle being loaded first.

Usage (web):

```css
@import '@rei/c1-tokens/css/core.css';
@import '@rei/c1-tokens/css/components/button.css';
```

Usage (React Native):

```ts
import buttonTokens from '@rei/c1-tokens/json/components/button.native.json';
```

Status: experimental.
