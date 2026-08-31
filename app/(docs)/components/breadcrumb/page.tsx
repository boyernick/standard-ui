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
      description="The current page within a larger hierarchy."
      heading={null}
      bleed
    >
      <BreadcrumbExamples />
    </DocPage>
  )
}
