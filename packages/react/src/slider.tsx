"use client"

import { Slider as BaseSlider } from "@base-ui/react/slider"
import type { ComponentProps } from "react"
import { cn } from "./lib/cn"

export type SliderProps = ComponentProps<typeof BaseSlider.Root>
export type SliderControlProps = ComponentProps<typeof BaseSlider.Control>
export type SliderTrackProps = ComponentProps<typeof BaseSlider.Track>
export type SliderIndicatorProps = ComponentProps<typeof BaseSlider.Indicator>
export type SliderThumbProps = ComponentProps<typeof BaseSlider.Thumb>

export const Slider = (props: SliderProps) => <BaseSlider.Root {...props} />

export const SliderControl = ({ className, ...props }: SliderControlProps) => (
  <BaseSlider.Control
    className={cn(
      "flex w-full touch-none items-center py-3 select-none",
      className,
    )}
    {...props}
  />
)

export const SliderTrack = ({ className, ...props }: SliderTrackProps) => (
  <BaseSlider.Track
    className={cn(
      "relative h-1.5 w-full rounded-full bg-background-quaternary",
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
      "absolute h-full rounded-full bg-brand-primary transition-[width] duration-150 ease-out motion-reduce:transition-none",
      className,
    )}
    {...props}
  />
)

export const SliderThumb = ({ className, ...props }: SliderThumbProps) => (
  <BaseSlider.Thumb
    className={cn(
      "size-4 cursor-pointer rounded-full border border-brand-primary-border bg-surface shadow-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-offset-1 focus-visible:ring-offset-background-primary focus-visible:ring-ring/20 data-disabled:cursor-not-allowed data-disabled:opacity-50",
      className,
    )}
    {...props}
  />
)
