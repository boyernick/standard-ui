import type { Metadata } from "next"
import { ColorTokens } from "@/components/color-tokens"
import { DocPage } from "@/components/doc-page"

export const metadata: Metadata = {
  title: "Colors",
}

export default function ColorsPage() {
  return (
    <DocPage
      title="Colors"
      description="Semantic tokens grouped by what they are for."
      heading={null}
      bleed
    >
      <ColorTokens />
    </DocPage>
  )
}
