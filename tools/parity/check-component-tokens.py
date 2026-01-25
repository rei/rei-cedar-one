#!/usr/bin/env python3
"""
Compare token values used by a component CSS file against legacy cdr-tokens.css.

Usage:
  python tools/parity/check-component-tokens.py \
    --component button \
    --old-tokens /path/to/rei-cedar-tokens/dist/rei-dot-com/css/cdr-tokens.css
"""
import argparse
from pathlib import Path
import re
import sys
from typing import Optional, Set, Tuple, Dict, List


def repo_root() -> Path:
    return Path(__file__).resolve().parents[2]


def load_old_tokens(path: Path) -> Dict[str, str]:
    tokens: Dict[str, str] = {}
    for line in path.read_text().splitlines():
        line = line.strip()
        if not line.startswith("--") or ":" not in line:
            continue
        name, value = line.split(":", 1)
        tokens[name] = value.strip().rstrip(";")
    return tokens


def load_new_tokens(paths: List[Path]) -> Dict[str, str]:
    tokens: Dict[str, str] = {}
    decl_re = re.compile(r"(--[a-zA-Z0-9-]+)\s*:\s*([^;]+);")
    for path in paths:
        for name, value in decl_re.findall(path.read_text()):
            tokens[name] = value.strip()
    return tokens


def split_var_args(s: str) -> Tuple[str, Optional[str]]:
    depth = 0
    for i, ch in enumerate(s):
        if ch == "(":
            depth += 1
        elif ch == ")":
            depth -= 1
        elif ch == "," and depth == 0:
            return s[:i].strip(), s[i + 1 :].strip()
    return s.strip(), None


def resolve_value(value: str, tokens: Dict[str, str], stack: Optional[Set[str]] = None) -> str:
    if stack is None:
        stack = set()
    while True:
        start = value.find("var(")
        if start == -1:
            break
        idx = start + 4
        depth = 1
        while idx < len(value) and depth > 0:
            if value[idx] == "(":
                depth += 1
            elif value[idx] == ")":
                depth -= 1
            idx += 1
        if depth != 0:
            break
        inner = value[start + 4 : idx - 1]
        var_name, fallback = split_var_args(inner)
        if var_name in stack:
            resolved = None
        else:
            raw = tokens.get(var_name)
            if raw is None:
                resolved = None
            else:
                stack.add(var_name)
                resolved = resolve_value(raw, tokens, stack)
                stack.remove(var_name)
        if resolved is None:
            if fallback is not None:
                resolved = resolve_value(fallback, tokens, stack)
            else:
                resolved = ""
        value = value[:start] + resolved + value[idx:]
    return value


def extract_vars_from_component(css_text: str) -> Set[str]:
    vars_found: Set[str] = set()
    for match in re.finditer(r"var\(([^)]+)\)", css_text):
        vars_found.update(re.findall(r"--[a-zA-Z0-9-]+", match.group(1)))
    return vars_found


def main() -> int:
    parser = argparse.ArgumentParser(description="Check component token parity against legacy tokens.")
    parser.add_argument("--component", required=True, help="Component name (e.g. button)")
    parser.add_argument("--old-tokens", required=True, help="Path to legacy cdr-tokens.css")
    args = parser.parse_args()

    root = repo_root()
    component = args.component
    old_tokens_path = Path(args.old_tokens)

    component_css = root / "packages" / "cedar-ui" / "src" / "css" / "components" / f"{component}.css"
    component_tokens_path = (
        root
        / "packages"
        / "cedar-tokens"
        / "dist"
        / "web"
        / "components"
        / f"{component}.css"
    )
    new_token_paths = [
        root / "packages" / "cedar-tokens" / "dist" / "web" / "base.css",
        root / "packages" / "cedar-tokens" / "dist" / "web" / "tokens.css",
    ]
    if component_tokens_path.exists():
        new_token_paths.append(component_tokens_path)

    missing_paths = [
        p for p in [component_css, old_tokens_path] + new_token_paths if not p.exists()
    ]
    if missing_paths:
        print("Missing required files:")
        for path in missing_paths:
            print(f"  - {path}")
        return 2

    vars_used = extract_vars_from_component(component_css.read_text())
    ignore_prefix = f"--cdr-{component}-"
    ignore_vars = {"--default-outline"}

    old_tokens = load_old_tokens(old_tokens_path)
    new_tokens = load_new_tokens(new_token_paths)

    missing_old = []
    missing_new = []
    mismatches = []

    for name in sorted(vars_used):
        if name.startswith(ignore_prefix):
            continue
        if name in ignore_vars:
            continue
        new_val = new_tokens.get(name)
        if new_val is None:
            missing_new.append(name)
            continue
        old_val = old_tokens.get(name)
        if old_val is None:
            missing_old.append(name)
            continue
        new_val_resolved = resolve_value(new_val, new_tokens).strip()
        old_val_norm = re.sub(r"\s+", " ", old_val).strip()
        new_val_norm = re.sub(r"\s+", " ", new_val_resolved).strip()
        if old_val_norm != new_val_norm:
            mismatches.append((name, old_val_norm, new_val_norm))

    if missing_old:
        print("Missing in legacy tokens:")
        for name in missing_old:
            print(f"  - {name}")
    if missing_new:
        print("Missing in new tokens:")
        for name in missing_new:
            print(f"  - {name}")
    if mismatches:
        print("Value mismatches:")
        for name, old_val, new_val in mismatches:
            print(f"  - {name}: old={old_val} new={new_val}")

    if missing_old or missing_new or mismatches:
        return 1

    print("OK: token values match legacy output.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
