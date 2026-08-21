import type { Metadata } from "next"
import { DocPage } from "@/components/doc-page"
import { IconsDemo } from "./icons-demo"

export const metadata: Metadata = {
  title: "Icons",
}

export default function IconsPage() {
  return (
    <DocPage
      title="Icons"
      description="Rounded outlined icon set, 20px by default."
      heading={null}
      bleed
    >
      <IconsDemo />
    </DocPage>
  )
}
