import type { Metadata } from "next"
import { CodeBlock } from "@/components/code-block"
import { DocCell, DocTable, Token } from "@/components/doc-table"
import { PageHeader } from "@/components/page-header"
import { NumberFieldExamples } from "./number-field-examples"
import { H2, H3 } from "@/components/prose"

export const metadata: Metadata = {
  title: "Number field",
}

export default function NumberFieldPage() {
  return (
    <div className="w-full">
      <PageHeader
        title="Number field"
        description="Numeric input with increment and decrement steppers. Use for quantities, counts, and bounded values."
      />

      <section className="mt-2">
        <H2>Examples</H2>
        <NumberFieldExamples />
      </section>

      <section className="mt-14">
        <H2>Overview</H2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Number field wraps a numeric input with stepper buttons. Set{" "}
          <Token>min</Token>, <Token>max</Token>, and <Token>step</Token> on the
          root. Label the input or wrap the field with a visible label.
        </p>
        <CodeBlock
          className="mt-4"
          code={`import {
  NumberField,
  NumberFieldGroup,
  NumberFieldDecrement,
  NumberFieldInput,
  NumberFieldIncrement,
} from "@boyernick/standard-ui-react"

<NumberField defaultValue={1} min={0} max={99}>
  <NumberFieldGroup>
    <NumberFieldDecrement />
    <NumberFieldInput aria-label="Quantity" />
    <NumberFieldIncrement />
  </NumberFieldGroup>
</NumberField>`}
        />
      </section>

      <section className="mt-14">
        <H2>Usage</H2>

        <H3>Bounds</H3>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Prefer explicit min and max for form quantities so steppers stop at
          sensible limits.
        </p>
        <CodeBlock
          className="mt-4"
          size="sm"
          code={`<NumberField defaultValue={1} min={0} max={99} step={1}>
  {/* group + steppers */}
</NumberField>`}
        />

        <H3 className="mt-10">Anatomy</H3>
        <CodeBlock
          className="mt-4"
          size="sm"
          code={`NumberField
  NumberFieldGroup
    NumberFieldDecrement
    NumberFieldInput
    NumberFieldIncrement`}
        />
      </section>

      <section className="mt-14">
        <H2>API</H2>
        <DocTable headers={["Prop / part", "Type", "Default", "Description"]}>
          <tr>
            <DocCell mono>defaultValue</DocCell>
            <DocCell mono>number</DocCell>
            <DocCell mono>—</DocCell>
            <DocCell>Uncontrolled initial value.</DocCell>
          </tr>
          <tr>
            <DocCell mono>value</DocCell>
            <DocCell mono>number | null</DocCell>
            <DocCell mono>—</DocCell>
            <DocCell>Controlled value.</DocCell>
          </tr>
          <tr>
            <DocCell mono>min</DocCell>
            <DocCell mono>number</DocCell>
            <DocCell mono>—</DocCell>
            <DocCell>Lower bound for stepping and clamping.</DocCell>
          </tr>
          <tr>
            <DocCell mono>max</DocCell>
            <DocCell mono>number</DocCell>
            <DocCell mono>—</DocCell>
            <DocCell>Upper bound for stepping and clamping.</DocCell>
          </tr>
          <tr>
            <DocCell mono>step</DocCell>
            <DocCell mono>number</DocCell>
            <DocCell mono>1</DocCell>
            <DocCell>Amount changed by steppers and arrow keys.</DocCell>
          </tr>
          <tr>
            <DocCell mono>NumberFieldScrubArea</DocCell>
            <DocCell mono>—</DocCell>
            <DocCell mono>—</DocCell>
            <DocCell>Optional drag-to-scrub control.</DocCell>
          </tr>
        </DocTable>
      </section>

      <section className="mt-14 mb-8">
        <H2>Guidelines</H2>

        <H3>Do</H3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>Set min and max for quantities that must stay in range</li>
          <li>Give the input an accessible name</li>
          <li>Use Slider when the value is approximate or visual</li>
        </ul>

        <H3>Don&apos;t</H3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>Don&apos;t use number field for free-form text</li>
          <li>Don&apos;t hide steppers if users need precise increments</li>
          <li>Don&apos;t leave the input unlabeled</li>
        </ul>
      </section>
    </div>
  )
}
