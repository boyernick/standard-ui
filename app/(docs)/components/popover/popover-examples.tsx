"use client"

import {
  Button,
  Popover,
  PopoverArrow,
  PopoverClose,
  PopoverDescription,
  PopoverPopup,
  PopoverPortal,
  PopoverPositioner,
  PopoverTitle,
  PopoverTrigger,
} from "@boyernick/standard-ui-react"
import { ComponentCanvas } from "@/components/component-canvas"

export const PopoverExamples = () => (
  <div className="mt-6 flex flex-col gap-8">
    <ComponentCanvas label="Basic">
      <Popover>
        <PopoverTrigger render={<Button variant="outline" />}>
          Notifications
        </PopoverTrigger>
        <PopoverPortal>
          <PopoverPositioner>
            <PopoverPopup>
              <PopoverTitle>Notifications</PopoverTitle>
              <PopoverDescription>
                You&apos;re all caught up. New alerts will show up here.
              </PopoverDescription>
            </PopoverPopup>
          </PopoverPositioner>
        </PopoverPortal>
      </Popover>
    </ComponentCanvas>

    <ComponentCanvas label="With actions">
      <Popover>
        <PopoverTrigger render={<Button variant="outline" />}>
          Dimensions
        </PopoverTrigger>
        <PopoverPortal>
          <PopoverPositioner>
            <PopoverPopup>
              <PopoverArrow />
              <PopoverTitle>Dimensions</PopoverTitle>
              <PopoverDescription>
                Set the dimensions for the layer.
              </PopoverDescription>
              <div className="mt-3 flex justify-end gap-2">
                <PopoverClose render={<Button variant="ghost" size="sm" />}>
                  Cancel
                </PopoverClose>
                <PopoverClose render={<Button size="sm" />}>Apply</PopoverClose>
              </div>
            </PopoverPopup>
          </PopoverPositioner>
        </PopoverPortal>
      </Popover>
    </ComponentCanvas>
  </div>
)
