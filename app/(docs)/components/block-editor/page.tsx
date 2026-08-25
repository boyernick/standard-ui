import type { Metadata } from "next"
import { Kbd } from "@boyernick/standard-ui-react"
import { DocPage } from "@/components/doc-page"
import { BlockEditorExamples } from "./block-editor-examples"

export const metadata: Metadata = {
  title: "Block editor",
}

export default function BlockEditorPage() {
  return (
    <DocPage
      title="Block editor"
      description={
        <>
          A block editor with <Kbd size="sm">/</Kbd> commands.
        </>
      }
      heading={null}
      bleed
    >
      <BlockEditorExamples />
    </DocPage>
  )
}
