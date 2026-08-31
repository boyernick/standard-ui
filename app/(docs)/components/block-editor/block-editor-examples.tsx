"use client"

import {
  BlockEditor,
  defaultBlockEditorBlocks,
} from "@boyernick/standard-ui-react"
import { DocBand } from "@/components/doc-band"

const emptyBlocks = [
  {
    id: "empty-start",
    type: "text" as const,
    content: "",
  },
]

export const BlockEditorExamples = () => (
  <div>
    <DocBand
      first
      id="empty"
      title="Empty"
      description="Start from a blank page and build with slash commands."
      contentClassName="w-full max-w-none"
    >
      <BlockEditor
        defaultBlocks={emptyBlocks}
        className="w-full min-h-64"
        aria-label="Blank document"
      />
    </DocBand>

    <DocBand
      id="document"
      title="Document"
      description="Type to edit; press '/' to insert a block."
      contentClassName="w-full max-w-none"
    >
      <BlockEditor
        defaultBlocks={defaultBlockEditorBlocks}
        className="w-full min-h-[32rem]"
        aria-label="Document"
      />
    </DocBand>
  </div>
)
