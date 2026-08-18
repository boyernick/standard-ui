"use client"

import { Radio as BaseRadio } from "@base-ui/react/radio"
import { RadioGroup as BaseRadioGroup } from "@base-ui/react/radio-group"
import type { ComponentProps } from "react"
import { cn } from "./lib/cn"
import { motion } from "./lib/motion"

export type RadioGroupProps = ComponentProps<typeof BaseRadioGroup>
export type RadioProps = ComponentProps<typeof BaseRadio.Root>
export type RadioIndicatorProps = ComponentProps<typeof BaseRadio.Indicator>

export const RadioGroup = ({ className, ...props }: RadioGroupProps) => (
  <BaseRadioGroup
    className={cn("flex flex-col gap-2", className)}
    {...props}
  />
)

export const Radio = ({ className, ...props }: RadioProps) => (
  <BaseRadio.Root
    className={cn(
      "flex size-4 shrink-0 items-center justify-center rounded-full border border-border-secondary bg-surface outline-none",
      motion.colors,
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary data-checked:border-brand-primary data-checked:bg-brand-primary data-disabled:cursor-not-allowed data-disabled:opacity-50",
      className,
    )}
    {...props}
  />
)

export const RadioIndicator = ({
  className,
  ...props
}: RadioIndicatorProps) => (
  <BaseRadio.Indicator
    className={cn(
      "size-1.5 rounded-full bg-brand-foreground data-unchecked:hidden",
      className,
    )}
    {...props}
  />
)
