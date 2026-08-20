import type { Metadata } from "next"
import { CodeBlock } from "@/components/code-block"
import { DocCell, DocTable, Token } from "@/components/doc-table"
import { PageHeader } from "@/components/page-header"
import { FormExamples } from "./form-examples"
import { H2, H3 } from "@/components/prose"

export const metadata: Metadata = {
  title: "Form",
}

export default function FormPage() {
  return (
    <div className="w-full">
      <PageHeader
        title="Form"
        description="Native form with consolidated Field validation and optional server error maps."
      />

      <section className="mt-2">
        <H2>Examples</H2>
        <FormExamples />
      </section>

      <section className="mt-14">
        <H2>Overview</H2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Form wraps fields and calls <Token>onFormSubmit</Token> with values
          after validation. Pass <Token>errors</Token> for server-side messages
          keyed by Field <Token>name</Token>.
        </p>
        <CodeBlock
          className="mt-4"
          code={`import { Form, Field, FieldLabel, FieldControl, Button } from "@boyernick/standard-ui-react"

<Form onFormSubmit={(values) => { /* … */ }}>
  <Field name="email">
    <FieldLabel>Email</FieldLabel>
    <FieldControl type="email" required />
  </Field>
  <Button type="submit">Submit</Button>
</Form>`}
        />
      </section>

      <section className="mt-14">
        <H2>API</H2>
        <DocTable headers={["Prop", "Role"]}>
          <tr>
            <DocCell mono>validationMode</DocCell>
            <DocCell>
              <Token>onSubmit</Token>, <Token>onBlur</Token>, or{" "}
              <Token>onChange</Token>.
            </DocCell>
          </tr>
          <tr>
            <DocCell mono>errors</DocCell>
            <DocCell>External/server errors keyed by field name.</DocCell>
          </tr>
          <tr>
            <DocCell mono>onFormSubmit</DocCell>
            <DocCell>Called with values after client validation passes.</DocCell>
          </tr>
        </DocTable>
      </section>

      <section className="mt-14 mb-8">
        <H2>Guidelines</H2>
        <H3>Do</H3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>Give every Field a stable name</li>
          <li>Map server errors into the errors prop</li>
        </ul>
        <H3>Don&apos;t</H3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>Don&apos;t nest forms</li>
          <li>Don&apos;t rely only on visual cues — keep FieldError text</li>
        </ul>
      </section>
    </div>
  )
}
