"use client"

import {
  ScrollArea,
  ScrollAreaContent,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from "@boyernick/standard-ui-react"
import type { ReactNode } from "react"
import { DocBand } from "@/components/doc-band"

const BAND = "max-w-md"

const frame = "rounded-md border border-border-secondary"

/** Viewport plus the scrollbars an axis needs. */
const Area = ({
  className,
  axes,
  children,
}: {
  className?: string
  axes: ("vertical" | "horizontal")[]
  children: ReactNode
}) => (
  <ScrollArea className={`${frame} w-full ${className ?? ""}`}>
    <ScrollAreaViewport>
      <ScrollAreaContent>{children}</ScrollAreaContent>
    </ScrollAreaViewport>
    {axes.map((orientation) => (
      <ScrollAreaScrollbar key={orientation} orientation={orientation}>
        <ScrollAreaThumb />
      </ScrollAreaScrollbar>
    ))}
  </ScrollArea>
)

const lines = [
  "Fog settled over the harbour before the first boats went out.",
  "By seven the market was loud enough to hear from the bridge.",
  "Someone had chalked the day's prices onto the wall by the steps.",
  "The tide turned early, and the shallow berths emptied out.",
  "Gulls worked the quay while the crates were stacked and counted.",
  "By dusk the last of the ice had gone soft in the crates.",
]

const tiles = ["One", "Two", "Three", "Four", "Five", "Six"]

export const ScrollAreaExamples = () => (
  <div>
    <DocBand
      first
      id="vertical"
      title="Vertical"
      description="A fixed height with the overflow reachable by scrolling."
      contentClassName={BAND}
    >
      <Area className="h-48" axes={["vertical"]}>
        <div className="space-y-3 p-4 text-sm text-fg-secondary">
          {lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </Area>
    </DocBand>

    <DocBand
      id="horizontal"
      title="Horizontal"
      description="A row that runs past the edge of its container."
      contentClassName={BAND}
    >
      <Area axes={["horizontal"]}>
        <div className="flex w-max gap-3 p-4">
          {tiles.map((label) => (
            <div
              key={label}
              className="text-sm flex size-20 shrink-0 items-center justify-center rounded-md bg-background-tertiary text-fg-primary"
            >
              {label}
            </div>
          ))}
        </div>
      </Area>
    </DocBand>

    <DocBand
      id="both"
      title="Both axes"
      description="Content larger than its viewport in both directions."
      contentClassName={BAND}
    >
      {/* Two scrollbars on one area — each orientation is its own part. */}
      <Area className="h-48" axes={["vertical", "horizontal"]}>
        {/* An explicit width rather than w-max: the lines happen to be
            narrower than the viewport, so nowrap alone would not overflow
            and the horizontal bar would never appear. */}
        <div className="w-[36rem] space-y-3 p-4 text-sm whitespace-nowrap text-fg-secondary">
          {lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </Area>
    </DocBand>
  </div>
)
