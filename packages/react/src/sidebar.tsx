import type { ComponentProps } from "react";
import { cn } from "./lib/cn";
import { motion } from "./lib/motion";

export type SidebarProps = ComponentProps<"aside">;
export type SidebarHeaderProps = ComponentProps<"div">;
export type SidebarContentProps = ComponentProps<"div">;
export type SidebarFooterProps = ComponentProps<"div">;
export type SidebarNavProps = ComponentProps<"nav">;
export type SidebarNavItemProps = ComponentProps<"button"> & {
  active?: boolean;
};
export type SidebarGroupProps = ComponentProps<"div">;
export type SidebarGroupLabelProps = ComponentProps<"h3">;

export const Sidebar = ({ className, ...props }: SidebarProps) => (
  <aside
    className={cn(
      "flex h-full w-60 shrink-0 flex-col border-r border-border-primary bg-surface",
      className,
    )}
    {...props}
  />
);

export const SidebarHeader = ({ className, ...props }: SidebarHeaderProps) => (
  <div
    className={cn("border-b border-border-primary p-4", className)}
    {...props}
  />
);

export const SidebarContent = ({
  className,
  ...props
}: SidebarContentProps) => (
  <div className={cn("flex-1 overflow-y-auto p-3", className)} {...props} />
);

export const SidebarFooter = ({ className, ...props }: SidebarFooterProps) => (
  <div
    className={cn("border-t border-border-primary p-3", className)}
    {...props}
  />
);

export const SidebarNav = ({ className, ...props }: SidebarNavProps) => (
  <nav className={cn("flex flex-col gap-1", className)} {...props} />
);

export const SidebarNavItem = ({
  className,
  active = false,
  type = "button",
  ...props
}: SidebarNavItemProps) => (
  <button
    type={type}
    data-active={active || undefined}
    aria-current={active ? "page" : undefined}
    className={cn(
      "flex h-9 w-full cursor-pointer items-center gap-2 rounded-md border border-transparent px-3 text-left text-sm text-fg-secondary outline-none hover:bg-background-tertiary hover:text-fg-primary focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-offset-1 focus-visible:ring-offset-background-primary focus-visible:ring-ring/20 data-[active]:bg-background-tertiary data-[active]:font-medium data-[active]:text-fg-primary [&_svg]:size-4 [&_svg]:shrink-0",
      motion.colors,
      className,
    )}
    {...props}
  />
);

export const SidebarGroup = ({ className, ...props }: SidebarGroupProps) => (
  <div className={cn("flex flex-col gap-1 py-2", className)} {...props} />
);

export const SidebarGroupLabel = ({
  className,
  ...props
}: SidebarGroupLabelProps) => (
  <h3
    className={cn("px-3 py-1.5 text-xs-strong text-fg-tertiary", className)}
    {...props}
  />
);
