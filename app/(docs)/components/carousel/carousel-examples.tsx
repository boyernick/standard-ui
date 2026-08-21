"use client"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@boyernick/standard-ui-react"
import { DocBand } from "@/components/doc-band"

const slides = [
  {
    eyebrow: "01",
    title: "Foundations",
    detail: "Color, typography, materials, and motion.",
  },
  {
    eyebrow: "02",
    title: "Components",
    detail: "Accessible building blocks for product interfaces.",
  },
  {
    eyebrow: "03",
    title: "Patterns",
    detail: "Repeatable compositions for common workflows.",
  },
]

const peekSlides = [
  { title: "Navigation", detail: "Move through connected destinations." },
  { title: "Feedback", detail: "Communicate status and system response." },
  { title: "Input", detail: "Collect structured information from people." },
  { title: "Content", detail: "Group and present related information." },
  { title: "Overlays", detail: "Layer focused tasks over the current view." },
]

export const CarouselExamples = () => (
  <div>
    <DocBand
      first
      id="basic"
      title="Basic"
      description="Show one focused slide at a time with previous and next controls."
      contentClassName="max-w-2xl"
    >
      <div className="px-12">
        <Carousel className="w-full">
          <CarouselContent>
            {slides.map((slide) => (
              <CarouselItem key={slide.title}>
                <div className="flex min-h-44 flex-col justify-between rounded-xl border border-border-primary bg-surface p-6">
                  <p className="text-xs font-medium tabular-nums text-fg-tertiary">
                    {slide.eyebrow}
                  </p>
                  <div>
                    <p className="heading-sm text-fg-primary">{slide.title}</p>
                    <p className="text-sm mt-1 max-w-sm text-fg-secondary">
                      {slide.detail}
                    </p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </DocBand>

    <DocBand
      id="peek"
      title="Peek"
      description="Reveal part of the following slide to make horizontal navigation discoverable."
      contentClassName="max-w-3xl"
    >
      <div className="px-12">
        <Carousel opts={{ align: "start" }} className="w-full">
          <CarouselContent>
            {peekSlides.map((slide) => (
              <CarouselItem
                key={slide.title}
                className="basis-[82%] sm:basis-1/2 lg:basis-1/3"
              >
                <div className="flex min-h-36 flex-col justify-end rounded-xl border border-border-primary bg-surface p-5">
                  <p className="text-sm-strong text-fg-primary">{slide.title}</p>
                  <p className="text-sm mt-1 text-fg-secondary">
                    {slide.detail}
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </DocBand>

    <DocBand
      id="edge-fade"
      title="Edge fade"
      description="Fade the available edge to indicate that more content can be reached by dragging or with the arrow keys."
      contentClassName="max-w-2xl"
    >
      <div className="px-12">
        <Carousel fade aria-label="Interface areas" className="w-full">
          <CarouselContent>
            {peekSlides.slice(0, 4).map((slide) => (
              <CarouselItem key={slide.title}>
                <div className="flex min-h-44 flex-col justify-end rounded-xl border border-border-primary bg-background-secondary p-6">
                  <p className="heading-sm text-fg-primary">{slide.title}</p>
                  <p className="text-sm mt-1 max-w-sm text-fg-secondary">
                    {slide.detail}
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </DocBand>
  </div>
)
