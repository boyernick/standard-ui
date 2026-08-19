"use client"

import { CheckboxGroup as BaseCheckboxGroup } from "@base-ui/react/checkbox-group"
import type { ComponentProps } from "react"
import { cn } from "./lib/cn"

export type CheckboxGroupProps = ComponentProps<typeof BaseCheckboxGroup>

export const CheckboxGroup = ({ className, ...props }: CheckboxGroupProps) => (
  <BaseCheckboxGroup
    className={cn("flex flex-col gap-2", className)}
    {...props}
  />
)
