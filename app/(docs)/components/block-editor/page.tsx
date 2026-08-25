import type { Metadata } from "next"
import { DocPage } from "@/components/doc-page"
import { BlockEditorExamples } from "./block-editor-examples"

export const metadata: Metadata = {
  title: "Block editor",
}

export default function BlockEditorPage() {
  return (
    <DocPage
      title="Block editor"
      description="A Notion-style block document — edit in place and insert elements with '/'."
      heading={null}
      bleed
    >
      <BlockEditorExamples />
    </DocPage>
  )
}
