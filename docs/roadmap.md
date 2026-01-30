# Roadmap

Roadmap and status tracker for HTML-first component conversion, token parity, and adapter planning against `rei-cedar` and `rei-cedar-tokens`.

## Conversion matrix

Directional guide based on Cedar components in `rei-cedar/src/components`.

1. **Component:** component name from `rei-cedar`.
2. **CSS?:** can be expressed with HTML + classes (no runtime behavior).
3. **Adapter:** requires JS for a11y, interaction, or state.
4. **Type:** recommended layer for that behavior (vanilla vs framework).
5. **Native:** native HTML that could reduce or replace the adapter.
6. **Notes:** key behavior or layout constraints.
7. **Status:** implementation status in this repo.

<table class="intro-matrix">
  <thead>
    <tr>
      <th>Component</th>
      <th>CSS?</th>
      <th>Adapter</th>
      <th>Type</th>
      <th>Native</th>
      <th>Notes</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>abstract</td>
      <td>Yes</td>
      <td>None</td>
      <td>None</td>
      <td>No: already CSS-only typography.</td>
      <td>Typography wrapper; can be a class on any semantic element.</td>
      <td>⚪</td>
    </tr>
    <tr>
      <td>accordion</td>
      <td>No</td>
      <td>Required</td>
      <td>Vanilla JS/TS</td>
      <td>
        Yes: <code>&lt;details&gt;/&lt;summary&gt;</code> gives toggle +
        keyboard; keep CSS for motion.
      </td>
      <td>Expand/collapse, ARIA, keyboard, and height transitions.</td>
      <td>⚪</td>
    </tr>
    <tr>
      <td>banner</td>
      <td>Yes</td>
      <td>Optional</td>
      <td>Vanilla JS/TS</td>
      <td>No: layout-only; dismiss is app logic.</td>
      <td>Static layout is CSS; dismiss behavior is app logic.</td>
      <td>⚪</td>
    </tr>
    <tr>
      <td>breadcrumb</td>
      <td>Yes</td>
      <td>None</td>
      <td>None</td>
      <td>No: list semantics already native.</td>
      <td>Simple list + separators; no interaction required.</td>
      <td>⚪</td>
    </tr>
    <tr>
      <td>button</td>
      <td>Yes</td>
      <td>None</td>
      <td>None</td>
      <td>
        No: native <code>&lt;button&gt;</code>/<code>&lt;a&gt;</code> already.
      </td>
      <td>Native button/anchor states + classes cover styling.</td>
      <td>✅</td>
    </tr>
    <tr>
      <td>caption</td>
      <td>Yes</td>
      <td>None</td>
      <td>None</td>
      <td>No: text-only.</td>
      <td>Text styling only.</td>
      <td>✅</td>
    </tr>
    <tr>
      <td>card</td>
      <td>Yes</td>
      <td>None</td>
      <td>None</td>
      <td>No: layout-only.</td>
      <td>Layout, elevation, and spacing styles only.</td>
      <td>⚪</td>
    </tr>
    <tr>
      <td>checkbox</td>
      <td>Yes</td>
      <td>None</td>
      <td>None</td>
      <td>
        No: native <code>&lt;input type="checkbox"&gt;</code>.
      </td>
      <td>Native input + label with CSS states.</td>
      <td>⚪</td>
    </tr>
    <tr>
      <td>chip</td>
      <td>Yes</td>
      <td>Optional</td>
      <td>Vanilla JS/TS</td>
      <td>
        Maybe: use <code>&lt;button&gt;</code> or <code>&lt;input&gt;</code> for
        selectable chips.
      </td>
      <td>Base pill styling; dismiss/select needs app logic.</td>
      <td>⚪</td>
    </tr>
    <tr>
      <td>choreographer</td>
      <td>No</td>
      <td>Required</td>
      <td>Framework adapters</td>
      <td>No: schema renderer depends on component map/slots.</td>
      <td>Schema-driven renderer; depends on component map and slots.</td>
      <td>⚪</td>
    </tr>
    <tr>
      <td>container</td>
      <td>Yes</td>
      <td>None</td>
      <td>None</td>
      <td>No: layout-only.</td>
      <td>Layout container and spacing utilities only.</td>
      <td>✅</td>
    </tr>
    <tr>
      <td>filmstrip</td>
      <td>No</td>
      <td>Required</td>
      <td>Vanilla JS/TS</td>
      <td>Yes: native overflow + scroll-snap reduces carousel JS.</td>
      <td>Carousel/scroll behavior, controls, and focus management.</td>
      <td>⚪</td>
    </tr>
    <tr>
      <td>formError</td>
      <td>Yes</td>
      <td>None</td>
      <td>None</td>
      <td>No: text-only.</td>
      <td>Error messaging styles only.</td>
      <td>⚪</td>
    </tr>
    <tr>
      <td>formGroup</td>
      <td>Yes</td>
      <td>None</td>
      <td>None</td>
      <td>No: layout-only.</td>
      <td>Layout for label/help/field grouping.</td>
      <td>⚪</td>
    </tr>
    <tr>
      <td>fulfillmentTile</td>
      <td>Yes</td>
      <td>None</td>
      <td>None</td>
      <td>No: layout-only.</td>
      <td>Static tile layout and typographic styling.</td>
      <td>⚪</td>
    </tr>
    <tr>
      <td>grid</td>
      <td>Yes</td>
      <td>None</td>
      <td>None</td>
      <td>No: CSS grid utilities.</td>
      <td>Layout grid; responsive classes only.</td>
      <td>⚪</td>
    </tr>
    <tr>
      <td>icon</td>
      <td>Yes</td>
      <td>None</td>
      <td>None</td>
      <td>No: SVG wrapper.</td>
      <td>Inline SVG or icon wrapper; no behavior.</td>
      <td>⚪</td>
    </tr>
    <tr>
      <td>image</td>
      <td>Yes</td>
      <td>None</td>
      <td>None</td>
      <td>
        No: native <code>&lt;img&gt;</code>/<code>&lt;figure&gt;</code>.
      </td>
      <td>Image styling, aspect ratios, and captions.</td>
      <td>✅</td>
    </tr>
    <tr>
      <td>input</td>
      <td>Yes</td>
      <td>None</td>
      <td>None</td>
      <td>
        No: native <code>&lt;input&gt;</code>.
      </td>
      <td>Native input styling; validation remains app-side.</td>
      <td>⚪</td>
    </tr>
    <tr>
      <td>kicker</td>
      <td>Yes</td>
      <td>None</td>
      <td>None</td>
      <td>No: text-only.</td>
      <td>Text styling only.</td>
      <td>⚪</td>
    </tr>
    <tr>
      <td>labelStandalone</td>
      <td>Yes</td>
      <td>None</td>
      <td>None</td>
      <td>No: label-only.</td>
      <td>Label styling only.</td>
      <td>⚪</td>
    </tr>
    <tr>
      <td>labelWrapper</td>
      <td>Yes</td>
      <td>None</td>
      <td>None</td>
      <td>No: layout-only.</td>
      <td>Wrapper/label layout; no behavior.</td>
      <td>⚪</td>
    </tr>
    <tr>
      <td>landingLead</td>
      <td>Yes</td>
      <td>None</td>
      <td>None</td>
      <td>No: text-only.</td>
      <td>Marketing lead text styling only.</td>
      <td>⚪</td>
    </tr>
    <tr>
      <td>layout</td>
      <td>Yes</td>
      <td>None</td>
      <td>None</td>
      <td>No: layout utilities.</td>
      <td>Spacing and layout utilities only.</td>
      <td>⚪</td>
    </tr>
    <tr>
      <td>link</td>
      <td>Yes</td>
      <td>None</td>
      <td>None</td>
      <td>
        No: native <code>&lt;a&gt;</code>.
      </td>
      <td>Styled anchors with states.</td>
      <td>✅</td>
    </tr>
    <tr>
      <td>list</td>
      <td>Yes</td>
      <td>None</td>
      <td>None</td>
      <td>
        No: native <code>&lt;ul&gt;</code>/<code>&lt;ol&gt;</code>.
      </td>
      <td>List layout and bullet styling.</td>
      <td>✅</td>
    </tr>
    <tr>
      <td>mediaObject</td>
      <td>Yes</td>
      <td>None</td>
      <td>None</td>
      <td>No: layout-only.</td>
      <td>Media + content layout pattern.</td>
      <td>⚪</td>
    </tr>
    <tr>
      <td>modal</td>
      <td>No</td>
      <td>Required</td>
      <td>Vanilla JS/TS</td>
      <td>
        Yes: <code>&lt;dialog&gt;</code> provides focus/ESC; polyfill as needed.
      </td>
      <td>Focus trap, scroll lock, ESC handling, and animation timing.</td>
      <td>⚪</td>
    </tr>
    <tr>
      <td>objectOverlay</td>
      <td>Yes</td>
      <td>None</td>
      <td>None</td>
      <td>No: layout-only.</td>
      <td>Layered layout pattern; no interaction.</td>
      <td>⚪</td>
    </tr>
    <tr>
      <td>pagination</td>
      <td>Yes</td>
      <td>None</td>
      <td>None</td>
      <td>No: nav semantics already native.</td>
      <td>Styling for links; page logic lives in the app.</td>
      <td>⚪</td>
    </tr>
    <tr>
      <td>picture</td>
      <td>Yes</td>
      <td>None</td>
      <td>None</td>
      <td>
        No: native <code>&lt;picture&gt;</code>.
      </td>
      <td>Responsive image element styling.</td>
      <td>⚪</td>
    </tr>
    <tr>
      <td>popover</td>
      <td>No</td>
      <td>Required</td>
      <td>Vanilla JS/TS</td>
      <td>Yes: HTML Popover API for toggle; JS fallback for placement.</td>
      <td>Toggle + positioning + outside click handling.</td>
      <td>⚪</td>
    </tr>
    <tr>
      <td>popup</td>
      <td>No</td>
      <td>Required</td>
      <td>Vanilla JS/TS</td>
      <td>No: needs measurement/placement logic.</td>
      <td>Positioning/measurement, ESC, and click-away.</td>
      <td>⚪</td>
    </tr>
    <tr>
      <td>quote</td>
      <td>Yes</td>
      <td>None</td>
      <td>None</td>
      <td>No: text-only.</td>
      <td>Quote typography + layout.</td>
      <td>⚪</td>
    </tr>
    <tr>
      <td>radio</td>
      <td>Yes</td>
      <td>None</td>
      <td>None</td>
      <td>
        No: native <code>&lt;input type="radio"&gt;</code>.
      </td>
      <td>Native radio styling; group logic is native/app.</td>
      <td>⚪</td>
    </tr>
    <tr>
      <td>rating</td>
      <td>No</td>
      <td>Required</td>
      <td>Vanilla JS/TS</td>
      <td>Maybe: data-driven stars via CSS masks; still need a11y text.</td>
      <td>Dynamic star rendering and accessible text.</td>
      <td>⚪</td>
    </tr>
    <tr>
      <td>select</td>
      <td>Yes</td>
      <td>None</td>
      <td>None</td>
      <td>
        No: native <code>&lt;select&gt;</code>.
      </td>
      <td>Native select styling; options rendering is app-side.</td>
      <td>⚪</td>
    </tr>
    <tr>
      <td>skeleton</td>
      <td>Yes</td>
      <td>None</td>
      <td>None</td>
      <td>No: CSS-only.</td>
      <td>Loading shimmer styles only.</td>
      <td>⚪</td>
    </tr>
    <tr>
      <td>splitSurface</td>
      <td>Yes</td>
      <td>None</td>
      <td>None</td>
      <td>No: layout-only.</td>
      <td>Layout split pattern; no behavior.</td>
      <td>⚪</td>
    </tr>
    <tr>
      <td>surface</td>
      <td>Yes</td>
      <td>None</td>
      <td>None</td>
      <td>No: style-only.</td>
      <td>Surface styles and variants only.</td>
      <td>⚪</td>
    </tr>
    <tr>
      <td>surfaceNavigation</td>
      <td>Yes</td>
      <td>None</td>
      <td>None</td>
      <td>No: wrapper-only.</td>
      <td>Surface wrapper for navigation styling.</td>
      <td>⚪</td>
    </tr>
    <tr>
      <td>surfaceScroll</td>
      <td>No</td>
      <td>Required</td>
      <td>Framework adapters</td>
      <td>
        Maybe: native overflow + scrollbar styling if custom UX is optional.
      </td>
      <td>Scroll area behavior and custom scrollbar interactions.</td>
      <td>⚪</td>
    </tr>
    <tr>
      <td>surfaceSelection</td>
      <td>Yes</td>
      <td>None</td>
      <td>None</td>
      <td>
        Yes: <code>&lt;input&gt;</code> + <code>:checked</code>/
        <code>:disabled</code> states for selection.
      </td>
      <td>
        Styles for checked/disabled/loading states; selection logic in app.
      </td>
      <td>⚪</td>
    </tr>
    <tr>
      <td>switch</td>
      <td>Yes</td>
      <td>None</td>
      <td>None</td>
      <td>No: native checkbox toggle.</td>
      <td>Native checkbox toggle styling.</td>
      <td>⚪</td>
    </tr>
    <tr>
      <td>table</td>
      <td>Yes</td>
      <td>None</td>
      <td>None</td>
      <td>No: native table semantics.</td>
      <td>Table layout and typography styles.</td>
      <td>⚪</td>
    </tr>
    <tr>
      <td>tabs</td>
      <td>No</td>
      <td>Required</td>
      <td>Vanilla JS/TS</td>
      <td>No: roving tabindex + ARIA require JS.</td>
      <td>Active state, roving tabindex, and keyboard navigation.</td>
      <td>⚪</td>
    </tr>
    <tr>
      <td>text</td>
      <td>Yes</td>
      <td>None</td>
      <td>None</td>
      <td>No: text-only.</td>
      <td>Text styling only.</td>
      <td>⚪</td>
    </tr>
    <tr>
      <td>title</td>
      <td>Yes</td>
      <td>None</td>
      <td>None</td>
      <td>No: heading styles.</td>
      <td>Heading styles only.</td>
      <td>⚪</td>
    </tr>
    <tr>
      <td>toast</td>
      <td>No</td>
      <td>Required</td>
      <td>Vanilla JS/TS</td>
      <td>No: timing/stacking/focus require JS.</td>
      <td>Timed dismissal, stacking, and focus handling.</td>
      <td>⚪</td>
    </tr>
    <tr>
      <td>toggleButton</td>
      <td>No</td>
      <td>Required</td>
      <td>Vanilla JS/TS</td>
      <td>Yes: radio/checkbox group semantics reduce JS.</td>
      <td>Group state, aria-checked, and roving tabindex.</td>
      <td>⚪</td>
    </tr>
    <tr>
      <td>tooltip</td>
      <td>No</td>
      <td>Required</td>
      <td>Vanilla JS/TS</td>
      <td>
        Maybe: <code>title</code> or Popover API for basic use; JS for rich
        placement.
      </td>
      <td>Hover/focus triggers + positioning + aria-describedby.</td>
      <td>⚪</td>
    </tr>
  </tbody>
</table>

<p>
  <strong>Status legend:</strong> ✅ Done · 🟡 In progress · ⚪ Not started
</p>

## Component tasks

1. Inventory + contract: audit `rei-cedar/src/components/<name>` (props/slots/states/class output) and define the minimal HTML structure (tags/required attrs). Mirror it in `stories/html` and fixtures.
2. Token parity: identify required tokens and add them to `packages/tokens/tokens` (use `rei-cedar-tokens` as source of truth). Rebuild dist outputs; do not edit `dist` directly (see `tools/parity/README.md`).
3. Behavior classification: identify a11y/interaction logic (ARIA, roving tabindex, focus trap, ESC) and decide CSS-only vs adapter.
4. Adapter plan: prefer vanilla JS for generic web behavior; use framework adapters when schema-driven or framework-specific deps are required.
5. CSS extraction: translate SCSS in `rei-cedar/src/components/<name>/styles` to `packages/ui/src/css/components/<name>.css`, keep values token-backed (no palette vars in component CSS), and derive media queries from source custom media (import `packages/tokens/src/breakpoints.css`).
   - Prefer utility modifier classes over inline style overrides when exposing component APIs.
6. Lint rules: add component rules under `packages/lint/src/rules`, split into focused rules per constraint (like button), register them in `eslint.config.mjs`, and validate in Vue fixtures via `sandbox/vue-library/eslint.config.mjs`.
   - Keep lint rule modules consistent by using a typed wrapper helper (import `Rule` from eslint) for rule metadata/check signatures.
7. Stories/fixtures: add/update permutations in `stories/html` and in the Vue lint fixture (`sandbox/vue-library/src/components/CedarLintFixture.vue`), export it from `sandbox/vue-library/src/index.ts`, and keep markup static so ESLint can validate literal class usage.
   - Prefer fully static markup (no loops/helpers) in stories/fixtures so ESLint can validate literal class usage.
   - Structure stories as separate variants (base + each modifier) instead of grouping multiple variants into a single story.
8. Parity checks: compare compiled CSS in `packages/ui/dist/css` with `rei-cedar/dist/style` for functional parity (focus on computed values and runtime behavior, not 1:1 source output), record accepted deltas, run `tools/parity/check-component-tokens.py` for token parity audits, and ensure all `var(--cdr-*)` references in `packages/ui/src/css` exist in `packages/tokens/dist/css` (excluding documented override custom props and `--default-outline`).
   - Prefer optimized, token-backed source when output remains functionally equivalent to legacy.
   - Text presets intentionally diverge from legacy token naming by using `--cdr-type-scale-*` and `--cdr-line-height-ratio-*`; the component parity script skips those for text components.
   - When diffing legacy CSS modules, normalize/remove CSS module hash suffixes (for example, `_16-3-1`) before comparing.
9. Admin: run `pnpm typecheck`, `pnpm lint`, and `pnpm build` to ensure clean outputs; bump package versions as needed, add changelog entries for each touched package, mark the component complete in the conversion matrix when it exists in `rei-cedar`, and prepare a commitizen-style commit message.

## Divergences

Intentional deviations from legacy Cedar while keeping the same visual output where possible.

- Text scale tokens: Cedar One uses `--cdr-type-scale-*` + `--cdr-line-height-ratio-*` for presets instead of legacy `--cdr-text-*-size/height` tokens. Parity checks skip these for text components.
- Override custom props: Component CSS allows override props like `--cdr-text-color` and `--cdr-heading-line-height` that are not part of token dist; parity scripts allow these by default.
- Token naming tweaks: Cedar One emits `--cdr-type-scale-minus-*` tokens and aliases them to `--cdr-type-scale--*` for ergonomic class usage.
- Breakpoints output: Custom media is used as a source-only build aid (`packages/tokens/src/breakpoints.css`) and is not shipped as a standalone dist file.
- Token bundles: Tokens are shipped as `core.css`, `components.css`, and optional category bundles rather than a single legacy `cdr-tokens.css`.
- Image utilities: Cedar One uses a global `cdr-image` class with modifier utilities and omits legacy `-o-object-*` prefixes from the compiled CSS.
