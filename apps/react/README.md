# React App

This app package provides a small React component library for adapter testing and Storybook previews.
It mirrors the Vue app structure so we can validate CSS-first components and adapters across frameworks.

Scripts:

- `pnpm dev` runs the React Storybook instance on port 6008.
- `pnpm storybook` runs the React Storybook instance on port 6008.
- `pnpm typecheck` runs `tsc -p tsconfig.app.json` for TS/TSX type safety.
- `pnpm lint` runs ESLint; run from the repo root so it picks up the shared config.
- `pnpm build` outputs a small library bundle.

Notes:

- Component exports live in `src/index.ts`.
- Storybook imports CSS from `@rei/c1-ui` and `@rei/c1-tokens`; run `pnpm ui:build` and `pnpm tokens:build` first if assets are missing.
- `vite-env.d.ts` hosts the Vite client types.
