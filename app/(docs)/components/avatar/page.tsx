import type { Metadata } from "next"
import { DocPage } from "@/components/doc-page"
import { AvatarExamples } from "./avatar-examples"

export const metadata: Metadata = {
  title: "Avatar",
}

export default function AvatarPage() {
  return (
    <DocPage
      title="Avatar"
      description="Circular identity for people and accounts."
      heading={null}
      bleed
    >
      <AvatarExamples />
    </DocPage>
  )
}
