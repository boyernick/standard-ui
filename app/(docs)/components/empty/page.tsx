import type { Metadata } from "next";
import { DocPage } from "@/components/doc-page";
import { EmptyExamples } from "./empty-examples";

export const metadata: Metadata = { title: "Empty" };

export default function EmptyPage() {
  return (
    <DocPage
      title="Empty"
      description="Placeholder for a surface with nothing to show."
      heading={null}
      bleed
    >
      <EmptyExamples />
    </DocPage>
  );
}
