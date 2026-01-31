# Architecture

This document outlines the architectural principles and near-term goals that guide Cedar One.

## Architectural principles

- **Tokens as the source of truth:** design values drive all platform outputs.
- **CSS-first web delivery:** utilities and recipes cover most styling without framework bindings.
- **Adapters at the edges:** behavioral and platform-specific logic is introduced only where required.
- **Build-time validation:** ESLint and tooling enforce contracts so validation is not shipped at runtime.
- **Monorepo orchestration:** `pnpm` workspaces manage packages, tooling, and sandboxes.

## Goals

- Reduce bundle size by favoring static CSS over runtime abstractions.
- Simplify authoring through composable utilities and recipes.
- Remain framework-agnostic for the web.
- Enable native application development through shared tokens and platform adapters.
- Provide both prebuilt CSS and an optional UnoCSS preset for on-demand utility generation.
- Improve developer experience through tooling and editor integrations.

## Build-time contract enforcement

Cedar One enforces component contracts through development tooling, such as ESLint, rather than shipping validation logic in framework code.

![Example ESLint contract enforcement shown in-editor](assets/lint-error.png)

_Example: ESLint enforcing `cdr-button` contract rules at development time._

## Adapter architecture

Adapters provide behavior and accessibility wiring when CSS alone cannot reach functional parity with legacy Cedar components. The adapter model is split into a shared, framework-agnostic core and thin framework wrappers.

### Adapter boundaries

- **CSS-only first:** if a component’s parity gap is purely presentational, it remains CSS-only.
- **Behavioral parity:** adapters are only introduced for runtime behavior (focus management, ARIA wiring, measurement, keyboard interaction).
- **Validation scope:** adapters do not implement business rules. They reflect app-provided validity (e.g., error state) and only add runtime validation when parity _requires_ it and the scope is explicitly documented.

### Core (vanilla TS)

- **Pure state computation:** derive attributes, class toggles, and IDs from a small input state object.
- **Optional DOM helper:** apply computed state to DOM nodes in plain HTML/JS contexts.
- **Lifecycle surface:** `createInputAdapter({ refs, initialState })` returns `update(nextState)`, `destroy()`, and `getState()` for wiring focus/blur and cleanup.

The core does not implement business validation (e.g., “required” or min/max checks). Contract validation stays in ESLint at build time. Runtime validity is handled case-by-case: most components keep validation app-side and adapters only reflect state via ARIA/class wiring, while any adapter-provided validation must be explicitly scoped and documented when parity requires it.

### Framework adapters (Vue/React/etc.)

Framework adapters should remain idiomatic:

- **Vue:** use `computed()` to build `attrs`/`class` objects from the core compute layer, and template bindings like `@focus/@blur` to manage focus state.
- **React:** use `useMemo` for computed state and spread attributes/classes directly onto JSX.

Framework wrappers reuse the core compute layer to avoid duplicated logic while keeping DOM ownership with the framework.

### Distribution model

- **Subpath exports:** adapters are consumed as `@rei/c1-ui/adapters/<component>` and types as `@rei/c1-ui/adapters/<component>/types`.
- **Tree-shakeable core:** compute helpers are pure functions so framework wrappers can share logic without pulling DOM helpers.

### Example: input adapter behavior

- Generate or accept `id` and map helper/error text IDs into `aria-describedby`.
- Toggle `aria-invalid` / `aria-errormessage` when `error` is present.
- Add focus state classes (`cdr-input--focus`) on focus/blur.
- Map `numeric` / `type=number` to `inputmode` and `pattern` attributes.
- Offer a convenience entry point (`createInputAdapterFromElement`) that resolves refs from a root element.

This keeps HTML/CSS/JS usage viable while enabling framework-specific adapters to share the same behavior contract.

## VS Code extension ideas

The Cedar One architecture enables strong editor support by making contracts and constraints explicit at build time.

### Editor assistance

- **Autocomplete:** suggest valid `cdr-` utility and component classes based on known variants, sizes, and tags for HTML, Vue, and JSX.
- **Inline diagnostics:** surface Cedar ESLint rule violations while typing, with clear, actionable messages.
- **Quick fixes:** fix typos, add required attributes, and remove invalid class combinations.
- **Snippets:** provide common patterns for buttons, icons, and responsive layouts that align with current rules.

### Discovery

- **Hover documentation:** show token values, descriptions, and usage tips sourced directly from tokens.
- **Token explorer:** searchable panel grouped by category with copy-to-clipboard support.
- **Storybook links:** jump from class names to the closest Storybook example.

## Non-goals

- Cedar One does not aim to provide a cross-platform runtime abstraction.
- It does not replace application frameworks or state management.
- It does not guarantee identical implementations across platforms; only consistent design intent.
