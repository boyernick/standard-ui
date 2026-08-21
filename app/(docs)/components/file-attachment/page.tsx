import type { Metadata } from "next";
import { DocPage } from "@/components/doc-page";
import { FileAttachmentExamples } from "./file-attachment-examples";

export const metadata: Metadata = { title: "File attachment" };

export default function FileAttachmentPage() {
  return (
    <DocPage
      title="File attachment"
      description="File picker, dropzone, and composable list parts for attachment interfaces."
    >
      <FileAttachmentExamples />
    </DocPage>
  );
}
