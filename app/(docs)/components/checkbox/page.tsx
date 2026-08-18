import type { Metadata } from "next"
import { PageHeader } from "@/components/page-header"
import { CheckboxDemo } from "./checkbox-demo"

export const metadata: Metadata = {
  title: "Checkbox",
}

export default function CheckboxPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader
        title="Checkbox"
        description="Boolean selection. Checked state uses brand (grayscale) and border tokens."
      />
      <CheckboxDemo />
    </div>
  )
}
