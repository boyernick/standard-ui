import type { Metadata } from "next"
import { DocPage } from "@/components/doc-page"
import { ToastExamples } from "./toast-examples"

export const metadata: Metadata = {
  title: "Toast",
}

export default function ToastPage() {
  return (
    <DocPage
      title="Toast"
      description="Transient notifications for saves, errors, and confirmations."
    >
      <ToastExamples />
    </DocPage>
  )
}
