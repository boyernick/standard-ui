"use client"

import {
  ScrollArea,
  ScrollAreaContent,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from "@boyernick/standard-ui-react"
import { ComponentCanvas } from "@/components/component-canvas"

export const ScrollAreaExamples = () => (
  <div className="mt-6 flex flex-col gap-8">
    <ComponentCanvas
      label="Vertical"
      contentClassName="w-full max-w-md"
      minHeightClass="min-h-64"
    >
      <ScrollArea className="h-48 w-full rounded-md border border-border-secondary">
        <ScrollAreaViewport>
          <ScrollAreaContent className="space-y-3 p-4 text-sm text-fg-secondary">
            <p>
              StandardUI components share tokens for color, type, and
              motion so surfaces feel consistent across products.
            </p>
            <p>
              Scroll areas keep long content reachable without stretching
              the layout. Prefer a fixed height and a vertical scrollbar
              when the panel sits beside other controls.
            </p>
            <p>
              Keyboard focus stays on the viewport. Use clear headings
              and short paragraphs so scanning remains easy while
              scrolling.
            </p>
            <p>
              Pair scroll areas with cards, sidebars, and dialogs when
              the body can grow beyond the available space.
            </p>
            <p>
              Keep scrollbar thumbs quiet — border tokens, not brand
              fill — so content stays the focus of attention.
            </p>
          </ScrollAreaContent>
        </ScrollAreaViewport>
        <ScrollAreaScrollbar orientation="vertical">
          <ScrollAreaThumb />
        </ScrollAreaScrollbar>
      </ScrollArea>
    </ComponentCanvas>

    <ComponentCanvas
      label="Horizontal"
      contentClassName="w-full max-w-md"
    >
      <ScrollArea className="w-full rounded-md border border-border-secondary">
        <ScrollAreaViewport>
          <ScrollAreaContent className="flex w-max gap-3 p-4">
            {["One", "Two", "Three", "Four", "Five", "Six"].map((label) => (
              <div
                key={label}
                className="flex size-20 shrink-0 items-center justify-center rounded-md bg-background-tertiary text-sm text-fg-primary"
              >
                {label}
              </div>
            ))}
          </ScrollAreaContent>
        </ScrollAreaViewport>
        <ScrollAreaScrollbar orientation="horizontal">
          <ScrollAreaThumb />
        </ScrollAreaScrollbar>
      </ScrollArea>
    </ComponentCanvas>
  </div>
)
