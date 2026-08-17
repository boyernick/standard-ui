import type { Metadata } from "next"
import { PageHeader } from "@/components/page-header"
import { SwitchDemo } from "./switch-demo"

export const metadata: Metadata = {
  title: "Switch",
}

export default function SwitchPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader
        title="Switch"
        description="On/off control built on Base UI. Behavior and a11y come from the primitive; look comes from Standard UI tokens."
      />
      <SwitchDemo />
    </div>
  )
}
