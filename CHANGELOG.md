# Cedar One Changelog

## 0.1.37-alpha.0 - 2026-02-04

- Added Storybook links to the README.

## 0.1.36-alpha.0 - 2026-02-04

- Fixed Storybook manager asset paths for GitHub Pages using a base tag and relative brand images.

## 0.1.35-alpha.0 - 2026-02-04

- Fixed Storybook manager brand image pathing for GitHub Pages subpaths.

## 0.1.34-alpha.0 - 2026-02-04

- Fixed GitHub Pages Storybook workflow to pass output directories directly to the Storybook CLI.

## 0.1.33-alpha.0 - 2026-02-04

- Added GitHub Pages workflow to build and deploy HTML, Vue, and React Storybooks under subpaths.

## 0.1.32-alpha.0 - 2026-02-04

- Converted options token sources to DTCG format so references resolve and token CSS outputs avoid collisions.

## 0.1.31-alpha.0 - 2026-02-04

- Updated workspace dependencies to latest versions and stabilized icon build config for svgo v4.
- Added shared Storybook layout utilities and replaced inline story wrapper styles.
- Namespaced HTML Storybook titles under the HTML root.
- Added Storybook favicons for HTML, Vue, and React previews/manager UI.
- Aligned accordion component parity across Vue/React (unwrapped behavior, context wiring) and refreshed stories.

## 0.1.30-alpha.0 - 2026-02-04

- Standardized adapter layout with input core/dom modules and updated adapter docs.
- Added accordion shorthand aliases in CSS and lint alias mappings.
- Simplified accordion HTML story wiring and ensured accordion styles load in previews.
- Documented alias and adapter layout requirements in the component task list.

## 0.1.29-alpha.0 - 2026-02-04

- Added accordion component styles, adapters, and Storybook stories.
- Added accordion lint rules, Vue fixture coverage, and roadmap completion status.
- Added accordion hover token support for background interactions.
- Allowlisted icon override custom props in token usage checks.

## 0.1.28-alpha.0 - 2026-02-04

- Added shorthand CSS class aliases and updated linting to validate them.
- Improved HTML lint reporting granularity and exported lint helpers for future unit tests.

## 0.1.27-alpha.0 - 2026-02-04

- Moved input component code into per-component folders with colocated types in the Vue and React apps.
- Removed debug logging from input adapters.

## 0.1.26-alpha.0 - 2026-02-04

- Added React icon wrappers to @rei/c1-icons and wired React stories/components to use them.

## 0.1.25-alpha.0 - 2026-02-03

- Scaffolded the @rei/c1-react app with Storybook and an adapter-driven input component.
- Added a React input adapter entry to @rei/c1-ui and wired it into the build.

## 0.1.24-alpha.0 - 2026-02-02

- Reworked HTML stories to use static fragments with build-time icon inlining and added an icon sprite demo.
- Added icon CSS + lint rules, and updated Vue stories/fixtures to use @rei/c1-icons Vue wrappers.
- Renamed icon export paths (svg/data/meta/names) and prefixed Vue icon components with `C1Icon`.

## 0.1.23-alpha.0 - 2026-02-02

- Reorganized apps into `apps/html` and `apps/vue`, with HTML stories living under `apps/html/stories`.
- Added the framework-agnostic `@rei/c1-icons` package with SVG optimization, metadata, and validation tooling.
- Migrated icon build/validate tooling to TypeScript with dedicated lint/typecheck configs.

## 0.1.22-alpha.0 - 2026-02-01

- Reintroduced the Vue Storybook with shared Cedar One theming and Vue input stories driven by args.
- Added Vue input adapter support and refreshed adapter build outputs for the UI package.
- Aligned input/form-error icon spacing and post-icon button layout with the HTML fragment baselines.
- Simplified root scripts to include a dedicated Vue Storybook entry point.

## 0.1.21-alpha.0 - 2026-01-31

- Added a root element helper for the input adapter and simplified adapter internals.
- Reorganized Storybook stories into per-component folders with HTML fragments for input.
- Enabled repo-wide unused code checks and refreshed docs around adapter behavior.

## 0.1.20-alpha.0 - 2026-01-31

- Added input component styles, stories, and lint rules.
- Added input token support, parity tooling updates, and Vue lint fixture coverage.
- Marked input complete in the roadmap matrix.

## 0.1.19-alpha.0 - 2026-01-31

- Added form error component styles, stories, and lint rules.
- Added form error token support, parity tooling updates, and Vue lint fixture coverage.
- Marked form error complete in the roadmap matrix.

## 0.1.18-alpha.0 - 2026-01-31

- Added label standalone and label wrapper component styles, stories, and lint rules.
- Added label-related token support, lint fixture coverage, and roadmap completion status.
- Grouped Storybook stories into controls/forms categories for clarity.

## 0.1.17-alpha.0 - 2026-01-31

- Grouped Storybook stories into category folders for easier browsing.

## 0.1.16-alpha.0 - 2026-01-31

- Added title component styles and Storybook variants.
- Added title lint rules and Vue lint fixture coverage.
- Marked title complete in the roadmap matrix and parity tooling.
- Aligned atomic content, caption, and split surface story markup with Cedar site examples.

## 0.1.15-alpha.0 - 2026-01-30

- Added split surface and landing lead component styles and stories.
- Added lint rules and Vue fixture coverage for landing lead and split surface.
- Added three-x and four-x spacing tokens for split surface parity.
- Updated roadmap status and parity tooling for landing lead and split surface.

## 0.1.14-alpha.0 - 2026-01-30

- Added abstract component styles with container query parity and Storybook stories.
- Added abstract ESLint rules and Vue lint fixture coverage.
- Updated roadmap status and parity tooling for abstract.
- Removed UI CSS minification to allow container query syntax in component CSS.

## 0.1.13-alpha.0 - 2026-01-30

- Added quote component styles, stories, and Vue fixture coverage.
- Added quote ESLint rules and allowlisted quote override props.
- Added quote support tokens for border primary and inset one-x stretch spacing.
- Aligned prose blockquote styling with quote typography defaults.
- Updated prose stories to include cite elements in blockquotes.
- Updated Storybook preview imports and roadmap status for quote.

## 0.1.12-alpha.0 - 2026-01-30

- Added kicker component styles, stories, and lint rules with Cedar doc-derived examples.
- Updated the Vue lint fixture to cover kicker usage and added prose caption media examples.
- Refined parity tooling for kicker overrides and updated roadmap guidance for story sourcing.

## 0.1.11-alpha.0 - 2026-01-30

- Added media + caption examples to prose stories and the Vue lint fixture.

## 0.1.10-alpha.0 - 2026-01-30

- Added caption component styles, stories, and lint rules.
- Updated the Vue lint fixture to cover caption usage.
- Marked caption complete in the roadmap matrix.

## 0.1.9-alpha.0 - 2026-01-30

- Added cdr-list component styles (ordered, unordered, compact, inline) with nested list support.
- Added list stories, Vue fixture wiring, and Storybook preview imports.
- Added list lint rules, allowlisted list override props, and marked list complete in the roadmap matrix.
- Added text secondary color token for list parity.
- Aligned prose list styling with cdr-list defaults.
- Removed the Vue Storybook and consolidated Vue fixtures into a single lint fixture component.

## 0.1.8-alpha.0 - 2026-01-30

- Added prose component styles with HTML + Vue story coverage.
- Added prose lint rules and allowlisted prose override custom props in parity checks.
- Updated Storybook previews to load prose CSS and refined prose component spacing utilities.

## 0.1.7-alpha.0 - 2026-01-29

- Reorganized token build outputs into `dist/css` and `dist/json` with native JSON suffixes.
- Updated Storybook previews and parity tooling to target the new token layout.
- Removed auto-generated headers from CSS token outputs.

## 0.1.6-alpha.0 - 2026-01-29

- Added CSS-first image utilities, stories, and fixtures for Cedar One.
- Added image ESLint rules and updated parity tooling to allow image override props.
- Added image radius token support and refreshed image placeholders.
- Marked link + image as complete in the roadmap matrix and documented image utility divergence.

## 0.1.5-alpha.0 - 2026-01-28

- Added text preset lint rules and updated parity scripts to handle text token divergence.
- Added subheading-sans minus-1 line-height ratio token for text presets.
- Documented intentional divergences and renamed UI reset/font exports.

## 0.1.4-alpha.0 - 2026-01-28

- Added dark theme branding and static asset support for Storybook.
- Introduced a standalone Vue Storybook with fixture stories and docs theming.

## 0.1.3-alpha.0 - 2026-01-28

- Added standalone Vue Storybook config and fixture stories.
- Documented the new Vue Storybook command in usage docs.

- Updated Storybook preview imports for the renamed tokens/ui packages.

## 0.1.2-alpha.0 - 2026-01-28

- Converted the Vue fixtures app into @rei/c1-vue and restored declaration output.
- Removed the playground sandboxes and updated workspace scripts accordingly.
- Refined usage and roadmap docs for the new Vue library workflow.

## 0.1.0-alpha.0 - 2026-01-28

- Rebranded the monorepo as Cedar One and refreshed top-level docs.
- Ported Button, Container, and Link to CSS-first implementations with stories and fixtures.
- Promoted ESLint contract rules into @rei/c1-lint for development-time validation.
- Realigned workspace packages and scripts for the new package layout.

## 0.0.1-alpha.0 - 2026-01-22

- Initialized the pnpm workspace and core build tooling.
- Added baseline Storybook and sandbox scaffolding.
