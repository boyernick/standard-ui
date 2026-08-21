"use client"

import {
  Button,
  ToastAction,
  ToastClose,
  ToastContent,
  ToastDescription,
  ToastPortal,
  ToastProvider,
  ToastRoot,
  ToastTitle,
  ToastViewport,
  useToastManager,
} from "@boyernick/standard-ui-react"
import { useState } from "react"
import { DocBand } from "@/components/doc-band"

const BAND = "max-w-md"

/** One viewport serves the whole page — toasts stack in the corner however
 *  many buttons on the page raise them. */
const ToastList = () => {
  const { toasts } = useToastManager()

  return (
    <ToastPortal>
      <ToastViewport>
        {toasts.map((toast) => (
          <ToastRoot key={toast.id} toast={toast}>
            <ToastContent>
              <ToastTitle />
              <ToastDescription />
              {toast.actionProps ? <ToastAction /> : null}
              <ToastClose aria-label="Close" />
            </ToastContent>
          </ToastRoot>
        ))}
      </ToastViewport>
    </ToastPortal>
  )
}

const Basic = () => {
  const toast = useToastManager()
  const [count, setCount] = useState(0)

  return (
    <Button
      type="button"
      variant="outline"
      onClick={() => {
        const next = count + 1
        setCount(next)
        toast.add({
          title: `Saved draft ${next}`,
          description: "Your changes are stored locally.",
        })
      }}
    >
      Show toast
    </Button>
  )
}

const WithAction = () => {
  const toast = useToastManager()

  return (
    <Button
      type="button"
      variant="outline"
      onClick={() =>
        toast.add({
          title: "File deleted",
          description: "report.pdf was moved to trash.",
          actionProps: {
            children: "Undo",
            onClick: () =>
              toast.add({
                title: "Restored",
                description: "report.pdf is back.",
              }),
          },
        })
      }
    >
      Delete file
    </Button>
  )
}

const Types = () => {
  const toast = useToastManager()

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        type="button"
        variant="outline"
        onClick={() =>
          toast.add({
            type: "success",
            title: "Deployed",
            description: "Version 1.4.0 is live.",
          })
        }
      >
        Success
      </Button>
      <Button
        type="button"
        variant="outline"
        onClick={() =>
          toast.add({
            type: "error",
            title: "Deploy failed",
            description: "The build did not complete.",
          })
        }
      >
        Error
      </Button>
    </div>
  )
}

export const ToastExamples = () => (
  <ToastProvider>
    <div>
      <DocBand
        first
        id="default"
        title="Default"
        description="A title and a line of detail, raised from an action."
        contentClassName={BAND}
      >
        <Basic />
      </DocBand>

      <DocBand
        id="action"
        title="With an action"
        description="One control on the toast, for undoing what just happened."
        contentClassName={BAND}
      >
        <WithAction />
      </DocBand>

      <DocBand
        id="types"
        title="Types"
        description="An error carries a red edge; other types keep the plain surface."
        contentClassName={BAND}
      >
        <Types />
      </DocBand>
    </div>
    <ToastList />
  </ToastProvider>
)
