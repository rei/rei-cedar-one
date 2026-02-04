# @rei/c1-icons

Framework-agnostic Cedar icon assets for use in vanilla HTML, Vue, React, or any other UI layer.

## Exports

- `@rei/c1-icons` – JS module exporting `icons`, `iconNames`, and `getIcon`.
- `@rei/c1-icons/sprite.svg` – a full SVG sprite sheet.
- `@rei/c1-icons/data.json` – icon name → SVG string map.
- `@rei/c1-icons/names.json` – array of icon names.
- `@rei/c1-icons/meta.json` – icon metadata (viewBox, category, tags).
- `@rei/c1-icons/svg/<name>.svg` – individual SVG files.
- `@rei/c1-icons/vue/<name>` – Vue single-file component per icon.
- `@rei/c1-icons/vue` – Vue entrypoint with `C1Icon` + named exports.
- `@rei/c1-icons/react` – React entrypoint with `C1Icon` + named exports.
- `@rei/c1-icons/react/<name>` – React component per icon.

## Usage

### Inline SVG (direct)

```js
import { getIcon } from '@rei/c1-icons';

const svgMarkup = getIcon('arrow-down');
```

### Sprite usage

Load the sprite once, then reference symbols:

```html
<!-- Inject sprite.svg into the page or serve it inline -->
<svg aria-hidden="true" focusable="false" width="24" height="24">
  <use href="#arrow-down"></use>
</svg>
```

### Raw SVG import

```js
import arrowDown from '@rei/c1-icons/svg/arrow-down.svg';
```

### Vue per-icon component

```vue
<script setup lang="ts">
import ArrowDown from '@rei/c1-icons/vue/arrow-down';
// Or named exports from the Vue entrypoint:
// import { C1IconArrowDown } from '@rei/c1-icons/vue';
</script>

<template>
  <ArrowDown size="small" aria-label="Expand" />
</template>
```

### Vue sprite component

```vue
<script setup lang="ts">
import { C1Icon } from '@rei/c1-icons/vue';
</script>

<template>
  <C1Icon name="arrow-down" aria-label="Expand" />
</template>
```

### React per-icon component

```tsx
import ArrowDown from '@rei/c1-icons/react/arrow-down';
// Or named exports from the React entrypoint:
// import { C1IconArrowDown } from '@rei/c1-icons/react';

export const Example = () => <ArrowDown size="small" aria-label="Expand" />;
```

### React sprite component

```tsx
import { C1Icon } from '@rei/c1-icons/react';

export const Example = () => <C1Icon name="arrow-down" aria-label="Expand" />;
```

## Accessibility

- Use `aria-hidden="true"` for decorative icons.
- For meaningful icons, add `role="img"` and an `aria-label`.

## Build

```
pnpm --filter @rei/c1-icons build
```

## Optimization

Icons are optimized via SVGO during build to keep markup consistent and lightweight.
Source SVGs live in `src/icons`, while optimized outputs are written to `dist/icons`.

## Validation

`pnpm --filter @rei/c1-icons validate` checks for required viewBox, and ensures
icons avoid width/height, fill, stroke, and title/desc elements so styles remain
token-driven.
