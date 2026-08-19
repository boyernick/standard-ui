"use client"

import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react"
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useSyncExternalStore,
  type ComponentProps,
  type KeyboardEvent,
} from "react"
import { Button } from "./button"
import { IconChevronRightSmall } from "./icons"
import { cn } from "./lib/cn"

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

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
}

export type CarouselContentProps = ComponentProps<"div">
export type CarouselItemProps = ComponentProps<"div">
export type CarouselPreviousProps = ComponentProps<typeof Button>
export type CarouselNextProps = ComponentProps<typeof Button>

export const Carousel = ({
  orientation = "horizontal",
  opts,
  setApi,
  plugins,
  className,
  children,
  onKeyDownCapture,
  ...props
}: CarouselProps) => {
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
        role="region"
        aria-roledescription="carousel"
        data-slot="carousel"
        className={cn("relative", className)}
        onKeyDownCapture={handleKeyDown}
        {...props}
      >
        {children}
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
    <div ref={carouselRef} className="overflow-hidden" data-slot="carousel-viewport">
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
  variant = "outline",
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
        "absolute size-9",
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
  variant = "outline",
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
        "absolute size-9",
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
