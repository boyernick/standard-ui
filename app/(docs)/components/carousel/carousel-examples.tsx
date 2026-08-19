"use client"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@boyernick/standard-ui-react"
import { ComponentCanvas } from "@/components/component-canvas"

const slides = [
  { title: "Foundations", detail: "Color, type, and materials" },
  { title: "Components", detail: "Accessible building blocks" },
  { title: "Motion", detail: "Shared transitions and timing" },
]

export const CarouselExamples = () => (
  <div className="mt-6 flex flex-col gap-8">
    <ComponentCanvas
      label="Basic"
      contentClassName="w-full px-12"
      code={`<Carousel className="w-full max-w-md">
  <CarouselContent>
    <CarouselItem>…</CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`}
    >
      <Carousel className="w-full max-w-md">
        <CarouselContent>
          {slides.map((slide) => (
            <CarouselItem key={slide.title}>
              <div className="flex min-h-40 flex-col justify-center rounded-xl border border-border-primary bg-surface p-6">
                <p className="heading-sm text-fg-primary">{slide.title}</p>
                <p className="text-sm mt-1 text-fg-secondary">{slide.detail}</p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </ComponentCanvas>

    <ComponentCanvas
      label="Peek"
      contentClassName="w-full px-12"
      code={`<Carousel opts={{ align: "start" }} className="w-full">
  <CarouselContent>
    <CarouselItem className="basis-1/2 md:basis-1/3">…</CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`}
    >
      <Carousel opts={{ align: "start" }} className="w-full">
        <CarouselContent>
          {["Gray", "Blue", "Green", "Orange", "Pink"].map((label) => (
            <CarouselItem key={label} className="basis-1/2 md:basis-1/3">
              <div className="flex min-h-28 items-center justify-center rounded-xl bg-background-tertiary text-sm text-fg-primary">
                {label}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </ComponentCanvas>
  </div>
)
