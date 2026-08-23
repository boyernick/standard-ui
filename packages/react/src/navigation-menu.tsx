"use client"

import { NavigationMenu as BaseNavigationMenu } from "@base-ui/react/navigation-menu"
import { cva, type VariantProps } from "class-variance-authority"
import { createContext, useContext, useMemo, type ComponentProps } from "react"
import { IconChevronDownSmall } from "./icons"
import { cn } from "./lib/cn"
import { motion } from "./lib/motion"
import { popupSurface } from "./lib/popup"

export type NavigationMenuVariant = "plain" | "pill" | "underline"
export type NavigationMenuSize = "sm" | "md" | "lg"
type NavigationMenuOrientation = "horizontal" | "vertical"

type NavigationMenuStyleContextValue = {
  orientation: NavigationMenuOrientation
  size: NavigationMenuSize
  variant: NavigationMenuVariant
}

const NavigationMenuStyleContext =
  createContext<NavigationMenuStyleContextValue>({
    orientation: "horizontal",
    size: "md",
    variant: "plain",
  })

const navigationMenuRootVariants = cva("relative isolate z-10 flex", {
  variants: {
    orientation: {
      horizontal: "max-w-max flex-1 items-center justify-center",
      vertical: "w-full max-w-56 flex-col items-stretch",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
})

const navigationMenuListVariants = cva("group list-none", {
  variants: {
    orientation: {
      horizontal: "flex flex-1 items-center justify-center gap-0.5",
      vertical: "flex w-full flex-col items-stretch gap-0.5",
    },
    variant: {
      plain: "",
      pill: "bg-background-secondary p-1",
      underline: "border-border-primary",
    },
  },
  compoundVariants: [
    {
      orientation: "horizontal",
      variant: "pill",
      className: "rounded-full",
    },
    {
      orientation: "vertical",
      variant: "pill",
      className: "rounded-lg",
    },
    {
      orientation: "horizontal",
      variant: "underline",
      className: "border-b",
    },
    {
      orientation: "vertical",
      variant: "underline",
      className: "border-l",
    },
  ],
  defaultVariants: {
    orientation: "horizontal",
    variant: "plain",
  },
})

const navigationMenuBarItemVariants = cva(
  cn(
    "inline-flex cursor-pointer items-center gap-1 border border-transparent text-fg-secondary outline-none",
    motion.colors,
    "hover:text-fg-primary focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-offset-1 focus-visible:ring-offset-background-primary focus-visible:ring-ring/20 data-active:font-medium data-active:text-fg-primary data-popup-open:text-fg-primary",
  ),
  {
    variants: {
      orientation: {
        horizontal: "justify-center",
        vertical: "w-full justify-between",
      },
      size: {
        sm: "h-8 px-2.5 text-xs",
        md: "h-9 px-3 text-sm",
        lg: "h-10 px-3.5 text-sm",
      },
      variant: {
        plain:
          "rounded-md hover:bg-background-tertiary data-active:bg-background-tertiary data-popup-open:bg-background-tertiary",
        pill: "rounded-full hover:bg-surface data-active:border-brand-primary-border data-active:bg-brand-primary data-active:text-brand-foreground data-popup-open:bg-surface data-popup-open:shadow-sm",
        underline: "rounded-none hover:bg-transparent",
      },
    },
    compoundVariants: [
      {
        orientation: "horizontal",
        variant: "underline",
        className:
          "h-auto border-x-0 border-t-0 border-b-2 border-b-transparent px-2 py-2.5 data-active:border-b-brand-primary data-popup-open:border-b-brand-primary",
      },
      {
        orientation: "vertical",
        variant: "underline",
        className:
          "border-y-0 border-r-0 border-l-2 border-l-transparent data-active:border-l-brand-primary data-popup-open:border-l-brand-primary",
      },
    ],
    defaultVariants: {
      orientation: "horizontal",
      size: "md",
      variant: "plain",
    },
  },
)

const navigationMenuLinkVariants = cva(
  cn(
    "group/navigation-link flex cursor-pointer rounded-md text-fg-primary outline-none",
    motion.colors,
    "hover:bg-background-tertiary focus-visible:bg-background-tertiary focus-visible:ring-[3px] focus-visible:ring-offset-1 focus-visible:ring-offset-background-primary focus-visible:ring-ring/20 data-active:bg-background-tertiary",
  ),
  {
    variants: {
      variant: {
        default: "flex-col gap-0.5",
        featured:
          "min-h-32 flex-col justify-end gap-1 bg-background-secondary",
      },
      size: {
        sm: "p-2 text-xs",
        md: "p-2.5 text-sm",
        lg: "p-3 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
)

type NavigationMenuBarItemVariantProps = Omit<
  VariantProps<typeof navigationMenuBarItemVariants>,
  "orientation"
>

export type NavigationMenuProps = Omit<
  ComponentProps<typeof BaseNavigationMenu.Root>,
  "size"
> & {
  size?: NavigationMenuSize
  variant?: NavigationMenuVariant
}
export type NavigationMenuListProps = ComponentProps<
  typeof BaseNavigationMenu.List
>
export type NavigationMenuItemProps = ComponentProps<
  typeof BaseNavigationMenu.Item
>
export type NavigationMenuTriggerProps = Omit<
  ComponentProps<typeof BaseNavigationMenu.Trigger>,
  "size"
> &
  NavigationMenuBarItemVariantProps & {
    showIcon?: boolean
  }
export type NavigationMenuBarLinkProps = Omit<
  ComponentProps<typeof BaseNavigationMenu.Link>,
  "size"
> &
  NavigationMenuBarItemVariantProps
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
export type NavigationMenuLinkProps = Omit<
  ComponentProps<typeof BaseNavigationMenu.Link>,
  "size"
> &
  VariantProps<typeof navigationMenuLinkVariants>
export type NavigationMenuLinkIconProps = ComponentProps<"span">
export type NavigationMenuLinkTitleProps = ComponentProps<"span">
export type NavigationMenuLinkDescriptionProps = ComponentProps<"span">
export type NavigationMenuIconProps = ComponentProps<
  typeof BaseNavigationMenu.Icon
>

export const NavigationMenu = ({
  className,
  orientation = "horizontal",
  size = "md",
  variant = "plain",
  ...props
}: NavigationMenuProps) => {
  const styleContext = useMemo(
    () => ({ orientation, size, variant }),
    [orientation, size, variant],
  )

  return (
    <NavigationMenuStyleContext.Provider value={styleContext}>
      <BaseNavigationMenu.Root
        orientation={orientation}
        data-orientation={orientation}
        data-variant={variant}
        className={cn(navigationMenuRootVariants({ orientation }), className)}
        {...props}
      />
    </NavigationMenuStyleContext.Provider>
  )
}

export const NavigationMenuList = ({
  className,
  ...props
}: NavigationMenuListProps) => {
  const { orientation, variant } = useContext(NavigationMenuStyleContext)

  return (
    <BaseNavigationMenu.List
      className={cn(
        navigationMenuListVariants({ orientation, variant }),
        className,
      )}
      {...props}
    />
  )
}

export const NavigationMenuItem = ({
  className,
  ...props
}: NavigationMenuItemProps) => (
  <BaseNavigationMenu.Item className={cn(className)} {...props} />
)

export const NavigationMenuTrigger = ({
  className,
  children,
  showIcon = true,
  size,
  variant,
  ...props
}: NavigationMenuTriggerProps) => {
  const styles = useContext(NavigationMenuStyleContext)

  return (
    <BaseNavigationMenu.Trigger
      className={cn(
        navigationMenuBarItemVariants({
          orientation: styles.orientation,
          size: size ?? styles.size,
          variant: variant ?? styles.variant,
        }),
        className,
      )}
      {...props}
    >
      {children}
      {showIcon ? <NavigationMenuIcon /> : null}
    </BaseNavigationMenu.Trigger>
  )
}

export const NavigationMenuBarLink = ({
  className,
  size,
  variant,
  ...props
}: NavigationMenuBarLinkProps) => {
  const styles = useContext(NavigationMenuStyleContext)

  return (
    <BaseNavigationMenu.Link
      className={cn(
        navigationMenuBarItemVariants({
          orientation: styles.orientation,
          size: size ?? styles.size,
          variant: variant ?? styles.variant,
        }),
        className,
      )}
      {...props}
    />
  )
}

export const NavigationMenuIcon = ({
  className,
  children,
  ...props
}: NavigationMenuIconProps) => {
  const { orientation } = useContext(NavigationMenuStyleContext)

  return (
    <BaseNavigationMenu.Icon
      className={cn(
        "inline-flex text-fg-tertiary",
        motion.transform,
        orientation === "horizontal"
          ? "data-popup-open:rotate-180"
          : "-rotate-90 data-popup-open:rotate-0",
        className,
      )}
      {...props}
    >
      {children ?? (
        <IconChevronDownSmall size={14} className="size-3.5" aria-hidden />
      )}
    </BaseNavigationMenu.Icon>
  )
}

export const NavigationMenuContent = ({
  className,
  ...props
}: NavigationMenuContentProps) => (
  <BaseNavigationMenu.Content
    className={cn(
      "w-auto p-2 transition-[opacity,transform] duration-[var(--duration-sm)] ease-enter motion-reduce:transition-none data-starting-style:translate-y-1 data-starting-style:opacity-0 data-ending-style:translate-y-1 data-ending-style:opacity-0",
      className,
    )}
    {...props}
  />
)

export const NavigationMenuLink = ({
  className,
  variant,
  size,
  ...props
}: NavigationMenuLinkProps) => (
  <BaseNavigationMenu.Link
    className={cn(navigationMenuLinkVariants({ variant, size }), className)}
    {...props}
  />
)

export const NavigationMenuLinkIcon = ({
  className,
  ...props
}: NavigationMenuLinkIconProps) => (
  <span
    className={cn(
      "mb-1 flex size-9 shrink-0 items-center justify-center rounded-md border border-border-primary bg-surface text-fg-secondary transition-colors duration-[var(--duration-sm)] ease-enter group-hover/navigation-link:border-border-secondary group-hover/navigation-link:bg-background-quaternary group-hover/navigation-link:text-fg-primary [&_svg]:size-4",
      className,
    )}
    {...props}
  />
)

export const NavigationMenuLinkTitle = ({
  className,
  ...props
}: NavigationMenuLinkTitleProps) => (
  <span
    className={cn("text-sm-strong text-fg-primary", className)}
    {...props}
  />
)

export const NavigationMenuLinkDescription = ({
  className,
  ...props
}: NavigationMenuLinkDescriptionProps) => (
  <span
    className={cn("text-xs leading-relaxed text-fg-tertiary", className)}
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
  collisionPadding = 16,
  className,
  ...props
}: NavigationMenuPositionerProps) => (
  <BaseNavigationMenu.Positioner
    sideOffset={sideOffset}
    collisionPadding={collisionPadding}
    className={cn(
      "z-50 h-[var(--positioner-height)] w-[var(--positioner-width)] max-w-[var(--available-width)] outline-none transition-[top,left,right,bottom] duration-[var(--duration-md)] ease-move data-instant:transition-none before:absolute before:content-[''] data-[side=bottom]:before:top-[-8px] data-[side=bottom]:before:right-0 data-[side=bottom]:before:left-0 data-[side=bottom]:before:h-2 data-[side=left]:before:top-0 data-[side=left]:before:right-[-8px] data-[side=left]:before:bottom-0 data-[side=left]:before:w-2 data-[side=right]:before:top-0 data-[side=right]:before:bottom-0 data-[side=right]:before:left-[-8px] data-[side=right]:before:w-2 data-[side=top]:before:right-0 data-[side=top]:before:bottom-[-8px] data-[side=top]:before:left-0 data-[side=top]:before:h-2",
      className,
    )}
    {...props}
  />
)

export const NavigationMenuPopup = ({
  className,
  ...props
}: NavigationMenuPopupProps) => (
  <BaseNavigationMenu.Popup
    className={cn(
      "relative z-50 h-[var(--popup-height)] w-[var(--popup-width)] max-w-[calc(100vw-2rem)]",
      popupSurface,
      motion.popupAnchor,
      "transition-[width,height,transform,scale,opacity] duration-[var(--duration-md)]",
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
      "relative block h-1.5 w-3 overflow-clip transition-[top,right,bottom,left] duration-[var(--duration-md)] ease-move before:absolute before:bottom-0 before:left-1/2 before:block before:size-[calc(6px*1.414)] before:-translate-x-1/2 before:translate-y-1/2 before:rotate-45 before:border before:border-border-primary before:bg-surface before:content-['']",
      "data-[side=bottom]:top-[-6px] data-[side=left]:right-[-9px] data-[side=left]:rotate-90 data-[side=right]:left-[-9px] data-[side=right]:-rotate-90 data-[side=top]:bottom-[-6px] data-[side=top]:rotate-180",
      className,
    )}
    {...props}
  />
)

const navigationMenuTriggerClassName = navigationMenuBarItemVariants({
  orientation: "horizontal",
  size: "md",
  variant: "plain",
})

export {
  navigationMenuBarItemVariants,
  navigationMenuLinkVariants,
  navigationMenuListVariants,
  navigationMenuRootVariants,
  navigationMenuTriggerClassName,
}
