import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "./lib/cn";

const skeletonVariants = cva(
  "animate-pulse bg-background-tertiary motion-reduce:animate-none",
  {
    variants: {
      variant: {
        block: "rounded-md",
        text: "h-4 rounded-sm",
        circle: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "block",
    },
  },
);

export type SkeletonProps = ComponentProps<"div"> &
  VariantProps<typeof skeletonVariants>;

export const Skeleton = ({ className, variant, ...props }: SkeletonProps) => (
  <div
    aria-hidden
    className={cn(skeletonVariants({ variant }), className)}
    {...props}
  />
);

export { skeletonVariants };
