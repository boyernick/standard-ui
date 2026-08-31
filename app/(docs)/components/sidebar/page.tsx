import type { Metadata } from "next"
import { DocPage } from "@/components/doc-page"
import { SidebarExamples } from "./sidebar-examples"

export const metadata: Metadata = {
  title: "Sidebar",
}

export default function SidebarPage() {
  return (
    <DocPage
      title="Sidebar"
      description="A navigation panel with adaptable surfaces."
      heading={null}
      bleed
    >
      <SidebarExamples />
    </DocPage>
  )
}
