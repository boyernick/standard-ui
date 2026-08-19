"use client"

import { AlertDialog as BaseAlertDialog } from "@base-ui/react/alert-dialog"
import type { ComponentProps, HTMLAttributes } from "react"
import { cn } from "./lib/cn"
import { motion } from "./lib/motion"

export type AlertDialogProps = ComponentProps<typeof BaseAlertDialog.Root>
export type AlertDialogTriggerProps = ComponentProps<
  typeof BaseAlertDialog.Trigger
>
export type AlertDialogPortalProps = ComponentProps<
  typeof BaseAlertDialog.Portal
>
export type AlertDialogBackdropProps = ComponentProps<
  typeof BaseAlertDialog.Backdrop
>
export type AlertDialogPopupProps = ComponentProps<typeof BaseAlertDialog.Popup>
export type AlertDialogTitleProps = ComponentProps<typeof BaseAlertDialog.Title>
export type AlertDialogDescriptionProps = ComponentProps<
  typeof BaseAlertDialog.Description
>
export type AlertDialogCloseProps = ComponentProps<typeof BaseAlertDialog.Close>
export type AlertDialogHeaderProps = HTMLAttributes<HTMLDivElement>

export const AlertDialog = (props: AlertDialogProps) => (
  <BaseAlertDialog.Root {...props} />
)

export const AlertDialogTrigger = ({
  className,
  ...props
}: AlertDialogTriggerProps) => (
  <BaseAlertDialog.Trigger className={cn(className)} {...props} />
)

export const AlertDialogPortal = (props: AlertDialogPortalProps) => (
  <BaseAlertDialog.Portal {...props} />
)

export const AlertDialogBackdrop = ({
  className,
  ...props
}: AlertDialogBackdropProps) => (
  <BaseAlertDialog.Backdrop
    className={cn(
      "fixed inset-0 z-50 bg-black/40 dark:bg-black/60",
      motion.backdrop,
      className,
    )}
    {...props}
  />
)

export const AlertDialogPopup = ({
  className,
  ...props
}: AlertDialogPopupProps) => (
  <BaseAlertDialog.Popup
    className={cn(
      "fixed top-1/2 left-1/2 z-50 flex w-full max-w-md -translate-x-1/2 -translate-y-1/2 flex-col gap-6 rounded-xl border border-border-primary bg-surface p-5 shadow-md outline-none max-sm:max-w-[calc(100vw-2rem)]",
      motion.popupCenter,
      className,
    )}
    {...props}
  />
)

export const AlertDialogTitle = ({
  className,
  ...props
}: AlertDialogTitleProps) => (
  <BaseAlertDialog.Title
    className={cn("text-sm-strong text-fg-primary", className)}
    {...props}
  />
)

export const AlertDialogDescription = ({
  className,
  ...props
}: AlertDialogDescriptionProps) => (
  <BaseAlertDialog.Description
    className={cn("text-sm leading-relaxed text-fg-secondary", className)}
    {...props}
  />
)

export const AlertDialogClose = ({
  className,
  ...props
}: AlertDialogCloseProps) => (
  <BaseAlertDialog.Close className={cn(className)} {...props} />
)

export const AlertDialogHeader = ({
  className,
  ...props
}: AlertDialogHeaderProps) => (
  <div className={cn("flex flex-col gap-1", className)} {...props} />
)
