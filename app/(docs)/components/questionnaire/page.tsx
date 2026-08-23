import type { Metadata } from "next"
import { DocPage } from "@/components/doc-page"
import { QuestionnaireExamples } from "./questionnaire-examples"

export const metadata: Metadata = {
  title: "Questionnaire",
}

export default function QuestionnairePage() {
  return (
    <DocPage
      title="Questionnaire"
      description="Guide people through a sequence of related questions."
      heading={null}
      bleed
    >
      <QuestionnaireExamples />
    </DocPage>
  )
}
