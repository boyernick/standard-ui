"use client"

import { cva, type VariantProps } from "class-variance-authority"
import { forwardRef, type InputHTMLAttributes } from "react"
import { cn } from "./lib/cn"

const inputVariants = cva(
  "text-sm flex w-full cursor-text rounded-md text-fg-primary transition-[color,box-shadow] duration-150 ease-out placeholder:text-fg-quaternary outline-none aria-invalid:border-destructive disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border bg-surface inset-shadow-outline-top focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-offset-1 focus-visible:ring-offset-background-primary focus-visible:ring-ring/20 aria-invalid:focus-visible:border-destructive aria-invalid:focus-visible:ring-destructive/20",
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
        class:
          "border-destructive focus-visible:border-destructive focus-visible:ring-[3px] focus-visible:ring-offset-1 focus-visible:ring-offset-background-primary focus-visible:ring-destructive/20",
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
