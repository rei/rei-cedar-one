# Getting Started

This document focuses on developing and exploring Cedar One. Cedar One is currently an experimental repository, and the examples below are intended to illustrate how token-driven, HTML-first styles are authored and consumed during development.

```bash
pnpm install
pnpm storybook
```

## Using Cedar Components

Cedar One ships components, such as buttons, containers, and form elements, as HTML- and CSS-first building blocks. Each component is expressed primarily through native markup and static CSS, with behavior layered in only when required through explicit adapters. This approach preserves familiar component concepts while minimizing framework coupling and runtime cost.

### HTML

```html
<button type="button" class="cdr-button cdr-button--primary cdr-button--medium">
  Primary
</button>
```

### Vue

For simple components, Cedar One does not rely on Vue-specific bindings. The same HTML and CSS classes apply directly in Vue templates.

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

### React

Similarly, for simple components in React, Cedar One introduces no framework-specific bindings. The same HTML structure and CSS classes are applied using `className`.

```jsx
export function PrimaryButton() {
  return (
    <button
      type="button"
      className="cdr-button cdr-button--primary cdr-button--medium"
    >
      Primary
    </button>
  );
}
```

## Development Scripts

Common workflows for exploring and validating Cedar One:

- `pnpm storybook` - start Storybook for component and utility inspection.
- `pnpm build-storybook` - build the static Storybook output.
- `pnpm tokens:build` - generate token outputs for supported platforms.
- `pnpm ui:build` - build compiled CSS utilities and recipes.
- `pnpm fixtures:vue` - run Vue fixtures for visual parity checks.
- `pnpm fixtures:vue:build` - build Vue fixtures for deployment or review.

## Workspace Layout

The repository is organized as a `pnpm` monorepo:

- `packages/cedar-tokens` - design tokens and platform-specific outputs (web + React Native).
- `packages/cedar-ui` - compiled CSS utilities and component recipes.
- `sandbox/playground-web` - web sandbox for experimenting with utilities and recipes.
- `sandbox/playground-rn` - React Native sandbox for token outputs and adapters.
- `sandbox/vue-fixtures` - Vue-based fixtures used for parity validation.
