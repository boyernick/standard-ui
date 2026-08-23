"use client"

import { Tabs as BaseTabs } from "@base-ui/react/tabs"
import { cva, type VariantProps } from "class-variance-authority"
import { createContext, type ComponentProps, useContext } from "react"
import { cn } from "./lib/cn"
import { motion } from "./lib/motion"

const tabsListVariants = cva("relative flex items-center", {
  variants: {
    variant: {
      underline:
        "w-full gap-0.5 border-b border-border-primary data-[orientation=vertical]:w-40 data-[orientation=vertical]:shrink-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch data-[orientation=vertical]:gap-0 data-[orientation=vertical]:border-r data-[orientation=vertical]:border-b-0",
      segmented:
        "w-fit rounded-lg bg-background-tertiary p-0.5 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch",
      pill: "w-fit gap-1 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch",
    },
  },
  defaultVariants: {
    variant: "underline",
  },
})

const tabsTabVariants = cva(
  "relative z-10 inline-flex shrink-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap text-fg-tertiary outline-none select-none hover:text-fg-primary focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-offset-1 focus-visible:ring-offset-background-primary focus-visible:ring-ring/20 data-active:text-fg-primary data-disabled:cursor-not-allowed data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        underline:
          "data-[orientation=horizontal]:pb-1 data-[orientation=vertical]:w-full data-[orientation=vertical]:justify-start",
        segmented: "rounded-md",
        pill: "rounded-full bg-background-tertiary data-active:bg-transparent",
      },
      size: {
        sm: "text-xs [&_svg]:size-3.5",
        md: "text-sm [&_svg]:size-4",
        lg: "text-md [&_svg]:size-4",
      },
    },
    compoundVariants: [
      {
        variant: "underline",
        size: "sm",
        class: "h-8 px-2.5 data-[orientation=horizontal]:h-9",
      },
      {
        variant: "underline",
        size: "md",
        class: "h-10 px-3 data-[orientation=horizontal]:h-11",
      },
      {
        variant: "underline",
        size: "lg",
        class: "h-12 px-3.5 data-[orientation=horizontal]:h-13",
      },
      { variant: "segmented", size: "sm", class: "h-7 px-2.5" },
      { variant: "segmented", size: "md", class: "h-8 px-3" },
      { variant: "segmented", size: "lg", class: "h-9 px-3.5" },
      { variant: "pill", size: "sm", class: "h-7 px-2.5" },
      { variant: "pill", size: "md", class: "h-8 px-3" },
      { variant: "pill", size: "lg", class: "h-9 px-3.5" },
    ],
    defaultVariants: {
      variant: "underline",
      size: "md",
    },
  },
)

const tabsIndicatorVariants = cva("absolute z-0", {
  variants: {
    variant: {
      underline:
        "bottom-0 left-0 h-0.5 w-(--active-tab-width) translate-x-(--active-tab-left) rounded-full bg-brand-primary data-[orientation=vertical]:top-0 data-[orientation=vertical]:right-0 data-[orientation=vertical]:bottom-auto data-[orientation=vertical]:left-auto data-[orientation=vertical]:h-(--active-tab-height) data-[orientation=vertical]:w-0.5 data-[orientation=vertical]:translate-x-0 data-[orientation=vertical]:translate-y-(--active-tab-top)",
      segmented:
        "inset-y-0.5 left-0 w-(--active-tab-width) translate-x-(--active-tab-left) rounded-md bg-surface-raised shadow-hairline data-[orientation=vertical]:inset-x-0.5 data-[orientation=vertical]:top-0 data-[orientation=vertical]:bottom-auto data-[orientation=vertical]:h-(--active-tab-height) data-[orientation=vertical]:w-auto data-[orientation=vertical]:translate-x-0 data-[orientation=vertical]:translate-y-(--active-tab-top)",
      pill: "inset-y-0 left-0 w-(--active-tab-width) translate-x-(--active-tab-left) rounded-full bg-surface-raised shadow-hairline data-[orientation=vertical]:inset-x-0 data-[orientation=vertical]:top-0 data-[orientation=vertical]:bottom-auto data-[orientation=vertical]:h-(--active-tab-height) data-[orientation=vertical]:w-auto data-[orientation=vertical]:translate-x-0 data-[orientation=vertical]:translate-y-(--active-tab-top)",
    },
  },
  defaultVariants: {
    variant: "underline",
  },
})

export type TabsVariant = NonNullable<
  VariantProps<typeof tabsListVariants>["variant"]
>
export type TabsSize = NonNullable<
  VariantProps<typeof tabsTabVariants>["size"]
>

type TabsStyleContextValue = {
  variant: TabsVariant
  size: TabsSize
}

const TabsStyleContext = createContext<TabsStyleContextValue>({
  variant: "underline",
  size: "md",
})

export type TabsProps = ComponentProps<typeof BaseTabs.Root> & {
  /** Visual treatment shared by the list, tabs, and indicator. */
  variant?: TabsVariant
  /** Height and typography shared by every tab. */
  size?: TabsSize
}
export type TabsListProps = ComponentProps<typeof BaseTabs.List> &
  VariantProps<typeof tabsListVariants>
export type TabsTabProps = ComponentProps<typeof BaseTabs.Tab> &
  VariantProps<typeof tabsTabVariants>
export type TabsIndicatorProps = ComponentProps<typeof BaseTabs.Indicator> &
  VariantProps<typeof tabsIndicatorVariants>
export type TabsPanelProps = ComponentProps<typeof BaseTabs.Panel>

export const Tabs = ({
  className,
  variant = "underline",
  size = "md",
  ...props
}: TabsProps) => (
  <TabsStyleContext.Provider value={{ variant, size }}>
    <BaseTabs.Root
      data-slot="tabs"
      className={cn(
        "flex w-full flex-col data-[orientation=vertical]:flex-row data-[orientation=vertical]:gap-6",
        className,
      )}
      {...props}
    />
  </TabsStyleContext.Provider>
)

export const TabsList = ({
  className,
  variant,
  ...props
}: TabsListProps) => {
  const styles = useContext(TabsStyleContext)

  return (
    <BaseTabs.List
      data-slot="tabs-list"
      className={cn(
        tabsListVariants({ variant: variant ?? styles.variant }),
        className,
      )}
      {...props}
    />
  )
}

export const TabsTab = ({
  className,
  variant,
  size,
  ...props
}: TabsTabProps) => {
  const styles = useContext(TabsStyleContext)

  return (
    <BaseTabs.Tab
      data-slot="tabs-tab"
      className={cn(
        tabsTabVariants({
          variant: variant ?? styles.variant,
          size: size ?? styles.size,
        }),
        motion.colors,
        className,
      )}
      {...props}
    />
  )
}

export const TabsIndicator = ({
  className,
  variant,
  ...props
}: TabsIndicatorProps) => {
  const styles = useContext(TabsStyleContext)

  return (
    <BaseTabs.Indicator
      data-slot="tabs-indicator"
      className={cn(
        tabsIndicatorVariants({ variant: variant ?? styles.variant }),
        motion.tabsIndicator,
        className,
      )}
      {...props}
    />
  )
}

export const TabsPanel = ({ className, ...props }: TabsPanelProps) => (
  <BaseTabs.Panel
    data-slot="tabs-panel"
    className={cn(
      "pt-4 text-sm leading-relaxed text-fg-secondary outline-none focus-visible:outline-none data-[orientation=vertical]:pt-0",
      className,
    )}
    {...props}
  />
)

export { tabsIndicatorVariants, tabsListVariants, tabsTabVariants }
