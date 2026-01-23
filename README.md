# rei-cedar-unified-lab

Experimental monorepo for exploring a unified Cedar architecture: tokens as the source of truth, a CSS utility/recipe layer for styling, and a small behavior adapter layer for accessibility and interactions.

Goals:

- Reduce bundle size by shifting most UI to static CSS.
- Simplify authoring with utilities and recipes instead of framework components.
- Stay framework-agnostic for web, with optional adapters.
- Provide a path to React Native via token outputs and React Native adapters.

Packages (early scaffold):

- `packages/cedar-tokens`: token source and platform outputs.
- `packages/cedar-utilities`: CSS utilities and recipes (plus optional Tailwind plugin).
- `packages/cedar-behavior`: headless adapters with web and React Native entrypoints.

Apps (early scaffold):

- `apps/playground-web`: validate utilities/recipes in a web app.
- `apps/playground-rn`: validate tokens and adapters in React Native.

Status: experimental. APIs and structure are expected to change.
