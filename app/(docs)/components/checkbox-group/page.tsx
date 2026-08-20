import type { Metadata } from "next"
import { CodeBlock } from "@/components/code-block"
import { DocCell, DocTable, Token } from "@/components/doc-table"
import { PageHeader } from "@/components/page-header"
import { CheckboxGroupExamples } from "./checkbox-group-examples"
import { H2, H3 } from "@/components/prose"
import { PropsTable, StylingPropsNote, type GeneratedFamily } from "@/components/api-table"
import checkboxgroupApi from "@/lib/generated/api/checkbox-group.json"

export const metadata: Metadata = {
  title: "Checkbox group",
}

export default function CheckboxGroupPage() {
  return (
    <div className="w-full">
      <PageHeader
        title="Checkbox group"
        description="Shared state for a set of checkboxes — multi-select lists, permissions, and select-all parents."
      />

      <section className="mt-2">
        <H2>Examples</H2>
        <CheckboxGroupExamples />
      </section>

      <section className="mt-14">
        <H2>Overview</H2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Checkbox group holds a <Token>string[]</Token> value. Child checkboxes
          use <Token>value</Token> matching that array. Pass{" "}
          <Token>allValues</Token> and <Token>parent</Token> on a checkbox for
          select-all with an indeterminate state.
        </p>
        <CodeBlock
          className="mt-4"
          code={`import { Checkbox, CheckboxGroup } from "@boyernick/standard-ui-react"

<CheckboxGroup defaultValue={["https"]}>
  <label>
    <Checkbox value="http" />
    HTTP
  </label>
  <label>
    <Checkbox value="https" />
    HTTPS
  </label>
</CheckboxGroup>`}
        />
      </section>

      <section className="mt-14">
        <H2>API</H2>
        <DocTable headers={["Part", "Role"]}>
          <tr>
            <DocCell mono>CheckboxGroup</DocCell>
            <DocCell>Root value state for child checkboxes.</DocCell>
          </tr>
          <tr>
            <DocCell mono>Checkbox</DocCell>
            <DocCell>
              Use <Token>value</Token> for items; <Token>parent</Token> for
              select-all.
            </DocCell>
          </tr>
        </DocTable>
      </section>

      <section className="mt-14 mb-8">
        <H3>CheckboxGroup props</H3>
        <PropsTable family={checkboxgroupApi as GeneratedFamily} part="CheckboxGroup" />
        <StylingPropsNote />

        <H2>Guidelines</H2>
        <H3>Do</H3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>Label the group with a legend, heading, or aria-labelledby</li>
          <li>Use parent + allValues when select-all is expected</li>
        </ul>
        <H3>Don&apos;t</H3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>Don&apos;t use a group for a single independent checkbox</li>
          <li>Don&apos;t omit value on children inside a controlled group</li>
        </ul>
      </section>
    </div>
  )
}
