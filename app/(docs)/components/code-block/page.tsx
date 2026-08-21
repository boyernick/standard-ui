import type { Metadata } from "next"
import { DocPage } from "@/components/doc-page"
import { CodeBlockExamples } from "./code-block-examples"

export const metadata: Metadata = {
  title: "Code block",
}

export default function CodeBlockPage() {
  return (
    <DocPage
      title="Code block"
      description="Syntax-highlighted source with a language label and a copy action."
      heading={null}
      bleed
    >
      <CodeBlockExamples />
    </DocPage>
  )
}
