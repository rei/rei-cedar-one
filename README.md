# Cedar One

![Alpha](https://img.shields.io/badge/status-alpha-orange)

Experimental monorepo for exploring a unified Cedar architecture where tokens are the source of truth, CSS provides the primary styling surface, and behavior is added only where needed. The intent is to keep the system framework-agnostic while preserving parity with existing Cedar styles and tokens.

## Architecture

- Tokens drive design values and cross-platform outputs.
- CSS recipes/utilities cover most styling without framework bindings.
- Behavioral adapters are layered on only where needed.
- `pnpm` workspaces handle monorepo orchestration.
- Dev tooling (ESLint) enforces API contracts so validation is not shipped at runtime.

## Goals

- Reduce bundle size via static CSS.
- Simplify authoring with utilities/recipes.
- Stay framework-agnostic for web.
- Provide a path to React Native via token outputs and adapters.
- Ship a UnoCSS preset (alongside prebuilt CSS) so consumers can opt into on-demand utility generation.
- Improve DX with a VS Code Cedar extension for Cedar-specific authoring aids.

## VS Code Extension Ideas

### Editor Assistance

- Autocomplete: suggest valid `cdr-` utility and component classes based on known variants, sizes, and tags for HTML, Vue, and JSX.
- Inline diagnostics: surface Cedar ESLint rule violations while typing, with clear, actionable messages.
- Quick fixes: fix typos, add required attributes, and remove invalid class combinations.
- Snippets: common patterns for buttons, icons, and responsive sizes that match current rules.

### Discovery

- Hover docs: show token values, descriptions, and usage tips pulled from the token source.
- Token explorer: searchable panel grouped by category with copy-to-clipboard for names and values.
- Storybook links: jump from class names to the closest Storybook example.

## Getting Started

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
