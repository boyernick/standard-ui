"use client"

import { PreviewCard as BasePreviewCard } from "@base-ui/react/preview-card"
import type { ComponentProps } from "react"
import { cn } from "./lib/cn"
import { motion } from "./lib/motion"

export type PreviewCardProps = ComponentProps<typeof BasePreviewCard.Root>
export type PreviewCardTriggerProps = ComponentProps<
  typeof BasePreviewCard.Trigger
>
export type PreviewCardPortalProps = ComponentProps<
  typeof BasePreviewCard.Portal
>
export type PreviewCardBackdropProps = ComponentProps<
  typeof BasePreviewCard.Backdrop
>
export type PreviewCardPositionerProps = ComponentProps<
  typeof BasePreviewCard.Positioner
>
export type PreviewCardPopupProps = ComponentProps<typeof BasePreviewCard.Popup>
export type PreviewCardArrowProps = ComponentProps<typeof BasePreviewCard.Arrow>
export type PreviewCardViewportProps = ComponentProps<
  typeof BasePreviewCard.Viewport
>

export const PreviewCard = (props: PreviewCardProps) => (
  <BasePreviewCard.Root {...props} />
)

export const PreviewCardTrigger = ({
  className,
  ...props
}: PreviewCardTriggerProps) => (
  <BasePreviewCard.Trigger
    className={cn("cursor-pointer", className)}
    {...props}
  />
)

export const PreviewCardPortal = (props: PreviewCardPortalProps) => (
  <BasePreviewCard.Portal {...props} />
)

export const PreviewCardBackdrop = ({
  className,
  ...props
}: PreviewCardBackdropProps) => (
  <BasePreviewCard.Backdrop className={cn(className)} {...props} />
)

export const PreviewCardPositioner = ({
  sideOffset = 8,
  className,
  ...props
}: PreviewCardPositionerProps) => (
  <BasePreviewCard.Positioner
    sideOffset={sideOffset}
    className={cn("z-50 outline-none", className)}
    {...props}
  />
)

export const PreviewCardPopup = ({
  className,
  ...props
}: PreviewCardPopupProps) => (
  <BasePreviewCard.Popup
    className={cn(
      "z-50 w-72 overflow-hidden rounded-xl border border-border-primary bg-surface p-4 shadow-md outline-none",
      motion.popupAnchor,
      className,
    )}
    {...props}
  />
)

export const PreviewCardArrow = ({
  className,
  ...props
}: PreviewCardArrowProps) => (
  <BasePreviewCard.Arrow
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

export const PreviewCardViewport = ({
  className,
  ...props
}: PreviewCardViewportProps) => (
  <BasePreviewCard.Viewport className={cn(className)} {...props} />
)

export const createPreviewCardHandle = BasePreviewCard.createHandle
