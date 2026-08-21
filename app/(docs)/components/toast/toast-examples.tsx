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
import { ComponentCanvas } from "@/components/component-canvas"

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

const ToastDemo = () => {
  const toastManager = useToastManager()
  const [count, setCount] = useState(0)

  const handleCreate = () => {
    const next = count + 1
    setCount(next)
    toastManager.add({
      title: `Saved draft ${next}`,
      description: "Your changes are stored locally.",
    })
  }

  return (
    <>
      <Button type="button" variant="outline" onClick={handleCreate}>
        Show toast
      </Button>
      <ToastList />
    </>
  )
}

const ToastWithActionDemo = () => {
  const toastManager = useToastManager()

  const handleCreate = () => {
    toastManager.add({
      title: "File deleted",
      description: "report.pdf was moved to trash.",
      actionProps: {
        children: "Undo",
        onClick: () => {
          toastManager.add({
            title: "Restored",
            description: "report.pdf is back.",
          })
        },
      },
    })
  }

  return (
    <>
      <Button type="button" variant="outline" onClick={handleCreate}>
        Delete file
      </Button>
      <ToastList />
    </>
  )
}

export const ToastExamples = () => (
  <div className="mt-6 flex flex-col gap-8">
    <ComponentCanvas label="Basic">
      <ToastProvider>
        <ToastDemo />
      </ToastProvider>
    </ComponentCanvas>

    <ComponentCanvas label="With action">
      <ToastProvider>
        <ToastWithActionDemo />
      </ToastProvider>
    </ComponentCanvas>
  </div>
)
