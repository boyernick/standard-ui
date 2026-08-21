import type { Metadata } from "next"
import { DocPage } from "@/components/doc-page"
import { TabsExamples } from "./tabs-examples"

export const metadata: Metadata = {
  title: "Tabs",
}

export default function TabsPage() {
  return (
    <DocPage
      title="Tabs"
      description="Switch between related views in the same context."
      heading={null}
      bleed
    >
      <TabsExamples />
    </DocPage>
  )
}
