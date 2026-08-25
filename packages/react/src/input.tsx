"use client"

import { cva, type VariantProps } from "class-variance-authority"
import { forwardRef, type InputHTMLAttributes } from "react"
import { cn } from "./lib/cn"
import { focusRing, focusRingInvalid } from "./lib/focus"

const inputVariants = cva(
  cn(
    "text-sm flex w-full cursor-text rounded-md text-fg-primary transition-[color,box-shadow] duration-[var(--duration-sm)] ease-enter placeholder:text-fg-quaternary aria-invalid:border-destructive disabled:cursor-not-allowed disabled:opacity-50",
    focusRing,
    focusRingInvalid,
  ),
  {
    variants: {
      variant: {
        default: "border bg-surface inset-shadow-outline-top",
        ghost: "border border-transparent bg-transparent",
      },
      size: {
        sm: "h-8 px-2.5",
        md: "h-9 px-3",
        lg: "h-10 px-3.5",
      },
      invalid: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        variant: "default",
        invalid: false,
        class: "border-border-secondary",
      },
      {
        variant: "default",
        invalid: true,
        class: "border-destructive",
      },
      {
        variant: "ghost",
        invalid: true,
        class: "border-destructive",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "md",
      invalid: false,
    },
  },
)

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> &
  VariantProps<typeof inputVariants>

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, size, invalid, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(inputVariants({ variant, size, invalid }), className)}
      aria-invalid={invalid || undefined}
      {...props}
    />
  ),
)

Input.displayName = "Input"

export { inputVariants }
