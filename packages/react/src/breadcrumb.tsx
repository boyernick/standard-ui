import { cva, type VariantProps } from "class-variance-authority"
import type { ComponentProps, ReactNode } from "react"
import { IconChevronRightSmall } from "./icons"
import { cn } from "./lib/cn"
import { focusRing, focusRingBorder } from "./lib/focus"
import { motion } from "./lib/motion"

export type BreadcrumbProps = ComponentProps<"nav">
export type BreadcrumbListProps = ComponentProps<"ol">
export type BreadcrumbItemProps = ComponentProps<"li">
export type BreadcrumbLinkProps = ComponentProps<"a">
export type BreadcrumbPageProps = ComponentProps<"span">

const breadcrumbSeparatorVariants = cva("text-fg-tertiary", {
  variants: {
    variant: {
      chevron: "[&_svg]:size-3.5",
      slash: "",
    },
  },
  defaultVariants: {
    variant: "slash",
  },
})

export type BreadcrumbSeparatorProps = ComponentProps<"li"> & {
  children?: ReactNode
} & VariantProps<typeof breadcrumbSeparatorVariants>

export const Breadcrumb = ({ className, ...props }: BreadcrumbProps) => (
  <nav
    aria-label="Breadcrumb"
    className={cn("text-sm text-fg-secondary", className)}
    {...props}
  />
)

export const BreadcrumbList = ({
  className,
  ...props
}: BreadcrumbListProps) => (
  <ol
    className={cn("flex flex-wrap items-center gap-x-3 gap-y-1.5", className)}
    {...props}
  />
)

export const BreadcrumbItem = ({
  className,
  ...props
}: BreadcrumbItemProps) => (
  <li
    className={cn("inline-flex items-center gap-1.5", className)}
    {...props}
  />
)

export const BreadcrumbLink = ({
  className,
  ...props
}: BreadcrumbLinkProps) => (
  <a
    className={cn(
      "cursor-pointer rounded-sm text-fg-secondary hover:text-fg-primary",
      focusRingBorder,
      focusRing,
      motion.colors,
      className,
    )}
    {...props}
  />
)

export const BreadcrumbPage = ({
  className,
  ...props
}: BreadcrumbPageProps) => (
  <span
    aria-current="page"
    className={cn("font-medium text-fg-primary", className)}
    {...props}
  />
)

export const BreadcrumbSeparator = ({
  className,
  children,
  variant = "slash",
  ...props
}: BreadcrumbSeparatorProps) => (
  <li
    role="presentation"
    aria-hidden
    className={cn(breadcrumbSeparatorVariants({ variant }), className)}
    {...props}
  >
    {children ??
      (variant === "chevron" ? (
        <IconChevronRightSmall aria-hidden />
      ) : (
        "/"
      ))}
  </li>
)

export { breadcrumbSeparatorVariants }
