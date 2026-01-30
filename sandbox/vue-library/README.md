# Vue Library

This sandbox package provides a single Vue component for lint coverage validation.
The fixture mirrors Cedar One class APIs from `packages/ui` so lint rules surface in-editor and in the CLI.

Scripts:

- `pnpm typecheck` runs `vue-tsc -p tsconfig.app.json` for SFC type safety.
- `pnpm lint` runs ESLint; run from the repo root so it picks up the shared config.
- `pnpm build` outputs a small library bundle.

Notes:

- Fixture export lives in `src/index.ts`.
- `.vue` module typing lives in `src/vite-env.d.ts` for `tsc -b`.
