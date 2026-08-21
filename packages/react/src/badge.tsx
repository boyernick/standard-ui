import { cva, type VariantProps } from "class-variance-authority"
import type { HTMLAttributes, ReactNode } from "react"
import { cn } from "./lib/cn"

const badgeVariants = cva(
  "inline-flex shrink-0 items-center justify-center whitespace-nowrap align-middle [&>[data-badge-label]]:min-w-0 [&>[data-badge-label]]:truncate [&>[data-badge-slot]]:inline-flex [&>[data-badge-slot]]:shrink-0 [&>[data-badge-slot]]:items-center [&>[data-badge-slot]]:justify-center [&>[data-badge-slot]>svg]:size-full",
  {
    variants: {
      variant: {
        default: "bg-background-tertiary text-fg-primary",
        outline: "border border-border-primary text-fg-secondary",
        info: "bg-status-info-background text-status-info",
        success: "bg-status-success-background text-status-success",
        warning: "bg-status-warning-background text-status-warning",
        critical: "bg-status-critical-background text-status-critical",
        destructive: "bg-status-critical-background text-status-critical",
      },
      size: {
        xxs: "text-2xs-strong h-4 gap-0.5 px-1.5 [&>[data-badge-slot]]:size-2.5",
        xs: "text-2xs-strong h-5 gap-1 px-1.5 [&>[data-badge-slot]]:size-3",
        sm: "text-xs-strong h-6 gap-1 px-2 [&>[data-badge-slot]]:size-3.5",
        md: "text-xs-strong h-7 gap-1.5 px-2.5 [&>[data-badge-slot]]:size-3.5",
        lg: "text-sm-strong h-8 gap-1.5 px-3 [&>[data-badge-slot]]:size-4",
      },
      rounded: {
        true: "rounded-full",
        false: "rounded-sm",
      },
      iconOnly: {
        true: "p-0",
        false: "",
      },
    },
    compoundVariants: [
      { iconOnly: true, size: "xxs", class: "size-4" },
      { iconOnly: true, size: "xs", class: "size-5" },
      { iconOnly: true, size: "sm", class: "size-6" },
      { iconOnly: true, size: "md", class: "size-7" },
      { iconOnly: true, size: "lg", class: "size-8" },
    ],
    defaultVariants: {
      variant: "default",
      size: "sm",
      rounded: false,
      iconOnly: false,
    },
  },
)

export type BadgeProps = Omit<HTMLAttributes<HTMLSpanElement>, "prefix"> &
  VariantProps<typeof badgeVariants> & {
    /** Square badge sized to the height of `size`. */
    iconOnly?: boolean
    /** Pill shape (`rounded-full`) instead of the default light radius. */
    rounded?: boolean
    /** Icon or element before the label. */
    prefix?: ReactNode
    /** Icon or element after the label. */
    suffix?: ReactNode
  }

export const Badge = ({
  className,
  variant,
  size,
  rounded,
  iconOnly,
  prefix,
  suffix,
  children,
  ...props
}: BadgeProps) => (
  <span
    className={cn(
      badgeVariants({ variant, size, rounded, iconOnly }),
      className,
    )}
    {...props}
  >
    {iconOnly ? (
      <span data-badge-slot="icon">{children}</span>
    ) : (
      <>
        {prefix ? <span data-badge-slot="prefix">{prefix}</span> : null}
        {children != null ? <span data-badge-label>{children}</span> : null}
        {suffix ? <span data-badge-slot="suffix">{suffix}</span> : null}
      </>
    )}
  </span>
)

export { badgeVariants }
