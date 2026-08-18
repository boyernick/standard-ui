import { cva, type VariantProps } from "class-variance-authority"
import type { InputHTMLAttributes } from "react"
import { cn } from "./lib/cn"

const inputVariants = cva(
  "text-sm flex w-full rounded-md text-fg-primary transition-all duration-150 ease-out placeholder:text-fg-quaternary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary disabled:cursor-not-allowed disabled:opacity-50",
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

export const Input = ({
  className,
  variant,
  size,
  invalid,
  ...props
}: InputProps) => (
  <input
    className={cn(inputVariants({ variant, size, invalid }), className)}
    aria-invalid={invalid || undefined}
    {...props}
  />
)

export { inputVariants }
