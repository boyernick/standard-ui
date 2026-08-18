import type { Metadata } from "next"
import { CodeBlock } from "@/components/code-block"
import { DocCell, DocTable, Token } from "@/components/doc-table"
import { PageHeader } from "@/components/page-header"
import { FieldExamples } from "./field-examples"

export const metadata: Metadata = {
  title: "Field",
}

export default function FieldPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader
        title="Field"
        description="Label, control, description, and error for a single form control — wired to Base UI validation."
      />

      <section className="mt-2">
        <h2 className="heading-sm text-fg-primary">Examples</h2>
        <FieldExamples />
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">Overview</h2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Field associates labeling and messages with a control. Use{" "}
          <Token>FieldControl</Token> for a native input, or nest Input,
          Checkbox, Select, and other controls under the same root{" "}
          <Token>name</Token>.
        </p>
        <CodeBlock
          className="mt-4"
          code={`import {
  Field,
  FieldLabel,
  FieldControl,
  FieldDescription,
  FieldError,
} from "@standard-ui/react"

<Field name="email">
  <FieldLabel>Email</FieldLabel>
  <FieldControl type="email" required />
  <FieldDescription>Work email preferred.</FieldDescription>
  <FieldError match="valueMissing">Required.</FieldError>
</Field>`}
        />
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">Usage</h2>
        <h3 className="heading-xs mt-8 text-fg-primary">Anatomy</h3>
        <CodeBlock
          className="mt-4"
          size="sm"
          code={`Field
  FieldLabel
  FieldControl
  FieldDescription
  FieldItem
  FieldError
  FieldValidity`}
        />
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">API</h2>
        <DocTable headers={["Part", "Role"]}>
          <tr>
            <DocCell mono>Field</DocCell>
            <DocCell>Root name, disabled, and validation.</DocCell>
          </tr>
          <tr>
            <DocCell mono>FieldLabel</DocCell>
            <DocCell>Accessible name for the control.</DocCell>
          </tr>
          <tr>
            <DocCell mono>FieldControl</DocCell>
            <DocCell>Styled native input; omit to nest other controls.</DocCell>
          </tr>
          <tr>
            <DocCell mono>FieldDescription</DocCell>
            <DocCell>Helper text below the control.</DocCell>
          </tr>
          <tr>
            <DocCell mono>FieldError</DocCell>
            <DocCell>
              Error message; use <Token>match</Token> for ValidityState keys.
            </DocCell>
          </tr>
          <tr>
            <DocCell mono>FieldItem</DocCell>
            <DocCell>Row wrapper for checkbox/radio options.</DocCell>
          </tr>
        </DocTable>
      </section>

      <section className="mt-14 mb-8">
        <h2 className="heading-sm text-fg-primary">Guidelines</h2>
        <h3 className="heading-xs mt-8 text-fg-primary">Do</h3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>Always provide a FieldLabel (or equivalent aria label)</li>
          <li>Pair Field with Form for submit-time validation</li>
        </ul>
        <h3 className="heading-xs mt-8 text-fg-primary">Don&apos;t</h3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>Don&apos;t duplicate name on both Field and nested Input</li>
          <li>Don&apos;t show errors before the user has interacted</li>
        </ul>
      </section>
    </div>
  )
}
