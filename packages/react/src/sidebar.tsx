import { cva, type VariantProps } from "class-variance-authority"
import type { ComponentProps } from "react"
import { cn } from "./lib/cn"
import { motion } from "./lib/motion"

const sidebarVariants = cva(
  "flex h-full shrink-0 flex-col overflow-hidden text-fg-primary",
  {
    variants: {
      variant: {
        default: "border-r border-border-primary bg-surface",
        inset: "rounded-lg bg-background-secondary",
        floating:
          "rounded-xl border border-border-primary bg-surface-raised shadow-sm",
      },
      size: {
        sm: "w-52",
        md: "w-60",
        lg: "w-72",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
)

const sidebarNavItemVariants = cva(
  "group/nav-item relative flex w-full cursor-pointer items-center gap-2 border border-transparent text-left text-fg-secondary outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-offset-1 focus-visible:ring-offset-background-primary focus-visible:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "rounded-md hover:bg-background-tertiary hover:text-fg-primary data-[active]:bg-background-tertiary data-[active]:font-medium data-[active]:text-fg-primary",
        pill: "rounded-full hover:bg-background-tertiary hover:text-fg-primary data-[active]:border-brand-primary-border data-[active]:bg-brand-primary data-[active]:font-medium data-[active]:text-brand-foreground",
        indicator:
          "rounded-md before:absolute before:inset-y-2 before:left-0 before:w-0.5 before:rounded-full before:bg-transparent before:content-[''] hover:bg-background-tertiary hover:text-fg-primary data-[active]:bg-background-tertiary data-[active]:font-medium data-[active]:text-fg-primary data-[active]:before:bg-brand-primary",
      },
      size: {
        sm: "h-8 px-2.5 text-xs",
        md: "h-9 px-3 text-sm",
        lg: "h-10 px-3.5 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
)

export type SidebarProps = Omit<ComponentProps<"aside">, "size"> &
  VariantProps<typeof sidebarVariants>
export type SidebarHeaderProps = ComponentProps<"div">
export type SidebarContentProps = ComponentProps<"div">
export type SidebarFooterProps = ComponentProps<"div">
export type SidebarNavProps = ComponentProps<"nav">
export type SidebarNavItemProps = Omit<ComponentProps<"button">, "size"> &
  VariantProps<typeof sidebarNavItemVariants> & {
    active?: boolean
  }
export type SidebarNavItemLabelProps = ComponentProps<"span">
export type SidebarNavBadgeProps = ComponentProps<"span">
export type SidebarGroupProps = ComponentProps<"div">
export type SidebarGroupLabelProps = ComponentProps<"h3">

export const Sidebar = ({
  className,
  variant,
  size,
  ...props
}: SidebarProps) => (
  <aside
    className={cn(sidebarVariants({ variant, size }), className)}
    {...props}
  />
)

export const SidebarHeader = ({ className, ...props }: SidebarHeaderProps) => (
  <div
    className={cn("border-b border-border-primary p-4", className)}
    {...props}
  />
)

export const SidebarContent = ({
  className,
  ...props
}: SidebarContentProps) => (
  <div
    className={cn("min-h-0 flex-1 overflow-y-auto p-3", className)}
    {...props}
  />
)

export const SidebarFooter = ({ className, ...props }: SidebarFooterProps) => (
  <div
    className={cn("border-t border-border-primary p-3", className)}
    {...props}
  />
)

export const SidebarNav = ({ className, ...props }: SidebarNavProps) => (
  <nav className={cn("flex flex-col gap-1", className)} {...props} />
)

export const SidebarNavItem = ({
  className,
  active = false,
  variant,
  size,
  type = "button",
  ...props
}: SidebarNavItemProps) => (
  <button
    type={type}
    data-active={active || undefined}
    aria-current={active ? "page" : undefined}
    className={cn(
      sidebarNavItemVariants({ variant, size }),
      motion.colors,
      className,
    )}
    {...props}
  />
)

export const SidebarNavItemLabel = ({
  className,
  ...props
}: SidebarNavItemLabelProps) => (
  <span className={cn("min-w-0 flex-1 truncate", className)} {...props} />
)

export const SidebarNavBadge = ({
  className,
  ...props
}: SidebarNavBadgeProps) => (
  <span
    className={cn(
      "text-2xs-strong ml-auto inline-flex min-w-5 shrink-0 items-center justify-center rounded-full border border-border-primary bg-surface px-1.5 py-0.5 text-fg-secondary",
      className,
    )}
    {...props}
  />
)

export const SidebarGroup = ({ className, ...props }: SidebarGroupProps) => (
  <div className={cn("flex flex-col gap-1 py-2", className)} {...props} />
)

export const SidebarGroupLabel = ({
  className,
  ...props
}: SidebarGroupLabelProps) => (
  <h3
    className={cn("px-3 py-1.5 text-xs-strong text-fg-tertiary", className)}
    {...props}
  />
)

export { sidebarNavItemVariants, sidebarVariants }
