import type { Metadata } from "next"
import { DocPage } from "@/components/doc-page"
import { MenuExamples } from "./menu-examples"

export const metadata: Metadata = {
  title: "Menu",
}

export default function MenuPage() {
  return (
    <DocPage
      title="Menu"
      description="Action list anchored to a trigger."
    >
      <MenuExamples />
    </DocPage>
  )
}
