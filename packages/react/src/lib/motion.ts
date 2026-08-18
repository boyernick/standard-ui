/**
 * Shared motion classes for Standard UI.
 * Prefer CSS `scale` on centered modals so `translate` centering stays intact.
 * Anchored popups use `transform-origin` from Base UI.
 */
export const motion = {
  backdrop:
    "transition-opacity duration-150 ease-out motion-reduce:transition-none data-starting-style:opacity-0 data-ending-style:opacity-0",
  /** Centered dialog / alert — scale property, not transform */
  popupCenter:
    "transition-[scale,opacity] duration-150 ease-out motion-reduce:transition-none data-starting-style:scale-[0.96] data-starting-style:opacity-0 data-ending-style:scale-[0.96] data-ending-style:opacity-0",
  /** Select, tooltip, menus — transform-origin from Base UI */
  popupAnchor:
    "origin-[var(--transform-origin)] transition-[transform,scale,opacity] duration-150 ease-out motion-reduce:transition-none data-starting-style:scale-[0.96] data-starting-style:opacity-0 data-ending-style:scale-[0.96] data-ending-style:opacity-0",
  accordionPanel:
    "transition-[height] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none data-starting-style:h-0 data-ending-style:h-0",
  tabsIndicator:
    "transition-[translate,width] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
  colors: "transition-colors duration-150 ease-out motion-reduce:transition-none",
  transform:
    "transition-transform duration-150 ease-out motion-reduce:transition-none",
  all: "transition-all duration-150 ease-out motion-reduce:transition-none",
} as const
