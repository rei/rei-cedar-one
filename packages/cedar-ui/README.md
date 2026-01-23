# cedar-ui

CSS utilities and recipe classes built from Cedar tokens for traditional web apps (non-React Native). Optional Tailwind plugin lives here.

Status: experimental.

Includes:

- `src/css/cedar-base.css` (imports fonts + reset)
- `src/css/cedar-fonts.css` (REI font-face declarations)
- `src/css/cedar-reset.css` (global reset + body defaults)
- `src/css/components/button.css` (button recipe classes)

Exports:

- `@rei/cedar-ui/base.css`
- `@rei/cedar-ui/fonts.css`
- `@rei/cedar-ui/reset.css`
- `@rei/cedar-ui/components/*`

Usage (web):

```css
@import '@rei/cedar-ui/base.css';
@import '@rei/cedar-ui/components/button.css';
```

Note: `@rei/cedar-ui` ships precompiled CSS with Cedar breakpoint values baked in, so consumers do not need PostCSS.
