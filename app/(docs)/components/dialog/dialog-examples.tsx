"use client"

import {
  Button,
  Dialog,
  DialogBackdrop,
  DialogClose,
  DialogDescription,
  DialogHeader,
  DialogPopup,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@boyernick/standard-ui-react"
import { ComponentCanvas } from "@/components/component-canvas"

export const DialogExamples = () => (
  <div className="mt-6 flex flex-col gap-8">
    <ComponentCanvas
      label="Basic"
      code={`<Dialog>
  <DialogTrigger render={<Button />}>
    Open dialog
  </DialogTrigger>
  <DialogPortal>
    <DialogBackdrop />
    <DialogPopup>
      <DialogHeader>
        <DialogTitle>Edit profile</DialogTitle>
        <DialogDescription>
          Make changes to your profile. Click close when you're done.
        </DialogDescription>
      </DialogHeader>
      <div className="flex justify-end">
        <DialogClose render={<Button variant="outline" />}>
          Close
        </DialogClose>
      </div>
    </DialogPopup>
  </DialogPortal>
</Dialog>`}
    >
      <Dialog>
        <DialogTrigger render={<Button />}>Open dialog</DialogTrigger>
        <DialogPortal>
          <DialogBackdrop />
          <DialogPopup>
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile. Click close when you&apos;re done.
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-end">
              <DialogClose render={<Button variant="outline" />}>
                Close
              </DialogClose>
            </div>
          </DialogPopup>
        </DialogPortal>
      </Dialog>
    </ComponentCanvas>
  </div>
)
