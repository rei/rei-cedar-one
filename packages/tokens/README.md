# c1-tokens

Design tokens source of truth for Cedar. Tokens are authored in DTCG format and built with Style Dictionary to produce web (CSS/JSON) and React Native (JSON) outputs.

Build:

- `pnpm build` (from this package) generates `dist/web` and `dist/react-native`.

Outputs:

- Full bundles: `@rei/c1-tokens/web/tokens.css`, `@rei/c1-tokens/web/tokens.json`, `@rei/c1-tokens/react-native/tokens.json`
- Base bundles: `@rei/c1-tokens/web/base.css`, `@rei/c1-tokens/web/base.json`, `@rei/c1-tokens/react-native/base.json`
- Breakpoints: `@rei/c1-tokens/web/breakpoints.css`
- Component bundles: `@rei/c1-tokens/web/components/button.css`, `@rei/c1-tokens/web/components/button.json`, `@rei/c1-tokens/react-native/components/button.json`

Token organization:

- Base tokens live in `tokens/global` and `tokens/web` and should contain shared primitives (space, radius, motion, font, global colors).
- Component tokens live in `tokens/components/*` and should prefer references to base tokens.
- Component CSS bundles emit references (`var(--cdr-...)`) so they depend on the base bundle being loaded first.

Usage (web):

```css
@import '@rei/c1-tokens/web/base.css';
@import '@rei/c1-tokens/web/breakpoints.css';
@import '@rei/c1-tokens/web/components/button.css';
```

Usage (React Native):

```ts
import baseTokens from '@rei/c1-tokens/react-native/base.json';
import buttonTokens from '@rei/c1-tokens/react-native/components/button.json';
```

Status: experimental.
