import type { Metadata } from "next";
import { DocPage } from "@/components/doc-page";
import { SpinnerExamples } from "./spinner-examples";

export const metadata: Metadata = { title: "Spinner" };

export default function SpinnerPage() {
  return (
    <DocPage
      title="Spinner"
      description="Compact indeterminate progress indicator for controls and inline loading states."
    >
      <SpinnerExamples />
    </DocPage>
  );
}
