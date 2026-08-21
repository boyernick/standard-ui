"use client"

import {
  Button,
  Tooltip,
  TooltipPopup,
  TooltipPortal,
  TooltipPositioner,
  TooltipProvider,
  TooltipTrigger,
} from "@boyernick/standard-ui-react"
import { ComponentCanvas } from "@/components/component-canvas"

export const TooltipExamples = () => (
  <div className="mt-6 flex flex-col gap-8">
    <ComponentCanvas label="On hover">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger render={<Button />}>Save</TooltipTrigger>
          <TooltipPortal>
            <TooltipPositioner>
              <TooltipPopup>Save changes</TooltipPopup>
            </TooltipPositioner>
          </TooltipPortal>
        </Tooltip>
      </TooltipProvider>
    </ComponentCanvas>
  </div>
)
