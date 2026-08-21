import type { Metadata } from "next";
import { DocPage } from "@/components/doc-page";
import { FileAttachmentExamples } from "./file-attachment-examples";

export const metadata: Metadata = { title: "File attachment" };

export default function FileAttachmentPage() {
  return (
    <DocPage
      title="File attachment"
      description="Picker and dropzone for attaching files."
      heading={null}
      bleed
    >
      <FileAttachmentExamples />
    </DocPage>
  );
}
