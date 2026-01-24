# Vue Fixtures

This sandbox package provides simple Vue components for story fixtures and class parity checks.
Fixtures mirror the `cdr-button` class API from `packages/cedar-ui`.

Scripts:

- `pnpm dev` runs a tiny Vite app that renders the fixtures.
- `pnpm typecheck` runs `vue-tsc -p tsconfig.app.json` for SFC type safety.
- `pnpm lint` runs ESLint; run from the repo root so it picks up the shared config.

Notes:

- Fixture exports are in `src/index.ts`.
- `.vue` module typing lives in `src/vite-env.d.ts` for `tsc -b`.
- `src/main.ts` imports Cedar tokens plus `cdr-button` CSS so fixtures reflect production styling.
