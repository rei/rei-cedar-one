<br/>
<p align="center">
  <img src="docs/assets/c1.png" alt="Cedar One logo" width="120" />
</p>

# Cedar One · ![Alpha](https://img.shields.io/badge/status-alpha-orange)

Cedar One is a CSS-first, framework-agnostic foundation for the
[Cedar design system](https://cedar.rei.com).

At its core, Cedar One treats HTML and CSS as the primary product. Components ship
as native markup and static styles, with design intent defined by tokens and shared
across platforms.

Instead of embedding behavior and validation into framework components, Cedar One
pushes those concerns into build-time tooling and small, explicit adapters. This keeps
runtime output lean, predictable, and portable across environments.

You can explore the system through the Storybook catalogs:

- [HTML](https://rei.github.io/rei-cedar-one/html)
- [Vue](https://rei.github.io/rei-cedar-one/vue)
- [React](https://rei.github.io/rei-cedar-one/react)

## Packages

| Package          | Description                          |
| ---------------- | ------------------------------------ |
| `@rei/c1-tokens` | Design tokens and platform outputs   |
| `@rei/c1-ui`     | CSS and behavior adapters            |
| `@rei/c1-lint`   | ESLint rules for component contracts |
