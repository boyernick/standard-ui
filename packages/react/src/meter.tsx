"use client"

import { Meter as BaseMeter } from "@base-ui/react/meter"
import type { ComponentProps } from "react"
import { cn } from "./lib/cn"

export type MeterProps = ComponentProps<typeof BaseMeter.Root>
export type MeterLabelProps = ComponentProps<typeof BaseMeter.Label>
export type MeterValueProps = ComponentProps<typeof BaseMeter.Value>
export type MeterTrackProps = ComponentProps<typeof BaseMeter.Track>
export type MeterIndicatorProps = ComponentProps<typeof BaseMeter.Indicator>

export const Meter = ({ className, ...props }: MeterProps) => (
  <BaseMeter.Root
    className={cn(
      "grid w-full grid-cols-[1fr_auto] items-center gap-x-2 gap-y-2",
      className,
    )}
    {...props}
  />
)

export const MeterLabel = ({ className, ...props }: MeterLabelProps) => (
  <BaseMeter.Label
    className={cn("text-sm text-fg-primary", className)}
    {...props}
  />
)

export const MeterValue = ({ className, ...props }: MeterValueProps) => (
  <BaseMeter.Value
    className={cn(
      "text-right text-sm text-fg-secondary tabular-nums",
      className,
    )}
    {...props}
  />
)

export const MeterTrack = ({ className, ...props }: MeterTrackProps) => (
  <BaseMeter.Track
    className={cn(
      "col-span-2 h-1.5 overflow-hidden rounded-full bg-background-quaternary",
      className,
    )}
    {...props}
  />
)

export const MeterIndicator = ({
  className,
  ...props
}: MeterIndicatorProps) => (
  <BaseMeter.Indicator
    className={cn(
      "h-full rounded-full bg-brand-primary transition-[width] duration-300 ease-out motion-reduce:transition-none",
      className,
    )}
    {...props}
  />
)
