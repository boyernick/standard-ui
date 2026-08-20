import type { Metadata } from "next"
import { Input } from "@boyernick/standard-ui-react"
import { CodeBlock } from "@/components/code-block"
import { ComponentCanvas } from "@/components/component-canvas"
import { DocCell, DocTable, Token } from "@/components/doc-table"
import { PageHeader } from "@/components/page-header"
import { H2, H3 } from "@/components/prose"

export const metadata: Metadata = {
  title: "Input",
}

export default function InputPage() {
  return (
    <div className="w-full">
      <PageHeader
        title="Input"
        description="Single-line text fields for forms and filters. Use sizes to match surrounding controls, and mark invalid fields when validation fails."
      />

      <section className="mt-2">
        <H2>Examples</H2>

        <div className="mt-6 flex flex-col gap-8">
          <ComponentCanvas
            label="Default"
            contentClassName="w-full max-w-md flex-col items-stretch"
            code={`<Input placeholder="Email address" aria-label="Email address" />
<Input defaultValue="standard@ui.dev" aria-label="Filled" />`}
          >
            <Input placeholder="Email address" aria-label="Email address" />
            <Input defaultValue="standard@ui.dev" aria-label="Filled" />
          </ComponentCanvas>

          <ComponentCanvas
            label="Ghost"
            contentClassName="w-full max-w-md flex-col items-stretch"
            code={`<Input
  variant="ghost"
  placeholder="Search…"
  aria-label="Search"
/>
<Input
  variant="ghost"
  defaultValue="Untitled document"
  aria-label="Title"
/>`}
          >
            <Input
              variant="ghost"
              placeholder="Search…"
              aria-label="Search"
            />
            <Input
              variant="ghost"
              defaultValue="Untitled document"
              aria-label="Title"
            />
          </ComponentCanvas>

          <ComponentCanvas
            label="Sizes"
            contentClassName="w-full max-w-md flex-col items-stretch"
            code={`<Input size="sm" placeholder="Small" aria-label="Small" />
<Input size="md" placeholder="Medium" aria-label="Medium" />
<Input size="lg" placeholder="Large" aria-label="Large" />`}
          >
            <Input size="sm" placeholder="Small" aria-label="Small" />
            <Input size="md" placeholder="Medium" aria-label="Medium" />
            <Input size="lg" placeholder="Large" aria-label="Large" />
          </ComponentCanvas>

          <ComponentCanvas
            label="Invalid"
            contentClassName="w-full max-w-md flex-col items-stretch"
            code={`<Input
  invalid
  defaultValue="not-an-email"
  aria-label="Invalid email"
/>`}
          >
            <Input
              invalid
              defaultValue="not-an-email"
              aria-label="Invalid email"
            />
          </ComponentCanvas>

          <ComponentCanvas
            label="Disabled"
            contentClassName="w-full max-w-md flex-col items-stretch"
            code={`<Input disabled placeholder="Disabled" aria-label="Disabled" />
<Input
  disabled
  defaultValue="Read only value"
  aria-label="Disabled filled"
/>`}
          >
            <Input disabled placeholder="Disabled" aria-label="Disabled" />
            <Input
              disabled
              defaultValue="Read only value"
              aria-label="Disabled filled"
            />
          </ComponentCanvas>
        </div>
      </section>

      <section className="mt-14">
        <H2>Overview</H2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Input is a single-line text control. The default variant uses surface,
          border, and focus-ring tokens. Ghost drops the border and fill for
          quiet fields in toolbars and titles. Both support three sizes and an{" "}
          <Token>invalid</Token> state.
        </p>
        <CodeBlock
          className="mt-4"
          code={`import { Input } from "@boyernick/standard-ui-react"

<Input placeholder="Email address" aria-label="Email address" />`}
        />
      </section>

      <section className="mt-14">
        <H2>Usage</H2>

        <H3>Variants</H3>
        <DocTable headers={["Variant", "Use it for"]}>
          {[
            [
              "default",
              "Standard form fields — bordered surface with inset edge.",
            ],
            [
              "ghost",
              "Quiet fields in toolbars, page titles, and dense chrome where a border adds noise.",
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
          code={`<Input placeholder="Email" aria-label="Email" />
<Input variant="ghost" placeholder="Search…" aria-label="Search" />`}
        />

        <H3 className="mt-10">Sizes</H3>
        <DocTable headers={["Size", "Height", "Use case"]}>
          {[
            ["sm", "32px", "Dense forms, toolbars, compact filters"],
            ["md", "36px", "Default — most form fields"],
            ["lg", "40px", "Prominent fields, marketing forms"],
          ].map(([size, height, useCase]) => (
            <tr key={size}>
              <DocCell mono>{size}</DocCell>
              <DocCell mono>{height}</DocCell>
              <DocCell>{useCase}</DocCell>
            </tr>
          ))}
        </DocTable>
        <CodeBlock
          className="mt-4"
          size="sm"
          code={`<Input size="sm" placeholder="Small" />
<Input size="md" placeholder="Medium" />
<Input size="lg" placeholder="Large" />`}
        />

        <H3 className="mt-10">Invalid</H3>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Set <Token>invalid</Token> when the value fails validation. Pair with
          helper or error text so users know how to fix it.{" "}
          <Token>aria-invalid</Token> is set automatically.
        </p>
        <CodeBlock
          className="mt-4"
          size="sm"
          code={`<Input invalid defaultValue="not-an-email" aria-label="Email" />`}
        />

        <H3 className="mt-10">Disabled</H3>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Disabled inputs use reduced opacity and{" "}
          <Token>cursor-not-allowed</Token>. Prefer explaining why a field is
          unavailable instead of a silent disable.
        </p>
        <CodeBlock
          className="mt-4"
          size="sm"
          code={`<Input disabled placeholder="Unavailable" aria-label="Unavailable" />`}
        />
      </section>

      <section className="mt-14">
        <H2>API</H2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Input accepts all standard HTML input attributes except native{" "}
          <Token>size</Token>, which is reserved for the visual size prop.
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
            <DocCell mono>size</DocCell>
            <DocCell mono>
              &quot;sm&quot; | &quot;md&quot; | &quot;lg&quot;
            </DocCell>
            <DocCell mono>&quot;md&quot;</DocCell>
            <DocCell>Height and padding of the field.</DocCell>
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
            <DocCell>Disables the input.</DocCell>
          </tr>
          <tr>
            <DocCell mono>type</DocCell>
            <DocCell mono>string</DocCell>
            <DocCell mono>&quot;text&quot;</DocCell>
            <DocCell>Native input type.</DocCell>
          </tr>
        </DocTable>
      </section>

      <section className="mt-14 mb-8">
        <H2>Guidelines</H2>

        <H3>Do</H3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>
            Always provide an accessible name via <Token>aria-label</Token>,{" "}
            <Token>aria-labelledby</Token>, or a wrapping{" "}
            <Token>label</Token>
          </li>
          <li>
            Use <Token>variant=&quot;ghost&quot;</Token> for search bars and
            inline titles where a full field chrome is too heavy
          </li>
          <li>
            Match input <Token>size</Token> to nearby buttons and controls
          </li>
          <li>
            Use <Token>invalid</Token> with visible error text, not color alone
          </li>
          <li>Keep placeholders as hints — not as replacements for labels</li>
        </ul>

        <H3>Don&rsquo;t</H3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>
            Don&apos;t rely on placeholder text as the only field label
          </li>
          <li>
            Don&apos;t disable inputs without explaining why
          </li>
          <li>
            Don&apos;t use <Token>invalid</Token> for non-error emphasis
          </li>
        </ul>
      </section>
    </div>
  )
}
