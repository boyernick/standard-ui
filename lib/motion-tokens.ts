/** Motion tokens, grouped by what they animate.
 *
 * Mirrors the `motion` object exported from `@boyernick/standard-ui-react`,
 * which resolves every value to an `--ease-*` or `--duration-*` token.
 *
 * Mount tokens carry separate enter and exit behaviour, shown here as
 * `enter → exit`. Exits always run at `--duration-exit`, so dismissing
 * anything costs the same however long the entrance took. State tokens
 * animate between states on a mounted element and take a single curve.
 */

export type MotionToken = {
  name: string
  usage: string
  duration: string
  easing: string
}

export type MotionGroup = {
  id: string
  title: string
  description: string
  tokens: MotionToken[]
}

export type EasingToken = {
  className: string
  value: string
  onset: string
  usage: string
}

/** Ordered by onset — how quickly a transition commits. */
export const easings: EasingToken[] = [
  {
    className: "ease-passive",
    value: "cubic-bezier(0.5, 0, 0.1, 1)",
    onset: "20.7%",
    usage: "Ambient, system-initiated",
  },
  {
    className: "ease-enter",
    value: "cubic-bezier(0.32, 0.08, 0.24, 1)",
    onset: "13.1%",
    usage: "Surfaces arriving",
  },
  {
    className: "ease-move",
    value: "cubic-bezier(0.22, 1, 0.36, 1)",
    onset: "2.3%",
    usage: "Things travelling across a surface",
  },
  {
    className: "ease-snap",
    value: "cubic-bezier(0.1, 0.9, 0.2, 1)",
    onset: "1.2%",
    usage: "Direct response to a pointer",
  },
]

export const motionGroups: MotionGroup[] = [
  {
    id: "overlays",
    title: "Overlays",
    description: "Mount and unmount transitions for layered surfaces.",
    tokens: [
      {
        name: "motion.backdrop",
        usage: "Dialog, command, and drawer scrims",
        duration: "150 → 150ms",
        easing: "linear",
      },
      {
        name: "motion.popupCenter",
        usage: "Centred modals — scales, so translate centring survives",
        duration: "200 → 150ms",
        easing: "enter → move",
      },
      {
        name: "motion.popupAnchor",
        usage: "Menus, select, tooltip — origin from Base UI",
        duration: "150 → 150ms",
        easing: "enter → move",
      },
    ],
  },
  {
    id: "panels",
    title: "Panels and indicators",
    description: "Parts of a control that expand, slide, or appear in place.",
    tokens: [
      {
        name: "motion.accordionPanel",
        usage: "Height expand and collapse",
        duration: "200 → 150ms",
        easing: "move",
      },
      {
        name: "motion.checkIndicator",
        usage: "Check and minus glyphs inside a small control",
        duration: "150 → 150ms",
        easing: "snap → move",
      },
      {
        name: "motion.tabsIndicator",
        usage: "Sliding tab underline or pill",
        duration: "200ms",
        easing: "snap",
      },
    ],
  },
  {
    id: "properties",
    title: "Properties",
    description: "General-purpose transitions for interactive states.",
    tokens: [
      {
        name: "motion.colors",
        usage: "Hover and pressed colour changes",
        duration: "150ms",
        easing: "enter",
      },
      {
        name: "motion.transform",
        usage: "Icon rotates and simple transforms",
        duration: "150ms",
        easing: "move",
      },
      {
        name: "motion.all",
        usage: "Every property — reach for a narrower token first",
        duration: "150ms",
        easing: "enter",
      },
      {
        name: "motion.passive",
        usage: "Progress fills, meters, ambient movement",
        duration: "300ms",
        easing: "passive",
      },
    ],
  },
]
