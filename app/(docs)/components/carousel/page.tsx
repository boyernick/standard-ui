import type { Metadata } from "next"
import { CodeBlock } from "@/components/code-block"
import { DocCell, DocTable, Token } from "@/components/doc-table"
import { PageHeader } from "@/components/page-header"
import { CarouselExamples } from "./carousel-examples"

export const metadata: Metadata = {
  title: "Carousel",
}

export default function CarouselPage() {
  return (
    <div className="w-full">
      <PageHeader
        title="Carousel"
        description="Swipeable slide regions with previous and next controls. Built on Embla for touch, keyboard, and focus-friendly browsing."
      />

      <section className="mt-2">
        <h2 className="heading-sm text-fg-primary">Examples</h2>
        <CarouselExamples />
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">Overview</h2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Compose <Token>Carousel</Token>, <Token>CarouselContent</Token>, and{" "}
          <Token>CarouselItem</Token>. Add <Token>CarouselPrevious</Token> and{" "}
          <Token>CarouselNext</Token> for controls. Pass Embla options through{" "}
          <Token>opts</Token>.
        </p>
        <CodeBlock
          className="mt-4"
          code={`import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@standard-ui/react"

<Carousel>
  <CarouselContent>
    <CarouselItem>One</CarouselItem>
    <CarouselItem>Two</CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`}
        />
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">Usage</h2>
        <h3 className="heading-xs mt-8 text-fg-primary">Sizing</h3>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Override <Token>basis-*</Token> on items for multi-slide peeks. Keep
          room around the region for previous and next controls.
        </p>
        <h3 className="heading-xs mt-8 text-fg-primary">Keyboard</h3>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Arrow keys scroll when focus is inside the carousel region.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">API</h2>
        <DocTable headers={["Part", "Role"]}>
          <tr>
            <DocCell mono>Carousel</DocCell>
            <DocCell>Root region and Embla context.</DocCell>
          </tr>
          <tr>
            <DocCell mono>CarouselContent</DocCell>
            <DocCell>Viewport and slide track.</DocCell>
          </tr>
          <tr>
            <DocCell mono>CarouselItem</DocCell>
            <DocCell>Individual slide.</DocCell>
          </tr>
          <tr>
            <DocCell mono>CarouselPrevious / CarouselNext</DocCell>
            <DocCell>Navigation buttons.</DocCell>
          </tr>
        </DocTable>
      </section>

      <section className="mt-14 mb-8">
        <h2 className="heading-sm text-fg-primary">Guidelines</h2>
        <h3 className="heading-xs mt-8 text-fg-primary">Do</h3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>Label the region and keep slide content self-explanatory</li>
          <li>Disable empty directions with the built-in previous/next state</li>
        </ul>
        <h3 className="heading-xs mt-8 text-fg-primary">Don&apos;t</h3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>Don&apos;t autoplay critical content without a pause control</li>
          <li>Don&apos;t nest interactive carousels inside each other</li>
        </ul>
      </section>
    </div>
  )
}
