# Parity checks

Lightweight checks to keep `c1-tokens` aligned with legacy `rei-cedar-tokens` output.

## Component token parity

Compare token values referenced by a component CSS file against the legacy
`cdr-tokens.css` values.

```sh
python tools/parity/check-component-tokens.py \
  --component button \
  --old-tokens /Users/kmedley/code/rei-cedar-tokens/dist/rei-dot-com/css/cdr-tokens.css
```

The script exits non-zero if it finds missing tokens or mismatched values.

## Cedar UI token usage

Ensure `packages/ui/src/css` only references tokens that exist in
`packages/tokens/dist/web`. This allows override custom props per
component via an allowlist of prefixes.

```sh
python tools/parity/check-token-usage.py
```

Add additional override prefixes (one flag per prefix) as new components
introduce custom props:

```sh
python tools/parity/check-token-usage.py --allow-prefix cdr-container-
```
