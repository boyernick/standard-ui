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
      description="Structured navigation panel with adaptable surfaces and active states."
      heading={null}
      bleed
    >
      <SidebarExamples />
    </DocPage>
  )
}
