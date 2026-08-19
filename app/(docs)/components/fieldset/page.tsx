import type { Metadata } from "next"
import { CodeBlock } from "@/components/code-block"
import { DocCell, DocTable, Token } from "@/components/doc-table"
import { PageHeader } from "@/components/page-header"
import { FieldsetExamples } from "./fieldset-examples"

export const metadata: Metadata = {
  title: "Fieldset",
}

export default function FieldsetPage() {
  return (
    <div className="w-full">
      <PageHeader
        title="Fieldset"
        description="Semantic grouping for related fields with a legend — settings sections and checkbox clusters."
      />

      <section className="mt-2">
        <h2 className="heading-sm text-fg-primary">Examples</h2>
        <FieldsetExamples />
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">Overview</h2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Fieldset maps to a native <Token>fieldset</Token> with{" "}
          <Token>FieldsetLegend</Token>. Compose with Field, Checkbox group, or
          Radio group inside.
        </p>
        <CodeBlock
          className="mt-4"
          code={`import { Fieldset, FieldsetLegend } from "@standard-ui/react"

<Fieldset>
  <FieldsetLegend>Shipping</FieldsetLegend>
  {/* fields */}
</Fieldset>`}
        />
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">API</h2>
        <DocTable headers={["Part", "Role"]}>
          <tr>
            <DocCell mono>Fieldset</DocCell>
            <DocCell>Groups related controls.</DocCell>
          </tr>
          <tr>
            <DocCell mono>FieldsetLegend</DocCell>
            <DocCell>Visible title for the group.</DocCell>
          </tr>
        </DocTable>
      </section>

      <section className="mt-14 mb-8">
        <h2 className="heading-sm text-fg-primary">Guidelines</h2>
        <h3 className="heading-xs mt-8 text-fg-primary">Do</h3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>Use a clear legend that names the section</li>
          <li>Keep one concern per fieldset</li>
        </ul>
        <h3 className="heading-xs mt-8 text-fg-primary">Don&apos;t</h3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>Don&apos;t nest fieldsets deeply without need</li>
          <li>Don&apos;t use a fieldset for a single unlabeled control</li>
        </ul>
      </section>
    </div>
  )
}
