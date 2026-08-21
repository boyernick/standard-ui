"use client"

import { Popover as BasePopover } from "@base-ui/react/popover"
import type { ComponentProps } from "react"
import { cn } from "./lib/cn"
import { motion } from "./lib/motion"
import { popupSurface } from "./lib/popup"

export type PopoverProps = ComponentProps<typeof BasePopover.Root>
export type PopoverTriggerProps = ComponentProps<typeof BasePopover.Trigger>
export type PopoverPortalProps = ComponentProps<typeof BasePopover.Portal>
export type PopoverPositionerProps = ComponentProps<
  typeof BasePopover.Positioner
>
export type PopoverPopupProps = ComponentProps<typeof BasePopover.Popup>
export type PopoverTitleProps = ComponentProps<typeof BasePopover.Title>
export type PopoverDescriptionProps = ComponentProps<
  typeof BasePopover.Description
>
export type PopoverCloseProps = ComponentProps<typeof BasePopover.Close>
export type PopoverArrowProps = ComponentProps<typeof BasePopover.Arrow>

export const Popover = (props: PopoverProps) => <BasePopover.Root {...props} />

export const PopoverTrigger = ({
  className,
  ...props
}: PopoverTriggerProps) => (
  <BasePopover.Trigger className={cn("cursor-pointer", className)} {...props} />
)

export const PopoverPortal = (props: PopoverPortalProps) => (
  <BasePopover.Portal {...props} />
)

export const PopoverPositioner = ({
  sideOffset = 4,
  className,
  ...props
}: PopoverPositionerProps) => (
  <BasePopover.Positioner
    sideOffset={sideOffset}
    className={cn("z-50 outline-none", className)}
    {...props}
  />
)

export const PopoverPopup = ({ className, ...props }: PopoverPopupProps) => (
  <BasePopover.Popup
    className={cn(
      "z-50 flex w-72 flex-col gap-1 p-4",
      popupSurface,
      motion.popupAnchor,
      className,
    )}
    {...props}
  />
)

export const PopoverTitle = ({ className, ...props }: PopoverTitleProps) => (
  <BasePopover.Title
    className={cn("text-sm-strong text-fg-primary", className)}
    {...props}
  />
)

export const PopoverDescription = ({
  className,
  ...props
}: PopoverDescriptionProps) => (
  <BasePopover.Description
    className={cn("text-sm leading-relaxed text-fg-secondary", className)}
    {...props}
  />
)

export const PopoverClose = ({ className, ...props }: PopoverCloseProps) => (
  <BasePopover.Close className={cn("cursor-pointer", className)} {...props} />
)

export const PopoverArrow = ({ className, ...props }: PopoverArrowProps) => (
  <BasePopover.Arrow
    className={cn(
      "data-[side=bottom]:top-[-6px] data-[side=left]:right-[-6px] data-[side=right]:left-[-6px] data-[side=top]:bottom-[-6px]",
      "size-2.5 rotate-45 border border-border-primary bg-surface",
      "data-[side=bottom]:border-r-0 data-[side=bottom]:border-b-0",
      "data-[side=top]:border-t-0 data-[side=top]:border-l-0",
      "data-[side=left]:border-b-0 data-[side=left]:border-l-0",
      "data-[side=right]:border-t-0 data-[side=right]:border-r-0",
      className,
    )}
    {...props}
  />
)
