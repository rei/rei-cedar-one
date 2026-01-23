# Vue Fixtures

This sandbox package provides simple Vue components for story fixtures and class parity checks.

Scripts:

- `pnpm dev` runs a tiny Vite app that renders the fixtures.
- `pnpm typecheck` runs `vue-tsc -b` for SFC type safety.

Notes:

- Fixture exports are in `src/index.ts`.
- `.vue` module typing lives in `src/vite-env.d.ts` for `tsc -b`.
