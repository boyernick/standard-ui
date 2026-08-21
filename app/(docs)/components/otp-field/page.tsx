import type { Metadata } from "next"
import { DocPage } from "@/components/doc-page"
import { OTPFieldExamples } from "./otp-field-examples"

export const metadata: Metadata = {
  title: "OTP field",
}

export default function OTPFieldPage() {
  return (
    <DocPage
      title="OTP field"
      description="One-time password slots for verification codes."
      heading={null}
      bleed
    >
      <OTPFieldExamples />
    </DocPage>
  )
}
