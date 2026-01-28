# Vue Library

This sandbox package provides simple Vue components for story fixtures and class parity checks.
Fixtures mirror the Cedar One class APIs from `packages/ui`.

Scripts:

- `pnpm typecheck` runs `vue-tsc -p tsconfig.app.json` for SFC type safety.
- `pnpm lint` runs ESLint; run from the repo root so it picks up the shared config.
- `pnpm build` outputs a small library bundle.

Notes:

- Fixture exports are in `src/index.ts`.
- `.vue` module typing lives in `src/vite-env.d.ts` for `tsc -b`.
