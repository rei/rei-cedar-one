# Roadmap

Roadmap and status tracker for HTML-first component conversion, token parity, and adapter planning against `rei-cedar` and `rei-cedar-tokens`.

## Conversion matrix

Directional guide based on Cedar components in `rei-cedar/src/components`.

1. **Component:** component name from `rei-cedar`.
2. **CSS?:** can be expressed with HTML + classes (no runtime behavior).
3. **Adapter:** JS required to reach functional parity with `rei-cedar` (a11y, interaction, state).
4. **Type:** recommended layer for that behavior (vanilla vs framework).
5. **Native:** native HTML that could reduce or replace the adapter.
6. **Notes:** key behavior or layout constraints.
7. **Status:** implementation status in this repo.

Progress: 29 / 74 components marked complete (✅).

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
      <td>Adapter: none. Typography wrapper; can be a class on any semantic element.</td>
      <td>✅</td>
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
      <td>Adapter: required. Expand/collapse, ARIA, keyboard, and height transitions.</td>
      <td>✅</td>
    </tr>
    <tr>
      <td>accordionGroup</td>
      <td>No</td>
      <td>Required</td>
      <td>Vanilla JS/TS</td>
      <td>Yes: <code>&lt;details&gt;</code> reduces toggle JS; group roving focus still needs JS.</td>
      <td>Adapter: required. Group roving focus + breakpoint unwrap behavior.</td>
      <td>✅</td>
    </tr>
    <tr>
      <td>banner</td>
      <td>Yes</td>
      <td>None</td>
      <td>None</td>
      <td>No: layout-only; dismiss is app logic.</td>
      <td>Adapter: none. Static layout is CSS; any dismiss behavior is app logic.</td>
      <td>⚪</td>
    </tr>
    <tr>
      <td>breadcrumb</td>
      <td>Yes</td>
      <td>Required</td>
      <td>Vanilla JS/TS</td>
      <td>No: list semantics already native.</td>
      <td>Adapter: required. Truncation/ellipsis behavior and focus management require JS for parity.</td>
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
      <td>Adapter: none. Native button/anchor states + classes cover styling.</td>
      <td>✅</td>
    </tr>
    <tr>
      <td>caption</td>
      <td>Yes</td>
      <td>None</td>
      <td>None</td>
      <td>No: text-only.</td>
      <td>Adapter: none. Text styling only.</td>
      <td>✅</td>
    </tr>
    <tr>
      <td>card</td>
      <td>Yes</td>
      <td>None</td>
      <td>None</td>
      <td>No: layout-only.</td>
      <td>Adapter: none. Layout, elevation, and spacing styles only.</td>
      <td>⚪</td>
    </tr>
    <tr>
      <td>checkbox</td>
      <td>Yes</td>
      <td>Required</td>
      <td>Vanilla JS/TS</td>
      <td>
        No: native <code>&lt;input type="checkbox"&gt;</code>.
      </td>
      <td>Adapter: required. Indeterminate state, true/false/custom values, and label wrapper wiring.</td>
      <td>⚪</td>
    </tr>
    <tr>
      <td>chip</td>
      <td>Yes</td>
      <td>None</td>
      <td>None</td>
      <td>
        Maybe: use <code>&lt;button&gt;</code> or <code>&lt;input&gt;</code> for
        selectable chips.
      </td>
      <td>Adapter: none. Chip styling only; see chipGroup for roving focus/keyboard.</td>
      <td>⚪</td>
    </tr>
    <tr>
      <td>chipGroup</td>
      <td>No</td>
      <td>Required</td>
      <td>Vanilla JS/TS</td>
      <td>Yes: <code>&lt;fieldset&gt;</code> and group semantics reduce JS for structure.</td>
      <td>Adapter: required. Roving tabindex, keyboard navigation, and focus management.</td>
      <td>⚪</td>
    </tr>
    <tr>
      <td>choreographer</td>
      <td>No</td>
      <td>Required</td>
      <td>Framework adapters</td>
      <td>No: schema renderer depends on component map/slots.</td>
      <td>Adapter: required. Schema-driven renderer; depends on component map and slots.</td>
      <td>⚪</td>
    </tr>
    <tr>
      <td>container</td>
      <td>Yes</td>
      <td>None</td>
      <td>None</td>
      <td>No: layout-only.</td>
      <td>Adapter: none. Layout container and spacing utilities only.</td>
      <td>✅</td>
    </tr>
    <tr>
      <td>filmstrip</td>
      <td>No</td>
      <td>Required</td>
      <td>Vanilla JS/TS</td>
      <td>Yes: native overflow + scroll-snap reduces carousel JS.</td>
      <td>Adapter: required. Carousel/scroll behavior, controls, and focus management.</td>
      <td>⚪</td>
    </tr>
    <tr>
      <td>filmstripEngine</td>
      <td>No</td>
      <td>Required</td>
      <td>Vanilla JS/TS</td>
      <td>Yes: scroll-snap reduces JS, but engine handles arrows/roving focus.</td>
      <td>Adapter: required. Scroll math, focus management, arrows, and aria messaging.</td>
      <td>⚪</td>
    </tr>
    <tr>
      <td>formError</td>
      <td>Yes</td>
      <td>None</td>
      <td>None</td>
      <td>No: text-only.</td>
      <td>Adapter: none. Error messaging styles only.</td>
      <td>✅</td>
    </tr>
    <tr>
      <td>formGroup</td>
      <td>Yes</td>
      <td>Required</td>
      <td>Vanilla JS/TS</td>
      <td>No: layout-only.</td>
      <td>Adapter: required. Auto ID + error/required/optional wiring and aria-errormessage.</td>
      <td>⚪</td>
    </tr>
    <tr>
      <td>fulfillmentTile</td>
      <td>Yes</td>
      <td>None</td>
      <td>None</td>
      <td>No: layout-only.</td>
      <td>Adapter: none. Static tile layout and typographic styling.</td>
      <td>⚪</td>
    </tr>
    <tr>
      <td>fulfillmentTileIcon</td>
      <td>Yes</td>
      <td>None</td>
      <td>None</td>
      <td>No: icon wrapper.</td>
      <td>Adapter: none. Icon wrapper styles only.</td>
      <td>⚪</td>
    </tr>
    <tr>
      <td>grid</td>
      <td>Yes</td>
      <td>None</td>
      <td>None</td>
      <td>No: CSS grid utilities.</td>
      <td>Adapter: none. Layout grid; responsive classes only.</td>
      <td>⚪</td>
    </tr>
    <tr>
      <td>icon</td>
      <td>Yes</td>
      <td>None</td>
      <td>None</td>
      <td>No: SVG wrapper.</td>
      <td>Adapter: none. Inline SVG or icon wrapper; no behavior.</td>
      <td>✅</td>
    </tr>
    <tr>
      <td>image</td>
      <td>Yes</td>
      <td>None</td>
      <td>None</td>
      <td>
        No: native <code>&lt;img&gt;</code>/<code>&lt;figure&gt;</code>.
      </td>
      <td>Adapter: none. Image styling, aspect ratios, and captions.</td>
      <td>✅</td>
    </tr>
    <tr>
      <td>img</td>
      <td>Yes</td>
      <td>None</td>
      <td>None</td>
      <td>Yes: native <code>&lt;img&gt;</code>.</td>
      <td>Adapter: none. Maps image custom properties (ratio, fit, position, radius).</td>
      <td>✅</td>
    </tr>
    <tr>
      <td>input</td>
      <td>Yes</td>
      <td>Required</td>
      <td>Vanilla JS/TS</td>
      <td>
        No: native <code>&lt;input&gt;</code> covers entry; adapters handle wiring.
      </td>
      <td>Adapter: required. CSS-only visuals; adapter wires ID/ARIA/helper/error classes for parity. Validation remains app-side.</td>
      <td>🟡</td>
    </tr>
    <tr>
      <td>kicker</td>
      <td>Yes</td>
      <td>None</td>
      <td>None</td>
      <td>No: text-only.</td>
      <td>Adapter: none. Text styling only.</td>
      <td>✅</td>
    </tr>
    <tr>
      <td>labelStandalone</td>
      <td>Yes</td>
      <td>None</td>
      <td>None</td>
      <td>No: label-only.</td>
      <td>Adapter: none. Label styling only.</td>
      <td>✅</td>
    </tr>
    <tr>
      <td>labelWrapper</td>
      <td>Yes</td>
      <td>None</td>
      <td>None</td>
      <td>No: layout-only.</td>
      <td>Adapter: none. Wrapper/label layout; no behavior.</td>
      <td>✅</td>
    </tr>
    <tr>
      <td>landingLead</td>
      <td>Yes</td>
      <td>None</td>
      <td>None</td>
      <td>No: composite layout (image + copy).</td>
      <td>Adapter: none. Landing lead layout with image and heading/subheading block.</td>
      <td>✅</td>
    </tr>
    <tr>
      <td>headingSubheadingBlock</td>
      <td>Yes</td>
      <td>None</td>
      <td>None</td>
      <td>No: layout-only.</td>
      <td>Adapter: none. Heading/subheading wrapper used by landingLead.</td>
      <td>✅</td>
    </tr>
    <tr>
      <td>layout</td>
      <td>Yes</td>
      <td>None</td>
      <td>None</td>
      <td>No: layout utilities.</td>
      <td>Adapter: none. Spacing and layout utilities only.</td>
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
      <td>Adapter: none. Styled anchors with states.</td>
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
      <td>Adapter: none. List layout and bullet styling.</td>
      <td>✅</td>
    </tr>
    <tr>
      <td>mediaObject</td>
      <td>Yes</td>
      <td>None</td>
      <td>None</td>
      <td>No: layout-only.</td>
      <td>Adapter: none. Media + content layout pattern.</td>
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
      <td>Adapter: required. Focus trap, scroll lock, ESC handling, and animation timing.</td>
      <td>⚪</td>
    </tr>
    <tr>
      <td>objectOverlay</td>
      <td>Yes</td>
      <td>Required</td>
      <td>Vanilla JS/TS</td>
      <td>No: responsive positioning + gradients need JS.</td>
      <td>Adapter: required. Responsive positioning, gradient data attributes, and border-radius inheritance.</td>
      <td>⚪</td>
    </tr>
    <tr>
      <td>pagination</td>
      <td>Yes</td>
      <td>Required</td>
      <td>Vanilla JS/TS</td>
      <td>No: nav semantics are native; range logic needs JS.</td>
      <td>Adapter: required. Pagination range/ellipsis logic, aria labels, and current page state.</td>
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
      <td>Adapter: none. Responsive image element styling.</td>
      <td>⚪</td>
    </tr>
    <tr>
      <td>popover</td>
      <td>No</td>
      <td>Required</td>
      <td>Vanilla JS/TS</td>
      <td>Yes: HTML Popover API for toggle; JS fallback for placement.</td>
      <td>Adapter: required. Toggle + positioning + outside click handling.</td>
      <td>⚪</td>
    </tr>
    <tr>
      <td>popup</td>
      <td>No</td>
      <td>Required</td>
      <td>Vanilla JS/TS</td>
      <td>No: needs measurement/placement logic.</td>
      <td>Adapter: required. Positioning/measurement, ESC, and click-away.</td>
      <td>⚪</td>
    </tr>
    <tr>
      <td>quote</td>
      <td>Yes</td>
      <td>None</td>
      <td>None</td>
      <td>No: text-only.</td>
      <td>Adapter: none. Quote typography + layout.</td>
      <td>✅</td>
    </tr>
    <tr>
      <td>radio</td>
      <td>Yes</td>
      <td>Required</td>
      <td>Vanilla JS/TS</td>
      <td>
        No: native <code>&lt;input type="radio"&gt;</code>.
      </td>
      <td>Adapter: required. v-model state wiring and label wrapper integration for parity.</td>
      <td>⚪</td>
    </tr>
    <tr>
      <td>rating</td>
      <td>Yes</td>
      <td>Required</td>
      <td>Vanilla JS/TS</td>
      <td>Maybe: data-driven stars via CSS masks; still need a11y text.</td>
      <td>Adapter: required. Star breakdown + SR text computed from rating/count.</td>
      <td>⚪</td>
    </tr>
    <tr>
      <td>ratingStar100</td>
      <td>Yes</td>
      <td>None</td>
      <td>None</td>
      <td>No: SVG-only.</td>
      <td>Adapter: none. Static star SVG glyph.</td>
      <td>⚪</td>
    </tr>
    <tr>
      <td>ratingStar75</td>
      <td>Yes</td>
      <td>None</td>
      <td>None</td>
      <td>No: SVG-only.</td>
      <td>Adapter: none. Static star SVG glyph.</td>
      <td>⚪</td>
    </tr>
    <tr>
      <td>ratingStar50</td>
      <td>Yes</td>
      <td>None</td>
      <td>None</td>
      <td>No: SVG-only.</td>
      <td>Adapter: none. Static star SVG glyph.</td>
      <td>⚪</td>
    </tr>
    <tr>
      <td>ratingStar25</td>
      <td>Yes</td>
      <td>None</td>
      <td>None</td>
      <td>No: SVG-only.</td>
      <td>Adapter: none. Static star SVG glyph.</td>
      <td>⚪</td>
    </tr>
    <tr>
      <td>ratingStar00</td>
      <td>Yes</td>
      <td>None</td>
      <td>None</td>
      <td>No: SVG-only.</td>
      <td>Adapter: none. Static star SVG glyph.</td>
      <td>⚪</td>
    </tr>
    <tr>
      <td>ratingStarNull</td>
      <td>Yes</td>
      <td>None</td>
      <td>None</td>
      <td>No: SVG-only.</td>
      <td>Adapter: none. Static star SVG glyph.</td>
      <td>⚪</td>
    </tr>
    <tr>
      <td>select</td>
      <td>Yes</td>
      <td>Required</td>
      <td>Vanilla JS/TS</td>
      <td>
        No: native <code>&lt;select&gt;</code>.
      </td>
      <td>Adapter: required. Label/ARIA wiring, prompt state, options mapping, and error/helper slots.</td>
      <td>⚪</td>
    </tr>
    <tr>
      <td>skeleton</td>
      <td>Yes</td>
      <td>Required</td>
      <td>Vanilla JS/TS</td>
      <td>No: CSS-only.</td>
      <td>Adapter: required. Motion prop wiring to bones plus ARIA busy state alignment.</td>
      <td>⚪</td>
    </tr>
    <tr>
      <td>skeletonBone</td>
      <td>Yes</td>
      <td>Required</td>
      <td>Vanilla JS/TS</td>
      <td>No: styled block.</td>
      <td>Adapter: required. Motion class wiring via parent skeleton state.</td>
      <td>⚪</td>
    </tr>
    <tr>
      <td>splitSurface</td>
      <td>Yes</td>
      <td>None</td>
      <td>None</td>
      <td>No: layout-only.</td>
      <td>Adapter: none. Layout split pattern; no behavior.</td>
      <td>✅</td>
    </tr>
    <tr>
      <td>surface</td>
      <td>Yes</td>
      <td>None</td>
      <td>None</td>
      <td>No: style-only.</td>
      <td>Adapter: none. Surface styles and variants only.</td>
      <td>⚪</td>
    </tr>
    <tr>
      <td>surfaceNavigation</td>
      <td>Yes</td>
      <td>None</td>
      <td>None</td>
      <td>No: wrapper-only.</td>
      <td>Adapter: none. Surface wrapper for navigation styling.</td>
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
      <td>Adapter: required. Scroll area behavior and custom scrollbar interactions.</td>
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
        Adapter: none. Styles for checked/disabled/loading states; selection logic in app.
      </td>
      <td>⚪</td>
    </tr>
    <tr>
      <td>switch</td>
      <td>Yes</td>
      <td>Required</td>
      <td>Vanilla JS/TS</td>
      <td>No: native checkbox toggle.</td>
      <td>Adapter: required. Toggle interaction and aria-checked updates (non-native button).</td>
      <td>⚪</td>
    </tr>
    <tr>
      <td>table</td>
      <td>Yes</td>
      <td>None</td>
      <td>None</td>
      <td>No: native table semantics.</td>
      <td>Adapter: none. Table layout and typography styles.</td>
      <td>⚪</td>
    </tr>
    <tr>
      <td>tabs</td>
      <td>No</td>
      <td>Required</td>
      <td>Vanilla JS/TS</td>
      <td>No: roving tabindex + ARIA require JS.</td>
      <td>Adapter: required. Active state, roving tabindex, and keyboard navigation.</td>
      <td>⚪</td>
    </tr>
    <tr>
      <td>tabPanel</td>
      <td>No</td>
      <td>Required</td>
      <td>Vanilla JS/TS</td>
      <td>No: tabpanel active state is JS-driven.</td>
      <td>Adapter: required. Active state, aria-labelledby wiring, and tab-change emit.</td>
      <td>⚪</td>
    </tr>
    <tr>
      <td>text</td>
      <td>Yes</td>
      <td>None</td>
      <td>None</td>
      <td>No: text-only.</td>
      <td>Adapter: none. Text styling only.</td>
      <td>✅</td>
    </tr>
    <tr>
      <td>textBody</td>
      <td>Yes</td>
      <td>None</td>
      <td>None</td>
      <td>No: text-only.</td>
      <td>Adapter: none. Text preset class.</td>
      <td>✅</td>
    </tr>
    <tr>
      <td>textEyebrow</td>
      <td>Yes</td>
      <td>None</td>
      <td>None</td>
      <td>No: text-only.</td>
      <td>Adapter: none. Text preset class.</td>
      <td>✅</td>
    </tr>
    <tr>
      <td>textHeadingDisplay</td>
      <td>Yes</td>
      <td>None</td>
      <td>None</td>
      <td>No: text-only.</td>
      <td>Adapter: none. Text preset class.</td>
      <td>✅</td>
    </tr>
    <tr>
      <td>textHeadingSans</td>
      <td>Yes</td>
      <td>None</td>
      <td>None</td>
      <td>No: text-only.</td>
      <td>Adapter: none. Text preset class.</td>
      <td>✅</td>
    </tr>
    <tr>
      <td>textHeadingSerif</td>
      <td>Yes</td>
      <td>None</td>
      <td>None</td>
      <td>No: text-only.</td>
      <td>Adapter: none. Text preset class.</td>
      <td>✅</td>
    </tr>
    <tr>
      <td>textSubheadingSans</td>
      <td>Yes</td>
      <td>None</td>
      <td>None</td>
      <td>No: text-only.</td>
      <td>Adapter: none. Text preset class.</td>
      <td>✅</td>
    </tr>
    <tr>
      <td>textUtilitySans</td>
      <td>Yes</td>
      <td>None</td>
      <td>None</td>
      <td>No: text-only.</td>
      <td>Adapter: none. Text preset class.</td>
      <td>✅</td>
    </tr>
    <tr>
      <td>textUtilitySerif</td>
      <td>Yes</td>
      <td>None</td>
      <td>None</td>
      <td>No: text-only.</td>
      <td>Adapter: none. Text preset class.</td>
      <td>✅</td>
    </tr>
    <tr>
      <td>title</td>
      <td>Yes</td>
      <td>None</td>
      <td>None</td>
      <td>No: heading styles.</td>
      <td>Adapter: none. Heading styles only.</td>
      <td>✅</td>
    </tr>
    <tr>
      <td>toast</td>
      <td>No</td>
      <td>Required</td>
      <td>Vanilla JS/TS</td>
      <td>No: timing/stacking/focus require JS.</td>
      <td>Adapter: required. Timed dismissal, stacking, and focus handling.</td>
      <td>⚪</td>
    </tr>
    <tr>
      <td>toggleButton</td>
      <td>No</td>
      <td>Required</td>
      <td>Vanilla JS/TS</td>
      <td>Yes: radio/checkbox group semantics reduce JS.</td>
      <td>Adapter: required. Selected state wiring for toggle items (aria-checked/tabindex).</td>
      <td>⚪</td>
    </tr>
    <tr>
      <td>toggleGroup</td>
      <td>No</td>
      <td>Required</td>
      <td>Vanilla JS/TS</td>
      <td>Yes: radio/checkbox group semantics reduce JS.</td>
      <td>Adapter: required. Group state, roving focus, and update:modelValue.</td>
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
      <td>Adapter: required. Hover/focus triggers + positioning + aria-describedby.</td>
      <td>⚪</td>
    </tr>
</tbody>
</table>

<p>
  <strong>Status legend:</strong> ✅ Done · 🟡 In progress · ⚪ Not started
</p>

## Component tasks

1. Inventory + contract: audit `rei-cedar/src/components/<name>` (props/slots/states/class output) and define the minimal HTML structure (tags/required attrs). Mirror it in `apps/html/stories` and fixtures.
2. Token parity: identify required tokens and add them to `packages/tokens/tokens` (use `rei-cedar-tokens` as source of truth). Rebuild dist outputs; do not edit `dist` directly (see `tools/parity/README.md`).
3. Behavior classification: identify a11y/interaction logic (ARIA, roving tabindex, focus trap, ESC) and decide CSS-only vs adapter.
4. Adapter plan: prefer vanilla JS for generic web behavior; use framework adapters when schema-driven or framework-specific deps are required.
   - Decide shared core vs framework-native adapters. Use a shared core for non-trivial behavior or multi-framework parity; allow framework-native adapters when the core would be mostly boilerplate. Document the choice.
   - When using a shared core, follow the standard layout: `core.ts` (compute/state), `dom.ts` (element resolution + DOM wiring), `index.ts` (exports).
5. CSS extraction: translate SCSS in `rei-cedar/src/components/<name>/styles` to `packages/ui/src/css/components/<name>.css`, keep values token-backed (no palette vars in component CSS), and derive media queries from source custom media (import `packages/tokens/src/breakpoints.css`).
   - Prefer utility modifier classes over inline style overrides when exposing component APIs.
   - If the component uses `@media (--cdr-*)`, ensure `breakpoints.css` is imported so custom media compiles.
   - Create shorthand aliases for new components and add them to `packages/lint/src/class-aliases.ts`. When aliases exist, apply them in component CSS selectors using `:is(...)` so aliases and long-form classes share the same styling.
6. Lint rules: add component rules under `packages/lint/src/rules`, split into focused rules per constraint (like button), register them in `eslint.config.mjs`, and validate in Vue fixtures via `apps/vue/eslint.config.mjs`.
   - Keep lint rule modules consistent by using a typed wrapper helper (import `Rule` from eslint) for rule metadata/check signatures.
   - Add shorthand aliases for new component classes (base + key elements/modifiers) in `packages/lint/src/class-aliases.ts`, even if stories use long-form classes.
7. Stories/fixtures: add/update permutations in `apps/html/stories` and in the Vue lint fixture (`apps/vue/src/components/CedarLintFixture.vue`), export it from `apps/vue/src/index.ts`, and keep markup static so ESLint can validate literal class usage.
   - Prefer fully static markup (no loops/helpers) in stories/fixtures so ESLint can validate literal class usage.
   - Structure stories as separate variants (base + each modifier) instead of grouping multiple variants into a single story.
   - Derive story variants from Cedar site examples (`/Users/kmedley/code/cedar-site-nuxt`) when available, then add additional useful permutations.
   - Update the Storybook `docs.description` copy using Cedar site component purpose/usage guidance in `cedar-site-nuxt`.
   - Audit story markup against Cedar site examples to ensure atomic-content classes (like `cdr-title`) are used when available.
8. Parity checks: compare compiled CSS in `packages/ui/dist/css` with `rei-cedar/dist/style` for functional parity (focus on computed values and runtime behavior, not 1:1 source output), record accepted deltas, run `tools/parity/check-component-tokens.py` for token parity audits, and ensure all `var(--cdr-*)` references in `packages/ui/src/css` exist in `packages/tokens/dist/css` (excluding documented override custom props and `--default-outline`). When adding component-level override props, allow their prefixes in `tools/parity/check-token-usage.py` (for example, `--cdr-icon-*`).
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
- Prop-to-class mapping: Some legacy Vue components map props to inline CSS variables; Cedar One prefers utility classes to express the same options when possible.
