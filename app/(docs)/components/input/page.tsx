import type { Metadata } from "next"
import { Input } from "@standard-ui/react"
import { ComponentDemo, ComponentMeta } from "@/components/component-demo"
import { PageHeader } from "@/components/page-header"

export const metadata: Metadata = {
  title: "Input",
}

export default function InputPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader
        title="Input"
        description="Single-line text fields. Styled with semantic borders and focus ring."
      />

      <section className="space-y-3">
        <h2 className="heading-sm text-fg-primary">Default</h2>
        <ComponentDemo className="max-w-md flex-col items-stretch">
          <Input placeholder="Email address" aria-label="Email address" />
          <Input defaultValue="standard@ui.dev" aria-label="Filled" />
        </ComponentDemo>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="heading-sm text-fg-primary">Sizes</h2>
        <ComponentDemo className="max-w-md flex-col items-stretch">
          <Input size="sm" placeholder="Small" aria-label="Small" />
          <Input size="md" placeholder="Medium" aria-label="Medium" />
          <Input size="lg" placeholder="Large" aria-label="Large" />
        </ComponentDemo>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="heading-sm text-fg-primary">Invalid</h2>
        <ComponentDemo className="max-w-md flex-col items-stretch">
          <Input invalid defaultValue="not-an-email" aria-label="Invalid" />
        </ComponentDemo>
        <ComponentMeta importLine={`import { Input } from "@standard-ui/react"`} />
      </section>
    </div>
  )
}
