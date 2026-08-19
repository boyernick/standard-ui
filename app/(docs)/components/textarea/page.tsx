import type { Metadata } from "next"
import { Textarea } from "@boyernick/standard-ui-react"
import { CodeBlock } from "@/components/code-block"
import { ComponentCanvas } from "@/components/component-canvas"
import { DocCell, DocTable, Token } from "@/components/doc-table"
import { PageHeader } from "@/components/page-header"

export const metadata: Metadata = {
  title: "Textarea",
}

export default function TextareaPage() {
  return (
    <div className="w-full">
      <PageHeader
        title="Textarea"
        description="Multi-line text fields for notes, comments, and longer form input. Mark invalid when validation fails."
      />

      <section className="mt-2">
        <h2 className="heading-sm text-fg-primary">Examples</h2>

        <div className="mt-6 flex flex-col gap-8">
          <ComponentCanvas
            label="Default"
            contentClassName="w-full max-w-md flex-col items-stretch"
            code={`<Textarea
  placeholder="Write a short note…"
  aria-label="Note"
/>
<Textarea
  defaultValue="Ship the docs pages for collapsible and toggle."
  aria-label="Filled note"
/>`}
          >
            <Textarea
              placeholder="Write a short note…"
              aria-label="Note"
            />
            <Textarea
              defaultValue="Ship the docs pages for collapsible and toggle."
              aria-label="Filled note"
            />
          </ComponentCanvas>

          <ComponentCanvas
            label="Ghost"
            contentClassName="w-full max-w-md flex-col items-stretch"
            code={`<Textarea
  variant="ghost"
  placeholder="Add a description…"
  aria-label="Description"
/>`}
          >
            <Textarea
              variant="ghost"
              placeholder="Add a description…"
              aria-label="Description"
            />
          </ComponentCanvas>

          <ComponentCanvas
            label="Invalid"
            contentClassName="w-full max-w-md flex-col items-stretch"
            code={`<Textarea
  invalid
  defaultValue="Too short"
  aria-label="Invalid note"
/>`}
          >
            <Textarea
              invalid
              defaultValue="Too short"
              aria-label="Invalid note"
            />
          </ComponentCanvas>

          <ComponentCanvas
            label="Disabled"
            contentClassName="w-full max-w-md flex-col items-stretch"
            code={`<Textarea
  disabled
  placeholder="Unavailable"
  aria-label="Disabled"
/>
<Textarea
  disabled
  defaultValue="Read only value"
  aria-label="Disabled filled"
/>`}
          >
            <Textarea
              disabled
              placeholder="Unavailable"
              aria-label="Disabled"
            />
            <Textarea
              disabled
              defaultValue="Read only value"
              aria-label="Disabled filled"
            />
          </ComponentCanvas>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">Overview</h2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Textarea is a multi-line text control. The default variant uses
          surface, border, and focus-ring tokens. Ghost drops the border and
          fill for quiet fields. Both support an <Token>invalid</Token> state
          and native resize.
        </p>
        <CodeBlock
          className="mt-4"
          code={`import { Textarea } from "@boyernick/standard-ui-react"

<Textarea
  placeholder="Write a short note…"
  aria-label="Note"
/>`}
        />
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">Usage</h2>

        <h3 className="heading-xs mt-8 text-fg-primary">Variants</h3>
        <DocTable headers={["Variant", "Use it for"]}>
          {[
            [
              "default",
              "Standard form fields — bordered surface with inset edge.",
            ],
            [
              "ghost",
              "Quiet multi-line fields in dense chrome where a border adds noise.",
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
          code={`<Textarea placeholder="Note" aria-label="Note" />
<Textarea
  variant="ghost"
  placeholder="Description…"
  aria-label="Description"
/>`}
        />

        <h3 className="heading-xs mt-10 text-fg-primary">Invalid</h3>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Set <Token>invalid</Token> when the value fails validation. Pair with
          helper or error text so users know how to fix it.{" "}
          <Token>aria-invalid</Token> is set automatically.
        </p>
        <CodeBlock
          className="mt-4"
          size="sm"
          code={`<Textarea invalid defaultValue="Too short" aria-label="Note" />`}
        />

        <h3 className="heading-xs mt-10 text-fg-primary">Disabled</h3>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Disabled textareas use reduced opacity and{" "}
          <Token>cursor-not-allowed</Token>. Prefer explaining why a field is
          unavailable instead of a silent disable.
        </p>
        <CodeBlock
          className="mt-4"
          size="sm"
          code={`<Textarea disabled placeholder="Unavailable" aria-label="Unavailable" />`}
        />
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">API</h2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Textarea accepts standard HTML textarea attributes plus visual
          variants.
        </p>
        <DocTable headers={["Prop", "Type", "Default", "Description"]}>
          <tr>
            <DocCell mono>variant</DocCell>
            <DocCell mono>
              &quot;default&quot; | &quot;ghost&quot;
            </DocCell>
            <DocCell mono>&quot;default&quot;</DocCell>
            <DocCell>Visual style of the field.</DocCell>
          </tr>
          <tr>
            <DocCell mono>invalid</DocCell>
            <DocCell mono>boolean</DocCell>
            <DocCell mono>false</DocCell>
            <DocCell>Shows the invalid border.</DocCell>
          </tr>
          <tr>
            <DocCell mono>disabled</DocCell>
            <DocCell mono>boolean</DocCell>
            <DocCell mono>false</DocCell>
            <DocCell>Disables the textarea.</DocCell>
          </tr>
          <tr>
            <DocCell mono>placeholder</DocCell>
            <DocCell mono>string</DocCell>
            <DocCell mono>—</DocCell>
            <DocCell>Hint text when the field is empty.</DocCell>
          </tr>
        </DocTable>
      </section>

      <section className="mt-14 mb-8">
        <h2 className="heading-sm text-fg-primary">Guidelines</h2>

        <h3 className="heading-xs mt-8 text-fg-primary">Do</h3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>
            Always provide an accessible name via <Token>aria-label</Token>,{" "}
            <Token>aria-labelledby</Token>, or a wrapping{" "}
            <Token>label</Token>
          </li>
          <li>
            Use <Token>invalid</Token> with visible error text, not color alone
          </li>
          <li>Keep placeholders as hints — not as replacements for labels</li>
          <li>
            Prefer textarea over input when users need more than one line
          </li>
        </ul>

        <h3 className="heading-xs mt-8 text-fg-primary">Don&rsquo;t</h3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>
            Don&apos;t rely on placeholder text as the only field label
          </li>
          <li>
            Don&apos;t disable textareas without explaining why
          </li>
          <li>
            Don&apos;t use <Token>invalid</Token> for non-error emphasis
          </li>
        </ul>
      </section>
    </div>
  )
}
