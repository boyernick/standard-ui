"use client"

import {
  BrandMark,
  Lifeline,
  LifelineLegend,
} from "@boyernick/standard-ui-react"
import { DocBand } from "@/components/doc-band"
import { DemoCompanyIcons } from "./lifeline-company-icons"
import { standardUiLifeline } from "./lifeline-standard-ui"

export const LifelineExamples = () => (
  <div>
    <DemoCompanyIcons />
    <DocBand
      first
      id="default"
      title="Default"
      description="Milestones on a single rail, scrubbed by scroll, with people along the years."
      contentClassName="w-full"
    >
      <div className="flex h-[760px] flex-col overflow-hidden rounded-xl border border-border-primary bg-background-primary">
        <div
          data-site-nav-inner
          className="mx-auto flex h-16 w-full max-w-5xl shrink-0 items-center px-6"
        >
          <span
            data-site-nav-logo
            className="text-fg-primary"
            aria-hidden="true"
          >
            <BrandMark size={24} title="" />
          </span>
        </div>
        <div className="min-h-0 flex-1">
          <Lifeline
            mode="embed"
            markers={standardUiLifeline.markers}
            birthYear={standardUiLifeline.birthYear}
            title={standardUiLifeline.name}
            className="h-full"
          />
        </div>
        <div className="mx-auto flex h-16 w-full max-w-5xl shrink-0 items-center border-t border-border-primary px-6">
          <LifelineLegend items={standardUiLifeline.legend} />
        </div>
      </div>
    </DocBand>
  </div>
)
