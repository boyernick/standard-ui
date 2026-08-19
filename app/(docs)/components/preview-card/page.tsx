import type { Metadata } from "next"
import { CodeBlock } from "@/components/code-block"
import { DocCell, DocTable, Token } from "@/components/doc-table"
import { PageHeader } from "@/components/page-header"
import { PreviewCardExamples } from "./preview-card-examples"

export const metadata: Metadata = {
  title: "Preview card",
}

export default function PreviewCardPage() {
  return (
    <div className="w-full">
      <PageHeader
        title="Preview card"
        description="Hover or focus card for links and mentions. Use for lightweight previews — prefer Dialog for dense or interactive content."
      />

      <section className="mt-2">
        <h2 className="heading-sm text-fg-primary">Examples</h2>
        <PreviewCardExamples />
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">Overview</h2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Preview card opens from a trigger on hover/focus. Compose portal,
          positioner, and popup. Style the trigger with{" "}
          <Token>render</Token> for links or buttons.
        </p>
        <CodeBlock
          className="mt-4"
          code={`import {
  PreviewCard,
  PreviewCardTrigger,
  PreviewCardPortal,
  PreviewCardPositioner,
  PreviewCardPopup,
  PreviewCardArrow,
} from "@boyernick/standard-ui-react"

<PreviewCard>
  <PreviewCardTrigger render={<a href="…" />}>
    @base-ui
  </PreviewCardTrigger>
  <PreviewCardPortal>
    <PreviewCardPositioner>
      <PreviewCardPopup>
        <PreviewCardArrow />
        …
      </PreviewCardPopup>
    </PreviewCardPositioner>
  </PreviewCardPortal>
</PreviewCard>`}
        />
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">Usage</h2>

        <h3 className="heading-xs mt-8 text-fg-primary">Trigger</h3>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Pass an anchor or button through <Token>render</Token> so semantics
          stay correct.
        </p>
        <CodeBlock
          className="mt-4"
          size="sm"
          code={`<PreviewCardTrigger
  render={<a href="https://base-ui.com" className="…" />}
>
  @base-ui
</PreviewCardTrigger>`}
        />

        <h3 className="heading-xs mt-10 text-fg-primary">Anatomy</h3>
        <CodeBlock
          className="mt-4"
          size="sm"
          code={`PreviewCard
  PreviewCardTrigger
  PreviewCardPortal
    PreviewCardPositioner
      PreviewCardPopup
        PreviewCardArrow`}
        />
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">API</h2>
        <DocTable headers={["Part", "Role"]}>
          <tr>
            <DocCell mono>PreviewCard</DocCell>
            <DocCell>Root open state and delays.</DocCell>
          </tr>
          <tr>
            <DocCell mono>PreviewCardTrigger</DocCell>
            <DocCell>Hover/focus target. Use render for anchors.</DocCell>
          </tr>
          <tr>
            <DocCell mono>PreviewCardPopup</DocCell>
            <DocCell>Preview surface with optional arrow.</DocCell>
          </tr>
          <tr>
            <DocCell mono>createPreviewCardHandle</DocCell>
            <DocCell>Detached triggers linked by a shared handle.</DocCell>
          </tr>
        </DocTable>
      </section>

      <section className="mt-14 mb-8">
        <h2 className="heading-sm text-fg-primary">Guidelines</h2>

        <h3 className="heading-xs mt-8 text-fg-primary">Do</h3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>Keep preview content skim-able in a glance</li>
          <li>Use for mentions, links, and lightweight metadata</li>
          <li>Include an arrow when placement might be ambiguous</li>
        </ul>

        <h3 className="heading-xs mt-8 text-fg-primary">Don&apos;t</h3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>Don&apos;t put forms or primary actions only in a preview</li>
          <li>Don&apos;t confuse with Tooltip — tooltips are shorter labels</li>
          <li>Don&apos;t nest interactive menus inside the card</li>
        </ul>
      </section>
    </div>
  )
}
