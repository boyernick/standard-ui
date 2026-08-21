import type { Metadata } from "next";
import { DocPage } from "@/components/doc-page";
import { EmptyExamples } from "./empty-examples";

export const metadata: Metadata = { title: "Empty" };

export default function EmptyPage() {
  return (
    <DocPage
      title="Empty"
      description="Composed empty states for missing content, first-run guidance, and zero results."
    >
      <EmptyExamples />
    </DocPage>
  );
}
