import type { Metadata } from "next"
import { PageHeader } from "@/components/page-header"
import { IconsDemo } from "./icons-demo"

export const metadata: Metadata = {
  title: "Icons",
}

export default function IconsPage() {
  return (
    <div className="mx-auto max-w-5xl" data-icons-page>
      <PageHeader
        title="Icons"
        description="Rounded outlined icon set. Default size 20px."
      />
      <IconsDemo />
    </div>
  )
}
