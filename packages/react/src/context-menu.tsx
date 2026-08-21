"use client"

import { ContextMenu as BaseContextMenu } from "@base-ui/react/context-menu"
import type { ComponentProps } from "react"
import { IconCheckmark1, IconChevronRightSmall } from "./icons"
import { cn } from "./lib/cn"
import { motion } from "./lib/motion"
import { popupInset, popupItem, popupLabel, popupSurface } from "./lib/popup"

export type ContextMenuProps = ComponentProps<typeof BaseContextMenu.Root>
export type ContextMenuTriggerProps = ComponentProps<
  typeof BaseContextMenu.Trigger
>
export type ContextMenuPortalProps = ComponentProps<typeof BaseContextMenu.Portal>
export type ContextMenuBackdropProps = ComponentProps<
  typeof BaseContextMenu.Backdrop
>
export type ContextMenuPositionerProps = ComponentProps<
  typeof BaseContextMenu.Positioner
>
export type ContextMenuPopupProps = ComponentProps<typeof BaseContextMenu.Popup>
export type ContextMenuArrowProps = ComponentProps<typeof BaseContextMenu.Arrow>
export type ContextMenuItemProps = ComponentProps<typeof BaseContextMenu.Item>
export type ContextMenuLinkItemProps = ComponentProps<
  typeof BaseContextMenu.LinkItem
>
export type ContextMenuSeparatorProps = ComponentProps<
  typeof BaseContextMenu.Separator
>
export type ContextMenuGroupProps = ComponentProps<typeof BaseContextMenu.Group>
export type ContextMenuGroupLabelProps = ComponentProps<
  typeof BaseContextMenu.GroupLabel
>
export type ContextMenuCheckboxItemProps = ComponentProps<
  typeof BaseContextMenu.CheckboxItem
>
export type ContextMenuCheckboxItemIndicatorProps = ComponentProps<
  typeof BaseContextMenu.CheckboxItemIndicator
>
export type ContextMenuRadioGroupProps = ComponentProps<
  typeof BaseContextMenu.RadioGroup
>
export type ContextMenuRadioItemProps = ComponentProps<
  typeof BaseContextMenu.RadioItem
>
export type ContextMenuRadioItemIndicatorProps = ComponentProps<
  typeof BaseContextMenu.RadioItemIndicator
>
export type ContextMenuSubmenuRootProps = ComponentProps<
  typeof BaseContextMenu.SubmenuRoot
>
export type ContextMenuSubmenuTriggerProps = ComponentProps<
  typeof BaseContextMenu.SubmenuTrigger
>

const itemClassName = cn(
  popupItem,
  motion.colors,
  "data-disabled:cursor-not-allowed data-disabled:opacity-50 data-highlighted:bg-background-tertiary",
)

const indicatorItemClassName = cn(itemClassName, "pl-2")
const indicatorClassName =
  "mr-0.5 flex size-4 shrink-0 items-center justify-center text-fg-primary data-unchecked:invisible"

export const ContextMenu = (props: ContextMenuProps) => (
  <BaseContextMenu.Root {...props} />
)

export const ContextMenuTrigger = ({
  className,
  ...props
}: ContextMenuTriggerProps) => (
  <BaseContextMenu.Trigger className={cn(className)} {...props} />
)

export const ContextMenuPortal = (props: ContextMenuPortalProps) => (
  <BaseContextMenu.Portal {...props} />
)

export const ContextMenuBackdrop = ({
  className,
  ...props
}: ContextMenuBackdropProps) => (
  <BaseContextMenu.Backdrop className={cn(className)} {...props} />
)

export const ContextMenuPositioner = ({
  className,
  ...props
}: ContextMenuPositionerProps) => (
  <BaseContextMenu.Positioner
    className={cn("z-50 outline-none", className)}
    {...props}
  />
)

export const ContextMenuPopup = ({
  className,
  ...props
}: ContextMenuPopupProps) => (
  <BaseContextMenu.Popup
    className={cn(
      "z-50 min-w-40 overflow-hidden",
      popupSurface,
      popupInset,
      motion.popupAnchor,
      className,
    )}
    {...props}
  />
)

export const ContextMenuArrow = ({
  className,
  ...props
}: ContextMenuArrowProps) => (
  <BaseContextMenu.Arrow
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

export const ContextMenuItem = ({
  className,
  ...props
}: ContextMenuItemProps) => (
  <BaseContextMenu.Item className={cn(itemClassName, className)} {...props} />
)

export const ContextMenuLinkItem = ({
  className,
  ...props
}: ContextMenuLinkItemProps) => (
  <BaseContextMenu.LinkItem
    className={cn(itemClassName, "cursor-pointer", className)}
    {...props}
  />
)

export const ContextMenuSeparator = ({
  className,
  ...props
}: ContextMenuSeparatorProps) => (
  <BaseContextMenu.Separator
    className={cn("my-1 h-px bg-border-primary", className)}
    {...props}
  />
)

export const ContextMenuGroup = ({
  className,
  ...props
}: ContextMenuGroupProps) => (
  <BaseContextMenu.Group className={cn(className)} {...props} />
)

export const ContextMenuGroupLabel = ({
  className,
  ...props
}: ContextMenuGroupLabelProps) => (
  <BaseContextMenu.GroupLabel
    className={cn(popupLabel, className)}
    {...props}
  />
)

export const ContextMenuCheckboxItem = ({
  className,
  ...props
}: ContextMenuCheckboxItemProps) => (
  <BaseContextMenu.CheckboxItem
    className={cn(indicatorItemClassName, className)}
    {...props}
  />
)

export const ContextMenuCheckboxItemIndicator = ({
  className,
  children,
  keepMounted = true,
  ...props
}: ContextMenuCheckboxItemIndicatorProps) => (
  <BaseContextMenu.CheckboxItemIndicator
    keepMounted={keepMounted}
    className={cn(indicatorClassName, className)}
    {...props}
  >
    {children ?? <IconCheckmark1 size={14} className="size-3.5" aria-hidden />}
  </BaseContextMenu.CheckboxItemIndicator>
)

export const ContextMenuRadioGroup = ({
  className,
  ...props
}: ContextMenuRadioGroupProps) => (
  <BaseContextMenu.RadioGroup className={cn(className)} {...props} />
)

export const ContextMenuRadioItem = ({
  className,
  ...props
}: ContextMenuRadioItemProps) => (
  <BaseContextMenu.RadioItem
    className={cn(indicatorItemClassName, className)}
    {...props}
  />
)

export const ContextMenuRadioItemIndicator = ({
  className,
  children,
  keepMounted = true,
  ...props
}: ContextMenuRadioItemIndicatorProps) => (
  <BaseContextMenu.RadioItemIndicator
    keepMounted={keepMounted}
    className={cn(indicatorClassName, className)}
    {...props}
  >
    {children ?? <IconCheckmark1 size={14} className="size-3.5" aria-hidden />}
  </BaseContextMenu.RadioItemIndicator>
)

export const ContextMenuSubmenuRoot = (props: ContextMenuSubmenuRootProps) => (
  <BaseContextMenu.SubmenuRoot {...props} />
)

export const ContextMenuSubmenuTrigger = ({
  className,
  children,
  ...props
}: ContextMenuSubmenuTriggerProps) => (
  <BaseContextMenu.SubmenuTrigger
    className={cn(itemClassName, "w-full justify-between", className)}
    {...props}
  >
    {children}
    <IconChevronRightSmall
      size={16}
      className="size-4 text-fg-tertiary"
      aria-hidden
    />
  </BaseContextMenu.SubmenuTrigger>
)
