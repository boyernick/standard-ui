import { cva, type VariantProps } from "class-variance-authority"
import type { HTMLAttributes } from "react"
import { cn } from "./lib/cn"

const badgeVariants = cva(
  "text-xs-strong inline-flex items-center rounded-full px-2 py-0.5",
  {
    variants: {
      variant: {
        default: "bg-background-tertiary text-fg-secondary",
        brand: "bg-brand-secondary-solid text-brand-primary",
        outline: "border border-border-primary text-fg-secondary",
        destructive: "bg-destructive/10 text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export type BadgeProps = HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof badgeVariants>

export const Badge = ({ className, variant, ...props }: BadgeProps) => (
  <span className={cn(badgeVariants({ variant }), className)} {...props} />
)

export { badgeVariants }
