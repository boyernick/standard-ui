"use client"

import {
  BlockEditor,
  defaultBlockEditorBlocks,
} from "@boyernick/standard-ui-react"
import { DocBand } from "@/components/doc-band"

export const BlockEditorExamples = () => (
  <div>
    <DocBand
      first
      id="document"
      title="Document"
      description="A block canvas — type to edit, press '/' to insert headings, lists, checklists, and dividers."
      contentClassName="max-w-3xl"
    >
      <BlockEditor
        defaultBlocks={defaultBlockEditorBlocks}
        className="w-full min-h-[32rem]"
        aria-label="Document"
      />
    </DocBand>

    <DocBand
      id="empty"
      title="Empty"
      description="Start from a blank page and build with slash commands."
      contentClassName="max-w-3xl"
    >
      <BlockEditor
        defaultBlocks={[
          {
            id: "empty-start",
            type: "text",
            content: "",
          },
        ]}
        className="w-full min-h-64"
        aria-label="Blank document"
      />
    </DocBand>
  </div>
)
