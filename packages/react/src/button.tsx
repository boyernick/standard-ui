import { cva, type VariantProps } from "class-variance-authority"
import type { ButtonHTMLAttributes } from "react"
import { cn } from "./lib/cn"

const buttonVariants = cva(
  "text-sm-strong inline-flex items-center justify-center gap-2 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-brand-primary text-brand-foreground hover:bg-brand-primary-hover active:bg-brand-primary-active",
        secondary:
          "bg-background-tertiary text-fg-primary hover:bg-background-quaternary active:bg-background-active",
        outline:
          "border border-border-secondary bg-surface text-fg-primary hover:bg-background-tertiary",
        ghost: "text-fg-secondary hover:bg-background-tertiary hover:text-fg-primary",
        destructive:
          "bg-destructive text-brand-foreground hover:bg-destructive-active",
      },
      size: {
        sm: "h-8 px-3",
        md: "h-9 px-3.5",
        lg: "h-10 px-4",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
)

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>

export const Button = ({
  className,
  variant,
  size,
  type = "button",
  ...props
}: ButtonProps) => (
  <button
    type={type}
    className={cn(buttonVariants({ variant, size }), className)}
    {...props}
  />
)

export { buttonVariants }
