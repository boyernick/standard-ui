"use client"

import { Separator as BaseSeparator } from "@base-ui/react/separator"
import type { ComponentProps } from "react"
import { cn } from "./lib/cn"

export type SeparatorProps = ComponentProps<typeof BaseSeparator>

export const Separator = ({ className, ...props }: SeparatorProps) => (
  <BaseSeparator
    className={cn(
      "h-px w-full bg-border-primary data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
      className,
    )}
    {...props}
  />
)
