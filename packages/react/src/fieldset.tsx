"use client"

import { Fieldset as BaseFieldset } from "@base-ui/react/fieldset"
import type { ComponentProps } from "react"
import { cn } from "./lib/cn"

export type FieldsetProps = ComponentProps<typeof BaseFieldset.Root>
export type FieldsetLegendProps = ComponentProps<typeof BaseFieldset.Legend>

export const Fieldset = ({ className, ...props }: FieldsetProps) => (
  <BaseFieldset.Root
    className={cn("flex w-full flex-col gap-3 border-0 p-0", className)}
    {...props}
  />
)

export const FieldsetLegend = ({
  className,
  ...props
}: FieldsetLegendProps) => (
  <BaseFieldset.Legend
    className={cn("text-sm text-fg-primary", className)}
    {...props}
  />
)
