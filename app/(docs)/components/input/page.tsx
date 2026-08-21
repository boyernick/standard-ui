import type { Metadata } from "next"
import { Input } from "@boyernick/standard-ui-react"
import { ComponentCanvas } from "@/components/component-canvas"
import { DocPage } from "@/components/doc-page"

export const metadata: Metadata = {
  title: "Input",
}

export default function InputPage() {
  return (
    <DocPage
      title="Input"
      description="Single-line text fields for forms and filters."
    >
      <ComponentCanvas
        label="Default"
        contentClassName="w-full max-w-md flex-col items-stretch"
      >
        <Input placeholder="Email address" aria-label="Email address" />
        <Input defaultValue="standard@ui.dev" aria-label="Filled" />
      </ComponentCanvas>

      <ComponentCanvas
        label="Ghost"
        contentClassName="w-full max-w-md flex-col items-stretch"
      >
        <Input
          variant="ghost"
          placeholder="Search…"
          aria-label="Search"
        />
        <Input
          variant="ghost"
          defaultValue="Untitled document"
          aria-label="Title"
        />
      </ComponentCanvas>

      <ComponentCanvas
        label="Sizes"
        contentClassName="w-full max-w-md flex-col items-stretch"
      >
        <Input size="sm" placeholder="Small" aria-label="Small" />
        <Input size="md" placeholder="Medium" aria-label="Medium" />
        <Input size="lg" placeholder="Large" aria-label="Large" />
      </ComponentCanvas>

      <ComponentCanvas
        label="Invalid"
        contentClassName="w-full max-w-md flex-col items-stretch"
      >
        <Input
          invalid
          defaultValue="not-an-email"
          aria-label="Invalid email"
        />
      </ComponentCanvas>

      <ComponentCanvas
        label="Disabled"
        contentClassName="w-full max-w-md flex-col items-stretch"
      >
        <Input disabled placeholder="Disabled" aria-label="Disabled" />
        <Input
          disabled
          defaultValue="Read only value"
          aria-label="Disabled filled"
        />
      </ComponentCanvas>
    </DocPage>
  )
}
