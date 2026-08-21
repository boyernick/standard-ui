import { cva, type VariantProps } from "class-variance-authority"
import type { ComponentProps, ReactNode } from "react"
import { IconChevronRightSmall } from "./icons"
import { cn } from "./lib/cn"
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
      slash: "px-0.5",
    },
  },
  defaultVariants: {
    variant: "chevron",
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
    className={cn("flex flex-wrap items-center gap-0.5", className)}
    {...props}
  />
)

export const BreadcrumbItem = ({
  className,
  ...props
}: BreadcrumbItemProps) => (
  <li
    className={cn("inline-flex items-center gap-1.5 px-1", className)}
    {...props}
  />
)

export const BreadcrumbLink = ({
  className,
  ...props
}: BreadcrumbLinkProps) => (
  <a
    className={cn(
      "cursor-pointer rounded-sm text-fg-secondary outline-none hover:text-fg-primary focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-offset-1 focus-visible:ring-offset-background-primary focus-visible:ring-ring/20",
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
  variant,
  ...props
}: BreadcrumbSeparatorProps) => (
  <li
    role="presentation"
    aria-hidden
    className={cn(breadcrumbSeparatorVariants({ variant }), className)}
    {...props}
  >
    {children ??
      (variant === "slash" ? "/" : <IconChevronRightSmall aria-hidden />)}
  </li>
)

export { breadcrumbSeparatorVariants }
