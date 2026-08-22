"use client"

import { Toast as BaseToast } from "@base-ui/react/toast"
import type { ComponentProps } from "react"
import { IconCrossSmall } from "./icons"
import { cn } from "./lib/cn"
import { motion } from "./lib/motion"

export type ToastProviderProps = ComponentProps<typeof BaseToast.Provider>
export type ToastPortalProps = ComponentProps<typeof BaseToast.Portal>
export type ToastViewportProps = ComponentProps<typeof BaseToast.Viewport>
export type ToastRootProps = ComponentProps<typeof BaseToast.Root>
export type ToastContentProps = ComponentProps<typeof BaseToast.Content>
export type ToastTitleProps = ComponentProps<typeof BaseToast.Title>
export type ToastDescriptionProps = ComponentProps<typeof BaseToast.Description>
export type ToastActionProps = ComponentProps<typeof BaseToast.Action>
export type ToastCloseProps = ComponentProps<typeof BaseToast.Close>
export type ToastPositionerProps = ComponentProps<typeof BaseToast.Positioner>
export type ToastArrowProps = ComponentProps<typeof BaseToast.Arrow>

export const ToastProvider = (props: ToastProviderProps) => (
  <BaseToast.Provider {...props} />
)

export const ToastPortal = (props: ToastPortalProps) => (
  <BaseToast.Portal {...props} />
)

export const ToastViewport = ({ className, ...props }: ToastViewportProps) => (
  <BaseToast.Viewport
    // No flex column: the toasts inside are absolutely positioned so they pile
    // up as a stack. In flow they would march down past the bottom edge.
    className={cn(
      "fixed right-4 bottom-4 z-[100] w-[min(100vw-2rem,24rem)] outline-none",
      className,
    )}
    {...props}
  />
)

/** Each toast is pinned to the bottom of the viewport and lifted by its own
 *  index, so the stack reads as a pile of cards rather than a list: the one
 *  behind peeks out by `--peek` and sits a step smaller. Hovering the viewport
 *  sets `data-expanded`, which fans them out to their real heights. */
export const ToastRoot = ({ className, ...props }: ToastRootProps) => (
  <BaseToast.Root
    className={cn(
      "absolute right-0 bottom-0 left-auto z-[calc(1000-var(--toast-index))] box-border w-full origin-bottom",
      "[--gap:0.625rem] [--peek:0.75rem]",
      "[--scale:calc(max(0,1-(var(--toast-index)*0.05)))] [--shrink:calc(1-var(--scale))]",
      "[--height:var(--toast-frontmost-height,var(--toast-height))]",
      "[--offset-y:calc(var(--toast-offset-y)*-1+calc(var(--toast-index)*var(--gap)*-1)+var(--toast-swipe-movement-y,0px))]",
      // No border: `shadow-lg` composes `--elevation-hairline`, the same edge the
      // dropdowns carry — theme-aware and 0.5px on hi-dpi. A border on top of it
      // stacked a second, darker line. The error type tints that edge with a
      // ring, which also sits outside the box model so the height never shifts.
      "rounded-xl bg-surface px-3.5 py-3 shadow-lg outline-none select-none",
      // Collapsed, every toast behind the front one is scaled down and shifted
      // up; `--shrink` cancels the gap that scaling opens at the bottom edge.
      "h-[var(--height)] data-expanded:h-[var(--toast-height)]",
      "[transform:translateX(var(--toast-swipe-movement-x,0px))_translateY(calc(var(--toast-swipe-movement-y,0px)-(var(--toast-index)*var(--peek))-(var(--shrink)*var(--height))))_scale(var(--scale))]",
      "data-expanded:[transform:translateX(var(--toast-swipe-movement-x,0px))_translateY(var(--offset-y))]",
      // Bridges the gap between cards so crossing it does not collapse the fan.
      "after:absolute after:top-full after:left-0 after:h-[calc(var(--gap)+1px)] after:w-full after:content-['']",
      "transition-[transform,opacity,height] duration-[var(--duration-md)] ease-enter motion-reduce:transition-none",
      "data-starting-style:[transform:translateY(150%)]",
      "data-ending-style:opacity-0 data-limited:opacity-0",
      "[&[data-ending-style]:not([data-limited]):not([data-swipe-direction])]:[transform:translateY(150%)]",
      "data-[type=error]:ring-1 data-[type=error]:ring-destructive/40",
      className,
    )}
    {...props}
  />
)

export const ToastContent = ({ className, ...props }: ToastContentProps) => (
  <BaseToast.Content
    className={cn(
      "flex flex-col gap-0.5 overflow-hidden transition-opacity duration-[var(--duration-sm)]",
      "data-behind:pointer-events-none data-behind:opacity-0 data-expanded:data-behind:opacity-100",
      className,
    )}
    {...props}
  />
)

export const ToastTitle = ({ className, ...props }: ToastTitleProps) => (
  <BaseToast.Title
    className={cn("text-xs-strong pr-10 text-fg-primary", className)}
    {...props}
  />
)

export const ToastDescription = ({
  className,
  ...props
}: ToastDescriptionProps) => (
  <BaseToast.Description
    className={cn("text-xs text-fg-secondary", className)}
    {...props}
  />
)

export const ToastAction = ({ className, ...props }: ToastActionProps) => (
  <BaseToast.Action
    className={cn(
      "mt-2 inline-flex h-8 cursor-pointer items-center justify-center rounded-md px-2.5 text-sm text-fg-primary outline-none",
      motion.colors,
      "hover:bg-background-tertiary outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-offset-1 focus-visible:ring-offset-background-primary focus-visible:ring-ring/20",
      className,
    )}
    {...props}
  />
)

export const ToastClose = ({
  className,
  children,
  ...props
}: ToastCloseProps) => (
  <BaseToast.Close
    className={cn(
      "absolute top-2.5 right-2.5 inline-flex size-7 cursor-pointer items-center justify-center rounded-md text-fg-tertiary outline-none",
      motion.colors,
      "hover:bg-background-tertiary hover:text-fg-primary outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-offset-1 focus-visible:ring-offset-background-primary focus-visible:ring-ring/20",
      className,
    )}
    {...props}
  >
    {children ?? (
      <IconCrossSmall size={18} className="size-4.5" aria-hidden />
    )}
  </BaseToast.Close>
)

export const ToastPositioner = ({
  className,
  ...props
}: ToastPositionerProps) => (
  <BaseToast.Positioner
    className={cn("z-[100] outline-none", className)}
    {...props}
  />
)

export const ToastArrow = ({ className, ...props }: ToastArrowProps) => (
  <BaseToast.Arrow
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

export const useToastManager = BaseToast.useToastManager
export const createToastManager = BaseToast.createToastManager
