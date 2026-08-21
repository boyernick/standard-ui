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
import type { ReactNode } from "react"
import { DocBand } from "@/components/doc-band"

const Confirm = ({
  trigger,
  title,
  description,
  confirm,
  variant,
}: {
  trigger: string
  title: string
  description: ReactNode
  confirm: string
  variant: "primary" | "destructive"
}) => (
  <AlertDialog>
    {/* The trigger carries the same variant as the action it confirms, so the
        stakes read before the dialog opens. */}
    <AlertDialogTrigger render={<Button variant={variant} />}>
      {trigger}
    </AlertDialogTrigger>
    <AlertDialogPortal>
      <AlertDialogBackdrop />
      <AlertDialogPopup>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex justify-end gap-2">
          <AlertDialogClose render={<Button variant="outline" />}>
            Cancel
          </AlertDialogClose>
          <AlertDialogClose render={<Button variant={variant} />}>
            {confirm}
          </AlertDialogClose>
        </div>
      </AlertDialogPopup>
    </AlertDialogPortal>
  </AlertDialog>
)

export const AlertDialogExamples = () => (
  <div>
    <DocBand
      first
      id="confirm"
      title="Confirm"
      description="An interruption that is consequential but recoverable."
    >
      <Confirm
        trigger="Publish changes"
        title="Publish to production?"
        description="Everyone with access sees these changes straight away."
        confirm="Publish"
        variant="primary"
      />
    </DocBand>

    <DocBand
      id="destructive"
      title="Destructive"
      description="The confirm that loses work — pair it with a destructive button."
    >
      <Confirm
        trigger="Discard draft"
        title="Discard draft?"
        description="Your unsaved changes will be lost. This can’t be undone."
        confirm="Discard"
        variant="destructive"
      />
    </DocBand>
  </div>
)
