"use client"

import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogClose,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogPopup,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
} from "@boyernick/standard-ui-react"
import { ComponentCanvas } from "@/components/component-canvas"

export const AlertDialogExamples = () => (
  <div className="mt-6 flex flex-col gap-8">
    <ComponentCanvas
      label="Confirm discard"
      code={`<AlertDialog>
  <AlertDialogTrigger render={<Button variant="outline" />}>
    Discard draft
  </AlertDialogTrigger>
  <AlertDialogPortal>
    <AlertDialogBackdrop />
    <AlertDialogPopup>
      <AlertDialogHeader>
        <AlertDialogTitle>Discard draft?</AlertDialogTitle>
        <AlertDialogDescription>
          Your unsaved changes will be lost. This can't be undone.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <div className="flex justify-end gap-2">
        <AlertDialogClose render={<Button variant="outline" />}>
          Cancel
        </AlertDialogClose>
        <AlertDialogClose render={<Button variant="destructive" />}>
          Discard
        </AlertDialogClose>
      </div>
    </AlertDialogPopup>
  </AlertDialogPortal>
</AlertDialog>`}
    >
      <AlertDialog>
        <AlertDialogTrigger render={<Button variant="outline" />}>
          Discard draft
        </AlertDialogTrigger>
        <AlertDialogPortal>
          <AlertDialogBackdrop />
          <AlertDialogPopup>
            <AlertDialogHeader>
              <AlertDialogTitle>Discard draft?</AlertDialogTitle>
              <AlertDialogDescription>
                Your unsaved changes will be lost. This can&apos;t be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="flex justify-end gap-2">
              <AlertDialogClose render={<Button variant="outline" />}>
                Cancel
              </AlertDialogClose>
              <AlertDialogClose render={<Button variant="destructive" />}>
                Discard
              </AlertDialogClose>
            </div>
          </AlertDialogPopup>
        </AlertDialogPortal>
      </AlertDialog>
    </ComponentCanvas>
  </div>
)
