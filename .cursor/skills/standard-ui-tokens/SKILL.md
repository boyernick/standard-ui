---
name: standard-ui-tokens
description: Applies StandardUI semantic tokens, focus rings, cursor behavior, nested radii, and sentence-case copy. Use when styling React components or documentation in this repository.
---

# StandardUI tokens

## Semantic styling

Prefer semantic utilities from `packages/tokens/css/tokens.css`:

- Backgrounds: `bg-background-primary`, `bg-background-secondary`, `bg-background-tertiary`, `bg-background-quaternary`, `bg-background-active`
- Surfaces: `bg-surface`, `bg-surface-raised`, `bg-surface-inverted`
- Text: `text-fg-primary`, `text-fg-secondary`, `text-fg-tertiary`, `text-fg-quaternary`
- Borders: `border-border-primary`, `border-border-secondary`
- Brand: `bg-brand-primary`, `text-brand-foreground`, and brand hover/active tokens
- Feedback: destructive and warning tokens

Use primitives such as gray values only for intentional fixed-theme demonstrations. Never add raw hex colors when a token expresses the role.

## Focus and interaction

Import the shared recipes from `@boyernick/standard-ui-react` (or `./lib/focus` inside the package):

```tsx
import { focusRing, focusRingBorder } from "./lib/focus"

// Bordered control
className={cn("border border-border-secondary ...", focusRing)}

// Borderless chrome — transparent border so the hard edge can light up
className={cn(focusRingBorder, "...", focusRing)}
```

Canonical keyboard focus is always two layers:

1. Hard edge — `border-ring` (needs a border; use `focusRingBorder` when the control is otherwise borderless)
2. Soft wash — 3px `ring-ring/20` with a 1px page-colored gap

Do not invent a second focus recipe (`ring-2`, outline-only, halo without border, etc.) unless the surface is intentionally special (e.g. white rings on dark video chrome, `ring-inset` in dense grids).

- Buttons, links, toggles, tabs, triggers, and menu/select items use `cursor-pointer`.
- Text fields use `cursor-text`.
- Copy actions use `cursor-copy`.
- Disabled controls use `disabled:cursor-not-allowed` or `data-disabled:cursor-not-allowed`.

## Nested radius

Rounded children inside padded rounded parents must be concentric:

```text
inner radius = outer radius - padding
```

Use the existing scale and round down when the result falls between tokens. Common pairs:

- `rounded-md p-1` → `rounded-xs`
- `rounded-lg p-0.5` → `rounded-md`
- `rounded-xl p-1` → `rounded-md`
- `rounded-xl p-2` → `rounded-xs`
- `rounded-xl p-1.5` → `rounded-sm`

Flush children with no gap may match the parent's edge radius. Pills and circles remain `rounded-full`.

## Copy and capitalization

- Write nav labels, headings, buttons, badges, tabs, and section labels in sentence case.
- Never use all caps, `uppercase`, or `toUpperCase()` for UI copy.
- Preserve the source casing of code, variables, and design tokens.
