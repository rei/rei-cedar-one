<br/>
<p align="center">
  <img src="docs/assets/c1.png" alt="Cedar One logo" width="120" />
</p>

# Cedar One · ![Alpha](https://img.shields.io/badge/status-alpha-orange)

Cedar One provides a framework-agnostic, CSS-first foundation for the
[Cedar design system](https://cedar.rei.com). It delivers consistent design across platforms while shipping less code and avoiding framework lock-in through explicit adapters.

Explore the system in practice:  
[HTML](https://rei.github.io/rei-cedar-one/html) · [Vue](https://rei.github.io/rei-cedar-one/vue) · [React](https://rei.github.io/rei-cedar-one/react)

## Why Cedar One?

### One system, everywhere

A single architectural core drives every surface. Shared tokens define design intent, while framework-specific adapters translate that intent across web and native without fragmenting the system.

### Ship less code

Web outputs resolve to native HTML and static CSS rather than framework runtimes. Cedar styles work across Vue, React, or plain markup with no framework lock-in and minimal runtime overhead.

### Catch issues before runtime

Cedar One shifts complexity to build time. Component contracts are enforced through tooling instead of client-side logic, resulting in smaller bundles, predictable behavior, and fast feedback during development.

## Docs

- [Architecture](docs/architecture.md)
- [Roadmap](docs/roadmap.md)
- [Usage](docs/usage.md)

## Packages

| Package          | Description                                           |
| ---------------- | ----------------------------------------------------- |
| `@rei/c1-tokens` | Design tokens and platform outputs.                   |
| `@rei/c1-ui`     | Framework-agnostic CSS and behavior adapters.         |
| `@rei/c1-lint`   | ESLint rules enforcing Cedar One component contracts. |
