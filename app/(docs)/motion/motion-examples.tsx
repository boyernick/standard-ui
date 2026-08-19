"use client"

import { Button, Dialog, DialogBackdrop, DialogPopup, DialogPortal, DialogTrigger } from "@boyernick/standard-ui-react"
import { ComponentCanvas } from "@/components/component-canvas"

export const MotionExamples = () => (
  <div className="mt-6 flex flex-col gap-8">
    <ComponentCanvas
      label="Centered popup"
      code={`<Dialog>
  <DialogTrigger render={<Button variant="outline" />}>
    Open
  </DialogTrigger>
  <DialogPortal>
    <DialogBackdrop />
    <DialogPopup>…</DialogPopup>
  </DialogPortal>
</Dialog>`}
    >
      <Dialog>
        <DialogTrigger render={<Button variant="outline" />}>
          Preview motion
        </DialogTrigger>
        <DialogPortal>
          <DialogBackdrop />
          <DialogPopup className="gap-3 p-5">
            <p className="text-sm text-fg-primary">
              Backdrop fades; popup scales with opacity.
            </p>
          </DialogPopup>
        </DialogPortal>
      </Dialog>
    </ComponentCanvas>
  </div>
)
