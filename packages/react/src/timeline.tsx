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
import { motion } from "./lib/motion"

const timelineVariants = cva("group/timeline relative text-fg-primary", {
  variants: {
    orientation: {
      vertical: "w-full",
      horizontal:
        "w-full min-h-0 overflow-x-auto overscroll-x-contain scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden focus-visible:rounded-md focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-offset-1 focus-visible:ring-offset-background-primary focus-visible:ring-ring/20",
    },
  },
  defaultVariants: {
    orientation: "vertical",
  },
})

const timelineTrackVariants = cva("relative m-0 list-none p-0", {
  variants: {
    orientation: {
      vertical:
        "before:pointer-events-none before:absolute before:top-0 before:bottom-0 before:left-[calc(4.5rem+0.75rem+0.5rem)] before:w-px before:-translate-x-1/2 before:border-l before:border-dashed before:border-border-primary before:content-['']",
      horizontal:
        "flex w-max items-start before:pointer-events-none before:absolute before:inset-x-0 before:top-[var(--timeline-rail)] before:border-t before:border-dashed before:border-border-primary before:content-['']",
    },
  },
  defaultVariants: {
    orientation: "vertical",
  },
})

const timelineItemVariants = cva("group/timeline-item relative", {
  variants: {
    orientation: {
      vertical: "grid grid-cols-[4.5rem_1rem_minmax(0,1fr)] gap-x-3 pb-8 last:pb-0",
      horizontal:
        "w-[min(18rem,70vw)] shrink-0 pr-10 last:pr-0 [--timeline-rail:2.75rem]",
    },
  },
  defaultVariants: {
    orientation: "vertical",
  },
})

const timelineMarkerVariants = cva("z-[1] shrink-0", {
  variants: {
    orientation: {
      vertical: "col-start-2 row-start-1 mt-2 justify-self-center",
      horizontal:
        "absolute top-[var(--timeline-rail)] left-0 -translate-y-1/2",
    },
    shape: {
      tick: "bg-fg-quaternary group-hover/timeline-item:bg-fg-tertiary",
      dot: "size-2.5 rounded-full border-2 border-background-primary shadow-hairline",
    },
    tone: {
      neutral: "",
      accent: "",
      info: "",
      success: "",
      warning: "",
      critical: "",
    },
  },
  compoundVariants: [
    {
      shape: "tick",
      orientation: "vertical",
      class: "h-px w-2.5",
    },
    {
      shape: "tick",
      orientation: "horizontal",
      class: "h-2.5 w-px",
    },
    { shape: "tick", tone: "neutral", class: "bg-fg-quaternary" },
    { shape: "tick", tone: "accent", class: "bg-brand-primary" },
    { shape: "tick", tone: "info", class: "bg-status-info" },
    { shape: "tick", tone: "success", class: "bg-status-success" },
    { shape: "tick", tone: "warning", class: "bg-status-warning" },
    { shape: "tick", tone: "critical", class: "bg-status-critical" },
    { shape: "dot", tone: "neutral", class: "bg-fg-tertiary" },
    { shape: "dot", tone: "accent", class: "bg-brand-primary" },
    { shape: "dot", tone: "info", class: "bg-status-info" },
    { shape: "dot", tone: "success", class: "bg-status-success" },
    { shape: "dot", tone: "warning", class: "bg-status-warning" },
    { shape: "dot", tone: "critical", class: "bg-status-critical" },
  ],
  defaultVariants: {
    orientation: "vertical",
    shape: "tick",
    tone: "neutral",
  },
})

const timelineTimeVariants = cva(
  cn(
    "text-sm-strong block tabular-nums text-fg-secondary",
    motion.colors,
    "group-hover/timeline-item:text-fg-primary",
  ),
  {
    variants: {
      orientation: {
        vertical: "col-start-1 row-start-1 pt-0.5 text-right leading-5",
        horizontal: "mb-6 h-5 leading-5",
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
      className={cn(
        timelineTrackVariants({ orientation }),
        orientation === "horizontal" && "[--timeline-rail:2.75rem]",
        className,
      )}
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
  shape,
  ...props
}: TimelineMarkerProps) => {
  const orientation = useContext(TimelineContext)

  return (
    <span
      data-slot="timeline-marker"
      aria-hidden
      className={cn(
        timelineMarkerVariants({ orientation, shape, tone }),
        motion.colors,
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
}: TimelineContentProps) => {
  const orientation = useContext(TimelineContext)

  return (
    <div
      data-slot="timeline-content"
      className={cn(
        "min-w-0",
        orientation === "vertical" && "col-start-3 row-start-1",
        orientation === "horizontal" && "pt-6",
        className,
      )}
      {...props}
    />
  )
}

export const TimelineTitle = ({
  className,
  ...props
}: TimelineTitleProps) => (
  <h3
    data-slot="timeline-title"
    className={cn(
      "text-sm-strong text-fg-primary",
      motion.colors,
      className,
    )}
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
      "mt-4 overflow-hidden rounded-xl ring-1 ring-border-primary [&>img]:block [&>img]:aspect-4/3 [&>img]:w-full [&>img]:object-cover",
      className,
    )}
    {...props}
  />
)

export {
  timelineVariants,
  timelineItemVariants,
  timelineMarkerVariants,
  timelineTimeVariants,
  timelineTrackVariants,
}
