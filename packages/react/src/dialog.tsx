"use client"

import { Dialog as BaseDialog } from "@base-ui/react/dialog"
import type { ComponentProps, HTMLAttributes } from "react"
import { cn } from "./lib/cn"
import { motion } from "./lib/motion"

export type DialogProps = ComponentProps<typeof BaseDialog.Root>
export type DialogTriggerProps = ComponentProps<typeof BaseDialog.Trigger>
export type DialogPortalProps = ComponentProps<typeof BaseDialog.Portal>
export type DialogBackdropProps = ComponentProps<typeof BaseDialog.Backdrop>
export type DialogPopupProps = ComponentProps<typeof BaseDialog.Popup>
export type DialogTitleProps = ComponentProps<typeof BaseDialog.Title>
export type DialogDescriptionProps = ComponentProps<
  typeof BaseDialog.Description
>
export type DialogCloseProps = ComponentProps<typeof BaseDialog.Close>
export type DialogHeaderProps = HTMLAttributes<HTMLDivElement>

export const Dialog = (props: DialogProps) => <BaseDialog.Root {...props} />

export const DialogTrigger = ({ className, ...props }: DialogTriggerProps) => (
  <BaseDialog.Trigger className={cn(className)} {...props} />
)

export const DialogPortal = (props: DialogPortalProps) => (
  <BaseDialog.Portal {...props} />
)

export const DialogBackdrop = ({
  className,
  ...props
}: DialogBackdropProps) => (
  <BaseDialog.Backdrop
    className={cn(
      "fixed inset-0 z-50 bg-black/40 dark:bg-black/60",
      motion.backdrop,
      className,
    )}
    {...props}
  />
)

export const DialogPopup = ({ className, ...props }: DialogPopupProps) => (
  <BaseDialog.Popup
    className={cn(
      "fixed top-1/2 left-1/2 z-50 flex w-full max-w-md -translate-x-1/2 -translate-y-1/2 flex-col gap-6 rounded-xl border border-border-primary bg-surface p-5 shadow-md outline-none max-sm:max-w-[calc(100vw-2rem)]",
      motion.popupCenter,
      className,
    )}
    {...props}
  />
)

export const DialogTitle = ({ className, ...props }: DialogTitleProps) => (
  <BaseDialog.Title
    className={cn("text-sm-strong text-fg-primary", className)}
    {...props}
  />
)

export const DialogDescription = ({
  className,
  ...props
}: DialogDescriptionProps) => (
  <BaseDialog.Description
    className={cn("text-sm leading-relaxed text-fg-secondary", className)}
    {...props}
  />
)

export const DialogClose = ({ className, ...props }: DialogCloseProps) => (
  <BaseDialog.Close className={cn(className)} {...props} />
)

export const DialogHeader = ({ className, ...props }: DialogHeaderProps) => (
  <div className={cn("flex flex-col gap-1", className)} {...props} />
)
