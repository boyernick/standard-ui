"use client"

import type { ComponentProps, CSSProperties } from "react"
import { cn } from "./lib/cn"

export type TickerProps = ComponentProps<"div"> & {
  /** Animation duration for one full loop. */
  duration?: number
  /** Pause scrolling while hovered or focused. */
  pauseOnHover?: boolean
  /** Reverse scroll direction. */
  reverse?: boolean
}

export type TickerItemProps = ComponentProps<"div">

export const Ticker = ({
  className,
  children,
  duration = 28,
  pauseOnHover = true,
  reverse = false,
  style,
  ...props
}: TickerProps) => {
  const mergedStyle = {
    ...style,
    "--ticker-duration": `${duration}s`,
  } as CSSProperties

  return (
    <div
      data-slot="ticker"
      role="marquee"
      aria-label="Scrolling updates"
      className={cn(
        "group relative overflow-hidden rounded-xl border border-border-primary bg-surface",
        className,
      )}
      style={mergedStyle}
      {...props}
    >
      <div
        className={cn(
          "flex w-max gap-8 py-3 whitespace-nowrap",
          "animate-[ticker-scroll_var(--ticker-duration)_linear_infinite]",
          "motion-reduce:animate-none",
          reverse && "[animation-direction:reverse]",
          pauseOnHover &&
            "group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]",
        )}
      >
        <div className="flex shrink-0 items-center gap-8 px-4">{children}</div>
        <div
          className="flex shrink-0 items-center gap-8 px-4"
          aria-hidden
        >
          {children}
        </div>
      </div>
    </div>
  )
}

export const TickerItem = ({ className, ...props }: TickerItemProps) => (
  <div
    data-slot="ticker-item"
    className={cn(
      "inline-flex items-center gap-2 text-sm text-fg-secondary",
      className,
    )}
    {...props}
  />
)
