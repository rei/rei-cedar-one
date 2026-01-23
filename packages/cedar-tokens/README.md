# cedar-tokens

Design tokens source of truth for Cedar. Tokens are authored in DTCG format and built with Style Dictionary to produce web (CSS/JSON) and React Native (JSON) outputs.

Build:

- `pnpm build` (from this package) generates `dist/web` and `dist/react-native`.

Outputs:

- Full bundles: `@rei/cedar-tokens/web/tokens.css`, `@rei/cedar-tokens/web/tokens.json`, `@rei/cedar-tokens/react-native/tokens.json`
- Base bundles: `@rei/cedar-tokens/web/base.css`, `@rei/cedar-tokens/web/base.json`, `@rei/cedar-tokens/react-native/base.json`
- Breakpoints: `@rei/cedar-tokens/web/breakpoints.css`
- Component bundles: `@rei/cedar-tokens/web/components/button.css`, `@rei/cedar-tokens/web/components/button.json`, `@rei/cedar-tokens/react-native/components/button.json`

Token organization:

- Base tokens live in `tokens/global` and `tokens/web` and should contain shared primitives (space, radius, motion, font, global colors).
- Component tokens live in `tokens/components/*` and should prefer references to base tokens.
- Component CSS bundles emit references (`var(--cdr-...)`) so they depend on the base bundle being loaded first.

Usage (web):

```css
@import '@rei/cedar-tokens/web/base.css';
@import '@rei/cedar-tokens/web/breakpoints.css';
@import '@rei/cedar-tokens/web/components/button.css';
```

Usage (React Native):

```ts
import baseTokens from '@rei/cedar-tokens/react-native/base.json';
import buttonTokens from '@rei/cedar-tokens/react-native/components/button.json';
```

Status: experimental.
