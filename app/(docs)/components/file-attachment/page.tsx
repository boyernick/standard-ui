import type { Metadata } from "next";
import { CodeBlock } from "@/components/code-block";
import { DocCell, DocTable, Token } from "@/components/doc-table";
import { PageHeader } from "@/components/page-header";
import { FileAttachmentExamples } from "./file-attachment-examples";

export const metadata: Metadata = { title: "File attachment" };

export default function FileAttachmentPage() {
  return (
    <div className="w-full">
      <PageHeader
        title="File attachment"
        description="File picker, dropzone, and composable list parts for attachment interfaces."
      />
      <section className="mt-2">
        <h2 className="heading-sm text-fg-primary">Examples</h2>
        <FileAttachmentExamples />
      </section>
      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">Overview</h2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Attachment returns selected files through <Token>onFiles</Token>.
          Uploading, validation, persistence, and preview URL cleanup remain
          application responsibilities.
        </p>
        <CodeBlock
          className="mt-4"
          code={`import { Attachment } from "@standard-ui/react"\n\n<Attachment multiple onFiles={handleFiles}>\n  Choose files or drop them here\n</Attachment>`}
        />
      </section>
      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">API</h2>
        <DocTable headers={["Part", "Role"]}>
          <tr>
            <DocCell mono>Attachment</DocCell>
            <DocCell>Picker and dropzone root.</DocCell>
          </tr>
          <tr>
            <DocCell mono>AttachmentItem</DocCell>
            <DocCell>Single selected file row.</DocCell>
          </tr>
          <tr>
            <DocCell mono>AttachmentRemove</DocCell>
            <DocCell>Removal action.</DocCell>
          </tr>
        </DocTable>
      </section>
      <section className="mt-14 mb-8">
        <h2 className="heading-sm text-fg-primary">Guidelines</h2>
        <h3 className="heading-xs mt-8 text-fg-primary">Do</h3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>State accepted file types and size limits</li>
          <li>Show upload errors next to the file</li>
        </ul>
        <h3 className="heading-xs mt-8 text-fg-primary">Don&apos;t</h3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>Don&apos;t imply selection means upload completed</li>
        </ul>
      </section>
    </div>
  );
}
