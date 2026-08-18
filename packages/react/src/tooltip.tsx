"use client"

import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip"
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
export type TooltipPopupProps = ComponentProps<typeof BaseTooltip.Popup>

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

export const TooltipPopup = ({ className, ...props }: TooltipPopupProps) => (
  <BaseTooltip.Popup
    className={cn(
      "z-50 max-w-xs rounded-md bg-surface-inverted px-2.5 py-1 text-xs text-fg-inverted shadow-md outline-none",
      motion.popupAnchor,
      className,
    )}
    {...props}
  />
)
