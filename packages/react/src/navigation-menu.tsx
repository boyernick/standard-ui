"use client"

import { NavigationMenu as BaseNavigationMenu } from "@base-ui/react/navigation-menu"
import type { ComponentProps } from "react"
import { IconChevronDownSmall } from "./icons"
import { cn } from "./lib/cn"
import { motion } from "./lib/motion"
import { popupSurface } from "./lib/popup"

export type NavigationMenuProps = ComponentProps<typeof BaseNavigationMenu.Root>
export type NavigationMenuListProps = ComponentProps<
  typeof BaseNavigationMenu.List
>
export type NavigationMenuItemProps = ComponentProps<
  typeof BaseNavigationMenu.Item
>
export type NavigationMenuTriggerProps = ComponentProps<
  typeof BaseNavigationMenu.Trigger
>
export type NavigationMenuContentProps = ComponentProps<
  typeof BaseNavigationMenu.Content
>
export type NavigationMenuPortalProps = ComponentProps<
  typeof BaseNavigationMenu.Portal
>
export type NavigationMenuPositionerProps = ComponentProps<
  typeof BaseNavigationMenu.Positioner
>
export type NavigationMenuViewportProps = ComponentProps<
  typeof BaseNavigationMenu.Viewport
>
export type NavigationMenuBackdropProps = ComponentProps<
  typeof BaseNavigationMenu.Backdrop
>
export type NavigationMenuPopupProps = ComponentProps<
  typeof BaseNavigationMenu.Popup
>
export type NavigationMenuArrowProps = ComponentProps<
  typeof BaseNavigationMenu.Arrow
>
export type NavigationMenuLinkProps = ComponentProps<
  typeof BaseNavigationMenu.Link
>
export type NavigationMenuIconProps = ComponentProps<
  typeof BaseNavigationMenu.Icon
>

const navigationMenuTriggerClassName = cn(
  // flex-row and py-0 are here for the link case. This class is exported so
  // a plain link can sit in the bar beside real triggers, but Link's own
  // base is flex-col with p-2.5 — without overriding the direction and the
  // vertical padding, tailwind-merge leaves both, and the link renders as a
  // top-padded column whose text sits below the triggers next to it.
  "inline-flex h-9 cursor-pointer flex-row items-center gap-1 rounded-md px-3 py-0 text-sm text-fg-secondary outline-none",
  motion.colors,
  "hover:bg-background-tertiary hover:text-fg-primary focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-offset-1 focus-visible:ring-offset-background-primary focus-visible:ring-ring/20 data-popup-open:bg-background-tertiary data-popup-open:text-fg-primary",
)

export const NavigationMenu = ({
  className,
  ...props
}: NavigationMenuProps) => (
  <BaseNavigationMenu.Root
    className={cn("relative isolate z-10 flex max-w-max flex-1 items-center justify-center", className)}
    {...props}
  />
)

export const NavigationMenuList = ({
  className,
  ...props
}: NavigationMenuListProps) => (
  <BaseNavigationMenu.List
    className={cn(
      "group flex flex-1 list-none items-center justify-center gap-0.5",
      className,
    )}
    {...props}
  />
)

export const NavigationMenuItem = ({
  className,
  ...props
}: NavigationMenuItemProps) => (
  <BaseNavigationMenu.Item className={cn(className)} {...props} />
)

export const NavigationMenuTrigger = ({
  className,
  children,
  ...props
}: NavigationMenuTriggerProps) => (
  <BaseNavigationMenu.Trigger
    className={cn(navigationMenuTriggerClassName, className)}
    {...props}
  >
    {children}
    <NavigationMenuIcon />
  </BaseNavigationMenu.Trigger>
)

export const NavigationMenuIcon = ({
  className,
  children,
  ...props
}: NavigationMenuIconProps) => (
  <BaseNavigationMenu.Icon
    className={cn(
      "inline-flex text-fg-tertiary transition-transform duration-[var(--duration-sm)] ease-enter motion-reduce:transition-none data-popup-open:rotate-180",
      className,
    )}
    {...props}
  >
    {children ?? (
      <IconChevronDownSmall size={14} className="size-3.5" aria-hidden />
    )}
  </BaseNavigationMenu.Icon>
)

export const NavigationMenuContent = ({
  className,
  ...props
}: NavigationMenuContentProps) => (
  <BaseNavigationMenu.Content
    className={cn(
      "w-auto p-2 data-ending-style:opacity-0 data-starting-style:opacity-0",
      motion.colors,
      className,
    )}
    {...props}
  />
)

export const NavigationMenuLink = ({
  className,
  ...props
}: NavigationMenuLinkProps) => (
  <BaseNavigationMenu.Link
    className={cn(
      "flex cursor-pointer flex-col gap-0.5 rounded-md p-2.5 text-sm text-fg-primary outline-none",
      motion.colors,
      "hover:bg-background-tertiary focus-visible:bg-background-tertiary focus-visible:ring-[3px] focus-visible:ring-offset-1 focus-visible:ring-offset-background-primary focus-visible:ring-ring/20 data-active:bg-background-tertiary",
      className,
    )}
    {...props}
  />
)

export const NavigationMenuPortal = (props: NavigationMenuPortalProps) => (
  <BaseNavigationMenu.Portal {...props} />
)

export const NavigationMenuBackdrop = ({
  className,
  ...props
}: NavigationMenuBackdropProps) => (
  <BaseNavigationMenu.Backdrop
    className={cn(
      "fixed inset-0 z-40 bg-transparent",
      motion.backdrop,
      className,
    )}
    {...props}
  />
)

export const NavigationMenuPositioner = ({
  sideOffset = 8,
  className,
  ...props
}: NavigationMenuPositionerProps) => (
  <BaseNavigationMenu.Positioner
    sideOffset={sideOffset}
    className={cn("z-50 outline-none", className)}
    {...props}
  />
)

export const NavigationMenuPopup = ({
  className,
  ...props
}: NavigationMenuPopupProps) => (
  <BaseNavigationMenu.Popup
    className={cn(
      "relative z-50 w-[var(--popup-width)] overflow-hidden",
      popupSurface,
      "h-[var(--popup-height)] transition-[width,height,opacity] duration-[var(--duration-md)] ease-enter motion-reduce:transition-none",
      "data-starting-style:opacity-0 data-ending-style:opacity-0",
      className,
    )}
    {...props}
  />
)

export const NavigationMenuViewport = ({
  className,
  ...props
}: NavigationMenuViewportProps) => (
  <BaseNavigationMenu.Viewport
    className={cn("relative size-full overflow-hidden", className)}
    {...props}
  />
)

export const NavigationMenuArrow = ({
  className,
  ...props
}: NavigationMenuArrowProps) => (
  <BaseNavigationMenu.Arrow
    className={cn(
      "data-[side=bottom]:top-[-6px] data-[side=left]:right-[-6px] data-[side=right]:left-[-6px] data-[side=top]:bottom-[-6px]",
      "size-2.5 rotate-45 border border-border-primary bg-surface",
      "data-[side=bottom]:border-r-0 data-[side=bottom]:border-b-0",
      "data-[side=top]:border-t-0 data-[side=top]:border-l-0",
      "data-[side=left]:border-b-0 data-[side=left]:border-l-0",
      "data-[side=right]:border-t-0 data-[side=right]:border-r-0",
      className,
    )}
    {...props}
  />
)

export { navigationMenuTriggerClassName }
