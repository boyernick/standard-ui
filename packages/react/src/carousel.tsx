"use client"

import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react"
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ComponentProps,
  type KeyboardEvent,
} from "react"
import { Button } from "./button"
import { IconChevronRightSmall } from "./icons"
import { cn } from "./lib/cn"
import { focusRing, focusRingBorder } from "./lib/focus"
import { motion } from "./lib/motion"

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

const TRACKPAD_AXIS_MIN = 2
/**
 * Allow ~30° off a pure horizontal swipe. Mac trackpads often emit a
 * mixed deltaX/deltaY even when the gesture reads as sideways.
 */
const TRACKPAD_HORIZONTAL_RATIO = 0.55
const TRACKPAD_SWIPE_THRESHOLD = 20
const TRACKPAD_GESTURE_END_DELAY = 100
/** Match Embla’s in-drag body so free wheel tracks the gesture. */
const FREE_WHEEL_FRICTION = 0.68
const FREE_WHEEL_DURATION = 22

type CarouselContextValue = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: CarouselApi
  scrollPrev: () => void
  scrollNext: () => void
  scrollTo: (index: number) => void
  canScrollPrev: boolean
  canScrollNext: boolean
  selectedIndex: number
  scrollSnaps: number[]
  orientation: "horizontal" | "vertical"
}

const CarouselContext = createContext<CarouselContextValue | null>(null)

const useCarousel = () => {
  const context = useContext(CarouselContext)
  if (!context) {
    throw new Error("Carousel components must be used within <Carousel>")
  }
  return context
}

export type CarouselProps = ComponentProps<"div"> & {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: "horizontal" | "vertical"
  setApi?: (api: CarouselApi) => void
  /** Adds directional edge fades wherever more slides are available. */
  fade?: boolean
}

export type CarouselContentProps = ComponentProps<"div"> & {
  /** Classes for the overflow viewport (Embla root), not the slide track. */
  viewportClassName?: string
}
export type CarouselItemProps = ComponentProps<"div">
export type CarouselPreviousProps = ComponentProps<typeof Button>
export type CarouselNextProps = ComponentProps<typeof Button>
export type CarouselDotsProps = ComponentProps<"div">

const carouselControlClassName = cn(
  "absolute z-20 !size-6 border glass [--glass-tint:var(--surface)] [--glass-opacity:55%] text-fg-primary shadow-md [&_svg:not([class*='size-'])]:!size-3.5",
  "hover:bg-surface/80 hover:text-fg-primary",
  "disabled:pointer-events-none disabled:opacity-0",
  motion.colors,
)

const CarouselEdgeFades = () => {
  const { orientation, canScrollPrev, canScrollNext } = useCarousel()
  const horizontal = orientation === "horizontal"
  const sharedClassName =
    "pointer-events-none absolute z-10 opacity-0 transition-opacity duration-[var(--duration-lg)] ease-enter data-[visible=true]:opacity-100 motion-reduce:transition-none"

  return (
    <>
      <div
        aria-hidden="true"
        data-slot={horizontal ? "carousel-fade-left" : "carousel-fade-top"}
        data-visible={canScrollPrev}
        className={cn(
          sharedClassName,
          horizontal
            ? "-top-px -bottom-px -left-px w-20 bg-linear-to-r from-surface via-surface/60 via-40% to-transparent"
            : "-top-px -right-px -left-px h-20 bg-linear-to-b from-surface via-surface/60 via-40% to-transparent",
        )}
      />
      <div
        aria-hidden="true"
        data-slot={horizontal ? "carousel-fade-right" : "carousel-fade-bottom"}
        data-visible={canScrollNext}
        className={cn(
          sharedClassName,
          horizontal
            ? "-top-px -right-px -bottom-px w-20 bg-linear-to-l from-surface via-surface/60 via-40% to-transparent"
            : "-right-px -bottom-px -left-px h-20 bg-linear-to-t from-surface via-surface/60 via-40% to-transparent",
        )}
      />
    </>
  )
}

export const Carousel = ({
  orientation = "horizontal",
  fade = false,
  opts,
  setApi,
  plugins,
  className,
  children,
  onKeyDownCapture,
  tabIndex,
  ref: forwardedRef,
  ...props
}: CarouselProps) => {
  const [carouselRoot, setCarouselRoot] = useState<HTMLDivElement | null>(null)
  const [carouselRef, api] = useEmblaCarousel(
    {
      align: "start",
      containScroll: "trimSnaps",
      dragFree: true,
      duration: 20,
      ...opts,
      axis: orientation === "horizontal" ? "x" : "y",
    },
    plugins,
  )
  const apiRef = useRef(api)
  useEffect(() => {
    apiRef.current = api
  }, [api])
  // Embla is an external store, so read from it directly rather than mirroring
  // it into state. Seeding mirrored state meant calling setState synchronously
  // inside an effect, costing an extra render on mount and on every slide
  // change. Both snapshots return booleans, so there is no object identity to
  // keep stable between reads.
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      if (!api) return () => {}
      api.on("reInit", onStoreChange)
      api.on("select", onStoreChange)
      api.on("scroll", onStoreChange)
      return () => {
        api.off("reInit", onStoreChange)
        api.off("select", onStoreChange)
        api.off("scroll", onStoreChange)
      }
    },
    [api],
  )

  const canScrollPrev = useSyncExternalStore(
    subscribe,
    () => api?.canScrollPrev() ?? false,
    () => false,
  )
  const canScrollNext = useSyncExternalStore(
    subscribe,
    () => api?.canScrollNext() ?? false,
    () => false,
  )
  const selectedIndex = useSyncExternalStore(
    subscribe,
    () => api?.selectedScrollSnap() ?? 0,
    () => 0,
  )

  const scrollSnapsCache = useRef<number[]>([])
  const scrollSnaps = useSyncExternalStore(
    subscribe,
    () => {
      const next = api?.scrollSnapList() ?? []
      const prev = scrollSnapsCache.current
      if (
        prev.length === next.length &&
        prev.every((value, index) => value === next[index])
      ) {
        return prev
      }
      scrollSnapsCache.current = next
      return next
    },
    () => scrollSnapsCache.current,
  )

  const scrollPrev = useCallback(() => {
    api?.scrollPrev()
  }, [api])

  const scrollNext = useCallback(() => {
    api?.scrollNext()
  }, [api])

  const scrollTo = useCallback(
    (index: number) => {
      api?.scrollTo(index)
    },
    [api],
  )

  const trackpadDelta = useRef(0)
  const trackpadGestureHandled = useRef(false)
  const trackpadGestureDirection = useRef(0)
  const trackpadGestureTimeout = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  )

  const clearTrackpadGesture = useCallback(() => {
    trackpadDelta.current = 0
    trackpadGestureHandled.current = false
    trackpadGestureDirection.current = 0
    if (trackpadGestureTimeout.current) {
      clearTimeout(trackpadGestureTimeout.current)
      trackpadGestureTimeout.current = null
    }
  }, [])

  const scheduleTrackpadGestureEnd = useCallback(() => {
    if (trackpadGestureTimeout.current) {
      clearTimeout(trackpadGestureTimeout.current)
    }
    trackpadGestureTimeout.current = setTimeout(() => {
      trackpadDelta.current = 0
      trackpadGestureHandled.current = false
      trackpadGestureDirection.current = 0
      trackpadGestureTimeout.current = null
    }, TRACKPAD_GESTURE_END_DELAY)
  }, [])

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      onKeyDownCapture?.(event)
      if (event.defaultPrevented) return
      if (event.key === "ArrowLeft") {
        event.preventDefault()
        scrollPrev()
      } else if (event.key === "ArrowRight") {
        event.preventDefault()
        scrollNext()
      }
    },
    [onKeyDownCapture, scrollNext, scrollPrev],
  )

  const handleWheel = useCallback(
    (event: globalThis.WheelEvent) => {
      if (event.defaultPrevented || orientation !== "horizontal") return

      const deltaMultiplier =
        event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? 100 : 1
      const rawX = event.deltaX * deltaMultiplier
      const rawY = event.deltaY * deltaMultiplier
      const absX = Math.abs(rawX)
      const absY = Math.abs(rawY)

      // Only claim sideways gestures. Vertical trackpad scroll must pass
      // through to the page. Shift+wheel is the mouse chord for horizontal.
      let scrollDelta = 0
      if (event.shiftKey && absY >= TRACKPAD_AXIS_MIN) {
        scrollDelta = rawY
      } else if (
        absX >= TRACKPAD_AXIS_MIN &&
        absX > absY * TRACKPAD_HORIZONTAL_RATIO
      ) {
        scrollDelta = rawX
      } else {
        return
      }

      const carouselApi = apiRef.current
      if (!carouselApi) return

      const engine = carouselApi.internalEngine()

      // Free-scroll strip (Apple gallery style): scrub continuously and clamp
      // to Embla limits so the first/last slides never rest past the edge.
      if (engine.options.dragFree) {
        const nextTarget = engine.limit.constrain(
          engine.target.get() - scrollDelta,
        )
        if (nextTarget === engine.target.get()) {
          if (engine.limit.reachedAny(engine.target.get())) {
            event.preventDefault()
          }
          return
        }

        event.preventDefault()
        engine.scrollBody
          .useFriction(FREE_WHEEL_FRICTION)
          .useDuration(FREE_WHEEL_DURATION)
        engine.scrollTo.distance(nextTarget - engine.target.get(), false)
        return
      }

      const canScrollInDirection =
        scrollDelta > 0
          ? carouselApi.canScrollNext()
          : carouselApi.canScrollPrev()
      if (!canScrollInDirection) return

      event.preventDefault()

      // Snapping carousels (e.g. lightbox): one slide per gesture.
      // Same-direction inertia is ignored; reverse unlocks immediately.
      const direction = scrollDelta > 0 ? 1 : -1
      if (trackpadGestureHandled.current) {
        if (direction === trackpadGestureDirection.current) {
          scheduleTrackpadGestureEnd()
          return
        }
        clearTrackpadGesture()
      }

      trackpadDelta.current += scrollDelta
      scheduleTrackpadGestureEnd()

      if (Math.abs(trackpadDelta.current) < TRACKPAD_SWIPE_THRESHOLD) return

      trackpadGestureHandled.current = true
      trackpadGestureDirection.current = direction
      trackpadDelta.current = 0
      if (direction > 0) carouselApi.scrollNext()
      else carouselApi.scrollPrev()
    },
    [
      clearTrackpadGesture,
      orientation,
      scheduleTrackpadGestureEnd,
    ],
  )

  useEffect(() => {
    if (!carouselRoot) return

    carouselRoot.addEventListener("wheel", handleWheel, {
      passive: false,
      capture: true,
    })
    return () => {
      carouselRoot.removeEventListener("wheel", handleWheel, {
        capture: true,
      })
      clearTrackpadGesture()
    }
  }, [carouselRoot, clearTrackpadGesture, handleWheel])

  const setCarouselRootRef = useCallback(
    (node: HTMLDivElement | null) => {
      setCarouselRoot(node)
      if (typeof forwardedRef === "function") forwardedRef(node)
      else if (forwardedRef) forwardedRef.current = node
    },
    [forwardedRef],
  )

  useEffect(() => {
    if (!api || !setApi) return
    setApi(api)
  }, [api, setApi])

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api,
        scrollPrev,
        scrollNext,
        scrollTo,
        canScrollPrev,
        canScrollNext,
        selectedIndex,
        scrollSnaps,
        orientation,
      }}
    >
      <div
        ref={setCarouselRootRef}
        role="region"
        aria-roledescription="carousel"
        data-slot="carousel"
        data-fade={fade || undefined}
        className={cn(
          "relative",
          fade &&
            cn(
              "rounded-xl",
              focusRingBorder,
              focusRing,
            ),
          className,
        )}
        onKeyDownCapture={handleKeyDown}
        tabIndex={tabIndex ?? (fade ? 0 : undefined)}
        {...props}
      >
        {children}
        {fade ? <CarouselEdgeFades /> : null}
      </div>
    </CarouselContext.Provider>
  )
}

export const CarouselContent = ({
  className,
  viewportClassName,
  ...props
}: CarouselContentProps) => {
  const { carouselRef, orientation } = useCarousel()

  return (
    <div
      ref={carouselRef}
      className={cn(
        "cursor-grab overflow-hidden active:cursor-grabbing",
        orientation === "horizontal"
          ? "touch-pan-y overscroll-x-contain"
          : "touch-pan-x overscroll-y-contain",
        viewportClassName,
      )}
      data-slot="carousel-viewport"
    >
      <div
        data-slot="carousel-content"
        className={cn(
          "flex",
          // Start spacing so the first slide lines up with the page measure.
          // No end padding — the strip bleeds to the track edge (Apple gallery).
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className,
        )}
        {...props}
      />
    </div>
  )
}

export const CarouselItem = ({ className, ...props }: CarouselItemProps) => {
  const { orientation } = useCarousel()

  return (
    <div
      role="group"
      aria-roledescription="slide"
      data-slot="carousel-item"
      className={cn(
        "min-w-0 shrink-0 grow-0",
        // Peek the next card by default — override with basis-full when a
        // single focused slide is required (e.g. lightbox).
        orientation === "horizontal"
          ? "basis-[92%] pl-4 sm:basis-[72%] lg:basis-[62%]"
          : "basis-full pt-4",
        className,
      )}
      {...props}
    />
  )
}

export const CarouselPrevious = ({
  className,
  variant = "ghost",
  size = "sm",
  ...props
}: CarouselPreviousProps) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel()

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      iconOnly
      rounded
      disabled={!canScrollPrev}
      aria-label="Previous slide"
      data-slot="carousel-previous"
      className={cn(
        carouselControlClassName,
        orientation === "horizontal"
          ? "top-1/2 left-3 -translate-y-1/2 active:!-translate-y-1/2"
          : "top-3 left-1/2 -translate-x-1/2 rotate-90 active:!-translate-x-1/2 active:!translate-y-0",
        className,
      )}
      onClick={scrollPrev}
      {...props}
    >
      <IconChevronRightSmall className="rotate-180" aria-hidden />
    </Button>
  )
}

export const CarouselNext = ({
  className,
  variant = "ghost",
  size = "sm",
  ...props
}: CarouselNextProps) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel()

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      iconOnly
      rounded
      disabled={!canScrollNext}
      aria-label="Next slide"
      data-slot="carousel-next"
      className={cn(
        carouselControlClassName,
        orientation === "horizontal"
          ? "top-1/2 right-3 -translate-y-1/2 active:!-translate-y-1/2"
          : "bottom-3 left-1/2 -translate-x-1/2 rotate-90 active:!-translate-x-1/2 active:!translate-y-0",
        className,
      )}
      onClick={scrollNext}
      {...props}
    >
      <IconChevronRightSmall aria-hidden />
    </Button>
  )
}

export const CarouselDots = ({ className, ...props }: CarouselDotsProps) => {
  const { scrollSnaps, selectedIndex, scrollTo } = useCarousel()

  if (scrollSnaps.length <= 1) return null

  return (
    <div
      data-slot="carousel-dots"
      role="tablist"
      aria-label="Slide indicators"
      className={cn("mt-4 flex items-center justify-start gap-1 pl-4", className)}
      {...props}
    >
      {scrollSnaps.map((_, index) => {
        const isSelected = index === selectedIndex

        return (
          <button
            key={index}
            type="button"
            role="tab"
            aria-label={`Go to slide ${index + 1}`}
            aria-selected={isSelected}
            data-selected={isSelected ? "" : undefined}
            className={cn(
              "h-1.5 cursor-pointer rounded-full outline-none",
              motion.all,
              "focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary",
              isSelected
                ? "w-5 bg-fg-tertiary"
                : "w-1.5 bg-fg-quaternary/50 hover:bg-fg-quaternary",
            )}
            onClick={() => scrollTo(index)}
          />
        )
      })}
    </div>
  )
}

export type { CarouselApi }
export { useCarousel }
