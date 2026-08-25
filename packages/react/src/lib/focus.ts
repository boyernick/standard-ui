/**
 * Canonical keyboard focus for StandardUI controls.
 *
 * Two layers, always together:
 * 1. Hard edge — `border-ring` turns the control's border to `--ring`.
 *    Borderless chrome must carry `border border-transparent` so the edge
 *    can light up on focus without shifting layout.
 * 2. Soft wash — 3px `ring-ring/20` with a 1px page-colored gap.
 *
 * Use these strings everywhere. Do not invent a second focus recipe.
 */

/** Default focus-visible ring for buttons, tabs, toggles, links, etc. */
export const focusRing =
  "outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-offset-1 focus-visible:ring-offset-background-primary focus-visible:ring-ring/20"

/** Same recipe keyed to `:focus-within` for composite fields. */
export const focusRingWithin =
  "outline-none focus-within:border-ring focus-within:ring-[3px] focus-within:ring-offset-1 focus-within:ring-offset-background-primary focus-within:ring-ring/20"

/** Destructive focus-visible ring — use instead of `focusRing` on error actions. */
export const focusRingDestructive =
  "outline-none focus-visible:border-destructive focus-visible:ring-[3px] focus-visible:ring-offset-1 focus-visible:ring-offset-background-primary focus-visible:ring-destructive/20"

/** Destructive focus-within ring — use instead of `focusRingWithin` when invalid. */
export const focusRingWithinDestructive =
  "outline-none focus-within:border-destructive focus-within:ring-[3px] focus-within:ring-offset-1 focus-within:ring-offset-background-primary focus-within:ring-destructive/20"

/**
 * Invalid-state modifiers that pair with `focusRing` / `focusRingWithin`.
 * Keeps the 3px + offset geometry; only the edge and wash go destructive.
 */
export const focusRingInvalid =
  "aria-invalid:border-destructive aria-invalid:focus-visible:border-destructive aria-invalid:focus-visible:ring-destructive/20"

export const focusRingInvalidWithin =
  "aria-invalid:border-destructive aria-invalid:focus-within:border-destructive aria-invalid:focus-within:ring-destructive/20"

/** Transparent border so borderless chrome can take `focusRing`'s hard edge. */
export const focusRingBorder =
  "border border-transparent"
