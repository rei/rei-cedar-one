# Getting Started

```bash
pnpm install
pnpm storybook
```

## Usage Examples

### HTML

```html
<button type="button" class="cdr-button cdr-button--primary cdr-button--medium">
  Primary
</button>
```

### Vue

```vue
<template>
  <button
    type="button"
    class="cdr-button cdr-button--primary cdr-button--medium"
  >
    Primary
  </button>
</template>
```

## Scripts

- `pnpm storybook`: start Storybook.
- `pnpm build-storybook`: build Storybook.
- `pnpm tokens:build`: build token outputs.
- `pnpm ui:build`: build CSS outputs.
- `pnpm fixtures:vue`: run Vue fixtures dev server.
- `pnpm fixtures:vue:build`: build Vue fixtures.

## Workspaces

- `packages/cedar-tokens`: tokens and platform outputs (web + RN).
- `packages/cedar-ui`: CSS utilities and recipes.
- `sandbox/playground-web`: web sandbox for utilities/recipes.
- `sandbox/playground-rn`: React Native sandbox for tokens/adapters.
- `sandbox/vue-fixtures`: Vue fixtures for `cdr-button` permutations.
