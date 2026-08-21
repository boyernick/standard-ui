import type { Metadata } from "next"
import { DocPage } from "@/components/doc-page"
import { AlertDialogExamples } from "./alert-dialog-examples"

export const metadata: Metadata = {
  title: "Alert dialog",
}

export default function AlertDialogPage() {
  return (
    <DocPage
      title="Alert dialog"
      description="Interruptive confirmation for destructive or irreversible actions."
      heading={null}
      bleed
    >
      <AlertDialogExamples />
    </DocPage>
  )
}
