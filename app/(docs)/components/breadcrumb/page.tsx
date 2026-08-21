import type { Metadata } from "next"
import { DocPage } from "@/components/doc-page"
import { BreadcrumbExamples } from "./breadcrumb-examples"

export const metadata: Metadata = {
  title: "Breadcrumb",
}

export default function BreadcrumbPage() {
  return (
    <DocPage
      title="Breadcrumb"
      description="Hierarchical navigation that shows the current page within a larger structure."
      heading={null}
      bleed
    >
      <BreadcrumbExamples />
    </DocPage>
  )
}
