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
import { Button, buttonVariants } from "./button"
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
  IconArrowDown,
  IconChevronRightSmall,
  IconCrossSmall,
} from "./icons"
import { cn } from "./lib/cn"
import { focusRing, focusRingBorder } from "./lib/focus"
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

const modalControlClassName =
  "glass glass-dark text-fg-scrim hover:text-fg-scrim outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-offset-1 focus-visible:ring-offset-surface-scrim focus-visible:ring-ring/20"

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
  <DialogBackdrop className="bg-surface-scrim/95" />
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
}: Pick<GalleryItem, "src" | "alt" | "imgProps"> & {
  fit?: "viewport" | "contain"
}) => {
  const { className, ...props } = imgProps ?? {}

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      draggable={false}
      className={cn(
        "rounded-lg object-contain shadow-lg select-none",
        fit === "contain"
          ? "max-h-full max-w-full"
          : "max-h-[82dvh] max-w-[88vw] max-sm:max-h-[calc(100dvh-2rem)] max-sm:max-w-[calc(100vw-2rem)]",
        className,
      )}
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
      download={name ?? ""}
      aria-label="Download image"
      className={cn(
        buttonVariants({
          variant: "ghost",
          size: "md",
          rounded: true,
          iconOnly: true,
        }),
        modalControlClassName,
        "absolute top-4 right-4 z-20",
      )}
    >
      <IconArrowDown aria-hidden />
    </a>
  </ModalControlTooltip>
)

const ModalDismiss = () => (
  <ModalControlTooltip label="Close image">
    <DialogClose
      render={
        <Button
          type="button"
          variant="ghost"
          size="md"
          iconOnly
          rounded
          aria-label="Close image"
          className={cn(
            modalControlClassName,
            "absolute top-4 left-4 z-20",
          )}
        />
      }
    >
      <IconCrossSmall aria-hidden />
    </DialogClose>
  </ModalControlTooltip>
)

const ModalCaption = ({ children }: { children: ReactNode }) => (
  <p className="mt-3 max-w-[min(40rem,88vw)] shrink-0 px-4 text-center text-sm text-fg-scrim-secondary">
    {children}
  </p>
)

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
  ...props
}: ModalContentProps) => (
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
        <ModalBackground src={src} />
        <DialogTitle className="sr-only">{alt}</DialogTitle>
        <div
          data-slot="modal-stage"
          className="relative z-10 flex size-full flex-col items-center justify-center p-4"
        >
          <ModalImage src={src} alt={alt} imgProps={imgProps} />
          {variant === "caption" && (caption || children) ? (
            <ModalCaption>{caption ?? children}</ModalCaption>
          ) : null}
        </div>
        <ModalDismiss />
        <ModalDownload
          src={downloadSrc ?? src}
          name={downloadName}
        />
      </TooltipProvider>
    </DialogPopup>
  </DialogPortal>
)

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
                <Button
                  type="button"
                  variant="ghost"
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
                </Button>
              </ModalControlTooltip>
              <ModalControlTooltip label="Next image" side="left">
                <Button
                  type="button"
                  variant="ghost"
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
                </Button>
              </ModalControlTooltip>
            </>
          ) : null}
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
