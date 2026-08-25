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
  useSyncExternalStore,
  type ComponentProps,
  type KeyboardEvent,
} from "react"
import { Button } from "./button"
import { IconChevronRightSmall } from "./icons"
import { cn } from "./lib/cn"
import { focusRing, focusRingBorder } from "./lib/focus"

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

const TRACKPAD_SWIPE_THRESHOLD = 24
const TRACKPAD_GESTURE_END_DELAY = 140

type CarouselContextValue = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: CarouselApi
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
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

export type CarouselContentProps = ComponentProps<"div">
export type CarouselItemProps = ComponentProps<"div">
export type CarouselPreviousProps = ComponentProps<typeof Button>
export type CarouselNextProps = ComponentProps<typeof Button>

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
  const carouselRootRef = useRef<HTMLDivElement | null>(null)
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === "horizontal" ? "x" : "y",
    },
    plugins,
  )
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
      return () => {
        api.off("reInit", onStoreChange)
        api.off("select", onStoreChange)
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

  const scrollPrev = useCallback(() => {
    api?.scrollPrev()
  }, [api])

  const scrollNext = useCallback(() => {
    api?.scrollNext()
  }, [api])

  const canScrollPrevRef = useRef(canScrollPrev)
  const canScrollNextRef = useRef(canScrollNext)
  const scrollPrevRef = useRef(scrollPrev)
  const scrollNextRef = useRef(scrollNext)

  useEffect(() => {
    canScrollPrevRef.current = canScrollPrev
    canScrollNextRef.current = canScrollNext
    scrollPrevRef.current = scrollPrev
    scrollNextRef.current = scrollNext
  }, [canScrollNext, canScrollPrev, scrollNext, scrollPrev])

  const trackpadDelta = useRef(0)
  const trackpadGestureHandled = useRef(false)
  const trackpadGestureTimeout = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  )

  const scheduleTrackpadGestureEnd = useCallback(() => {
    if (trackpadGestureTimeout.current) {
      clearTimeout(trackpadGestureTimeout.current)
    }
    trackpadGestureTimeout.current = setTimeout(() => {
      trackpadDelta.current = 0
      trackpadGestureHandled.current = false
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
      const horizontalDelta = event.deltaX * deltaMultiplier
      const verticalDelta = event.deltaY * deltaMultiplier

      if (
        Math.abs(horizontalDelta) <= Math.abs(verticalDelta) ||
        Math.abs(horizontalDelta) < 1
      ) {
        return
      }

      if (trackpadGestureHandled.current) {
        event.preventDefault()
        scheduleTrackpadGestureEnd()
        return
      }

      const canScrollInDirection =
        horizontalDelta > 0
          ? canScrollNextRef.current
          : canScrollPrevRef.current
      if (!canScrollInDirection) return

      event.preventDefault()
      trackpadDelta.current += horizontalDelta
      scheduleTrackpadGestureEnd()

      if (Math.abs(trackpadDelta.current) < TRACKPAD_SWIPE_THRESHOLD) return

      trackpadGestureHandled.current = true
      trackpadDelta.current = 0
      if (horizontalDelta > 0) scrollNextRef.current()
      else scrollPrevRef.current()
    },
    [orientation, scheduleTrackpadGestureEnd],
  )

  useEffect(() => {
    const root = carouselRootRef.current
    if (!root) return

    root.addEventListener("wheel", handleWheel, { passive: false })
    return () => {
      root.removeEventListener("wheel", handleWheel)
      if (trackpadGestureTimeout.current) {
        clearTimeout(trackpadGestureTimeout.current)
      }
      trackpadDelta.current = 0
      trackpadGestureHandled.current = false
    }
  }, [handleWheel])

  const setCarouselRootRef = useCallback(
    (node: HTMLDivElement | null) => {
      carouselRootRef.current = node
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
        canScrollPrev,
        canScrollNext,
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
  ...props
}: CarouselContentProps) => {
  const { carouselRef, orientation } = useCarousel()

  return (
    <div
      ref={carouselRef}
      className={cn(
        "overflow-hidden",
        orientation === "horizontal"
          ? "touch-pan-y overscroll-x-contain"
          : "touch-pan-x overscroll-y-contain",
      )}
      data-slot="carousel-viewport"
    >
      <div
        data-slot="carousel-content"
        className={cn(
          "flex",
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
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className,
      )}
      {...props}
    />
  )
}

export const CarouselPrevious = ({
  className,
  variant = "ghost",
  size = "md",
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
        "absolute size-9 border-0 focus-visible:border-0",
        orientation === "horizontal"
          ? "top-1/2 -left-12 -translate-y-1/2 active:!-translate-y-1/2"
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90 active:!-translate-x-1/2 active:!translate-y-0",
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
  size = "md",
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
        "absolute size-9 border-0 focus-visible:border-0",
        orientation === "horizontal"
          ? "top-1/2 -right-12 -translate-y-1/2 active:!-translate-y-1/2"
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90 active:!-translate-x-1/2 active:!translate-y-0",
        className,
      )}
      onClick={scrollNext}
      {...props}
    >
      <IconChevronRightSmall aria-hidden />
    </Button>
  )
}

export type { CarouselApi }
export { useCarousel }
