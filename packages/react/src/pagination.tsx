"use client"

import { cva, type VariantProps } from "class-variance-authority"
import type { ComponentProps } from "react"
import { IconChevronRightSmall } from "./icons"
import { cn } from "./lib/cn"
import { focusRing } from "./lib/focus"
import { motion } from "./lib/motion"

const paginationLinkVariants = cva(
  cn(
    "inline-flex cursor-pointer items-center justify-center rounded-md border border-transparent text-fg-secondary hover:bg-background-tertiary hover:text-fg-primary aria-disabled:pointer-events-none aria-disabled:opacity-50 disabled:cursor-not-allowed disabled:opacity-50 data-[active]:border-border-primary data-[active]:bg-surface data-[active]:text-fg-primary [&_svg]:size-4 [&_svg]:shrink-0",
    focusRing,
  ),
  {
    variants: {
      size: {
        sm: "size-8 text-xs",
        md: "size-9 text-sm",
        lg: "size-10 text-sm",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
)

const paginationDirectionVariants = cva("", {
  variants: {
    size: {
      sm: "",
      md: "",
      lg: "",
    },
    iconOnly: {
      true: "",
      false: "w-auto gap-1",
    },
  },
  compoundVariants: [
    { size: "sm", iconOnly: false, class: "px-2.5" },
    { size: "md", iconOnly: false, class: "px-3" },
    { size: "lg", iconOnly: false, class: "px-3.5" },
  ],
  defaultVariants: {
    size: "md",
    iconOnly: false,
  },
})

export type PaginationSize = NonNullable<
  VariantProps<typeof paginationLinkVariants>["size"]
>

type PaginationLinkCommonProps = VariantProps<typeof paginationLinkVariants> & {
  active?: boolean
}

export type PaginationButtonProps = Omit<ComponentProps<"button">, "size"> &
  PaginationLinkCommonProps & {
    href?: never
  }
export type PaginationAnchorProps = Omit<ComponentProps<"a">, "size"> &
  PaginationLinkCommonProps & {
    href: string
    disabled?: boolean
  }
export type PaginationLinkProps =
  | PaginationButtonProps
  | PaginationAnchorProps
export type PaginationProps = ComponentProps<"nav">
export type PaginationContentProps = ComponentProps<"ul">
export type PaginationItemProps = ComponentProps<"li">
export type PaginationPreviousProps = PaginationLinkProps & {
  iconOnly?: boolean
}
export type PaginationNextProps = PaginationPreviousProps
export type PaginationFirstProps = PaginationPreviousProps
export type PaginationLastProps = PaginationPreviousProps
export type PaginationEllipsisProps = ComponentProps<"span">
export type PaginationStatusProps = ComponentProps<"span"> & {
  page: number
  totalPages: number
}
export type PaginationRangeProps = ComponentProps<"span"> & {
  start: number
  end: number
  total: number
}

export const Pagination = ({ className, ...props }: PaginationProps) => (
  <nav
    aria-label="Pagination"
    className={cn("flex w-full justify-center", className)}
    {...props}
  />
)

export const PaginationContent = ({
  className,
  ...props
}: PaginationContentProps) => (
  <ul className={cn("flex items-center gap-1", className)} {...props} />
)

export const PaginationItem = ({
  className,
  ...props
}: PaginationItemProps) => (
  <li className={cn("flex items-center", className)} {...props} />
)

export const PaginationLink = (props: PaginationLinkProps) => {
  const { className, active = false, size, ...linkProps } = props
  const classes = cn(
    paginationLinkVariants({ size }),
    motion.colors,
    className,
  )

  if ("href" in linkProps && typeof linkProps.href === "string") {
    const {
      disabled = false,
      onClick,
      tabIndex,
      ...anchorProps
    } = linkProps as PaginationAnchorProps

    return (
      <a
        {...anchorProps}
        aria-current={active ? "page" : undefined}
        aria-disabled={disabled || undefined}
        data-active={active || undefined}
        tabIndex={disabled ? -1 : tabIndex}
        className={classes}
        onClick={(event) => {
          if (disabled) {
            event.preventDefault()
            return
          }
          onClick?.(event)
        }}
      />
    )
  }

  const { type = "button", ...buttonProps } =
    linkProps as PaginationButtonProps

  return (
    <button
      type={type}
      aria-current={active ? "page" : undefined}
      data-active={active || undefined}
      className={classes}
      {...buttonProps}
    />
  )
}

const DoubleChevron = ({ direction }: { direction: "first" | "last" }) => (
  <span className="flex -space-x-2" aria-hidden>
    <IconChevronRightSmall
      className={direction === "first" ? "rotate-180" : undefined}
    />
    <IconChevronRightSmall
      className={direction === "first" ? "rotate-180" : undefined}
    />
  </span>
)

export const PaginationPrevious = ({
  children = "Previous",
  className,
  iconOnly = false,
  size = "md",
  "aria-label": ariaLabel,
  ...props
}: PaginationPreviousProps) => (
  <PaginationLink
    aria-label={ariaLabel ?? (iconOnly ? "Previous page" : undefined)}
    className={cn(
      paginationDirectionVariants({ size, iconOnly }),
      className,
    )}
    size={size}
    {...props}
  >
    <IconChevronRightSmall className="rotate-180" aria-hidden />
    {iconOnly ? null : children}
  </PaginationLink>
)

export const PaginationNext = ({
  children = "Next",
  className,
  iconOnly = false,
  size = "md",
  "aria-label": ariaLabel,
  ...props
}: PaginationNextProps) => (
  <PaginationLink
    aria-label={ariaLabel ?? (iconOnly ? "Next page" : undefined)}
    className={cn(
      paginationDirectionVariants({ size, iconOnly }),
      className,
    )}
    size={size}
    {...props}
  >
    {iconOnly ? null : children}
    <IconChevronRightSmall aria-hidden />
  </PaginationLink>
)

export const PaginationFirst = ({
  children = "First",
  className,
  iconOnly = false,
  size = "md",
  "aria-label": ariaLabel,
  ...props
}: PaginationFirstProps) => (
  <PaginationLink
    aria-label={ariaLabel ?? (iconOnly ? "First page" : undefined)}
    className={cn(
      paginationDirectionVariants({ size, iconOnly }),
      className,
    )}
    size={size}
    {...props}
  >
    <DoubleChevron direction="first" />
    {iconOnly ? null : children}
  </PaginationLink>
)

export const PaginationLast = ({
  children = "Last",
  className,
  iconOnly = false,
  size = "md",
  "aria-label": ariaLabel,
  ...props
}: PaginationLastProps) => (
  <PaginationLink
    aria-label={ariaLabel ?? (iconOnly ? "Last page" : undefined)}
    className={cn(
      paginationDirectionVariants({ size, iconOnly }),
      className,
    )}
    size={size}
    {...props}
  >
    {iconOnly ? null : children}
    <DoubleChevron direction="last" />
  </PaginationLink>
)

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
)

export const PaginationStatus = ({
  page,
  totalPages,
  children,
  className,
  ...props
}: PaginationStatusProps) => (
  <span
    aria-live="polite"
    className={cn("whitespace-nowrap text-sm text-fg-secondary tabular-nums", className)}
    {...props}
  >
    {children ?? `Page ${page} of ${totalPages}`}
  </span>
)

export const PaginationRange = ({
  start,
  end,
  total,
  children,
  className,
  ...props
}: PaginationRangeProps) => (
  <span
    aria-live="polite"
    className={cn("whitespace-nowrap text-sm text-fg-secondary tabular-nums", className)}
    {...props}
  >
    {children ?? `${start}–${end} of ${total}`}
  </span>
)

export { paginationDirectionVariants, paginationLinkVariants }
