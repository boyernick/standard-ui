import type { Metadata } from "next"
import { DocPage } from "@/components/doc-page"
import { AccordionExamples } from "./accordion-examples"

export const metadata: Metadata = {
  title: "Accordion",
}

export default function AccordionPage() {
  return (
    <DocPage
      title="Accordion"
      description="Expandable sections for FAQs, settings groups, and progressive disclosure."
      heading={null}
      bleed
    >
      <AccordionExamples />
    </DocPage>
  )
}
