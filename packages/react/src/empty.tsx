import type { ComponentProps } from "react";
import { cn } from "./lib/cn";

export type EmptyProps = ComponentProps<"div">;
export type EmptyIconProps = ComponentProps<"div">;
export type EmptyTitleProps = ComponentProps<"h3">;
export type EmptyDescriptionProps = ComponentProps<"p">;
export type EmptyActionsProps = ComponentProps<"div">;

export const Empty = ({ className, ...props }: EmptyProps) => (
  <div
    className={cn(
      "flex min-h-48 flex-col items-center justify-center rounded-xl border border-dashed border-border-primary bg-surface p-8 text-center",
      className,
    )}
    {...props}
  />
);

export const EmptyIcon = ({ className, ...props }: EmptyIconProps) => (
  <div
    className={cn(
      "mb-4 flex size-10 items-center justify-center rounded-lg bg-background-tertiary text-fg-secondary [&_svg]:size-5",
      className,
    )}
    {...props}
  />
);

export const EmptyTitle = ({ className, ...props }: EmptyTitleProps) => (
  <h3 className={cn("text-sm-strong text-fg-primary", className)} {...props} />
);

export const EmptyDescription = ({
  className,
  ...props
}: EmptyDescriptionProps) => (
  <p
    className={cn("mt-1 max-w-sm text-sm text-fg-secondary", className)}
    {...props}
  />
);

export const EmptyActions = ({ className, ...props }: EmptyActionsProps) => (
  <div
    className={cn(
      "mt-4 flex flex-wrap items-center justify-center gap-2",
      className,
    )}
    {...props}
  />
);
