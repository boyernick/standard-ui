import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "./lib/cn";

const spinnerVariants = cva("animate-spin text-current", {
  variants: {
    size: {
      sm: "size-3.5",
      md: "size-4",
      lg: "size-5",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type SpinnerProps = ComponentProps<"svg"> &
  VariantProps<typeof spinnerVariants>;

export const Spinner = ({ className, size, ...props }: SpinnerProps) => (
  <svg
    role="status"
    aria-label="Loading"
    className={cn(spinnerVariants({ size }), className)}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
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
);

export { spinnerVariants };
