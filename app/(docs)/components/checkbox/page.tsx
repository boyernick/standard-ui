import type { Metadata } from "next"
import { CodeBlock } from "@/components/code-block"
import { DocCell, DocTable, Token } from "@/components/doc-table"
import { PageHeader } from "@/components/page-header"
import { CheckboxExamples } from "./checkbox-examples"
import { H2, H3 } from "@/components/prose"

export const metadata: Metadata = {
  title: "Checkbox",
}

export default function CheckboxPage() {
  return (
    <div className="w-full">
      <PageHeader
        title="Checkbox"
        description="Boolean selection for forms and filters. Use for options that submit with a form, or multi-select lists."
      />

      <section className="mt-2">
        <H2>Examples</H2>
        <CheckboxExamples />
      </section>

      <section className="mt-14">
        <H2>Overview</H2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Checkbox selects a single boolean option. Checked state uses brand
          fill and a checkmark. Built on Base UI for accessible keyboard and
          pointer behavior.
        </p>
        <CodeBlock
          className="mt-4"
          code={`import { Checkbox } from "@boyernick/standard-ui-react"

<label className="flex items-center gap-2">
  <Checkbox defaultChecked />
  Subscribe to updates
</label>`}
        />
      </section>

      <section className="mt-14">
        <H2>Usage</H2>

        <H3>Labeling</H3>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Prefer wrapping the checkbox in a <Token>label</Token> so the control
          has an accessible name and a larger click target.
        </p>
        <CodeBlock
          className="mt-4"
          size="sm"
          code={`<label className="flex items-center gap-2">
  <Checkbox />
  Remember this device
</label>`}
        />

        <H3 className="mt-10">Disabled</H3>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Disabled checkboxes use reduced opacity and{" "}
          <Token>cursor-not-allowed</Token>. Prefer explaining why an option is
          unavailable.
        </p>
        <CodeBlock
          className="mt-4"
          size="sm"
          code={`<Checkbox disabled />`}
        />
      </section>

      <section className="mt-14">
        <H2>API</H2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Checkbox accepts Base UI Checkbox root props, including controlled and
          uncontrolled checked state.
        </p>
        <DocTable headers={["Prop", "Type", "Default", "Description"]}>
          <tr>
            <DocCell mono>defaultChecked</DocCell>
            <DocCell mono>boolean</DocCell>
            <DocCell mono>—</DocCell>
            <DocCell>Uncontrolled initial checked state.</DocCell>
          </tr>
          <tr>
            <DocCell mono>checked</DocCell>
            <DocCell mono>boolean</DocCell>
            <DocCell mono>—</DocCell>
            <DocCell>Controlled checked state.</DocCell>
          </tr>
          <tr>
            <DocCell mono>onCheckedChange</DocCell>
            <DocCell mono>
              (checked: boolean, event) =&gt; void
            </DocCell>
            <DocCell mono>—</DocCell>
            <DocCell>Called when the checked state changes.</DocCell>
          </tr>
          <tr>
            <DocCell mono>disabled</DocCell>
            <DocCell mono>boolean</DocCell>
            <DocCell mono>false</DocCell>
            <DocCell>Disables the checkbox.</DocCell>
          </tr>
          <tr>
            <DocCell mono>indeterminate</DocCell>
            <DocCell mono>boolean</DocCell>
            <DocCell mono>false</DocCell>
            <DocCell>Shows an indeterminate state when supported.</DocCell>
          </tr>
        </DocTable>
      </section>

      <section className="mt-14 mb-8">
        <H2>Guidelines</H2>

        <H3>Do</H3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>
            Use checkboxes for multi-select lists and form options that submit
            later
          </li>
          <li>
            Wrap with a <Token>label</Token> for a clear name and hit target
          </li>
          <li>
            Prefer a switch for immediate on/off settings
          </li>
        </ul>

        <H3>Don&rsquo;t</H3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>
            Don&apos;t use a single checkbox where a switch communicates
            “setting on/off” better
          </li>
          <li>
            Don&apos;t leave checkboxes unlabeled
          </li>
          <li>
            Don&apos;t disable without explaining why the option is unavailable
          </li>
        </ul>
      </section>
    </div>
  )
}
