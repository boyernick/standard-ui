"use client"

import { Toggle as BaseToggle } from "@base-ui/react/toggle"
import { ToggleGroup as BaseToggleGroup } from "@base-ui/react/toggle-group"
import type { ComponentProps } from "react"
import { cn } from "./lib/cn"
import { motion } from "./lib/motion"

export type ToggleProps = ComponentProps<typeof BaseToggle>
export type ToggleGroupProps = ComponentProps<typeof BaseToggleGroup>

export const Toggle = ({ className, ...props }: ToggleProps) => (
  <BaseToggle
    className={cn(
      "inline-flex h-9 cursor-pointer items-center justify-center gap-1.5 rounded-md border border-transparent px-3 text-sm text-fg-secondary outline-none",
      motion.colors,
      "hover:bg-background-tertiary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary data-disabled:cursor-not-allowed data-disabled:opacity-50 data-pressed:bg-background-tertiary data-pressed:text-fg-primary",
      className,
    )}
    {...props}
  />
)

export const ToggleGroup = ({ className, ...props }: ToggleGroupProps) => (
  <BaseToggleGroup
    className={cn(
      "inline-flex items-center gap-0.5 rounded-lg border border-border-primary bg-background-secondary p-0.5",
      className,
    )}
    {...props}
  />
)
