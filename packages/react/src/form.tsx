"use client"

import { Form as BaseForm } from "@base-ui/react/form"
import type { ComponentProps } from "react"
import { cn } from "./lib/cn"

export type FormProps = ComponentProps<typeof BaseForm>

export const Form = ({ className, ...props }: FormProps) => (
  <BaseForm
    className={cn("flex w-full flex-col gap-4", className)}
    {...props}
  />
)
