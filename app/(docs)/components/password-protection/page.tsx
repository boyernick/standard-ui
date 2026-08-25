import type { Metadata } from "next"
import { DocPage } from "@/components/doc-page"
import { PasswordProtectionExamples } from "./password-protection-examples"

export const metadata: Metadata = {
  title: "Password protection",
}

export default function PasswordProtectionPage() {
  return (
    <DocPage
      title="Password protection"
      description="A password dialog that unlocks private links and pages."
      heading={null}
      bleed
    >
      <PasswordProtectionExamples />
    </DocPage>
  )
}
