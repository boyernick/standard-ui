"use client"

import { Progress as BaseProgress } from "@base-ui/react/progress"
import type { ComponentProps } from "react"
import { cn } from "./lib/cn"

export type ProgressProps = ComponentProps<typeof BaseProgress.Root>
export type ProgressLabelProps = ComponentProps<typeof BaseProgress.Label>
export type ProgressValueProps = ComponentProps<typeof BaseProgress.Value>
export type ProgressTrackProps = ComponentProps<typeof BaseProgress.Track>
export type ProgressIndicatorProps = ComponentProps<
  typeof BaseProgress.Indicator
>

export const Progress = ({ className, ...props }: ProgressProps) => (
  <BaseProgress.Root
    className={cn(
      "grid w-full grid-cols-[1fr_auto] items-center gap-x-2 gap-y-2",
      className,
    )}
    {...props}
  />
)

export const ProgressLabel = ({ className, ...props }: ProgressLabelProps) => (
  <BaseProgress.Label
    className={cn("text-sm text-fg-primary", className)}
    {...props}
  />
)

export const ProgressValue = ({ className, ...props }: ProgressValueProps) => (
  <BaseProgress.Value
    className={cn("text-right text-sm text-fg-secondary tabular-nums", className)}
    {...props}
  />
)

export const ProgressTrack = ({ className, ...props }: ProgressTrackProps) => (
  <BaseProgress.Track
    className={cn(
      "col-span-2 h-1.5 overflow-hidden rounded-full bg-background-quaternary",
      className,
    )}
    {...props}
  />
)

export const ProgressIndicator = ({
  className,
  ...props
}: ProgressIndicatorProps) => (
  <BaseProgress.Indicator
    className={cn(
      "h-full rounded-full bg-brand-primary transition-[width] duration-300 ease-out motion-reduce:transition-none",
      className,
    )}
    {...props}
  />
)
