import { DocPage } from "@/components/doc-page"
import { IntroCards } from "@/components/intro-cards"

export default function IntroductionPage() {
  return (
    <DocPage
      title="Introduction"
      description="StandardUI is the shared visual language for product surfaces — tokens, components, and motion on Base UI."
      heading={null}
    >
      <IntroCards />
    </DocPage>
  )
}
