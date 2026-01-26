<p align="center">
  <img src="docs/assets/chad-sasquatch.png" alt="Chad Sasquatch" width="220" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/status-alpha-orange" alt="Status: alpha" />
</p>
<br/>

# Cedar One 🌲

Cedar One is a single, platform-agnostic foundation for the Cedar design system. It preserves Cedar’s token-driven core while minimizing framework coupling, reducing shipped code, and enabling consistent delivery across web and native platforms.

## Why Cedar One?

### One system, many platforms

A single architectural core serves both web and native platforms. Shared tokens define design intent, while platform-specific adapters handle differences without fragmenting the system or its outputs.

### Platform-agnostic, performance-focused

The web layer targets native HTML and static CSS rather than framework runtimes. By resolving styling and validation at build time, Cedar One ships less code, produces smaller bundles, and delivers faster, more predictable performance.

### Intentional behavior and developer experience

Behavior is introduced only where platforms require it, through explicit adapters that preserve accessibility and interaction standards. Clear contracts, predictable patterns, and fast feedback loops make correct usage the default.

## Docs

- [Architecture and guiding principles](docs/architecture.md)
- [Conversion roadmap](docs/roadmap.md)
- [Usage and examples](docs/usage.md)
