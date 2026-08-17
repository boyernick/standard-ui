import type { Metadata } from "next"
import { Badge } from "@standard-ui/react"
import { ComponentDemo, ComponentMeta } from "@/components/component-demo"
import { PageHeader } from "@/components/page-header"

export const metadata: Metadata = {
  title: "Badge",
}

export default function BadgePage() {
  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader
        title="Badge"
        description="Compact status and category labels."
      />

      <section className="space-y-3">
        <h2 className="type-title-5 text-fg-primary">Variants</h2>
        <ComponentDemo>
          <Badge>Default</Badge>
          <Badge variant="brand">Brand</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
        </ComponentDemo>
        <ComponentMeta importLine={`import { Badge } from "@standard-ui/react"`} />
      </section>
    </div>
  )
}
