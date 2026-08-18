import { cva, type VariantProps } from "class-variance-authority"
import type { TextareaHTMLAttributes } from "react"
import { cn } from "./lib/cn"

const textareaVariants = cva(
  "flex min-h-20 w-full cursor-text resize-y rounded-md px-3 py-2 text-sm text-fg-primary transition-all duration-150 ease-out placeholder:text-fg-quaternary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border bg-surface inset-shadow-outline-top",
        ghost: "border border-transparent bg-transparent",
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
      invalid: false,
    },
  },
)

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> &
  VariantProps<typeof textareaVariants>

export const Textarea = ({
  className,
  variant,
  invalid,
  ...props
}: TextareaProps) => (
  <textarea
    className={cn(textareaVariants({ variant, invalid }), className)}
    aria-invalid={invalid || undefined}
    {...props}
  />
)

export { textareaVariants }
