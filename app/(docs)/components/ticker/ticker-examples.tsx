"use client"

import { Badge, Ticker, TickerItem } from "@boyernick/standard-ui-react"
import { ComponentCanvas } from "@/components/component-canvas"

export const TickerExamples = () => (
  <div className="mt-6 flex flex-col gap-8">
    <ComponentCanvas
      label="Default"
      contentClassName="w-full"
    >
      <Ticker className="w-full">
        <TickerItem>
          <Badge>Update</Badge>
          New components shipping weekly
        </TickerItem>
        <TickerItem>
          Soft focus rings — ring-ring/20 with a 1px offset
        </TickerItem>
        <TickerItem>
          Prefer package components in app chrome
        </TickerItem>
        <TickerItem>
          Sentence case for UI copy
        </TickerItem>
      </Ticker>
    </ComponentCanvas>

    <ComponentCanvas
      label="Faster reverse"
      contentClassName="w-full"
    >
      <Ticker className="w-full" duration={16} reverse>
        <TickerItem>Carousel</TickerItem>
        <TickerItem>Sounds</TickerItem>
        <TickerItem>Video player</TickerItem>
        <TickerItem>Image modal</TickerItem>
        <TickerItem>Ticker</TickerItem>
      </Ticker>
    </ComponentCanvas>
  </div>
)
