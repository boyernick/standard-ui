"use client"

import { Menu as BaseMenu } from "@base-ui/react/menu"
import type { ComponentProps } from "react"
import { IconCheckmark1, IconChevronRightSmall } from "./icons"
import { cn } from "./lib/cn"
import { motion } from "./lib/motion"

export type MenuProps = ComponentProps<typeof BaseMenu.Root>
export type MenuTriggerProps = ComponentProps<typeof BaseMenu.Trigger>
export type MenuPortalProps = ComponentProps<typeof BaseMenu.Portal>
export type MenuBackdropProps = ComponentProps<typeof BaseMenu.Backdrop>
export type MenuPositionerProps = ComponentProps<typeof BaseMenu.Positioner>
export type MenuPopupProps = ComponentProps<typeof BaseMenu.Popup>
export type MenuArrowProps = ComponentProps<typeof BaseMenu.Arrow>
export type MenuItemProps = ComponentProps<typeof BaseMenu.Item>
export type MenuLinkItemProps = ComponentProps<typeof BaseMenu.LinkItem>
export type MenuSeparatorProps = ComponentProps<typeof BaseMenu.Separator>
export type MenuGroupProps = ComponentProps<typeof BaseMenu.Group>
export type MenuGroupLabelProps = ComponentProps<typeof BaseMenu.GroupLabel>
export type MenuCheckboxItemProps = ComponentProps<typeof BaseMenu.CheckboxItem>
export type MenuCheckboxItemIndicatorProps = ComponentProps<
  typeof BaseMenu.CheckboxItemIndicator
>
export type MenuRadioGroupProps = ComponentProps<typeof BaseMenu.RadioGroup>
export type MenuRadioItemProps = ComponentProps<typeof BaseMenu.RadioItem>
export type MenuRadioItemIndicatorProps = ComponentProps<
  typeof BaseMenu.RadioItemIndicator
>
export type MenuSubmenuRootProps = ComponentProps<typeof BaseMenu.SubmenuRoot>
export type MenuSubmenuTriggerProps = ComponentProps<
  typeof BaseMenu.SubmenuTrigger
>
export type MenuViewportProps = ComponentProps<typeof BaseMenu.Viewport>

const menuItemClassName = cn(
  "flex min-h-8 cursor-default items-center gap-2 rounded-xs px-2.5 py-1.5 text-sm text-fg-primary outline-none select-none",
  motion.colors,
  "data-disabled:cursor-not-allowed data-disabled:opacity-50 data-highlighted:bg-background-tertiary",
)

const menuIndicatorItemClassName = cn(menuItemClassName, "pl-2")

const menuIndicatorClassName =
  "mr-0.5 flex size-4 shrink-0 items-center justify-center text-fg-primary data-unchecked:invisible"

export const Menu = (props: MenuProps) => <BaseMenu.Root {...props} />

export const MenuTrigger = ({ className, ...props }: MenuTriggerProps) => (
  <BaseMenu.Trigger className={cn("cursor-pointer", className)} {...props} />
)

export const MenuPortal = (props: MenuPortalProps) => (
  <BaseMenu.Portal {...props} />
)

export const MenuBackdrop = ({ className, ...props }: MenuBackdropProps) => (
  <BaseMenu.Backdrop className={cn(className)} {...props} />
)

export const MenuPositioner = ({
  sideOffset = 4,
  className,
  ...props
}: MenuPositionerProps) => (
  <BaseMenu.Positioner
    sideOffset={sideOffset}
    className={cn("z-50 outline-none", className)}
    {...props}
  />
)

export const MenuPopup = ({ className, ...props }: MenuPopupProps) => (
  <BaseMenu.Popup
    className={cn(
      "z-50 min-w-40 overflow-hidden rounded-md border border-border-primary bg-surface p-1 shadow-md outline-none",
      motion.popupAnchor,
      className,
    )}
    {...props}
  />
)

export const MenuArrow = ({ className, ...props }: MenuArrowProps) => (
  <BaseMenu.Arrow
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

export const MenuItem = ({ className, ...props }: MenuItemProps) => (
  <BaseMenu.Item className={cn(menuItemClassName, className)} {...props} />
)

export const MenuLinkItem = ({ className, ...props }: MenuLinkItemProps) => (
  <BaseMenu.LinkItem
    className={cn(menuItemClassName, "cursor-pointer", className)}
    {...props}
  />
)

export const MenuSeparator = ({ className, ...props }: MenuSeparatorProps) => (
  <BaseMenu.Separator
    className={cn("my-1 h-px bg-border-primary", className)}
    {...props}
  />
)

export const MenuGroup = ({ className, ...props }: MenuGroupProps) => (
  <BaseMenu.Group className={cn(className)} {...props} />
)

export const MenuGroupLabel = ({
  className,
  ...props
}: MenuGroupLabelProps) => (
  <BaseMenu.GroupLabel
    className={cn("px-2.5 py-1.5 text-xs text-fg-tertiary", className)}
    {...props}
  />
)

export const MenuCheckboxItem = ({
  className,
  ...props
}: MenuCheckboxItemProps) => (
  <BaseMenu.CheckboxItem
    className={cn(menuIndicatorItemClassName, className)}
    {...props}
  />
)

export const MenuCheckboxItemIndicator = ({
  className,
  children,
  keepMounted = true,
  ...props
}: MenuCheckboxItemIndicatorProps) => (
  <BaseMenu.CheckboxItemIndicator
    keepMounted={keepMounted}
    className={cn(menuIndicatorClassName, className)}
    {...props}
  >
    {children ?? <IconCheckmark1 size={14} className="size-3.5" aria-hidden />}
  </BaseMenu.CheckboxItemIndicator>
)

export const MenuRadioGroup = ({
  className,
  ...props
}: MenuRadioGroupProps) => (
  <BaseMenu.RadioGroup className={cn(className)} {...props} />
)

export const MenuRadioItem = ({ className, ...props }: MenuRadioItemProps) => (
  <BaseMenu.RadioItem
    className={cn(menuIndicatorItemClassName, className)}
    {...props}
  />
)

export const MenuRadioItemIndicator = ({
  className,
  children,
  keepMounted = true,
  ...props
}: MenuRadioItemIndicatorProps) => (
  <BaseMenu.RadioItemIndicator
    keepMounted={keepMounted}
    className={cn(menuIndicatorClassName, className)}
    {...props}
  >
    {children ?? <IconCheckmark1 size={14} className="size-3.5" aria-hidden />}
  </BaseMenu.RadioItemIndicator>
)

export const MenuSubmenuRoot = (props: MenuSubmenuRootProps) => (
  <BaseMenu.SubmenuRoot {...props} />
)

export const MenuSubmenuTrigger = ({
  className,
  children,
  ...props
}: MenuSubmenuTriggerProps) => (
  <BaseMenu.SubmenuTrigger
    className={cn(menuItemClassName, "w-full justify-between", className)}
    {...props}
  >
    {children}
    <IconChevronRightSmall size={16} className="size-4 text-fg-tertiary" aria-hidden />
  </BaseMenu.SubmenuTrigger>
)

export const MenuViewport = ({ className, ...props }: MenuViewportProps) => (
  <BaseMenu.Viewport className={cn(className)} {...props} />
)
