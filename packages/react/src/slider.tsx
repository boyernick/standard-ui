"use client"

import { Slider as BaseSlider } from "@base-ui/react/slider"
import { cva, type VariantProps } from "class-variance-authority"
import type { ComponentProps } from "react"
import { cn } from "./lib/cn"
import { focusRing } from "./lib/focus"

const sliderVariants = cva(
  "group/slider relative flex w-full data-disabled:opacity-50 data-[orientation=vertical]:h-48 data-[orientation=vertical]:w-fit",
  {
    variants: {
      size: {
        sm: "[--slider-thumb-size:0.875rem] [--slider-track-size:0.25rem]",
        md: "[--slider-thumb-size:1rem] [--slider-track-size:0.375rem]",
        lg: "[--slider-thumb-size:1.25rem] [--slider-track-size:0.5rem]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
)

export type SliderProps = Omit<
  ComponentProps<typeof BaseSlider.Root>,
  "size"
> &
  VariantProps<typeof sliderVariants>
export type SliderControlProps = ComponentProps<typeof BaseSlider.Control>
export type SliderTrackProps = ComponentProps<typeof BaseSlider.Track>
export type SliderIndicatorProps = ComponentProps<typeof BaseSlider.Indicator>
export type SliderThumbProps = ComponentProps<typeof BaseSlider.Thumb>
export type SliderTicksProps = ComponentProps<"div"> & {
  /** Number of evenly spaced marks, including both ends. */
  count?: number
}

export const Slider = ({ className, size, ...props }: SliderProps) => (
  <BaseSlider.Root
    className={cn(sliderVariants({ size }), className)}
    {...props}
  />
)

export const SliderControl = ({ className, ...props }: SliderControlProps) => (
  <BaseSlider.Control
    className={cn(
      "flex w-full touch-none items-center py-3 select-none data-disabled:cursor-not-allowed data-[orientation=vertical]:h-full data-[orientation=vertical]:w-auto data-[orientation=vertical]:px-3 data-[orientation=vertical]:py-0",
      className,
    )}
    {...props}
  />
)

export const SliderTrack = ({ className, ...props }: SliderTrackProps) => (
  <BaseSlider.Track
    className={cn(
      "relative h-[var(--slider-track-size)] w-full rounded-full bg-background-quaternary transition-colors duration-[var(--duration-sm)] group-hover/slider:bg-background-active data-[orientation=vertical]:h-full data-[orientation=vertical]:w-[var(--slider-track-size)]",
      className,
    )}
    {...props}
  />
)

export const SliderIndicator = ({
  className,
  ...props
}: SliderIndicatorProps) => (
  <BaseSlider.Indicator
    className={cn(
      "absolute h-full rounded-full bg-brand-primary data-[orientation=vertical]:h-auto data-[orientation=vertical]:w-full",
      className,
    )}
    {...props}
  />
)

export const SliderThumb = ({ className, ...props }: SliderThumbProps) => (
  <BaseSlider.Thumb
    className={cn(
      "flex size-[var(--slider-thumb-size)] cursor-grab items-center justify-center rounded-full border border-brand-primary-border bg-surface shadow-sm transition-[scale,box-shadow,background-color,border-color] duration-[var(--duration-sm)] ease-enter after:size-1 after:rounded-full after:bg-brand-primary after:content-[''] hover:scale-110 hover:bg-background-secondary active:scale-105 data-dragging:cursor-grabbing data-dragging:scale-110 data-disabled:cursor-not-allowed data-disabled:hover:scale-100",
      focusRing,
      className,
    )}
    {...props}
  />
)

export const SliderTicks = ({
  count = 5,
  className,
  ...props
}: SliderTicksProps) => {
  const tickCount = Number.isFinite(count) ? Math.max(2, Math.floor(count)) : 2

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 flex items-center justify-between group-data-[orientation=vertical]/slider:flex-col",
        className,
      )}
      {...props}
    >
      {Array.from({ length: tickCount }, (_, index) => (
        <span
          key={index}
          className="h-2 w-px rounded-full bg-surface/70 group-data-[orientation=vertical]/slider:h-px group-data-[orientation=vertical]/slider:w-2"
        />
      ))}
    </div>
  )
}

export { sliderVariants }
