# rei-cedar-unified-lab

Experimental monorepo for exploring a unified Cedar architecture where tokens are the source of truth, CSS provides the primary styling surface, and behavior is added only where needed. The intent is to keep the system framework-agnostic while preserving parity with existing Cedar styles and tokens.

Architecture:

- Tokens drive design values and cross-platform outputs.
- CSS recipes/utilities cover most styling without framework bindings.
- Behavioral adapters are layered on only where needed.
- `pnpm` workspaces handle monorepo orchestration.
- ESLint rules enforce API contracts so validation is not shipped at runtime.

Goals:

- Reduce bundle size via static CSS.
- Simplify authoring with utilities/recipes.
- Stay framework-agnostic for web.
- Provide a path to React Native via token outputs and adapters.

Linting:

- ESLint validates component class combinations in HTML, Vue templates, and JSX.
- Static class strings only; dynamic expressions are ignored to avoid false positives.

Usage examples:

HTML:

```html
<button class="cdr-button cdr-button--primary cdr-button--medium">
  Primary
</button>
```

Vue:

```vue
<template>
  <button class="cdr-button cdr-button--primary cdr-button--medium">
    Primary
  </button>
</template>
```

Getting started:

```bash
pnpm install
pnpm storybook
```

Scripts:

- `pnpm storybook`: start Storybook.
- `pnpm build-storybook`: build Storybook.
- `pnpm tokens:build`: build token outputs.
- `pnpm ui:build`: build CSS outputs.
- `pnpm fixtures:vue`: run Vue fixtures dev server.
- `pnpm fixtures:vue:build`: build Vue fixtures.

Workspaces:

- `packages/cedar-tokens`: tokens and platform outputs (web + RN).
- `packages/cedar-ui`: CSS utilities and recipes.
- `sandbox/playground-web`: web sandbox for utilities/recipes.
- `sandbox/playground-rn`: React Native sandbox for tokens/adapters.
- `sandbox/vue-fixtures`: Vue fixtures for `cdr-button` permutations.

Status: experimental. APIs and structure are expected to change.
