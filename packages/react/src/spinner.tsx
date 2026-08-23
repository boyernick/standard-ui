import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "./lib/cn";

const SPINNER_SPOKES = Array.from({ length: 12 }, (_, index) => index);

const spinnerVariants = cva(
  "text-current motion-reduce:animate-none",
  {
    variants: {
      variant: {
        ring: "animate-spin",
        arc: "animate-spin",
        dots: "",
        spokes: "",
      },
      size: {
        sm: "size-3.5",
        md: "size-4",
        lg: "size-5",
      },
    },
    defaultVariants: {
      variant: "ring",
      size: "md",
    },
  },
);

export type SpinnerProps = ComponentProps<"svg"> &
  VariantProps<typeof spinnerVariants>;

export const Spinner = ({
  className,
  variant,
  size,
  ...props
}: SpinnerProps) => {
  const resolvedVariant = variant ?? "ring";

  return (
    <svg
      role="status"
      aria-label="Loading"
      className={cn(
        spinnerVariants({ variant: resolvedVariant, size }),
        className,
      )}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      {resolvedVariant === "spokes" ? (
        <g stroke="currentColor" strokeWidth="2.25" strokeLinecap="round">
          {SPINNER_SPOKES.map((spoke) => (
            <line
              key={spoke}
              x1="12"
              y1="3"
              x2="12"
              y2="6.25"
              transform={`rotate(${spoke * 30} 12 12)`}
              className="animate-[spinner-spoke_1.2s_linear_infinite] motion-reduce:animate-none motion-reduce:opacity-40"
              style={{ animationDelay: `${spoke * -0.1}s` }}
            />
          ))}
        </g>
      ) : resolvedVariant === "dots" ? (
        <g fill="currentColor">
          <circle
            cx="5"
            cy="12"
            r="2.25"
            className="animate-[spinner-dot_1.2s_var(--ease-passive)_infinite] [animation-delay:-0.32s] motion-reduce:animate-none"
          />
          <circle
            cx="12"
            cy="12"
            r="2.25"
            className="animate-[spinner-dot_1.2s_var(--ease-passive)_infinite] [animation-delay:-0.16s] motion-reduce:animate-none"
          />
          <circle
            cx="19"
            cy="12"
            r="2.25"
            className="animate-[spinner-dot_1.2s_var(--ease-passive)_infinite] motion-reduce:animate-none"
          />
        </g>
      ) : resolvedVariant === "arc" ? (
        <circle
          cx="12"
          cy="12"
          r="9"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="42 15"
        />
      ) : (
        <>
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
        </>
      )}
    </svg>
  );
};

export { spinnerVariants };
