import type { Metadata } from "next"
import { CodeBlock } from "@boyernick/standard-ui-react"
import { ComponentCanvas } from "@/components/component-canvas"
import { DocCell, DocTable, Token } from "@/components/doc-table"
import { PageHeader } from "@/components/page-header"
import { H2, H3 } from "@/components/prose"

export const metadata: Metadata = {
  title: "Code block",
}

const exampleCode = `import { Button } from "@boyernick/standard-ui-react"

export const SaveButton = () => (
  <Button variant="primary">Save changes</Button>
)`

export default function CodeBlockPage() {
  return (
    <div className="w-full">
      <PageHeader
        title="Code block"
        description="Syntax-highlighted source code with language labels, line numbers, and a copy action."
      />

      <section className="mt-2">
        <H2>Examples</H2>
        <div className="mt-6 flex flex-col gap-8">
          <ComponentCanvas
            label="Default"
            contentClassName="w-full items-stretch"
            minHeightClass="min-h-0"
          >
            <CodeBlock code={exampleCode} className="w-full" />
          </ComponentCanvas>

          <ComponentCanvas
            label="Compact without header"
            contentClassName="w-full items-stretch"
            minHeightClass="min-h-0"
          >
            <CodeBlock
              code={`const status = "ready"`}
              lang="ts"
              size="sm"
              showHeader={false}
              className="w-full"
            />
          </ComponentCanvas>
        </div>
      </section>

      <section className="mt-14">
        <H2>Overview</H2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Code block uses Sugar High for lightweight highlighting. It maps
          common labels such as <Token>tsx</Token> and <Token>jsx</Token> to
          their language grammars and falls back to TypeScript.
        </p>
        <CodeBlock
          className="mt-4"
          code={`import { CodeBlock } from "@boyernick/standard-ui-react"

<CodeBlock code={source} lang="tsx" />`}
        />
      </section>

      <section className="mt-14">
        <H2>API</H2>
        <DocTable headers={["Prop", "Type", "Default", "Description"]}>
          <tr>
            <DocCell mono>code</DocCell>
            <DocCell mono>string</DocCell>
            <DocCell mono>—</DocCell>
            <DocCell>Source text to highlight.</DocCell>
          </tr>
          <tr>
            <DocCell mono>lang</DocCell>
            <DocCell mono>string</DocCell>
            <DocCell mono>&quot;tsx&quot;</DocCell>
            <DocCell>Header label and highlighting language.</DocCell>
          </tr>
          <tr>
            <DocCell mono>size</DocCell>
            <DocCell mono>&quot;sm&quot; | &quot;md&quot;</DocCell>
            <DocCell mono>&quot;md&quot;</DocCell>
            <DocCell>Code text and padding size.</DocCell>
          </tr>
          <tr>
            <DocCell mono>showHeader</DocCell>
            <DocCell mono>boolean</DocCell>
            <DocCell mono>true</DocCell>
            <DocCell>Shows the language label and copy action.</DocCell>
          </tr>
          <tr>
            <DocCell mono>bare</DocCell>
            <DocCell mono>boolean</DocCell>
            <DocCell mono>false</DocCell>
            <DocCell>Removes frame chrome for nested use.</DocCell>
          </tr>
        </DocTable>
      </section>

      <section className="mt-14 mb-8">
        <H2>Guidelines</H2>
        <H3>Do</H3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>Set the language label to match the code users will copy</li>
          <li>Use the compact size for short inline examples</li>
        </ul>
        <H3>Don&apos;t</H3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>Don&apos;t place prose or editable content in a code block</li>
          <li>Don&apos;t remove the header when copying is important</li>
        </ul>
      </section>
    </div>
  )
}
