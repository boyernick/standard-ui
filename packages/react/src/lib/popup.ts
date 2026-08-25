/**
 * Shared surface classes for anchored popups — autocomplete, combobox, select,
 * menu, context menu, and anything else that floats a panel next to a trigger.
 *
 * These live in one place because they have to agree. A popup that picks its
 * own radius or hairline reads as a different component to the one beside it,
 * and the drift is invisible until two of them sit on the same page.
 *
 * The radii are related, not independent. `item` is nested inside `inset`, so
 * it follows the nested-radius rule:
 *
 *   inner = outer − padding      6px = 12px − 6px
 *
 * Change `surface`'s radius or `inset`'s padding and `item` has to move with
 * it, or the corners stop being concentric. See `.cursor/rules/nested-radius`.
 */

/** Radius, hairline and elevation. Add `overflow-hidden` where items can reach
 *  the corners; leave it off panels that nest their own popups.
 *
 *  No `border` here on purpose. Every shadow token composes
 *  `--elevation-hairline`, so `shadow-lg` already draws the edge — and that
 *  hairline flips colour with the theme (black on light, white on dark) and
 *  thins to 0.5px on hi-dpi displays. A border on top stacks a second edge
 *  just outside the first, which reads as one muddy line darker than either,
 *  and none of that tracking comes with it. Leaving it off also keeps the
 *  edge out of the box model, so `popupInset` is the whole inset. */
export const popupSurface = "rounded-xl bg-surface shadow-lg outline-none"

/** Padding around a list of items. Collapses when there is nothing to pad, so
 *  a sibling empty state is not pushed off-centre by a list of zero items.
 *
 *  6px is the whole inset — `popupSurface` carries no border to add to it —
 *  which is what keeps 12 − 6 = 6 landing exactly on `popupItem`'s radius. */
export const popupInset = "p-1.5 empty:p-0"

/** One selectable row. */
export const popupItem =
  "flex min-h-9 cursor-pointer items-center gap-2 rounded-sm px-3 py-2 text-sm text-fg-primary outline-none select-none"

/** A group heading. Shares the item's left edge. */
export const popupLabel = "px-3 py-1.5 text-xs text-fg-tertiary"

/** Empty and status text. Shares the item's left edge. */
export const popupMessage = "px-3 py-2 text-sm text-fg-tertiary"
