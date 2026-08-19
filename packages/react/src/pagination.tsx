import type { ComponentProps } from "react";
import { IconChevronRightSmall } from "./icons";
import { cn } from "./lib/cn";
import { motion } from "./lib/motion";

export type PaginationProps = ComponentProps<"nav">;
export type PaginationContentProps = ComponentProps<"ul">;
export type PaginationItemProps = ComponentProps<"li">;
export type PaginationLinkProps = ComponentProps<"button"> & {
  active?: boolean;
};
export type PaginationPreviousProps = PaginationLinkProps;
export type PaginationNextProps = PaginationLinkProps;
export type PaginationEllipsisProps = ComponentProps<"span">;

export const Pagination = ({ className, ...props }: PaginationProps) => (
  <nav
    aria-label="Pagination"
    className={cn("flex w-full justify-center", className)}
    {...props}
  />
);

export const PaginationContent = ({
  className,
  ...props
}: PaginationContentProps) => (
  <ul className={cn("flex items-center gap-1", className)} {...props} />
);

export const PaginationItem = ({
  className,
  ...props
}: PaginationItemProps) => <li className={cn("flex", className)} {...props} />;

export const PaginationLink = ({
  className,
  active = false,
  type = "button",
  ...props
}: PaginationLinkProps) => (
  <button
    type={type}
    aria-current={active ? "page" : undefined}
    data-active={active || undefined}
    className={cn(
      "inline-flex size-9 cursor-pointer items-center justify-center rounded-md border border-transparent text-sm text-fg-secondary outline-none hover:bg-background-tertiary hover:text-fg-primary focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-offset-1 focus-visible:ring-offset-background-primary focus-visible:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-50 data-[active]:border-border-primary data-[active]:bg-surface data-[active]:text-fg-primary",
      motion.colors,
      className,
    )}
    {...props}
  />
);

export const PaginationPrevious = ({
  children = "Previous",
  className,
  ...props
}: PaginationPreviousProps) => (
  <PaginationLink className={cn("w-auto gap-1 px-3", className)} {...props}>
    <IconChevronRightSmall className="rotate-180" aria-hidden />
    {children}
  </PaginationLink>
);

export const PaginationNext = ({
  children = "Next",
  className,
  ...props
}: PaginationNextProps) => (
  <PaginationLink className={cn("w-auto gap-1 px-3", className)} {...props}>
    {children}
    <IconChevronRightSmall aria-hidden />
  </PaginationLink>
);

export const PaginationEllipsis = ({
  className,
  ...props
}: PaginationEllipsisProps) => (
  <span
    aria-hidden
    className={cn(
      "flex size-9 items-center justify-center text-sm text-fg-tertiary",
      className,
    )}
    {...props}
  >
    …
  </span>
);
