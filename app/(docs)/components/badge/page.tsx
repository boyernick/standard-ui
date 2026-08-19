import type { Metadata } from "next"
import { Badge } from "@boyernick/standard-ui-react"
import { CodeBlock } from "@/components/code-block"
import { ComponentCanvas } from "@/components/component-canvas"
import { DocCell, DocTable, Token } from "@/components/doc-table"
import { PageHeader } from "@/components/page-header"

export const metadata: Metadata = {
  title: "Badge",
}

export default function BadgePage() {
  return (
    <div className="w-full">
      <PageHeader
        title="Badge"
        description="Compact labels for status, category, and metadata. Keep copy short — a word or two."
      />

      <section className="mt-2">
        <h2 className="heading-sm text-fg-primary">Examples</h2>

        <div className="mt-6 flex flex-col gap-8">
          <ComponentCanvas
            label="Variants"
            code={`<Badge>Default</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="destructive">Destructive</Badge>`}
          >
            <Badge>Default</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
          </ComponentCanvas>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">Overview</h2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Badge is a non-interactive label for status and category. Variants
          encode meaning — default for neutral metadata, outline for quiet tags,
          and destructive for risk or errors.
        </p>
        <CodeBlock
          className="mt-4"
          code={`import { Badge } from "@boyernick/standard-ui-react"

<Badge>New</Badge>`}
        />
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">Usage</h2>

        <h3 className="heading-xs mt-8 text-fg-primary">Variants</h3>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Pick the variant by meaning, not decoration. Prefer{" "}
          <Token>default</Token> or <Token>outline</Token> when unsure.
        </p>
        <DocTable headers={["Variant", "Use it for"]}>
          {[
            [
              "default",
              "Neutral metadata — counts, categories, quiet status.",
            ],
            [
              "outline",
              "Low-emphasis tags on busy surfaces where a fill adds noise.",
            ],
            [
              "destructive",
              "Risk, error, or negative status — failed, blocked, overdue.",
            ],
          ].map(([variant, usage]) => (
            <tr key={variant}>
              <DocCell mono>{variant}</DocCell>
              <DocCell>{usage}</DocCell>
            </tr>
          ))}
        </DocTable>
        <CodeBlock
          className="mt-4"
          size="sm"
          code={`<Badge>Draft</Badge>
<Badge variant="outline">v2</Badge>
<Badge variant="destructive">Failed</Badge>`}
        />
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">API</h2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Badge renders a <Token>span</Token> and accepts standard HTML span
          attributes.
        </p>
        <DocTable headers={["Prop", "Type", "Default", "Description"]}>
          <tr>
            <DocCell mono>variant</DocCell>
            <DocCell mono>
              &quot;default&quot; | &quot;outline&quot; | &quot;destructive&quot;
            </DocCell>
            <DocCell mono>&quot;default&quot;</DocCell>
            <DocCell>Visual style of the badge.</DocCell>
          </tr>
        </DocTable>
      </section>

      <section className="mt-14 mb-8">
        <h2 className="heading-sm text-fg-primary">Guidelines</h2>

        <h3 className="heading-xs mt-8 text-fg-primary">Do</h3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>Keep labels short — one or two words</li>
          <li>
            Use <Token>destructive</Token> only for negative or risky status
          </li>
          <li>Place badges next to the entity they describe</li>
        </ul>

        <h3 className="heading-xs mt-8 text-fg-primary">Don&rsquo;t</h3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>
            Don&apos;t use badges as buttons — they are not interactive
          </li>
          <li>
            Don&apos;t stack many badges in one row — it creates visual noise
          </li>
          <li>
            Don&apos;t use <Token>destructive</Token> for decoration
          </li>
        </ul>
      </section>
    </div>
  )
}
