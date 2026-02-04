#!/usr/bin/env python3
from __future__ import annotations

import argparse
from pathlib import Path
import re
import sys


VAR_DEF_RE = re.compile(r"--([A-Za-z0-9_-]+)\s*:")
VAR_REF_RE = re.compile(r"var\(\s*--([A-Za-z0-9_-]+)")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description=(
            "Verify that CSS in c1-ui only references tokens that exist in "
            "c1-tokens dist output."
        )
    )
    parser.add_argument(
        "--c1-ui-root",
        type=Path,
        default=Path("packages/ui/src/css"),
        help="Path to c1-ui source CSS directory.",
    )
    parser.add_argument(
        "--tokens-root",
        type=Path,
        default=Path("packages/tokens/dist/css"),
        help="Path to c1-tokens dist css directory.",
    )
    parser.add_argument(
        "--allow",
        action="append",
        default=[
            "cdr-form-figure-background-color",
            "cdr-form-figure-box-shadow-color",
        ],
        help="Explicit token name to ignore (repeatable).",
    )
    parser.add_argument(
        "--allow-prefix",
        action="append",
        default=[
            "cdr-button-",
            "cdr-caption-",
            "cdr-img-",
            "cdr-link-",
            "cdr-text-",
            "cdr-body-",
            "cdr-eyebrow-",
            "cdr-heading-",
            "cdr-kicker-",
            "cdr-line-height-ratio-heading-serif-",
            "cdr-subheading-sans-",
            "cdr-utility-",
            "cdr-prose-",
            "cdr-list-",
            "cdr-quote-",
            "cdr-landing-lead-",
            "cdr-split-surface-",
            "cdr-label-standalone-",
            "cdr-label-wrapper-",
            "cdr-form-error-",
            "cdr-input-",
            "cdr-icon-",
            "cdr-accordion-",
        ],
        help=(
            "Token name prefix to ignore (repeatable). "
            "Use for component override custom props."
        ),
    )
    return parser.parse_args()


def collect_defined(tokens_root: Path) -> set[str]:
    files = [tokens_root / "core.css"]
    components_dir = tokens_root / "components"
    if components_dir.exists():
        files.extend(components_dir.glob("*.css"))

    defined = set()
    for path in files:
        if not path.exists():
            continue
        text = path.read_text()
        defined.update(VAR_DEF_RE.findall(text))
    return defined


def collect_used(cedar_ui_root: Path) -> set[str]:
    used = set()
    for path in cedar_ui_root.glob("**/*.css"):
        text = path.read_text()
        for name in VAR_REF_RE.findall(text):
            if name.startswith("cdr-"):
                used.add(name)
    return used


def is_allowed(name: str, allow: set[str], allow_prefixes: list[str]) -> bool:
    if name in allow:
        return True
    return any(name.startswith(prefix) for prefix in allow_prefixes)


def main() -> int:
    args = parse_args()
    cedar_ui_root = args.c1_ui_root
    tokens_root = args.tokens_root

    defined = collect_defined(tokens_root)
    used = collect_used(cedar_ui_root)

    allow = set(args.allow)
    allow_prefixes = list(args.allow_prefix)

    missing = sorted(
        name for name in used - defined if not is_allowed(name, allow, allow_prefixes)
    )

    print(f"defined tokens: {len(defined)}")
    print(f"used tokens: {len(used)}")
    print(f"missing tokens: {len(missing)}")
    if missing:
        print("missing token references:")
        for name in missing:
            print(f" - {name}")
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
