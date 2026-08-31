"use client"

import {
  Button,
  ToastAction,
  ToastClose,
  ToastContent,
  ToastDescription,
  ToastIcon,
  ToastPortal,
  ToastProvider,
  ToastRoot,
  ToastTitle,
  ToastViewport,
  useToastManager,
  type ToastPlacement,
} from "@boyernick/standard-ui-react"
import { useState } from "react"
import { DocBand } from "@/components/doc-band"

const BAND = "max-w-md"

/** One viewport serves its provider — toasts stack in that corner however
 *  many buttons under the same provider raise them. */
const ToastList = ({
  placement = "top-center",
}: {
  placement?: ToastPlacement
}) => {
  const { toasts } = useToastManager()

  return (
    <ToastPortal>
      <ToastViewport placement={placement}>
        {toasts.map((toast) => (
          <ToastRoot
            key={toast.id}
            toast={toast}
            variant={toast.data?.variant}
          >
            {/* The icon is a sibling of the content, not inside it — it keeps
                its colour while the content behind the front card fades. */}
            <ToastIcon type={toast.type} />
            <ToastContent>
              <ToastTitle />
              {toast.description ? <ToastDescription /> : null}
            </ToastContent>
            {toast.actionProps ? <ToastAction /> : null}
            <ToastClose aria-label="Close" />
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
        toast.add({ title: `Saved draft ${next}` })
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
          title: "report.pdf deleted",
          actionProps: {
            children: "Undo",
            onClick: () => toast.add({ title: "report.pdf restored" }),
          },
        })
      }
    >
      Delete file
    </Button>
  )
}

const typeSpecimens = [
  { type: "success", title: "Version 1.4.0 is live" },
  { type: "error", title: "The build did not complete" },
  { type: "warning", title: "You have used 90% of your seats" },
  { type: "info", title: "Maintenance on Sunday from 02:00 UTC" },
  { type: "loading", title: "Deploying" },
] as const

const Described = () => {
  const toast = useToastManager()

  return (
    <Button
      type="button"
      variant="outline"
      onClick={() =>
        toast.add({
          type: "success",
          title: "document.pdf uploaded",
          description: "It is available to everyone in the workspace.",
        })
      }
    >
      Show toast
    </Button>
  )
}

const Inverted = () => {
  const toast = useToastManager()

  return (
    <Button
      type="button"
      variant="outline"
      onClick={() =>
        toast.add({
          title: "Version 1.4.0 is live",
          type: "success",
          data: { variant: "inverted" as const },
        })
      }
    >
      Show toast
    </Button>
  )
}

const Types = () => {
  const toast = useToastManager()

  return (
    <div className="flex flex-wrap gap-2">
      {typeSpecimens.map((specimen) => (
        <Button
          key={specimen.type}
          type="button"
          variant="outline"
          onClick={() => toast.add(specimen)}
          className="capitalize"
        >
          {specimen.type}
        </Button>
      ))}
    </div>
  )
}

const BottomRight = () => {
  const toast = useToastManager()
  const [count, setCount] = useState(0)

  return (
    <Button
      type="button"
      variant="outline"
      onClick={() => {
        const next = count + 1
        setCount(next)
        toast.add({ title: `Saved draft ${next}` })
      }}
    >
      Show toast
    </Button>
  )
}

export const ToastExamples = () => (
  <>
    <ToastProvider>
      <div>
        <DocBand
          first
          id="default"
          title="Default"
          description="A single line of text, raised from an action."
          contentClassName={BAND}
        >
          <Basic />
        </DocBand>

        <DocBand
          id="description"
          title="With a description"
          description="A second line, where the title alone will not carry it."
          contentClassName={BAND}
        >
          <Described />
        </DocBand>

        <DocBand
          id="action"
          title="With an action"
          description="One control, sitting inline beside the dismiss."
          contentClassName={BAND}
        >
          <WithAction />
        </DocBand>

        <DocBand
          id="inverted"
          title="Inverted"
          description="Flipped against the page, for a notice that should stand apart."
          contentClassName={BAND}
        >
          <Inverted />
        </DocBand>

        <DocBand
          id="types"
          title="Types"
          description="Each type brings its own glyph and colour."
          contentClassName={BAND}
        >
          <Types />
        </DocBand>
      </div>
      <ToastList />
    </ToastProvider>

    <ToastProvider>
      <DocBand
        id="bottom-right"
        title="Bottom right"
        description="The same stack, anchored to the lower corner."
        contentClassName={BAND}
      >
        <BottomRight />
      </DocBand>
      <ToastList placement="bottom-right" />
    </ToastProvider>
  </>
)
