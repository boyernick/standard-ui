"use client"

import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip"
import { cva, type VariantProps } from "class-variance-authority"
import type { ComponentProps } from "react"
import { cn } from "./lib/cn"
import { motion } from "./lib/motion"

export type TooltipProviderProps = ComponentProps<typeof BaseTooltip.Provider>
export type TooltipProps = ComponentProps<typeof BaseTooltip.Root>
export type TooltipTriggerProps = ComponentProps<typeof BaseTooltip.Trigger>
export type TooltipPortalProps = ComponentProps<typeof BaseTooltip.Portal>
export type TooltipPositionerProps = ComponentProps<
  typeof BaseTooltip.Positioner
>
export type TooltipPopupProps = ComponentProps<typeof BaseTooltip.Popup> &
  VariantProps<typeof tooltipPopupVariants>

export const TooltipProvider = (props: TooltipProviderProps) => (
  <BaseTooltip.Provider {...props} />
)

export const Tooltip = (props: TooltipProps) => <BaseTooltip.Root {...props} />

export const TooltipTrigger = ({
  className,
  ...props
}: TooltipTriggerProps) => (
  <BaseTooltip.Trigger className={cn(className)} {...props} />
)

export const TooltipPortal = (props: TooltipPortalProps) => (
  <BaseTooltip.Portal {...props} />
)

export const TooltipPositioner = ({
  sideOffset = 6,
  className,
  ...props
}: TooltipPositionerProps) => (
  <BaseTooltip.Positioner
    sideOffset={sideOffset}
    className={cn("z-50 outline-none", className)}
    {...props}
  />
)

// Neither variant carries a border — `shadow-md` already composes
// `--elevation-hairline`, so one would stack a second edge. That hairline is
// what gives the default popup its edge against a same-coloured page.
const tooltipPopupVariants = cva(
  cn(
    "z-50 max-w-xs rounded-md px-2.5 py-1 text-xs shadow-md outline-none",
    // A trailing keycap already carries its own inset, so the full 10px beside
    // it reads as a gap rather than padding. Matching the vertical inset puts
    // the cap the same distance from every edge it is near.
    "has-[kbd]:pr-1",
  ),
  {
    variants: {
      variant: {
        // Sits on the page's own surface: white in light mode, dark in dark.
        default: "bg-surface text-fg-primary",
        // Flipped against the page — dark in light mode, light in dark — for
        // a hint that should read as separate from what it floats over.
        inverted: "bg-surface-inverted text-fg-inverted",
      },
    },
    defaultVariants: { variant: "default" },
  },
)

export const TooltipPopup = ({
  className,
  variant,
  ...props
}: TooltipPopupProps) => (
  <BaseTooltip.Popup
    className={cn(
      tooltipPopupVariants({ variant }),
      motion.popupAnchor,
      className,
    )}
    {...props}
  />
)

export { tooltipPopupVariants }
