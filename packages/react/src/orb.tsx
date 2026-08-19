import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "./lib/cn";

const orbVariants = cva(
  "relative inline-flex shrink-0 animate-pulse rounded-full border border-brand-primary-border bg-brand-primary after:absolute after:inset-1/4 after:rounded-full after:bg-surface/70 after:blur-sm motion-reduce:animate-none",
  {
    variants: {
      size: {
        sm: "size-6",
        md: "size-10",
        lg: "size-16",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export type OrbProps = ComponentProps<"span"> &
  VariantProps<typeof orbVariants>;

export const Orb = ({ className, size, ...props }: OrbProps) => (
  <span
    role="status"
    aria-label="Loading"
    className={cn(orbVariants({ size }), className)}
    {...props}
  />
);

export { orbVariants };
