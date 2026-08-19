---
name: add-standard-ui-component
description: Adds or extends components in the StandardUI React package using repository conventions. Use when creating a package component, variant, primitive, or public export.
---

# Add a StandardUI component

## Workflow

1. Read two similar files in `packages/react/src/` before choosing the API.
2. Reuse existing package primitives and `cn`; use Base UI for behavior-heavy accessible primitives.
3. Add the implementation to `packages/react/src/<component-name>.tsx`.
4. Export every public component, variant helper, and prop type from `packages/react/src/index.ts`.
5. Add third-party runtime packages to `packages/react/package.json` dependencies with the workspace package manager.
6. Add the component docs page and navigation entry.
7. If the component replaces hand-rolled docs chrome, update the chrome to dogfood it.
8. Run lint and build. Fix errors rather than weakening types or accessibility.

## Component conventions

- Use named exports and descriptive prop types.
- Add `"use client"` only when state, effects, refs, browser APIs, or client-only dependencies require it.
- Accept `className` and merge it last with `cn`.
- Forward native attributes to the rendered element or primitive.
- Prefer controlled and uncontrolled behavior when the underlying interaction needs both.
- Use semantic elements, accessible names, keyboard behavior, and visible focus rings.
- Use StandardUI tokens and radius utilities; never add raw colors or one-off radii.
- Buttons, links, and triggers use `cursor-pointer`; disabled controls use the matching not-allowed cursor.
- Keep UI copy in sentence case.
- Do not add a second component kit.

## Public API check

- Import the new API from `@boyernick/standard-ui-react` in its docs example.
- Confirm prop types are exported when consumers need them.
- Confirm package dependencies are runtime dependencies, not only root dependencies.
- Keep docs compatibility wrappers as thin re-exports when existing imports rely on them.
