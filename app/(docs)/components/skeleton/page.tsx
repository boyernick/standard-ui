import type { Metadata } from "next";
import { DocPage } from "@/components/doc-page";
import { SkeletonExamples } from "./skeleton-examples";

export const metadata: Metadata = { title: "Skeleton" };

export default function SkeletonPage() {
  return (
    <DocPage
      title="Skeleton"
      description="Shape-preserving placeholders that reduce layout shift while content loads."
    >
      <SkeletonExamples />
    </DocPage>
  );
}
