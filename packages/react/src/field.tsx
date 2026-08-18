"use client"

import { Field as BaseField } from "@base-ui/react/field"
import type { ComponentProps } from "react"
import { cn } from "./lib/cn"

export type FieldProps = ComponentProps<typeof BaseField.Root>
export type FieldLabelProps = ComponentProps<typeof BaseField.Label>
export type FieldDescriptionProps = ComponentProps<typeof BaseField.Description>
export type FieldErrorProps = ComponentProps<typeof BaseField.Error>
export type FieldControlProps = ComponentProps<typeof BaseField.Control>
export type FieldValidityProps = ComponentProps<typeof BaseField.Validity>
export type FieldItemProps = ComponentProps<typeof BaseField.Item>

export const Field = ({ className, ...props }: FieldProps) => (
  <BaseField.Root
    className={cn("flex w-full flex-col gap-1.5", className)}
    {...props}
  />
)

export const FieldLabel = ({ className, ...props }: FieldLabelProps) => (
  <BaseField.Label
    className={cn(
      "text-sm text-fg-primary data-disabled:opacity-50",
      className,
    )}
    {...props}
  />
)

export const FieldDescription = ({
  className,
  ...props
}: FieldDescriptionProps) => (
  <BaseField.Description
    className={cn("text-xs text-fg-tertiary data-disabled:opacity-50", className)}
    {...props}
  />
)

export const FieldError = ({ className, ...props }: FieldErrorProps) => (
  <BaseField.Error
    className={cn("text-xs text-destructive", className)}
    {...props}
  />
)

export const FieldControl = ({ className, ...props }: FieldControlProps) => (
  <BaseField.Control
    className={cn(
      "text-sm flex h-9 w-full cursor-text rounded-md border border-border-secondary bg-surface px-3 text-fg-primary inset-shadow-outline-top outline-none transition-[color,box-shadow] duration-150 ease-out placeholder:text-fg-quaternary",
      "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-offset-1 focus-visible:ring-offset-background-primary focus-visible:ring-ring/20",
      "data-invalid:border-destructive data-invalid:focus-visible:border-destructive data-invalid:focus-visible:ring-destructive/20",
      "aria-invalid:border-destructive aria-invalid:focus-visible:border-destructive aria-invalid:focus-visible:ring-destructive/20",
      "data-disabled:cursor-not-allowed data-disabled:opacity-50",
      className,
    )}
    {...props}
  />
)

export const FieldValidity = (props: FieldValidityProps) => (
  <BaseField.Validity {...props} />
)

export const FieldItem = ({ className, ...props }: FieldItemProps) => (
  <BaseField.Item
    className={cn(
      "flex items-center gap-2 data-disabled:opacity-50",
      className,
    )}
    {...props}
  />
)
