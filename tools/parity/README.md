# Parity checks

Lightweight checks to keep `cedar-tokens` aligned with legacy `rei-cedar-tokens` output.

## Component token parity

Compare token values referenced by a component CSS file against the legacy
`cdr-tokens.css` values.

```sh
python tools/parity/check-component-tokens.py \
  --component button \
  --old-tokens /Users/kmedley/code/rei-cedar-tokens/dist/rei-dot-com/css/cdr-tokens.css
```

The script exits non-zero if it finds missing tokens or mismatched values.
