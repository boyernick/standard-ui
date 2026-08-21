"use client"

import {
  MarkdownEditor,
  MarkdownEditorInput,
  MarkdownEditorPreview,
  MarkdownEditorToolbar,
} from "@boyernick/standard-ui-react"
import { DocBand } from "@/components/doc-band"

const sample =
  "Write **clear** notes with *lightweight* `code` previews."

const BAND = "max-w-2xl"

export const MarkdownEditorExamples = () => (
  <div>
    <DocBand
      first
      id="default"
      title="Default"
      description="Source and preview side by side, formatting above both."
      contentClassName={BAND}
    >
      <MarkdownEditor defaultValue={sample} className="w-full">
        <MarkdownEditorToolbar />
        <div className="grid md:grid-cols-2">
          <MarkdownEditorInput aria-label="Markdown" />
          <MarkdownEditorPreview className="md:border-t-0 md:border-l" />
        </div>
      </MarkdownEditor>
    </DocBand>

    <DocBand
      id="stacked"
      title="Stacked"
      description="Preview under the source, for a narrow column."
      contentClassName="max-w-md"
    >
      {/* Same parts, different order — the root only supplies state, so the
          arrangement is the consumer's. */}
      <MarkdownEditor defaultValue={sample} className="w-full">
        <MarkdownEditorToolbar />
        <MarkdownEditorInput aria-label="Markdown" />
        <MarkdownEditorPreview />
      </MarkdownEditor>
    </DocBand>

    <DocBand
      id="editor-only"
      title="Without a preview"
      description="Just the source and its formatting actions."
      contentClassName="max-w-md"
    >
      <MarkdownEditor defaultValue={sample} className="w-full">
        <MarkdownEditorToolbar />
        <MarkdownEditorInput aria-label="Markdown" />
      </MarkdownEditor>
    </DocBand>

    <DocBand
      id="empty"
      title="Empty preview"
      description="With nothing written, the preview says so."
      contentClassName="max-w-md"
    >
      <MarkdownEditor defaultValue="" className="w-full">
        <MarkdownEditorToolbar />
        <MarkdownEditorInput aria-label="Markdown" placeholder="Write…" />
        <MarkdownEditorPreview emptyText="Nothing to preview yet" />
      </MarkdownEditor>
    </DocBand>
  </div>
)
