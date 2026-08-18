import type { Metadata } from "next"
import { CodeBlock } from "@/components/code-block"
import { DocCell, DocTable, Token } from "@/components/doc-table"
import { PageHeader } from "@/components/page-header"
import { RadioGroupExamples } from "./radio-group-examples"

export const metadata: Metadata = {
  title: "Radio group",
}

export default function RadioGroupPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader
        title="Radio group"
        description="Single choice from a short list of options. Use when only one selection is valid."
      />

      <section className="mt-2">
        <h2 className="heading-sm text-fg-primary">Examples</h2>
        <RadioGroupExamples />
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">Overview</h2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Radio group manages mutually exclusive options. Each option is a{" "}
          <Token>Radio</Token> with a <Token>RadioIndicator</Token> for the
          selected dot. Built on Base UI for keyboard and focus behavior.
        </p>
        <CodeBlock
          className="mt-4"
          code={`import { RadioGroup, Radio, RadioIndicator } from "@standard-ui/react"

<RadioGroup defaultValue="comfortable" aria-label="Density">
  <label className="flex items-center gap-2">
    <Radio value="compact">
      <RadioIndicator />
    </Radio>
    Compact
  </label>
  <label className="flex items-center gap-2">
    <Radio value="comfortable">
      <RadioIndicator />
    </Radio>
    Comfortable
  </label>
</RadioGroup>`}
        />
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">Usage</h2>

        <h3 className="heading-xs mt-8 text-fg-primary">Labeling</h3>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Wrap each radio in a <Token>label</Token> for a larger hit target.
          Name the group with <Token>aria-label</Token> or a visible legend.
        </p>
        <CodeBlock
          className="mt-4"
          size="sm"
          code={`<RadioGroup defaultValue="email" aria-label="Contact method">
  <label className="flex items-center gap-2">
    <Radio value="email">
      <RadioIndicator />
    </Radio>
    Email
  </label>
</RadioGroup>`}
        />

        <h3 className="heading-xs mt-10 text-fg-primary">Values</h3>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Each radio needs a unique <Token>value</Token>. Set{" "}
          <Token>defaultValue</Token> (or controlled <Token>value</Token>) on
          the group to the selected option.
        </p>
        <CodeBlock
          className="mt-4"
          size="sm"
          code={`<RadioGroup defaultValue="comfortable">
  <Radio value="compact"><RadioIndicator /></Radio>
  <Radio value="comfortable"><RadioIndicator /></Radio>
</RadioGroup>`}
        />
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">API</h2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Parts mirror Base UI Radio Group and Radio.
        </p>
        <DocTable headers={["Part", "Role"]}>
          <tr>
            <DocCell mono>RadioGroup</DocCell>
            <DocCell>Root that holds the selected value.</DocCell>
          </tr>
          <tr>
            <DocCell mono>Radio</DocCell>
            <DocCell>Single option. Requires a value.</DocCell>
          </tr>
          <tr>
            <DocCell mono>RadioIndicator</DocCell>
            <DocCell>Selected indicator inside the radio.</DocCell>
          </tr>
        </DocTable>
        <DocTable headers={["Prop", "Type", "Default", "Description"]}>
          <tr>
            <DocCell mono>defaultValue</DocCell>
            <DocCell mono>string | null</DocCell>
            <DocCell mono>—</DocCell>
            <DocCell>Uncontrolled initial selected value.</DocCell>
          </tr>
          <tr>
            <DocCell mono>value</DocCell>
            <DocCell mono>string | null</DocCell>
            <DocCell mono>—</DocCell>
            <DocCell>Controlled selected value.</DocCell>
          </tr>
          <tr>
            <DocCell mono>onValueChange</DocCell>
            <DocCell mono>
              (value: string, event) =&gt; void
            </DocCell>
            <DocCell mono>—</DocCell>
            <DocCell>Called when the selection changes.</DocCell>
          </tr>
          <tr>
            <DocCell mono>disabled</DocCell>
            <DocCell mono>boolean</DocCell>
            <DocCell mono>false</DocCell>
            <DocCell>Disables the entire group.</DocCell>
          </tr>
        </DocTable>
      </section>

      <section className="mt-14 mb-8">
        <h2 className="heading-sm text-fg-primary">Guidelines</h2>

        <h3 className="heading-xs mt-8 text-fg-primary">Do</h3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>Use radios when exactly one option must be chosen</li>
          <li>Keep the option list short — typically under seven items</li>
          <li>
            Prefer a select when the list is long or the space is tight
          </li>
        </ul>

        <h3 className="heading-xs mt-8 text-fg-primary">Don't</h3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>
            Don&apos;t use radios for multi-select — use checkboxes
          </li>
          <li>
            Don&apos;t leave the group without an accessible name
          </li>
          <li>
            Don&apos;t mix unrelated choices in the same group
          </li>
        </ul>
      </section>
    </div>
  )
}
