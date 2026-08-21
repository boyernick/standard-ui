import type { Metadata } from "next"
import { DocPage } from "@/components/doc-page"
import { CommandExamples } from "./command-examples"

export const metadata: Metadata = {
  title: "Command",
}

export default function CommandPage() {
  return (
    <DocPage
      title="Command"
      description="Searchable command menu for quick navigation."
      heading={null}
      bleed
    >
      <CommandExamples />
    </DocPage>
  )
}
