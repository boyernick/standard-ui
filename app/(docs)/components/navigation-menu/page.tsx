import type { Metadata } from "next"
import { DocPage } from "@/components/doc-page"
import { NavigationMenuExamples } from "./navigation-menu-examples"

export const metadata: Metadata = {
  title: "Navigation menu",
}

export default function NavigationMenuPage() {
  return (
    <DocPage
      title="Navigation menu"
      description="Site navigation with optional flyout panels."
      heading={null}
      bleed
    >
      <NavigationMenuExamples />
    </DocPage>
  )
}
