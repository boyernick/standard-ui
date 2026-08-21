import type { Metadata } from "next"
import { DocPage } from "@/components/doc-page"
import { TypeScaleList } from "@/components/type-scale-list"

export const metadata: Metadata = {
  title: "Typography",
}

export default function TypographyPage() {
  return (
    <DocPage
      title="Typography"
      description="Text styles for headings and body content."
      heading={null}
      bleed
    >
      <TypeScaleList />
    </DocPage>
  )
}
