import type { Metadata } from "next"
import { CodeBlock } from "@boyernick/standard-ui-react"
import { ComponentCanvas } from "@/components/component-canvas"
import { DocPage } from "@/components/doc-page"

export const metadata: Metadata = {
  title: "Code block",
}

const exampleCode = `import { Button } from "@boyernick/standard-ui-react"

export const SaveButton = () => (
  <Button variant="primary">Save changes</Button>
)`

export default function CodeBlockPage() {
  return (
    <DocPage
      title="Code block"
      description="Syntax-highlighted source code with language labels, line numbers, and a copy action."
    >
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
    </DocPage>
  )
}
