import type { Metadata } from "next"
import { DocPage } from "@/components/doc-page"
import { MarkdownEditorExamples } from "./markdown-editor-examples"

export const metadata: Metadata = {
  title: "Markdown editor",
}

export default function MarkdownEditorPage() {
  return (
    <DocPage
      title="Markdown editor"
      description="Markdown source with formatting helpers and a live preview."
      heading={null}
      bleed
    >
      <MarkdownEditorExamples />
    </DocPage>
  )
}
