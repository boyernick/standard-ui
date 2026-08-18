import { cva, type VariantProps } from "class-variance-authority"
import type { ButtonHTMLAttributes, ReactNode } from "react"
import { cn } from "./lib/cn"

const buttonVariants = cva(
  "text-sm inline-flex items-center justify-center gap-1.5 whitespace-nowrap transition-all duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary disabled:cursor-not-allowed disabled:opacity-50 disabled:active:translate-y-0 active:translate-y-px [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        primary:
          "border border-brand-primary-border bg-brand-primary text-brand-foreground inset-shadow-solid-top hover:bg-brand-primary-hover active:bg-brand-primary-active",
        secondary:
          "border border-transparent bg-background-tertiary text-fg-primary hover:bg-background-quaternary active:bg-background-active dark:bg-gray-250 dark:hover:bg-gray-350 dark:active:bg-gray-200",
        outline:
          "border border-border-secondary bg-surface text-fg-primary inset-shadow-outline-top hover:bg-background-tertiary",
        ghost:
          "border border-transparent text-fg-secondary hover:bg-background-tertiary hover:text-fg-primary",
        destructive:
          "border border-destructive-active bg-destructive text-white inset-shadow-solid-top hover:bg-destructive-active",
      },
      size: {
        sm: "h-8 px-3",
        md: "h-9 px-3.5",
        lg: "h-10 px-4",
      },
      rounded: {
        true: "rounded-full",
        false: "rounded-md",
      },
      iconOnly: {
        true: "px-0",
        false: "",
      },
    },
    compoundVariants: [
      { iconOnly: true, size: "sm", class: "size-8" },
      { iconOnly: true, size: "md", class: "size-9" },
      { iconOnly: true, size: "lg", class: "size-10" },
    ],
    defaultVariants: {
      variant: "primary",
      size: "md",
      rounded: false,
      iconOnly: false,
    },
  },
)

const ButtonSpinner = ({ className }: { className?: string }) => (
  <svg
    className={cn("size-4 animate-spin", className)}
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden
  >
    <path
      d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
      stroke="currentColor"
      strokeOpacity="0.3"
      strokeWidth="2"
    />
    <path
      d="M21 12C21 16.9706 16.9706 21 12 21"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
)

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    /** Shows a spinner, sets aria-busy, and disables the button */
    loading?: boolean
    /** Square control sized to the height of `size` — pass an icon as children */
    iconOnly?: boolean
    /** Pill shape (`rounded-full`) */
    rounded?: boolean
    /** Icon before the label (replaced by spinner when loading) */
    prefix?: ReactNode
    /** Icon after the label */
    suffix?: ReactNode
  }

export const Button = ({
  className,
  variant,
  size,
  rounded,
  iconOnly,
  loading = false,
  disabled,
  prefix,
  suffix,
  children,
  type = "button",
  ...props
}: ButtonProps) => {
  const isDisabled = Boolean(disabled || loading)
  const showPrefix = loading ? <ButtonSpinner /> : prefix

  return (
    <button
      type={type}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      data-loading={loading || undefined}
      className={cn(
        buttonVariants({ variant, size, rounded, iconOnly }),
        className,
      )}
      {...props}
    >
      {loading && iconOnly ? (
        <ButtonSpinner />
      ) : (
        <>
          {showPrefix}
          {children}
          {suffix}
        </>
      )}
    </button>
  )
}

export { buttonVariants }
