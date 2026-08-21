"use client"

import { Drawer as BaseDrawer } from "@base-ui/react/drawer"
import type { ComponentProps, HTMLAttributes } from "react"
import { cn } from "./lib/cn"
import { motion } from "./lib/motion"

export type DrawerProps = ComponentProps<typeof BaseDrawer.Root>
export type DrawerProviderProps = ComponentProps<typeof BaseDrawer.Provider>
export type DrawerTriggerProps = ComponentProps<typeof BaseDrawer.Trigger>
export type DrawerPortalProps = ComponentProps<typeof BaseDrawer.Portal>
export type DrawerBackdropProps = ComponentProps<typeof BaseDrawer.Backdrop>
export type DrawerViewportProps = ComponentProps<typeof BaseDrawer.Viewport>
export type DrawerPopupProps = ComponentProps<typeof BaseDrawer.Popup>
export type DrawerContentProps = ComponentProps<typeof BaseDrawer.Content>
export type DrawerTitleProps = ComponentProps<typeof BaseDrawer.Title>
export type DrawerDescriptionProps = ComponentProps<
  typeof BaseDrawer.Description
>
export type DrawerCloseProps = ComponentProps<typeof BaseDrawer.Close>
export type DrawerSwipeAreaProps = ComponentProps<typeof BaseDrawer.SwipeArea>
export type DrawerIndentProps = ComponentProps<typeof BaseDrawer.Indent>
export type DrawerIndentBackgroundProps = ComponentProps<
  typeof BaseDrawer.IndentBackground
>
export type DrawerHeaderProps = HTMLAttributes<HTMLDivElement>

export const Drawer = (props: DrawerProps) => <BaseDrawer.Root {...props} />

export const DrawerProvider = (props: DrawerProviderProps) => (
  <BaseDrawer.Provider {...props} />
)

export const DrawerTrigger = ({ className, ...props }: DrawerTriggerProps) => (
  <BaseDrawer.Trigger className={cn("cursor-pointer", className)} {...props} />
)

export const DrawerPortal = (props: DrawerPortalProps) => (
  <BaseDrawer.Portal {...props} />
)

export const DrawerBackdrop = ({
  className,
  ...props
}: DrawerBackdropProps) => (
  <BaseDrawer.Backdrop
    className={cn(
      "fixed inset-0 z-50 bg-black/40 dark:bg-black/60",
      motion.backdrop,
      "data-swiping:duration-0",
      "opacity-[calc(1-var(--drawer-swipe-progress,0))]",
      className,
    )}
    {...props}
  />
)

export const DrawerViewport = ({
  className,
  ...props
}: DrawerViewportProps) => (
  <BaseDrawer.Viewport
    className={cn("fixed inset-0 z-50", className)}
    {...props}
  />
)

export const DrawerPopup = ({ className, ...props }: DrawerPopupProps) => (
  <BaseDrawer.Popup
    className={cn(
      "fixed z-50 flex flex-col border-border-primary bg-surface shadow-md outline-none",
      "transition-[transform,opacity] duration-[var(--duration-lg)] ease-move motion-reduce:transition-none",
      "data-swiping:duration-0",
      // Right panel (swipeDirection="right")
      "data-[swipe-direction=right]:top-0 data-[swipe-direction=right]:right-0 data-[swipe-direction=right]:h-full data-[swipe-direction=right]:w-full data-[swipe-direction=right]:max-w-sm data-[swipe-direction=right]:border-l",
      "data-[swipe-direction=right]:translate-x-[var(--drawer-swipe-movement-x)]",
      "data-[swipe-direction=right]:data-starting-style:translate-x-full",
      "data-[swipe-direction=right]:data-ending-style:translate-x-full",
      // Left panel
      "data-[swipe-direction=left]:top-0 data-[swipe-direction=left]:left-0 data-[swipe-direction=left]:h-full data-[swipe-direction=left]:w-full data-[swipe-direction=left]:max-w-sm data-[swipe-direction=left]:border-r",
      "data-[swipe-direction=left]:translate-x-[var(--drawer-swipe-movement-x)]",
      "data-[swipe-direction=left]:data-starting-style:translate-x-[-100%]",
      "data-[swipe-direction=left]:data-ending-style:translate-x-[-100%]",
      // Bottom sheet (default swipeDirection="down")
      "data-[swipe-direction=down]:right-0 data-[swipe-direction=down]:bottom-0 data-[swipe-direction=down]:left-0 data-[swipe-direction=down]:max-h-[85vh] data-[swipe-direction=down]:rounded-t-xl data-[swipe-direction=down]:border-t",
      "data-[swipe-direction=down]:translate-y-[calc(var(--drawer-snap-point-offset,0px)+var(--drawer-swipe-movement-y))]",
      "data-[swipe-direction=down]:data-starting-style:translate-y-full",
      "data-[swipe-direction=down]:data-ending-style:translate-y-full",
      // Top sheet
      "data-[swipe-direction=up]:top-0 data-[swipe-direction=up]:right-0 data-[swipe-direction=up]:left-0 data-[swipe-direction=up]:max-h-[85vh] data-[swipe-direction=up]:rounded-b-xl data-[swipe-direction=up]:border-b",
      "data-[swipe-direction=up]:translate-y-[var(--drawer-swipe-movement-y)]",
      "data-[swipe-direction=up]:data-starting-style:translate-y-[-100%]",
      "data-[swipe-direction=up]:data-ending-style:translate-y-[-100%]",
      className,
    )}
    {...props}
  />
)

export const DrawerContent = ({
  className,
  ...props
}: DrawerContentProps) => (
  <BaseDrawer.Content
    className={cn(
      "flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto p-5 outline-none",
      className,
    )}
    {...props}
  />
)

export const DrawerTitle = ({ className, ...props }: DrawerTitleProps) => (
  <BaseDrawer.Title
    className={cn("text-sm-strong text-fg-primary", className)}
    {...props}
  />
)

export const DrawerDescription = ({
  className,
  ...props
}: DrawerDescriptionProps) => (
  <BaseDrawer.Description
    className={cn("text-sm leading-relaxed text-fg-secondary", className)}
    {...props}
  />
)

export const DrawerClose = ({ className, ...props }: DrawerCloseProps) => (
  <BaseDrawer.Close className={cn("cursor-pointer", className)} {...props} />
)

export const DrawerSwipeArea = ({
  className,
  ...props
}: DrawerSwipeAreaProps) => (
  <BaseDrawer.SwipeArea className={cn(className)} {...props} />
)

export const DrawerIndent = ({ className, ...props }: DrawerIndentProps) => (
  <BaseDrawer.Indent className={cn(className)} {...props} />
)

export const DrawerIndentBackground = ({
  className,
  ...props
}: DrawerIndentBackgroundProps) => (
  <BaseDrawer.IndentBackground className={cn(className)} {...props} />
)

export const DrawerHeader = ({ className, ...props }: DrawerHeaderProps) => (
  <div className={cn("flex flex-col gap-1", className)} {...props} />
)

export const createDrawerHandle = BaseDrawer.createHandle
