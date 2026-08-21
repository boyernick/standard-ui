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
      "h-full rounded-full bg-brand-primary transition-[width] duration-[var(--duration-lg)] ease-enter motion-reduce:transition-none",
      // Base UI flags a null value with data-indeterminate and leaves the
      // indicator full width, so without this the bar reads as complete.
      // A quarter-width stripe crossing the track on the passive curve —
      // ambient, system-initiated movement.
      "data-indeterminate:w-1/4 data-indeterminate:animate-[progress-indeterminate_1.4s_var(--ease-passive)_infinite] motion-reduce:animate-none",
      className,
    )}
    {...props}
  />
)
