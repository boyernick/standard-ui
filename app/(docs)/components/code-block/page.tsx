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
      description="Highlighted source with a language label and copy."
      heading={null}
      bleed
    >
      <CodeBlockExamples />
    </DocPage>
  )
}
