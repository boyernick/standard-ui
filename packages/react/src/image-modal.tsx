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

const imageModalControlClassName =
  "border-border-inverted bg-surface-inverted/60 text-fg-inverted shadow-md backdrop-blur-md hover:bg-surface-inverted/80 hover:text-fg-inverted outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-offset-1 focus-visible:ring-offset-surface-inverted focus-visible:ring-ring/20"

export const imageModalContentVariants = cva(
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

export type ImageModalProps = ComponentProps<typeof Dialog>
export type ImageModalTriggerProps = ComponentProps<typeof DialogTrigger>
export type ImageModalContentProps = Omit<
  ComponentProps<typeof DialogPopup>,
  "children"
> &
  VariantProps<typeof imageModalContentVariants> & {
    src: string
    alt: string
    caption?: ReactNode
    downloadSrc?: string
    downloadName?: string
    imgProps?: Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "alt">
    children?: ReactNode
  }

export type ImageModalItem = {
  src: string
  alt: string
  caption?: ReactNode
  downloadSrc?: string
  downloadName?: string
  imgProps?: Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "alt">
}

export type ImageModalGalleryProps = Omit<ImageModalProps, "children"> &
  VariantProps<typeof imageModalContentVariants> & {
    images: readonly ImageModalItem[]
    children: ReactNode
    loop?: boolean
    contentClassName?: string
  }

export type ImageModalGalleryTriggerProps = ImageModalTriggerProps & {
  index: number
}

type ImageModalTriggerClickEvent = Parameters<
  NonNullable<ImageModalTriggerProps["onClick"]>
>[0]

type ImageModalGalleryContextValue = {
  images: readonly ImageModalItem[]
  setActiveIndex: (index: number) => void
}

const ImageModalGalleryContext =
  createContext<ImageModalGalleryContextValue | null>(null)

const useImageModalGallery = () => {
  const context = useContext(ImageModalGalleryContext)
  if (!context) {
    throw new Error(
      "ImageModalGalleryTrigger must be used within <ImageModalGallery>",
    )
  }
  return context
}

export const ImageModal = (props: ImageModalProps) => <Dialog {...props} />

export const ImageModalTrigger = ({
  className,
  ...props
}: ImageModalTriggerProps) => (
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

const ImageModalBackdrop = () => (
  <DialogBackdrop className="bg-surface-inverted/95" />
)

const ImageModalBackground = ({ src }: { src: string }) => (
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
    <div className="absolute inset-0 bg-surface-inverted/65" />
  </div>
)

const ImageModalImage = ({
  src,
  alt,
  imgProps,
  fit = "viewport",
}: Pick<ImageModalItem, "src" | "alt" | "imgProps"> & {
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

const ImageModalControlTooltip = ({
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

const ImageModalDownload = ({
  src,
  name,
}: {
  src: string
  name?: string
}) => (
  <ImageModalControlTooltip label="Download image">
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
        imageModalControlClassName,
        "absolute top-4 right-4 z-20",
      )}
    >
      <IconArrowDown aria-hidden />
    </a>
  </ImageModalControlTooltip>
)

const ImageModalDismiss = () => (
  <ImageModalControlTooltip label="Close image">
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
            imageModalControlClassName,
            "absolute top-4 left-4 z-20",
          )}
        />
      }
    >
      <IconCrossSmall aria-hidden />
    </DialogClose>
  </ImageModalControlTooltip>
)

const ImageModalCaption = ({ children }: { children: ReactNode }) => (
  <p className="mt-3 max-w-[min(40rem,88vw)] shrink-0 px-4 text-center text-sm text-fg-inverted-secondary">
    {children}
  </p>
)

export const ImageModalContent = ({
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
}: ImageModalContentProps) => (
  <DialogPortal>
    <ImageModalBackdrop />
    <DialogPopup
      data-slot="image-modal-content"
      className={cn(
        imageModalContentVariants({ variant }),
        motion.popupCenter,
        className,
      )}
      {...props}
    >
      <TooltipProvider delay={250}>
        <ImageModalBackground src={src} />
        <DialogTitle className="sr-only">{alt}</DialogTitle>
        <div
          data-slot="image-modal-stage"
          className="relative z-10 flex size-full flex-col items-center justify-center p-4"
        >
          <ImageModalImage src={src} alt={alt} imgProps={imgProps} />
          {variant === "caption" && (caption || children) ? (
            <ImageModalCaption>{caption ?? children}</ImageModalCaption>
          ) : null}
        </div>
        <ImageModalDismiss />
        <ImageModalDownload
          src={downloadSrc ?? src}
          name={downloadName}
        />
      </TooltipProvider>
    </DialogPopup>
  </DialogPortal>
)

export const ImageModalGalleryTrigger = ({
  index,
  onClick,
  ...props
}: ImageModalGalleryTriggerProps) => {
  const { images, setActiveIndex } = useImageModalGallery()

  const handleClick = (event: ImageModalTriggerClickEvent) => {
    onClick?.(event)
    if (!event.defaultPrevented && images[index]) setActiveIndex(index)
  }

  return <ImageModalTrigger onClick={handleClick} {...props} />
}

const ImageModalFilmstrip = ({
  images,
  activeIndex,
  onSelect,
}: {
  images: readonly ImageModalItem[]
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
      data-slot="image-modal-filmstrip"
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
                "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-offset-1 focus-visible:ring-offset-surface-inverted focus-visible:ring-ring/20",
                focusRingBorder,
                isActive
                  ? "opacity-100 ring-2 ring-fg-inverted"
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

const ImageModalGalleryContent = ({
  images,
  activeIndex,
  setActiveIndex,
  loop,
  variant,
  className,
}: {
  images: readonly ImageModalItem[]
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
      <ImageModalBackdrop />
      <DialogPopup
        data-slot="image-modal-gallery-content"
        aria-describedby={undefined}
        onKeyDownCapture={handleKeyDown}
        className={cn(
          imageModalContentVariants({ variant }),
          motion.popupCenter,
          className,
        )}
      >
        <TooltipProvider delay={250}>
          <ImageModalBackground src={activeImage.src} />
          <DialogTitle className="sr-only">{activeImage.alt}</DialogTitle>
          <p className="sr-only" aria-live="polite">
            Image {activeIndex + 1} of {images.length}. {TRACKPAD_LABEL}.
          </p>
          <div className="relative z-10 flex size-full flex-col gap-4 p-4">
            <Carousel
              setApi={setApi}
              opts={{ loop, startIndex: activeIndex, duration: 24 }}
              data-slot="image-modal-stage"
              className="relative min-h-0 w-full min-w-0 flex-1 [&_[data-slot=carousel-viewport]]:h-full [&_[data-slot=carousel-viewport]]:min-h-0"
              aria-label="Image gallery"
            >
              <CarouselContent className="h-full -ml-0">
                {images.map((image, index) => (
                  <CarouselItem
                    key={`${image.src}-${index}`}
                    className="flex h-full min-h-0 flex-col items-center justify-center pl-0"
                    aria-label={`${index + 1} of ${images.length}`}
                  >
                    <div className="flex max-h-full min-h-0 w-full flex-col items-center justify-center">
                      <div className="flex min-h-0 w-full items-center justify-center overflow-hidden">
                        <ImageModalImage
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
                        <ImageModalCaption>{image.caption}</ImageModalCaption>
                      ) : null}
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
            <ImageModalFilmstrip
              images={images}
              activeIndex={activeIndex}
              onSelect={handleSelect}
            />
          </div>
          <ImageModalDismiss />
          <ImageModalDownload
            src={activeImage.downloadSrc ?? activeImage.src}
            name={activeImage.downloadName}
          />
          {images.length > 1 ? (
            <>
              <ImageModalControlTooltip label="Previous image" side="right">
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
                    imageModalControlClassName,
                    "absolute top-1/2 left-4 z-20 -translate-y-1/2 active:!-translate-y-1/2",
                  )}
                >
                  <IconChevronRightSmall className="rotate-180" aria-hidden />
                </Button>
              </ImageModalControlTooltip>
              <ImageModalControlTooltip label="Next image" side="left">
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
                    imageModalControlClassName,
                    "absolute top-1/2 right-4 z-20 -translate-y-1/2 active:!-translate-y-1/2",
                  )}
                >
                  <IconChevronRightSmall aria-hidden />
                </Button>
              </ImageModalControlTooltip>
            </>
          ) : null}
        </TooltipProvider>
      </DialogPopup>
    </DialogPortal>
  )
}

export const ImageModalGallery = ({
  images,
  children,
  loop = true,
  variant = "default",
  contentClassName,
  ...props
}: ImageModalGalleryProps) => {
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
      <ImageModalGalleryContext.Provider
        value={{
          images,
          setActiveIndex: setSafeActiveIndex,
        }}
      >
        {children}
        {images.length ? (
          <ImageModalGalleryContent
            images={images}
            activeIndex={safeIndex}
            setActiveIndex={setSafeActiveIndex}
            loop={loop}
            variant={variant ?? "default"}
            className={contentClassName}
          />
        ) : null}
      </ImageModalGalleryContext.Provider>
    </Dialog>
  )
}
