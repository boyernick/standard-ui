import type { Metadata } from "next";
import { DocPage } from "@/components/doc-page";
import { PaginationExamples } from "./pagination-examples";

export const metadata: Metadata = { title: "Pagination" };

export default function PaginationPage() {
  return (
    <DocPage
      title="Pagination"
      description="Page controls for moving through a bounded collection of results."
    >
      <PaginationExamples />
    </DocPage>
  );
}
