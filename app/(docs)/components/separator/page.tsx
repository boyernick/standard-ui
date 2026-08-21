import type { Metadata } from "next"
import { Separator } from "@boyernick/standard-ui-react"
import { ComponentCanvas } from "@/components/component-canvas"
import { DocPage } from "@/components/doc-page"

export const metadata: Metadata = {
  title: "Separator",
}

export default function SeparatorPage() {
  return (
    <DocPage
      title="Separator"
      description="Visual divider for sections and inline groups."
    >
      <ComponentCanvas
        label="Horizontal"
        contentClassName="w-full max-w-xs flex-col items-stretch"
      >
        <div className="text-sm flex w-full flex-col gap-3 text-fg-primary">
          <p>Profile</p>
          <Separator />
          <p>Billing</p>
          <Separator />
          <p>Team</p>
        </div>
      </ComponentCanvas>

      <ComponentCanvas
        label="Vertical"
        contentClassName="h-6 items-center"
      >
        <div className="text-sm flex h-6 items-center gap-3 text-fg-primary">
          <a href="#" className="cursor-pointer hover:text-fg-secondary">
            Home
          </a>
          <Separator orientation="vertical" />
          <a href="#" className="cursor-pointer hover:text-fg-secondary">
            Docs
          </a>
          <Separator orientation="vertical" />
          <a href="#" className="cursor-pointer hover:text-fg-secondary">
            Support
          </a>
        </div>
      </ComponentCanvas>
    </DocPage>
  )
}
