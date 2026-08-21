import type { Metadata } from "next";
import { DocPage } from "@/components/doc-page";
import { OrbExamples } from "./orb-examples";

export const metadata: Metadata = { title: "Orb" };

export default function OrbPage() {
  return (
    <DocPage
      title="Orb"
      description="Ambient brand loader for spacious, expressive waiting states."
    >
      <OrbExamples />
    </DocPage>
  );
}
