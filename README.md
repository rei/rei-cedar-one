# Cedar Unified Lab

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

## Per-Component Tasks

- Inventory + parity: audit `rei-cedar/src/components/<name>` (props/slots/states/class output), compare against `rei-cedar/dist/style`, and ensure token parity with `rei-cedar-tokens` by importing/normalizing into `packages/cedar-tokens` (see `tools/parity/README.md`).
- CSS extraction: translate SCSS in `rei-cedar/src/components/<name>/styles` to `packages/cedar-ui/src/css/components/<name>.css` and keep values token-backed.
- Markup contract: define the minimal HTML structure (tags/required attrs) from the Vue template and mirror it in `stories/html` and fixtures.
- Behavior classification: identify a11y/interaction logic (ARIA, roving tabindex, focus trap, ESC) and decide CSS-only vs adapter.
- Adapter plan: prefer vanilla JS for generic web behavior; use framework adapters when schema-driven or framework-specific deps are required.
- Lint rules: add component rules under `tools/eslint/`, register them in `eslint.config.mjs`, and validate in Vue fixtures via `sandbox/vue-fixtures/eslint.config.mjs`.
- Stories/fixtures: add/update permutations in `stories/html` and `sandbox/vue-fixtures/src/components`.
- Parity checks: compare compiled CSS in `packages/cedar-ui/dist/css` with `rei-cedar/dist/style`, record accepted deltas, and run `tools/parity/check-component-tokens.py` for token parity audits.

## Component Conversion Matrix

Directional guide based on Cedar components in `rei-cedar/src/components`. "CSS-only" means markup + classes can represent the component while behavior stays in the app. "Behavior adapter" means a small JS layer is needed for accessibility or interaction. "Native simplification candidate" highlights where native HTML elements/APIs could replace custom behavior or reduce adapter complexity.

| Component         | CSS-only? | Behavior adapter | Adapter type       | Native simplification candidate (context)                                | Context                                                             |
| ----------------- | --------- | ---------------- | ------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------- |
| abstract          | Yes       | None             | None               | No: already CSS-only typography.                                         | Typography wrapper; can be a class on any semantic element.         |
| accordion         | No        | Required         | Vanilla JS/TS      | Yes: `<details>/<summary>` gives toggle + keyboard; keep CSS for motion. | Expand/collapse, ARIA, keyboard, and height transitions.            |
| banner            | Yes       | Optional         | Vanilla JS/TS      | No: layout-only; dismiss is app logic.                                   | Static layout is CSS; dismiss behavior is app logic.                |
| breadcrumb        | Yes       | None             | None               | No: list semantics already native.                                       | Simple list + separators; no interaction required.                  |
| button            | Yes       | None             | None               | No: native `<button>/<a>` already.                                       | Native button/anchor states + classes cover styling.                |
| caption           | Yes       | None             | None               | No: text-only.                                                           | Text styling only.                                                  |
| card              | Yes       | None             | None               | No: layout-only.                                                         | Layout, elevation, and spacing styles only.                         |
| checkbox          | Yes       | None             | None               | No: native `<input type="checkbox">`.                                    | Native input + label with CSS states.                               |
| chip              | Yes       | Optional         | Vanilla JS/TS      | Maybe: use `<button>` or `<input>` for selectable chips.                 | Base pill styling; dismiss/select needs app logic.                  |
| choreographer     | No        | Required         | Framework adapters | No: schema renderer depends on component map/slots.                      | Schema-driven renderer; depends on component map and slots.         |
| container         | Yes       | None             | None               | No: layout-only.                                                         | Layout container and spacing utilities only.                        |
| filmstrip         | No        | Required         | Vanilla JS/TS      | Yes: native overflow + scroll-snap reduces carousel JS.                  | Carousel/scroll behavior, controls, and focus management.           |
| formError         | Yes       | None             | None               | No: text-only.                                                           | Error messaging styles only.                                        |
| formGroup         | Yes       | None             | None               | No: layout-only.                                                         | Layout for label/help/field grouping.                               |
| fulfillmentTile   | Yes       | None             | None               | No: layout-only.                                                         | Static tile layout and typographic styling.                         |
| grid              | Yes       | None             | None               | No: CSS grid utilities.                                                  | Layout grid; responsive classes only.                               |
| icon              | Yes       | None             | None               | No: SVG wrapper.                                                         | Inline SVG or icon wrapper; no behavior.                            |
| image             | Yes       | None             | None               | No: native `<img>/<figure>`.                                             | Image styling, aspect ratios, and captions.                         |
| input             | Yes       | None             | None               | No: native `<input>`.                                                    | Native input styling; validation remains app-side.                  |
| kicker            | Yes       | None             | None               | No: text-only.                                                           | Text styling only.                                                  |
| labelStandalone   | Yes       | None             | None               | No: label-only.                                                          | Label styling only.                                                 |
| labelWrapper      | Yes       | None             | None               | No: layout-only.                                                         | Wrapper/label layout; no behavior.                                  |
| landingLead       | Yes       | None             | None               | No: text-only.                                                           | Marketing lead text styling only.                                   |
| layout            | Yes       | None             | None               | No: layout utilities.                                                    | Spacing and layout utilities only.                                  |
| link              | Yes       | None             | None               | No: native `<a>`.                                                        | Styled anchors with states.                                         |
| list              | Yes       | None             | None               | No: native `<ul>/<ol>`.                                                  | List layout and bullet styling.                                     |
| mediaObject       | Yes       | None             | None               | No: layout-only.                                                         | Media + content layout pattern.                                     |
| modal             | No        | Required         | Vanilla JS/TS      | Yes: `<dialog>` provides focus/ESC; polyfill as needed.                  | Focus trap, scroll lock, ESC handling, and animation timing.        |
| objectOverlay     | Yes       | None             | None               | No: layout-only.                                                         | Layered layout pattern; no interaction.                             |
| pagination        | Yes       | None             | None               | No: nav semantics already native.                                        | Styling for links; page logic lives in the app.                     |
| picture           | Yes       | None             | None               | No: native `<picture>`.                                                  | Responsive image element styling.                                   |
| popover           | No        | Required         | Vanilla JS/TS      | Yes: HTML Popover API for toggle; JS fallback for placement.             | Toggle + positioning + outside click handling.                      |
| popup             | No        | Required         | Vanilla JS/TS      | No: needs measurement/placement logic.                                   | Positioning/measurement, ESC, and click-away.                       |
| quote             | Yes       | None             | None               | No: text-only.                                                           | Quote typography + layout.                                          |
| radio             | Yes       | None             | None               | No: native `<input type="radio">`.                                       | Native radio styling; group logic is native/app.                    |
| rating            | No        | Required         | Vanilla JS/TS      | Maybe: data-driven stars via CSS masks; still need a11y text.            | Dynamic star rendering and accessible text.                         |
| select            | Yes       | None             | None               | No: native `<select>`.                                                   | Native select styling; options rendering is app-side.               |
| skeleton          | Yes       | None             | None               | No: CSS-only.                                                            | Loading shimmer styles only.                                        |
| splitSurface      | Yes       | None             | None               | No: layout-only.                                                         | Layout split pattern; no behavior.                                  |
| surface           | Yes       | None             | None               | No: style-only.                                                          | Surface styles and variants only.                                   |
| surfaceNavigation | Yes       | None             | None               | No: wrapper-only.                                                        | Surface wrapper for navigation styling.                             |
| surfaceScroll     | No        | Required         | Framework adapters | Maybe: native overflow + scrollbar styling if custom UX is optional.     | Scroll area behavior and custom scrollbar interactions.             |
| surfaceSelection  | Yes       | None             | None               | Yes: `<input>` + `:checked`/`:disabled` states for selection.            | Styles for checked/disabled/loading states; selection logic in app. |
| switch            | Yes       | None             | None               | No: native checkbox toggle.                                              | Native checkbox toggle styling.                                     |
| table             | Yes       | None             | None               | No: native table semantics.                                              | Table layout and typography styles.                                 |
| tabs              | No        | Required         | Vanilla JS/TS      | No: roving tabindex + ARIA require JS.                                   | Active state, roving tabindex, and keyboard navigation.             |
| text              | Yes       | None             | None               | No: text-only.                                                           | Text styling only.                                                  |
| title             | Yes       | None             | None               | No: heading styles.                                                      | Heading styles only.                                                |
| toast             | No        | Required         | Vanilla JS/TS      | No: timing/stacking/focus require JS.                                    | Timed dismissal, stacking, and focus handling.                      |
| toggleButton      | No        | Required         | Vanilla JS/TS      | Yes: radio/checkbox group semantics reduce JS.                           | Group state, aria-checked, and roving tabindex.                     |
| tooltip           | No        | Required         | Vanilla JS/TS      | Maybe: `title` or Popover API for basic use; JS for rich placement.      | Hover/focus triggers + positioning + aria-describedby.              |

## Status

Experimental. APIs and structure are expected to change.
