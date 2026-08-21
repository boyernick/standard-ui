import type { Metadata } from "next"
import { DocPage } from "@/components/doc-page"
import { DrawerExamples } from "./drawer-examples"

export const metadata: Metadata = {
  title: "Drawer",
}

export default function DrawerPage() {
  return (
    <DocPage
      title="Drawer"
      description="Edge panel with swipe dismissal."
      heading={null}
      bleed
    >
      <DrawerExamples />
    </DocPage>
  )
}
