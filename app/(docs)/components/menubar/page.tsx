import type { Metadata } from "next"
import { DocPage } from "@/components/doc-page"
import { MenubarExamples } from "./menubar-examples"

export const metadata: Metadata = {
  title: "Menubar",
}

export default function MenubarPage() {
  return (
    <DocPage
      title="Menubar"
      description="Persistent application menu bar."
    >
      <MenubarExamples />
    </DocPage>
  )
}
