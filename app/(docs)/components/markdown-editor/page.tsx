import type { Metadata } from "next"
import {
  MarkdownEditor,
  MarkdownEditorInput,
  MarkdownEditorPreview,
  MarkdownEditorToolbar,
} from "@boyernick/standard-ui-react"
import { ComponentCanvas } from "@/components/component-canvas"
import { DocPage } from "@/components/doc-page"

export const metadata: Metadata = {
  title: "Markdown editor",
}

export default function MarkdownEditorPage() {
  return (
    <DocPage
      title="Markdown editor"
      description="A focused editor with simple formatting helpers and a lightweight preview for basic markdown."
    >
      <div className="mt-6">
                <ComponentCanvas
                  label="Editor and preview"
                  contentClassName="w-full items-stretch"
                  minHeightClass="min-h-0"
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
    </DocPage>
  )
}
