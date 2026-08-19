"use client"

import type { ComponentProps, ImgHTMLAttributes } from "react"
import { Button } from "./button"
import {
  Dialog,
  DialogBackdrop,
  DialogClose,
  DialogPopup,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "./dialog"
import { cn } from "./lib/cn"
import { motion } from "./lib/motion"

export type ImageModalProps = ComponentProps<typeof Dialog>
export type ImageModalTriggerProps = ComponentProps<typeof DialogTrigger>
export type ImageModalContentProps = ComponentProps<typeof DialogPopup> & {
  src: string
  alt: string
  caption?: string
  imgProps?: Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "alt">
}

export const ImageModal = (props: ImageModalProps) => <Dialog {...props} />

export const ImageModalTrigger = ({
  className,
  ...props
}: ImageModalTriggerProps) => (
  <DialogTrigger
    className={cn(
      "cursor-pointer rounded-xl outline-none focus-visible:ring-[3px] focus-visible:ring-offset-1 focus-visible:ring-offset-background-primary focus-visible:ring-ring/20",
      className,
    )}
    {...props}
  />
)

export const ImageModalContent = ({
  src,
  alt,
  caption,
  className,
  imgProps,
  children,
  ...props
}: ImageModalContentProps) => (
  <DialogPortal>
    <DialogBackdrop className="bg-black/70 dark:bg-black/80" />
    <DialogPopup
      data-slot="image-modal-content"
      className={cn(
        "max-h-[90vh] w-full max-w-4xl gap-0 overflow-hidden border-border-primary bg-surface p-0 shadow-lg max-sm:max-w-[calc(100vw-1.5rem)]",
        motion.popupCenter,
        className,
      )}
      {...props}
    >
      <div className="relative">
        <DialogTitle className="sr-only">{alt}</DialogTitle>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className={cn(
            "max-h-[min(80vh,56rem)] w-full object-contain bg-background-secondary",
            imgProps?.className,
          )}
          {...imgProps}
        />
        <DialogClose
          render={
            <Button
              type="button"
              variant="secondary"
              size="sm"
              iconOnly
              rounded
              aria-label="Close"
              className="absolute top-3 right-3"
            />
          }
        >
          <CloseIcon />
        </DialogClose>
      </div>
      {caption || children ? (
        <div className="border-t border-border-primary px-4 py-3">
          {caption ? (
            <p className="text-sm text-fg-secondary">{caption}</p>
          ) : null}
          {children}
        </div>
      ) : null}
    </DialogPopup>
  </DialogPortal>
)

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="size-4" aria-hidden>
    <path
      d="M7 7l10 10M17 7 7 17"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
)
