import type { Metadata } from "next"
import {
  CodeBlock,
  MarkdownEditor,
  MarkdownEditorInput,
  MarkdownEditorPreview,
  MarkdownEditorToolbar,
} from "@boyernick/standard-ui-react"
import { ComponentCanvas } from "@/components/component-canvas"
import { DocCell, DocTable, Token } from "@/components/doc-table"
import { PageHeader } from "@/components/page-header"
import { H2, H3 } from "@/components/prose"

export const metadata: Metadata = {
  title: "Markdown editor",
}

export default function MarkdownEditorPage() {
  return (
    <div className="w-full">
      <PageHeader
        title="Markdown editor"
        description="A focused editor with simple formatting helpers and a lightweight preview for basic markdown."
      />

      <section className="mt-2">
        <H2>Examples</H2>
        <div className="mt-6">
          <ComponentCanvas
            label="Editor and preview"
            contentClassName="w-full items-stretch"
            minHeightClass="min-h-0"
            code={`<MarkdownEditor defaultValue="Write **clear** notes with \`code\`.">
  <MarkdownEditorToolbar />
  <div className="grid md:grid-cols-2">
    <MarkdownEditorInput aria-label="Markdown" />
    <MarkdownEditorPreview />
  </div>
</MarkdownEditor>`}
          >
            <MarkdownEditor
              defaultValue={
                "Write **clear** notes with *lightweight* `code` previews."
              }
              className="w-full"
            >
              <MarkdownEditorToolbar />
              <div className="grid md:grid-cols-2">
                <MarkdownEditorInput aria-label="Markdown" />
                <MarkdownEditorPreview className="md:border-t-0 md:border-l" />
              </div>
            </MarkdownEditor>
          </ComponentCanvas>
        </div>
      </section>

      <section className="mt-14">
        <H2>Overview</H2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Markdown editor manages shared text for its toolbar, input, and
          preview. The default toolbar wraps the current selection in bold,
          italic, or code markers. Preview intentionally supports only{" "}
          <Token>**bold**</Token>, <Token>*italic*</Token>, and{" "}
          <Token>`code`</Token>.
        </p>
        <CodeBlock
          className="mt-4"
          code={`import {
  MarkdownEditor,
  MarkdownEditorToolbar,
  MarkdownEditorInput,
  MarkdownEditorPreview,
} from "@boyernick/standard-ui-react"

<MarkdownEditor defaultValue="Hello **world**">
  <MarkdownEditorToolbar />
  <MarkdownEditorInput aria-label="Markdown" />
  <MarkdownEditorPreview />
</MarkdownEditor>`}
        />
      </section>

      <section className="mt-14">
        <H2>Usage</H2>
        <H3>Controlled value</H3>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Pass <Token>value</Token> and <Token>onValueChange</Token> when the
          editor content belongs to application state. Use{" "}
          <Token>defaultValue</Token> for an uncontrolled editor.
        </p>
        <H3 className="mt-10">Preview scope</H3>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          The preview is intentionally not a full markdown parser. Use a
          dedicated, sanitized renderer when you need links, lists, headings,
          HTML, or nested syntax.
        </p>
      </section>

      <section className="mt-14">
        <H2>API</H2>
        <DocTable headers={["Part", "Role"]}>
          <tr>
            <DocCell mono>MarkdownEditor</DocCell>
            <DocCell>Value provider and bordered editor frame.</DocCell>
          </tr>
          <tr>
            <DocCell mono>MarkdownEditorToolbar</DocCell>
            <DocCell>Bold, italic, and code selection helpers.</DocCell>
          </tr>
          <tr>
            <DocCell mono>MarkdownEditorInput</DocCell>
            <DocCell>Textarea connected to the shared value.</DocCell>
          </tr>
          <tr>
            <DocCell mono>MarkdownEditorPreview</DocCell>
            <DocCell>Plain-text preview with three basic inline styles.</DocCell>
          </tr>
        </DocTable>
      </section>

      <section className="mt-14 mb-8">
        <H2>Guidelines</H2>
        <H3>Do</H3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>Give the input a visible label or accessible name</li>
          <li>Use this editor for short, trusted formatting workflows</li>
        </ul>
        <H3>Don&apos;t</H3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>Don&apos;t treat the basic preview as a complete markdown parser</li>
          <li>Don&apos;t render arbitrary HTML from editor content</li>
        </ul>
      </section>
    </div>
  )
}
