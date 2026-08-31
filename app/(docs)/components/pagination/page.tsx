import type { Metadata } from "next";
import { DocPage } from "@/components/doc-page";
import { PaginationExamples } from "./pagination-examples";

export const metadata: Metadata = { title: "Pagination" };

export default function PaginationPage() {
  return (
    <DocPage
      title="Pagination"
      description="Controls for moving through results."
      heading={null}
      bleed
    >
      <PaginationExamples />
    </DocPage>
  );
}
