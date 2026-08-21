/**
 * Shared motion classes for StandardUI.
 *
 * Every value resolves to a token in `@boyernick/standard-ui-tokens` — the
 * `--ease-*` ladder and the `--duration-*` scale. Nothing here hardcodes a
 * curve or a millisecond count.
 *
 * The easing ladder is ordered by *onset* — how quickly a transition commits:
 *
 *   passive  ambient, system-initiated       (slowest onset)
 *   enter    surfaces arriving
 *   move     things travelling across a surface
 *   snap     direct response to a pointer    (sharpest onset)
 *
 * Two kinds of token live here, and they behave differently:
 *
 *   Mount tokens  — backdrop, popupCenter, popupAnchor, accordionPanel.
 *     These carry separate enter and exit behaviour. Base UI flags the exit
 *     with `data-ending-style`, and the `data-ending-style:` variants below
 *     re-declare duration and easing for that direction. Exits always run at
 *     `--duration-exit`, so dismissing anything costs the same no matter how
 *     long the entrance took.
 *
 *   State tokens — tabsIndicator, colors, transform, all.
 *     These animate between states on a mounted element, so there is no enter
 *     or exit to distinguish; they take a single curve.
 *
 * Fades are linear on purpose. Perceived brightness is already non-linear, so
 * easing an opacity change makes it look like it sticks at the end.
 */

const DURATION = {
  xs: "duration-[var(--duration-xs)]",
  sm: "duration-[var(--duration-sm)]",
  md: "duration-[var(--duration-md)]",
  lg: "duration-[var(--duration-lg)]",
} as const

/** Every exit runs at the same length — see `--duration-exit`. */
const EXIT_DURATION = "data-ending-style:duration-[var(--duration-exit)]"

const REDUCED = "motion-reduce:transition-none"

export const motion = {
  /** Overlay scrims. Linear both ways — see the note on fades above. */
  backdrop: [
    "transition-opacity",
    DURATION.sm,
    "ease-linear",
    REDUCED,
    "data-starting-style:opacity-0",
    "data-ending-style:opacity-0",
    EXIT_DURATION,
    "data-ending-style:ease-linear",
  ].join(" "),

  /** Centred dialog / alert — animates `scale`, so translate centring holds. */
  popupCenter: [
    "transition-[scale,opacity]",
    DURATION.md,
    "ease-enter",
    REDUCED,
    "data-starting-style:scale-[0.96] data-starting-style:opacity-0",
    "data-ending-style:scale-[0.96] data-ending-style:opacity-0",
    EXIT_DURATION,
    "data-ending-style:ease-move",
  ].join(" "),

  /** Select, tooltip, menus — transform-origin comes from Base UI. */
  popupAnchor: [
    "origin-[var(--transform-origin)]",
    "transition-[transform,scale,opacity]",
    DURATION.sm,
    "ease-enter",
    REDUCED,
    "data-starting-style:scale-[0.96] data-starting-style:opacity-0",
    "data-ending-style:scale-[0.96] data-ending-style:opacity-0",
    EXIT_DURATION,
    "data-ending-style:ease-move",
  ].join(" "),

  /** Height expand and collapse. */
  accordionPanel: [
    "transition-[height]",
    DURATION.md,
    "ease-move",
    REDUCED,
    "data-starting-style:h-0",
    "data-ending-style:h-0",
    EXIT_DURATION,
    "data-ending-style:ease-move",
  ].join(" "),

  /** Sliding tab underline or pill — follows a pointer, so it snaps. */
  tabsIndicator: [
    "transition-[translate,width]",
    DURATION.md,
    "ease-snap",
    REDUCED,
  ].join(" "),

  /** Hover and pressed colour changes. */
  colors: ["transition-colors", DURATION.sm, "ease-enter", REDUCED].join(" "),

  /** Icon rotates and simple transforms. */
  transform: [
    "transition-transform",
    DURATION.sm,
    "ease-move",
    REDUCED,
  ].join(" "),

  /** Every property. Reach for a narrower token first. */
  all: ["transition-all", DURATION.sm, "ease-enter", REDUCED].join(" "),

  /** Long, ambient movement — progress fills, meters, background shifts. */
  passive: ["transition-all", DURATION.lg, "ease-passive", REDUCED].join(" "),
} as const
