import type { Metadata } from "next"
import { BrandWordmark } from "@boyernick/standard-ui-react"
import { ComponentCanvas } from "@/components/component-canvas"
import { DocPage } from "@/components/doc-page"

export const metadata: Metadata = {
  title: "Brand",
}

export default function BrandPage() {
  return (
    <DocPage
      title="Brand"
      description="Solid disk + StandardUI, black on light and white on dark."
      heading={null}
    >
      <div className="grid gap-8 md:grid-cols-2">
        <ComponentCanvas
          label="On light"
          minHeightClass="min-h-48"
          contentClassName="bg-white text-[#0d0d0d]"
        >
          <BrandWordmark markSize={40} className="text-inherit" />
        </ComponentCanvas>

        <ComponentCanvas
          label="On dark"
          minHeightClass="min-h-48"
          contentClassName="bg-black text-white"
        >
          <BrandWordmark markSize={40} className="text-inherit" />
        </ComponentCanvas>
      </div>
    </DocPage>
  )
}
