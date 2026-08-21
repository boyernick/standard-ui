import { Textarea } from "@boyernick/standard-ui-react"
import { DocBand } from "@/components/doc-band"

const BAND = "max-w-md"

export const TextareaExamples = () => (
  <div>
    <DocBand
      first
      id="default"
      title="Default"
      description="A bordered field that grows by dragging its lower edge."
      contentClassName={BAND}
    >
      <div className="flex flex-col gap-3">
        <Textarea placeholder="Write a short note…" aria-label="Note" />
        <Textarea
          defaultValue="Ship the docs pages for collapsible and toggle."
          aria-label="Filled note"
        />
      </div>
    </DocBand>

    <DocBand
      id="ghost"
      title="Ghost"
      description="No border until focus, for writing surfaces set into a page."
      contentClassName={BAND}
    >
      <Textarea
        variant="ghost"
        placeholder="Add a description…"
        aria-label="Description"
      />
    </DocBand>

    <DocBand
      id="invalid"
      title="Invalid"
      description="A red edge and aria-invalid, for a value that failed validation."
      contentClassName={BAND}
    >
      <Textarea invalid defaultValue="Too short" aria-label="Invalid note" />
    </DocBand>

    <DocBand
      id="disabled"
      title="Disabled"
      description="Dimmed and inert, whether it holds a value or a placeholder."
      contentClassName={BAND}
    >
      <div className="flex flex-col gap-3">
        <Textarea disabled placeholder="Unavailable" aria-label="Disabled" />
        <Textarea
          disabled
          defaultValue="Read only value"
          aria-label="Disabled filled"
        />
      </div>
    </DocBand>
  </div>
)
