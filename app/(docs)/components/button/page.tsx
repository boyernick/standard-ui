import type { Metadata } from "next"
import { Button } from "@standard-ui/react"
import { ComponentDemo, ComponentMeta } from "@/components/component-demo"
import { PageHeader } from "@/components/page-header"

export const metadata: Metadata = {
  title: "Button",
}

export default function ButtonPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader
        title="Button"
        description="Actions for forms and toolbars. Pure Tailwind + tokens — no Base UI dependency."
      />

      <section className="space-y-3">
        <h2 className="type-title-5 text-fg-primary">Variants</h2>
        <ComponentDemo>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
        </ComponentDemo>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="type-title-5 text-fg-primary">Sizes</h2>
        <ComponentDemo>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </ComponentDemo>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="type-title-5 text-fg-primary">Disabled</h2>
        <ComponentDemo>
          <Button disabled>Disabled</Button>
        </ComponentDemo>
        <ComponentMeta importLine={`import { Button } from "@standard-ui/react"`} />
      </section>
    </div>
  )
}
