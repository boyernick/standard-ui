import type { Metadata } from "next"
import { Textarea } from "@boyernick/standard-ui-react"
import { ComponentCanvas } from "@/components/component-canvas"
import { DocPage } from "@/components/doc-page"

export const metadata: Metadata = {
  title: "Textarea",
}

export default function TextareaPage() {
  return (
    <DocPage
      title="Textarea"
      description="Multi-line text fields for notes, comments, and longer form input."
    >
      <ComponentCanvas
        label="Default"
        contentClassName="w-full max-w-md flex-col items-stretch"
      >
        <Textarea
          placeholder="Write a short note…"
          aria-label="Note"
        />
        <Textarea
          defaultValue="Ship the docs pages for collapsible and toggle."
          aria-label="Filled note"
        />
      </ComponentCanvas>

      <ComponentCanvas
        label="Ghost"
        contentClassName="w-full max-w-md flex-col items-stretch"
      >
        <Textarea
          variant="ghost"
          placeholder="Add a description…"
          aria-label="Description"
        />
      </ComponentCanvas>

      <ComponentCanvas
        label="Invalid"
        contentClassName="w-full max-w-md flex-col items-stretch"
      >
        <Textarea
          invalid
          defaultValue="Too short"
          aria-label="Invalid note"
        />
      </ComponentCanvas>

      <ComponentCanvas
        label="Disabled"
        contentClassName="w-full max-w-md flex-col items-stretch"
      >
        <Textarea
          disabled
          placeholder="Unavailable"
          aria-label="Disabled"
        />
        <Textarea
          disabled
          defaultValue="Read only value"
          aria-label="Disabled filled"
        />
      </ComponentCanvas>
    </DocPage>
  )
}
