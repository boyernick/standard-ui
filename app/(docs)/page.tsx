import { DocPage } from "@/components/doc-page"
import { IntroCards } from "@/components/intro-cards"

export default function IntroductionPage() {
  return (
    <DocPage
      title="Introduction"
      description="The visual foundations and language of StandardUI."
      heading={null}
      bleed
    >
      <IntroCards />
    </DocPage>
  )
}
