# c1-ui

CSS utilities and recipe classes built from Cedar tokens for traditional web apps (non-React Native). Optional Tailwind plugin lives here.

Status: experimental.

Includes:

- `src/css/cedar-base.css` (imports fonts + reset)
- `src/css/cedar-fonts.css` (REI font-face declarations)
- `src/css/cedar-reset.css` (global reset + body defaults)
- `src/css/components/button.css` (button recipe classes)

Exports:

- `@rei/c1-ui/base.css`
- `@rei/c1-ui/fonts.css`
- `@rei/c1-ui/reset.css`
- `@rei/c1-ui/components/*`

Usage (web):

```css
@import '@rei/c1-ui/base.css';
@import '@rei/c1-ui/components/button.css';
```

Note: `@rei/c1-ui` ships precompiled CSS with Cedar breakpoint values baked in, so consumers do not need PostCSS.
