"use client"

import { cva, type VariantProps } from "class-variance-authority"
import {
  createContext,
  type ComponentProps,
  type KeyboardEvent,
  type WheelEvent,
  useContext,
} from "react"
import { cn } from "./lib/cn"

const timelineVariants = cva("group/timeline relative text-fg-primary", {
  variants: {
    orientation: {
      vertical: "w-full",
      horizontal:
        "w-full snap-x snap-proximity overflow-x-auto overscroll-x-contain rounded-xl border border-border-primary bg-surface px-5 py-6 scroll-smooth focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-offset-1 focus-visible:ring-offset-background-primary focus-visible:ring-ring/20 focus-visible:outline-none",
    },
  },
  defaultVariants: {
    orientation: "vertical",
  },
})

const timelineTrackVariants = cva("relative m-0 list-none p-0", {
  variants: {
    orientation: {
      vertical: "ml-1.5 border-l border-dashed border-border-primary",
      horizontal:
        "grid min-w-max auto-cols-64 grid-flow-col before:absolute before:inset-x-0 before:top-10 before:border-t before:border-dashed before:border-border-primary before:content-['']",
    },
  },
  defaultVariants: {
    orientation: "vertical",
  },
})

const timelineItemVariants = cva("relative", {
  variants: {
    orientation: {
      vertical: "pb-8 pl-7 last:pb-0",
      horizontal: "w-64 snap-start pt-16 pr-8 last:pr-0",
    },
  },
  defaultVariants: {
    orientation: "vertical",
  },
})

const timelineMarkerVariants = cva(
  "absolute z-[1] size-2.5 rounded-full border-2 border-surface shadow-hairline",
  {
    variants: {
      orientation: {
        vertical: "top-1 left-0 -translate-x-1/2",
        horizontal: "top-10 left-0 -translate-y-1/2",
      },
      tone: {
        neutral: "bg-fg-tertiary",
        accent: "bg-brand-primary",
        info: "bg-status-info",
        success: "bg-status-success",
        warning: "bg-status-warning",
        critical: "bg-status-critical",
      },
    },
    defaultVariants: {
      orientation: "vertical",
      tone: "neutral",
    },
  },
)

const timelineTimeVariants = cva(
  "text-xs-strong block text-fg-tertiary tabular-nums",
  {
    variants: {
      orientation: {
        vertical: "mb-1",
        horizontal: "absolute top-0 left-0",
      },
    },
    defaultVariants: {
      orientation: "vertical",
    },
  },
)

type TimelineOrientation = "horizontal" | "vertical"

const TimelineContext = createContext<TimelineOrientation>("vertical")

export type TimelineProps = ComponentProps<"div"> &
  VariantProps<typeof timelineVariants> & {
    /** Distance moved by the horizontal timeline's arrow keys. */
    scrollStep?: number
  }

export type TimelineTrackProps = ComponentProps<"ol">
export type TimelineItemProps = ComponentProps<"li">
export type TimelineMarkerProps = ComponentProps<"span"> &
  VariantProps<typeof timelineMarkerVariants>
export type TimelineTimeProps = ComponentProps<"time">
export type TimelineContentProps = ComponentProps<"div">
export type TimelineTitleProps = ComponentProps<"h3">
export type TimelineDescriptionProps = ComponentProps<"p">
export type TimelineMediaProps = ComponentProps<"div">

export const Timeline = ({
  orientation = "vertical",
  scrollStep = 256,
  className,
  children,
  tabIndex,
  onKeyDown,
  onWheel,
  "aria-label": ariaLabel = "Timeline",
  ...props
}: TimelineProps) => {
  const resolvedOrientation = orientation ?? "vertical"

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event)
    if (
      event.defaultPrevented ||
      resolvedOrientation !== "horizontal" ||
      event.target !== event.currentTarget
    ) {
      return
    }

    const node = event.currentTarget
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches
    const behavior = prefersReducedMotion ? "auto" : "smooth"

    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault()
      node.scrollBy({
        left: event.key === "ArrowRight" ? scrollStep : -scrollStep,
        behavior,
      })
    }

    if (event.key === "Home" || event.key === "End") {
      event.preventDefault()
      node.scrollTo({
        left: event.key === "Home" ? 0 : node.scrollWidth,
        behavior,
      })
    }
  }

  const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
    onWheel?.(event)
    if (
      event.defaultPrevented ||
      resolvedOrientation !== "horizontal" ||
      Math.abs(event.deltaX) >= Math.abs(event.deltaY)
    ) {
      return
    }

    const node = event.currentTarget
    const maxScrollLeft = node.scrollWidth - node.clientWidth
    const canScroll =
      event.deltaY > 0 ? node.scrollLeft < maxScrollLeft : node.scrollLeft > 0

    if (canScroll) {
      event.preventDefault()
      node.scrollLeft += event.deltaY
    }
  }

  return (
    <TimelineContext.Provider value={resolvedOrientation}>
      <div
        data-slot="timeline"
        data-orientation={resolvedOrientation}
        role="region"
        aria-label={ariaLabel}
        tabIndex={
          tabIndex ?? (resolvedOrientation === "horizontal" ? 0 : undefined)
        }
        className={cn(
          timelineVariants({ orientation: resolvedOrientation }),
          className,
        )}
        onKeyDown={handleKeyDown}
        onWheel={handleWheel}
        {...props}
      >
        {children}
      </div>
    </TimelineContext.Provider>
  )
}

export const TimelineTrack = ({
  className,
  ...props
}: TimelineTrackProps) => {
  const orientation = useContext(TimelineContext)

  return (
    <ol
      data-slot="timeline-track"
      data-orientation={orientation}
      className={cn(timelineTrackVariants({ orientation }), className)}
      {...props}
    />
  )
}

export const TimelineItem = ({
  className,
  ...props
}: TimelineItemProps) => {
  const orientation = useContext(TimelineContext)

  return (
    <li
      data-slot="timeline-item"
      data-orientation={orientation}
      className={cn(timelineItemVariants({ orientation }), className)}
      {...props}
    />
  )
}

export const TimelineMarker = ({
  className,
  tone,
  ...props
}: TimelineMarkerProps) => {
  const orientation = useContext(TimelineContext)

  return (
    <span
      data-slot="timeline-marker"
      aria-hidden
      className={cn(
        timelineMarkerVariants({ orientation, tone }),
        className,
      )}
      {...props}
    />
  )
}

export const TimelineTime = ({
  className,
  ...props
}: TimelineTimeProps) => {
  const orientation = useContext(TimelineContext)

  return (
    <time
      data-slot="timeline-time"
      className={cn(timelineTimeVariants({ orientation }), className)}
      {...props}
    />
  )
}

export const TimelineContent = ({
  className,
  ...props
}: TimelineContentProps) => (
  <div
    data-slot="timeline-content"
    className={cn("min-w-0", className)}
    {...props}
  />
)

export const TimelineTitle = ({
  className,
  ...props
}: TimelineTitleProps) => (
  <h3
    data-slot="timeline-title"
    className={cn("text-sm-strong text-fg-primary", className)}
    {...props}
  />
)

export const TimelineDescription = ({
  className,
  ...props
}: TimelineDescriptionProps) => (
  <p
    data-slot="timeline-description"
    className={cn("text-sm mt-1 leading-relaxed text-fg-secondary", className)}
    {...props}
  />
)

export const TimelineMedia = ({
  className,
  ...props
}: TimelineMediaProps) => (
  <div
    data-slot="timeline-media"
    className={cn(
      "mt-4 overflow-hidden rounded-xl border border-border-primary bg-background-secondary [&>img]:block [&>img]:aspect-4/3 [&>img]:w-full [&>img]:object-cover",
      className,
    )}
    {...props}
  />
)

export {
  timelineItemVariants,
  timelineMarkerVariants,
  timelineTimeVariants,
  timelineTrackVariants,
}
