"use client"

import { NumberField as BaseNumberField } from "@base-ui/react/number-field"
import type { ComponentProps } from "react"
import { IconMinus, IconPlus } from "./icons"
import { cn } from "./lib/cn"
import { motion } from "./lib/motion"

export type NumberFieldProps = ComponentProps<typeof BaseNumberField.Root>
export type NumberFieldGroupProps = ComponentProps<typeof BaseNumberField.Group>
export type NumberFieldInputProps = ComponentProps<typeof BaseNumberField.Input>
export type NumberFieldIncrementProps = ComponentProps<
  typeof BaseNumberField.Increment
>
export type NumberFieldDecrementProps = ComponentProps<
  typeof BaseNumberField.Decrement
>
export type NumberFieldScrubAreaProps = ComponentProps<
  typeof BaseNumberField.ScrubArea
>
export type NumberFieldScrubAreaCursorProps = ComponentProps<
  typeof BaseNumberField.ScrubAreaCursor
>

export const NumberField = ({ className, ...props }: NumberFieldProps) => (
  <BaseNumberField.Root
    className={cn("flex flex-col gap-1.5", className)}
    {...props}
  />
)

export const NumberFieldGroup = ({
  className,
  ...props
}: NumberFieldGroupProps) => (
  <BaseNumberField.Group
    className={cn(
      "flex h-9 w-full items-stretch overflow-hidden rounded-md border border-border-secondary bg-surface inset-shadow-outline-top outline-none transition-[color,box-shadow]",
      "focus-within:border-ring focus-within:ring-[3px] focus-within:ring-offset-1 focus-within:ring-offset-background-primary focus-within:ring-ring/20",
      "aria-invalid:border-destructive aria-invalid:focus-within:border-destructive aria-invalid:focus-within:ring-destructive/20",
      "has-[[aria-invalid=true]]:border-destructive has-[[aria-invalid=true]]:focus-within:border-destructive has-[[aria-invalid=true]]:focus-within:ring-destructive/20",
      "has-[:disabled]:opacity-50",
      className,
    )}
    {...props}
  />
)

export const NumberFieldInput = ({
  className,
  ...props
}: NumberFieldInputProps) => (
  <BaseNumberField.Input
    className={cn(
      "h-full min-w-0 flex-1 cursor-text border-x border-border-primary bg-transparent px-2 text-center text-sm tabular-nums text-fg-primary outline-none focus-visible:outline-none",
      className,
    )}
    {...props}
  />
)

const stepperClassName = cn(
  "inline-flex size-9 shrink-0 cursor-pointer items-center justify-center text-fg-tertiary outline-none",
  motion.colors,
  "hover:bg-background-tertiary hover:text-fg-primary focus-visible:bg-background-tertiary focus-visible:text-fg-primary focus-visible:outline-none data-disabled:cursor-not-allowed data-disabled:opacity-50",
)

export const NumberFieldDecrement = ({
  className,
  children,
  "aria-label": ariaLabel = "Decrease",
  ...props
}: NumberFieldDecrementProps) => (
  <BaseNumberField.Decrement
    aria-label={ariaLabel}
    className={cn(stepperClassName, className)}
    {...props}
  >
    {children ?? <IconMinus size={16} className="size-4" aria-hidden />}
  </BaseNumberField.Decrement>
)

export const NumberFieldIncrement = ({
  className,
  children,
  "aria-label": ariaLabel = "Increase",
  ...props
}: NumberFieldIncrementProps) => (
  <BaseNumberField.Increment
    aria-label={ariaLabel}
    className={cn(stepperClassName, className)}
    {...props}
  >
    {children ?? <IconPlus size={16} className="size-4" aria-hidden />}
  </BaseNumberField.Increment>
)

export const NumberFieldScrubArea = ({
  className,
  ...props
}: NumberFieldScrubAreaProps) => (
  <BaseNumberField.ScrubArea
    className={cn(
      "inline-flex cursor-ew-resize items-center gap-1 text-sm text-fg-secondary select-none",
      className,
    )}
    {...props}
  />
)

export const NumberFieldScrubAreaCursor = ({
  className,
  ...props
}: NumberFieldScrubAreaCursorProps) => (
  <BaseNumberField.ScrubAreaCursor
    className={cn(className)}
    {...props}
  />
)
