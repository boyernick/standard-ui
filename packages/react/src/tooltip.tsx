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

// `shadow-md` already composes `--elevation-hairline`, so neither variant
// needs a border — the light one would otherwise stack a second edge.
const tooltipPopupVariants = cva(
  "z-50 max-w-xs rounded-md px-2.5 py-1 text-xs shadow-md outline-none",
  {
    variants: {
      variant: {
        // Dark on light is the conventional tooltip, and stays the default so
        // existing consumers are unaffected.
        inverted: "bg-surface-inverted text-fg-inverted",
        // For tooltips over dark or busy surfaces, where an inverted popup
        // would sink into its background instead of lifting off it.
        light: "bg-surface text-fg-primary",
      },
    },
    defaultVariants: { variant: "inverted" },
  },
)

export const TooltipPopup = ({
  className,
  variant,
  ...props
}: TooltipPopupProps) => (
  <BaseTooltip.Popup
    className={cn(tooltipPopupVariants({ variant }), motion.popupAnchor, className)}
    {...props}
  />
)

export { tooltipPopupVariants }
