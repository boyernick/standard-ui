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
    className={cn(
      "fixed right-4 bottom-4 z-[100] flex w-[min(100vw-2rem,24rem)] flex-col outline-none",
      className,
    )}
    {...props}
  />
)

export const ToastRoot = ({ className, ...props }: ToastRootProps) => (
  <BaseToast.Root
    className={cn(
      "relative z-[calc(1000-var(--toast-index))] mb-2 box-border w-full rounded-xl border border-border-primary bg-surface p-4 shadow-lg outline-none",
      "h-[var(--toast-frontmost-height,var(--toast-height))]",
      "transition-[transform,opacity] duration-200 ease-out motion-reduce:transition-none",
      "data-starting-style:opacity-0 data-starting-style:translate-y-2",
      "data-ending-style:opacity-0 data-ending-style:translate-y-2",
      "data-expanded:h-[var(--toast-height)] data-expanded:translate-y-[var(--toast-offset-y)]",
      "data-[type=error]:border-destructive/40",
      "data-[type=success]:border-border-primary",
      className,
    )}
    {...props}
  />
)

export const ToastContent = ({ className, ...props }: ToastContentProps) => (
  <BaseToast.Content
    className={cn(
      "flex flex-col gap-1 overflow-hidden transition-opacity duration-150",
      "data-behind:pointer-events-none data-behind:opacity-0 data-expanded:data-behind:opacity-100",
      className,
    )}
    {...props}
  />
)

export const ToastTitle = ({ className, ...props }: ToastTitleProps) => (
  <BaseToast.Title
    className={cn("text-sm-strong pr-8 text-fg-primary", className)}
    {...props}
  />
)

export const ToastDescription = ({
  className,
  ...props
}: ToastDescriptionProps) => (
  <BaseToast.Description
    className={cn("text-sm leading-relaxed text-fg-secondary", className)}
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
      "absolute top-3 right-3 inline-flex size-7 cursor-pointer items-center justify-center rounded-md text-fg-tertiary outline-none",
      motion.colors,
      "hover:bg-background-tertiary hover:text-fg-primary outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-offset-1 focus-visible:ring-offset-background-primary focus-visible:ring-ring/20",
      className,
    )}
    {...props}
  >
    {children ?? (
      <IconCrossSmall size={14} className="size-3.5" aria-hidden />
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
