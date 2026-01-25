# Cedar One Architecture

This document captures the underlying architecture and near-term goals for Cedar One.

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
