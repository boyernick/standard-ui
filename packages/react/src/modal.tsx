"use client"

import { cva, type VariantProps } from "class-variance-authority"
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ComponentProps,
  type ImgHTMLAttributes,
  type KeyboardEvent,
  type ReactElement,
  type ReactNode,
} from "react"
import { buttonVariants } from "./button"
import { GlassButton, GlassRoot } from "./glass"
import { mediaGlass } from "./lib/media-glass"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "./carousel"
import {
  Dialog,
  DialogBackdrop,
  DialogClose,
  DialogPopup,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "./dialog"
import {
  IconArrowDownSmall,
  IconChevronRightSmall,
  IconCrossSmall,
  IconZoomIn,
  IconZoomOut,
} from "./icons"
import { cn } from "./lib/cn"
import { focusRing, focusRingBorder } from "./lib/focus"
import { IMAGE_ZOOM, panZoomedImage } from "./lib/image-zoom"
import { motion } from "./lib/motion"
import {
  Tooltip,
  TooltipPopup,
  TooltipPortal,
  TooltipPositioner,
  TooltipProvider,
  TooltipTrigger,
  type TooltipPositionerProps,
} from "./tooltip"

const TRACKPAD_LABEL =
  "Swipe, use the arrow keys, or use the controls to navigate"

// Match the video controls while preserving the image viewer focus treatment.
const modalControlClassName =
  "glass-optical glass-optical-media text-fg-scrim hover:text-fg-scrim outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-offset-1 focus-visible:ring-offset-surface-scrim focus-visible:ring-ring/20"

export const modalContentVariants = cva(
  "h-dvh max-h-dvh w-screen max-w-none gap-0 overflow-hidden rounded-none border-0 bg-transparent p-0 shadow-none max-sm:max-w-none",
  {
    variants: {
      variant: {
        default: "",
        caption: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export type ModalProps = ComponentProps<typeof Dialog>
export type ModalTriggerProps = ComponentProps<typeof DialogTrigger>
export type ModalContentProps = Omit<
  ComponentProps<typeof DialogPopup>,
  "children"
> &
  VariantProps<typeof modalContentVariants> & {
    src: string
    alt: string
    caption?: ReactNode
    downloadSrc?: string
    downloadName?: string
    imgProps?: Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "alt">
    children?: ReactNode
    /**
     * Magnification when the image is clicked or the zoom control pressed.
     * `false` turns zoom off. Default 2.
     */
    zoom?: number | false
  }

export type GalleryItem = {
  src: string
  alt: string
  caption?: ReactNode
  downloadSrc?: string
  downloadName?: string
  imgProps?: Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "alt">
}

export type GalleryProps = Omit<ModalProps, "children"> &
  VariantProps<typeof modalContentVariants> & {
    images: readonly GalleryItem[]
    children: ReactNode
    loop?: boolean
    contentClassName?: string
  }

export type GalleryTriggerProps = ModalTriggerProps & {
  index: number
}

type ModalTriggerClickEvent = Parameters<
  NonNullable<ModalTriggerProps["onClick"]>
>[0]

type GalleryContextValue = {
  images: readonly GalleryItem[]
  setActiveIndex: (index: number) => void
}

const GalleryContext =
  createContext<GalleryContextValue | null>(null)

const useGallery = () => {
  const context = useContext(GalleryContext)
  if (!context) {
    throw new Error(
      "GalleryTrigger must be used within <Gallery>",
    )
  }
  return context
}

export const Modal = (props: ModalProps) => <Dialog {...props} />

export const ModalTrigger = ({
  className,
  ...props
}: ModalTriggerProps) => (
  <DialogTrigger
    className={cn(
      "cursor-pointer rounded-xl",
      focusRingBorder,
      focusRing,
      className,
    )}
    {...props}
  />
)

const ModalBackdrop = () => (
  // DialogBackdrop is black/60 in dark mode; say 95 there too, or the page
  // shows through behind the image.
  <DialogBackdrop className="bg-surface-scrim/95 dark:bg-surface-scrim/95" />
)

const ModalBackground = ({ src }: { src: string }) => (
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 overflow-hidden"
  >
    {/* Consumers may use any image host, so this package deliberately renders
        the platform-neutral image element rather than Next.js Image. */}
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img
      src={src}
      alt=""
      className="size-full scale-110 object-cover opacity-25 blur-3xl"
    />
    <div className="absolute inset-0 bg-surface-scrim/65" />
  </div>
)

const ModalImage = ({
  src,
  alt,
  imgProps,
  fit = "viewport",
  imageRef,
  zoom,
}: Pick<GalleryItem, "src" | "alt" | "imgProps"> & {
  fit?: "viewport" | "contain"
  imageRef?: { current: HTMLImageElement | null }
  /** Zoom state and toggle, for an image that magnifies in place. */
  zoom?: { scale: number; zoomed: boolean; toggle: (x: number, y: number) => void }
}) => {
  const { className, onLoad, onError, onClick, style, ...props } = imgProps ?? {}
  // Held transparent until decoded, then faded in: a large file otherwise
  // paints in top-down bands inside the lightbox. The ref catches an image the
  // browser already has (a cached file, or the one the trigger just showed)
  // before first paint, so it appears at once with nothing to fade.
  const [loaded, setLoaded] = useState(false)
  const catchLoaded = useCallback((image: HTMLImageElement | null) => {
    if (imageRef) imageRef.current = image
    if (image?.complete && image.naturalWidth > 0) setLoaded(true)
  }, [imageRef])

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={catchLoaded}
      src={src}
      alt={alt}
      draggable={false}
      onLoad={(event) => {
        onLoad?.(event)
        event.currentTarget
          .decode()
          .catch(() => {})
          .then(() => setLoaded(true))
      }}
      onError={(event) => {
        onError?.(event)
        // Reveal the broken image rather than leave an invisible one.
        setLoaded(true)
      }}
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented) zoom?.toggle(event.clientX, event.clientY)
      }}
      className={cn(
        // Linear, like every fade in `motion` — see the note there. The zoom
        // eases scale and translate; while the pointer pans, translate
        // follows it without easing.
        zoom
          ? "motion-safe:[transition:opacity_var(--duration-lg)_linear,scale_var(--duration-md)_var(--ease-move),translate_var(--duration-md)_var(--ease-move)] motion-safe:data-[panning]:[transition-property:opacity,scale]"
          : "transition-opacity duration-[var(--duration-lg)] ease-linear motion-reduce:transition-none",
        !loaded && "opacity-0",
        "rounded-lg object-contain shadow-lg select-none",
        // Scaled from the top-left, so the pan lands the image exactly where
        // it is measured.
        zoom && "origin-top-left",
        zoom && (zoom.zoomed ? "cursor-zoom-out touch-none" : "cursor-zoom-in"),
        fit === "contain"
          ? "max-h-full max-w-full"
          : "max-h-[82dvh] max-w-[88vw] max-sm:max-h-[calc(100dvh-2rem)] max-sm:max-w-[calc(100vw-2rem)]",
        className,
      )}
      style={zoom ? { ...style, scale: zoom.zoomed ? String(zoom.scale) : "1" } : style}
      {...props}
    />
  )
}

const ModalControlTooltip = ({
  label,
  side = "bottom",
  children,
}: {
  label: string
  side?: TooltipPositionerProps["side"]
  children: ReactElement
}) => (
  <Tooltip>
    <TooltipTrigger render={children} />
    <TooltipPortal>
      <TooltipPositioner side={side}>
        <TooltipPopup variant="inverted">{label}</TooltipPopup>
      </TooltipPositioner>
    </TooltipPortal>
  </Tooltip>
)

const ModalDownload = ({
  src,
  name,
}: {
  src: string
  name?: string
}) => (
  <ModalControlTooltip label="Download image">
    <a
      href={src}
      data-slot="glass"
      data-glass-radius="css"
      data-config={JSON.stringify({ ...mediaGlass, button: true })}
      download={name ?? ""}
      aria-label="Download image"
      className={cn(
        buttonVariants({
          variant: "glass",
          size: "md",
          rounded: true,
          iconOnly: true,
        }),
        modalControlClassName,
        // Download sits top-left and Close top-right, where dismissal is
        // expected; the gallery's previous/next arrows stay vertically centred.
        "absolute top-4 left-4 z-20",
      )}
    >
      <IconArrowDownSmall aria-hidden />
    </a>
  </ModalControlTooltip>
)

const ModalDismiss = () => (
  <ModalControlTooltip label="Close image">
    <DialogClose
      render={
        <GlassButton
          type="button"
          config={mediaGlass}
          size="md"
          iconOnly
          rounded
          aria-label="Close image"
          className={cn(
            modalControlClassName,
            "absolute top-4 right-4 z-20",
          )}
        />
      }
    >
      <IconCrossSmall aria-hidden />
    </DialogClose>
  </ModalControlTooltip>
)

const ModalZoom = ({
  zoomed,
  onToggle,
}: {
  zoomed: boolean
  onToggle: () => void
}) => (
  <ModalControlTooltip label={zoomed ? "Zoom out" : "Zoom in"}>
    <GlassButton
      type="button"
      config={mediaGlass}
      size="md"
      iconOnly
      rounded
      aria-label={zoomed ? "Zoom out" : "Zoom in"}
      aria-pressed={zoomed}
      onClick={onToggle}
      className={cn(
        modalControlClassName,
        // Beside Download: 16px inset, a 36px control and an 8px gap.
        "absolute top-4 left-15 z-20",
      )}
    >
      {zoomed ? <IconZoomOut aria-hidden /> : <IconZoomIn aria-hidden />}
    </GlassButton>
  </ModalControlTooltip>
)

const ModalCaption = ({ children, hidden }: { children: ReactNode; hidden?: boolean }) => (
  <p
    className={cn(
      "mt-3 max-w-[min(40rem,88vw)] shrink-0 px-4 text-center text-sm text-fg-scrim-secondary",
      "transition-opacity duration-[var(--duration-sm)] ease-linear motion-reduce:transition-none",
      // The magnified image covers the caption's place; don't show through it.
      hidden && "opacity-0",
    )}
  >
    {children}
  </p>
)

/**
 * Zoom for one image: magnify at a point, then pan under the pointer. A
 * mouse or pen pans by moving; a finger drags the image.
 */
function useImageZoom(scale: number | false) {
  const [zoomed, setZoomed] = useState(false)
  const imageRef = useRef<HTMLImageElement | null>(null)
  const frameRef = useRef<HTMLDivElement | null>(null)
  // Where the pan is aimed, in client pixels.
  const aim = useRef({ x: 0, y: 0 })

  const toggle = useCallback(
    (x?: number, y?: number) => {
      const image = imageRef.current
      const frame = frameRef.current
      if (!scale || !image || !frame) return
      const bounds = frame.getBoundingClientRect()
      // The zoom itself eases, towards the point.
      delete image.dataset.panning
      if (zoomed) {
        image.style.translate = "0px 0px"
      } else {
        // No point (the control): open on the middle.
        aim.current = {
          x: x ?? bounds.left + bounds.width / 2,
          y: y ?? bounds.top + bounds.height / 2,
        }
        panZoomedImage(image, bounds, aim.current.x, aim.current.y, scale)
      }
      setZoomed(!zoomed)
    },
    [scale, zoomed],
  )

  useEffect(() => {
    const image = imageRef.current
    const frame = frameRef.current
    if (!zoomed || !scale || !image || !frame) return
    let pending = 0
    let drag: { x: number; y: number } | null = null
    const pan = () => {
      pending = 0
      image.dataset.panning = ""
      panZoomedImage(image, frame.getBoundingClientRect(), aim.current.x, aim.current.y, scale)
    }
    const schedule = () => {
      if (!pending) pending = requestAnimationFrame(pan)
    }
    const down = (event: PointerEvent) => {
      if (event.pointerType === "touch") drag = { x: event.clientX, y: event.clientY }
    }
    const move = (event: PointerEvent) => {
      if (event.pointerType !== "touch") {
        aim.current = { x: event.clientX, y: event.clientY }
        schedule()
        return
      }
      if (!drag) return
      // A finger carries the image: aim the opposite way, by the ratio of
      // the frame to the image's travel past it.
      const bounds = frame.getBoundingClientRect()
      const rendered = image.getBoundingClientRect()
      const travelX = Math.max(1, rendered.width - bounds.width)
      const travelY = Math.max(1, rendered.height - bounds.height)
      aim.current = {
        x: Math.max(bounds.left, Math.min(bounds.right, aim.current.x - ((event.clientX - drag.x) * bounds.width) / travelX)),
        y: Math.max(bounds.top, Math.min(bounds.bottom, aim.current.y - ((event.clientY - drag.y) * bounds.height) / travelY)),
      }
      drag = { x: event.clientX, y: event.clientY }
      schedule()
    }
    const up = () => {
      drag = null
    }
    document.addEventListener("pointerdown", down, { passive: true })
    document.addEventListener("pointermove", move, { passive: true })
    document.addEventListener("pointerup", up, { passive: true })
    document.addEventListener("pointercancel", up, { passive: true })
    return () => {
      document.removeEventListener("pointerdown", down)
      document.removeEventListener("pointermove", move)
      document.removeEventListener("pointerup", up)
      document.removeEventListener("pointercancel", up)
      cancelAnimationFrame(pending)
    }
  }, [scale, zoomed])

  return { zoomed, toggle, imageRef, frameRef }
}

export const ModalContent = ({
  src,
  alt,
  caption,
  downloadSrc,
  downloadName,
  variant = "default",
  className,
  imgProps,
  children,
  zoom = IMAGE_ZOOM,
  ...props
}: ModalContentProps) => {
  const { zoomed, toggle, imageRef, frameRef } = useImageZoom(zoom)
  return (
  <DialogPortal>
    <ModalBackdrop />
    <DialogPopup
      data-slot="modal-content"
      className={cn(
        modalContentVariants({ variant }),
        motion.popupCenter,
        className,
      )}
      {...props}
    >
      <TooltipProvider delay={250}>
        <GlassRoot interactiveLighting defaults={mediaGlass} className="size-full [--glass-ground:var(--color-surface-scrim)]">
          <ModalBackground src={src} />
          <DialogTitle className="sr-only">{alt}</DialogTitle>
          <div
            ref={frameRef}
            data-slot="modal-stage"
            className="relative z-10 flex size-full flex-col items-center justify-center p-4"
          >
            <ModalImage
              src={src}
              alt={alt}
              imgProps={imgProps}
              imageRef={imageRef}
              zoom={zoom ? { scale: zoom, zoomed, toggle } : undefined}
            />
            {variant === "caption" && (caption || children) ? (
              <ModalCaption hidden={zoomed}>{caption ?? children}</ModalCaption>
            ) : null}
          </div>
          <ModalDismiss />
          <ModalDownload
            src={downloadSrc ?? src}
            name={downloadName}
          />
          {zoom ? <ModalZoom zoomed={zoomed} onToggle={() => toggle()} /> : null}
        </GlassRoot>
      </TooltipProvider>
    </DialogPopup>
  </DialogPortal>
  )
}

export const GalleryTrigger = ({
  index,
  onClick,
  ...props
}: GalleryTriggerProps) => {
  const { images, setActiveIndex } = useGallery()

  const handleClick = (event: ModalTriggerClickEvent) => {
    onClick?.(event)
    if (!event.defaultPrevented && images[index]) setActiveIndex(index)
  }

  return <ModalTrigger {...props} onClick={handleClick} />
}

const GalleryFilmstrip = ({
  images,
  activeIndex,
  onSelect,
}: {
  images: readonly GalleryItem[]
  activeIndex: number
  onSelect: (index: number) => void
}) => {
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const list = listRef.current
    if (!list) return
    const active = list.querySelector<HTMLElement>('[aria-selected="true"]')
    active?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    })
  }, [activeIndex])

  if (images.length < 2) return null

  return (
    <div
      data-slot="modal-filmstrip"
      className="relative z-10 w-full shrink-0 overflow-visible"
    >
      <div
        ref={listRef}
        role="tablist"
        aria-label="Gallery images"
        className="flex w-full justify-center gap-2 overflow-x-auto p-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {images.map((image, index) => {
          const isActive = index === activeIndex

          return (
            <button
              key={`${image.src}-${index}`}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={`Show image ${index + 1}: ${image.alt}`}
              onClick={() => onSelect(index)}
              className={cn(
                "size-14 shrink-0 cursor-pointer overflow-hidden rounded-md outline-none",
                "transition-[opacity,box-shadow] duration-[var(--duration-sm)] ease-enter motion-reduce:transition-none",
                "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-offset-1 focus-visible:ring-offset-surface-scrim focus-visible:ring-ring/20",
                focusRingBorder,
                isActive
                  ? "opacity-100 ring-2 ring-fg-scrim"
                  : "opacity-45 hover:opacity-80",
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image.src}
                alt=""
                draggable={false}
                className="size-full object-cover"
              />
            </button>
          )
        })}
      </div>
    </div>
  )
}

const GalleryContent = ({
  images,
  activeIndex,
  setActiveIndex,
  loop,
  variant,
  className,
}: {
  images: readonly GalleryItem[]
  activeIndex: number
  setActiveIndex: (index: number) => void
  loop: boolean
  variant: "default" | "caption"
  className?: string
}) => {
  const [api, setApi] = useState<CarouselApi>()
  const activeImage = images[activeIndex]

  useEffect(() => {
    api?.scrollTo(activeIndex, true)
  }, [activeIndex, api])

  useEffect(() => {
    if (!api) return
    const syncIndex = () => setActiveIndex(api.selectedScrollSnap())
    api.on("select", syncIndex)
    api.on("reInit", syncIndex)
    return () => {
      api.off("select", syncIndex)
      api.off("reInit", syncIndex)
    }
  }, [api, setActiveIndex])

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault()
      api?.scrollPrev()
    } else if (event.key === "ArrowRight") {
      event.preventDefault()
      api?.scrollNext()
    }
  }

  const handleSelect = (index: number) => {
    setActiveIndex(index)
    api?.scrollTo(index)
  }

  if (!activeImage) return null

  return (
    <DialogPortal>
      <ModalBackdrop />
      <DialogPopup
        data-slot="modal-gallery-content"
        aria-describedby={undefined}
        onKeyDownCapture={handleKeyDown}
        className={cn(
          modalContentVariants({ variant }),
          motion.popupCenter,
          className,
        )}
      >
        <TooltipProvider delay={250}>
          <GlassRoot interactiveLighting defaults={mediaGlass} className="size-full [--glass-ground:var(--color-surface-scrim)]">
            <ModalBackground src={activeImage.src} />
            <DialogTitle className="sr-only">{activeImage.alt}</DialogTitle>
            <p className="sr-only" aria-live="polite">
              Image {activeIndex + 1} of {images.length}. {TRACKPAD_LABEL}.
            </p>
            <div className="relative z-10 flex size-full flex-col gap-4 p-4">
              <Carousel
                setApi={setApi}
                opts={{ loop, startIndex: activeIndex, duration: 24, dragFree: false }}
                data-slot="modal-stage"
                className="relative min-h-0 w-full min-w-0 flex-1 [&_[data-slot=carousel-viewport]]:h-full [&_[data-slot=carousel-viewport]]:min-h-0"
                aria-label="Gallery"
              >
                <CarouselContent className="h-full !ml-0 !pr-0">
                  {images.map((image, index) => (
                    <CarouselItem
                      key={`${image.src}-${index}`}
                      className="!basis-full flex h-full min-h-0 flex-col items-center justify-center !pl-0"
                      aria-label={`${index + 1} of ${images.length}`}
                    >
                      <div className="flex max-h-full min-h-0 w-full flex-col items-center justify-center">
                        <div className="flex min-h-0 w-full items-center justify-center overflow-hidden">
                          <ModalImage
                            {...image}
                            fit="contain"
                            imgProps={{
                              ...image.imgProps,
                              className: cn(
                                "max-w-[min(94vw,72rem)]",
                                image.imgProps?.className,
                              ),
                            }}
                          />
                        </div>
                        {variant === "caption" && image.caption ? (
                          <ModalCaption>{image.caption}</ModalCaption>
                        ) : null}
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
              <GalleryFilmstrip
                images={images}
                activeIndex={activeIndex}
                onSelect={handleSelect}
              />
            </div>
            <ModalDismiss />
            <ModalDownload
              src={activeImage.downloadSrc ?? activeImage.src}
              name={activeImage.downloadName}
            />
            {images.length > 1 ? (
              <>
                <ModalControlTooltip label="Previous image" side="right">
                  <GlassButton
                    type="button"
                    config={mediaGlass}
                    size="lg"
                    iconOnly
                    rounded
                    aria-label="Previous image"
                    disabled={!loop && !api?.canScrollPrev()}
                    onClick={() => api?.scrollPrev()}
                    className={cn(
                      modalControlClassName,
                      "absolute top-1/2 left-4 z-20 -translate-y-1/2 active:!-translate-y-1/2",
                    )}
                  >
                    <IconChevronRightSmall className="rotate-180" aria-hidden />
                  </GlassButton>
                </ModalControlTooltip>
                <ModalControlTooltip label="Next image" side="left">
                  <GlassButton
                    type="button"
                    config={mediaGlass}
                    size="lg"
                    iconOnly
                    rounded
                    aria-label="Next image"
                    disabled={!loop && !api?.canScrollNext()}
                    onClick={() => api?.scrollNext()}
                    className={cn(
                      modalControlClassName,
                      "absolute top-1/2 right-4 z-20 -translate-y-1/2 active:!-translate-y-1/2",
                    )}
                  >
                    <IconChevronRightSmall aria-hidden />
                  </GlassButton>
                </ModalControlTooltip>
              </>
            ) : null}
          </GlassRoot>
        </TooltipProvider>
      </DialogPopup>
    </DialogPortal>
  )
}

export const Gallery = ({
  images,
  children,
  loop = true,
  variant = "default",
  contentClassName,
  ...props
}: GalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const safeIndex = images.length
    ? Math.min(activeIndex, images.length - 1)
    : 0
  const setSafeActiveIndex = useCallback(
    (index: number) => {
      if (images[index]) setActiveIndex(index)
    },
    [images],
  )

  return (
    <Dialog {...props}>
      <GalleryContext.Provider
        value={{
          images,
          setActiveIndex: setSafeActiveIndex,
        }}
      >
        {children}
        {images.length ? (
          <GalleryContent
            images={images}
            activeIndex={safeIndex}
            setActiveIndex={setSafeActiveIndex}
            loop={loop}
            variant={variant ?? "default"}
            className={contentClassName}
          />
        ) : null}
      </GalleryContext.Provider>
    </Dialog>
  )
}
