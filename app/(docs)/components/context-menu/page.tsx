import type { Metadata } from "next"
import { DocPage } from "@/components/doc-page"
import { ContextMenuExamples } from "./context-menu-examples"

export const metadata: Metadata = {
  title: "Context menu",
}

export default function ContextMenuPage() {
  return (
    <DocPage
      title="Context menu"
      description="Right-click menu for in-place actions on a region or object."
    >
      <ContextMenuExamples />
    </DocPage>
  )
}
