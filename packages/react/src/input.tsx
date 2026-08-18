import { cva, type VariantProps } from "class-variance-authority"
import type { InputHTMLAttributes } from "react"
import { cn } from "./lib/cn"

const inputVariants = cva(
  "text-sm flex w-full rounded-md border bg-surface text-fg-primary transition-colors placeholder:text-fg-quaternary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "h-8 px-2.5",
        md: "h-9 px-3",
        lg: "h-10 px-3.5",
      },
      invalid: {
        true: "border-destructive focus-visible:ring-destructive",
        false: "border-border-secondary",
      },
    },
    defaultVariants: {
      size: "md",
      invalid: false,
    },
  },
)

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> &
  VariantProps<typeof inputVariants>

export const Input = ({ className, size, invalid, ...props }: InputProps) => (
  <input
    className={cn(inputVariants({ size, invalid }), className)}
    aria-invalid={invalid || undefined}
    {...props}
  />
)

export { inputVariants }
