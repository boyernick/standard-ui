"use client"

import { ScrollArea as BaseScrollArea } from "@base-ui/react/scroll-area"
import type { ComponentProps } from "react"
import { cn } from "./lib/cn"

export type ScrollAreaProps = ComponentProps<typeof BaseScrollArea.Root>
export type ScrollAreaViewportProps = ComponentProps<
  typeof BaseScrollArea.Viewport
>
export type ScrollAreaContentProps = ComponentProps<
  typeof BaseScrollArea.Content
>
export type ScrollAreaScrollbarProps = ComponentProps<
  typeof BaseScrollArea.Scrollbar
>
export type ScrollAreaThumbProps = ComponentProps<typeof BaseScrollArea.Thumb>

export const ScrollArea = ({ className, ...props }: ScrollAreaProps) => (
  <BaseScrollArea.Root
    className={cn("relative overflow-hidden", className)}
    {...props}
  />
)

export const ScrollAreaViewport = ({
  className,
  ...props
}: ScrollAreaViewportProps) => (
  <BaseScrollArea.Viewport
    className={cn(
      "size-full rounded-[inherit] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-offset-1 focus-visible:ring-offset-background-primary focus-visible:ring-ring/20",
      className,
    )}
    {...props}
  />
)

export const ScrollAreaContent = ({
  className,
  ...props
}: ScrollAreaContentProps) => (
  <BaseScrollArea.Content className={cn(className)} {...props} />
)

export const ScrollAreaScrollbar = ({
  className,
  ...props
}: ScrollAreaScrollbarProps) => (
  <BaseScrollArea.Scrollbar
    className={cn(
      "flex touch-none p-0.5 opacity-100 transition-opacity duration-[var(--duration-sm)] ease-enter motion-reduce:transition-none data-[orientation=horizontal]:h-2 data-[orientation=vertical]:w-2",
      className,
    )}
    {...props}
  />
)

export const ScrollAreaThumb = ({
  className,
  ...props
}: ScrollAreaThumbProps) => (
  <BaseScrollArea.Thumb
    className={cn("flex-1 rounded-full bg-border-secondary", className)}
    {...props}
  />
)
