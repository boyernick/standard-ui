"use client"

import {
  Button,
  Popover,
  PopoverClose,
  PopoverDescription,
  PopoverPopup,
  PopoverPortal,
  PopoverPositioner,
  PopoverTitle,
  PopoverTrigger,
} from "@boyernick/standard-ui-react"
import type { ComponentProps, ReactNode } from "react"
import { DocBand } from "@/components/doc-band"

/** Trigger and anchored panel — the shape every specimen shares. */
const Anchored = ({
  trigger,
  title,
  description,
  children,
  ...positioner
}: {
  trigger: string
  title: string
  description: string
  children?: ReactNode
} & ComponentProps<typeof PopoverPositioner>) => (
  <Popover>
    <PopoverTrigger render={<Button variant="outline" />}>
      {trigger}
    </PopoverTrigger>
    <PopoverPortal>
      <PopoverPositioner {...positioner}>
        <PopoverPopup>
          <PopoverTitle>{title}</PopoverTitle>
          <PopoverDescription>{description}</PopoverDescription>
          {children}
        </PopoverPopup>
      </PopoverPositioner>
    </PopoverPortal>
  </Popover>
)

export const PopoverExamples = () => (
  <div>
    <DocBand
      first
      id="default"
      title="Default"
      description="A titled panel anchored under its trigger."
    >
      <Anchored
        trigger="Notifications"
        title="Notifications"
        description="You’re all caught up. New alerts will show up here."
      />
    </DocBand>

    <DocBand
      id="actions"
      title="With actions"
      description="Anything that closes the popover goes through PopoverClose."
    >
      <Anchored
        trigger="Dimensions"
        title="Dimensions"
        description="Set the dimensions for the layer."
      >
        <div className="mt-3 flex justify-end gap-2">
          <PopoverClose render={<Button variant="ghost" size="sm" />}>
            Cancel
          </PopoverClose>
          <PopoverClose render={<Button size="sm" />}>Apply</PopoverClose>
        </div>
      </Anchored>
    </DocBand>

    <DocBand
      id="placement"
      title="Placement"
      description="side picks the edge it opens from, and flips if it would not fit."
    >
      <div className="flex flex-wrap gap-3">
        {(["top", "bottom", "left", "right"] as const).map((side) => (
          <Anchored
            key={side}
            side={side}
            trigger={side}
            title={`Opens ${side}`}
            description="Anchored to the trigger on that edge."
          />
        ))}
      </div>
    </DocBand>
  </div>
)
