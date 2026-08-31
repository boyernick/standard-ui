"use client"

import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireError,
  QuestionnaireInput,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSkip,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "@boyernick/standard-ui-react"
import { useState } from "react"
import { DocBand } from "@/components/doc-band"

const discoveryItems = [
  {
    name: "role",
    required: true,
    choices: [
      { value: "founder" },
      { value: "designer" },
      { value: "engineer" },
    ],
  },
  {
    name: "priorities",
    required: true,
    choices: [
      { value: "quality" },
      { value: "speed" },
      { value: "clarity" },
    ],
  },
  { name: "context", required: false },
] as const

const channels = [
  { value: "email" },
  { value: "push" },
  { value: "digest" },
] as const

const optionalItems = [
  {
    name: "cadence",
    required: true,
    choices: [{ value: "daily" }, { value: "weekly" }],
  },
  { name: "note", required: false },
] as const

const ChoiceCopy = ({
  label,
  description,
}: {
  label: string
  description?: string
}) => (
  <span className="flex flex-col gap-0.5">
    <span>{label}</span>
    {description ? (
      <span className="text-xs text-fg-secondary">{description}</span>
    ) : null}
  </span>
)

export const QuestionnaireExamples = () => {
  const [submitted, setSubmitted] = useState<string | null>(null)

  return (
    <div>
      <DocBand
        first
        id="default"
        title="Default"
        description="A full flow with shortcuts, validation, and form data."
        contentClassName="max-w-xl"
      >
        <Questionnaire
          items={discoveryItems}
          shortcuts="letters"
          onSubmit={(event) => {
            event.preventDefault()
            const data = new FormData(event.currentTarget)
            const role = String(data.get("role"))
            const priorities = data.getAll("priorities").map(String).join(", ")
            const context = String(data.get("context") ?? "").trim()
            setSubmitted(
              [role, priorities, context].filter(Boolean).join(" · "),
            )
          }}
        >
          <QuestionnaireProgress />

          <QuestionnaireItem name="role" required>
            <QuestionnaireTitle>What best describes your role?</QuestionnaireTitle>
            <QuestionnaireDescription>
              Choose the perspective you bring to the team.
            </QuestionnaireDescription>
            <QuestionnaireChoices>
              <QuestionnaireChoice value="founder">
                <ChoiceCopy label="Founder" description="Direction and outcomes" />
              </QuestionnaireChoice>
              <QuestionnaireChoice value="designer">
                <ChoiceCopy label="Designer" description="Experience and craft" />
              </QuestionnaireChoice>
              <QuestionnaireChoice value="engineer">
                <ChoiceCopy label="Engineer" description="Systems and delivery" />
              </QuestionnaireChoice>
            </QuestionnaireChoices>
            <QuestionnaireError />
          </QuestionnaireItem>

          <QuestionnaireItem name="priorities" required multiple>
            <QuestionnaireTitle>What matters most right now?</QuestionnaireTitle>
            <QuestionnaireDescription>
              Choose one or more priorities.
            </QuestionnaireDescription>
            <QuestionnaireChoices>
              <QuestionnaireChoice value="quality">Quality</QuestionnaireChoice>
              <QuestionnaireChoice value="speed">Speed</QuestionnaireChoice>
              <QuestionnaireChoice value="clarity">Clarity</QuestionnaireChoice>
            </QuestionnaireChoices>
            <QuestionnaireError />
          </QuestionnaireItem>

          <QuestionnaireItem name="context">
            <QuestionnaireTitle>Anything else we should know?</QuestionnaireTitle>
            <QuestionnaireDescription>
              Add a little context, or skip this question.
            </QuestionnaireDescription>
            <QuestionnaireInput placeholder="Share a detail…" />
            <QuestionnaireError />
          </QuestionnaireItem>

          <QuestionnaireActions>
            <QuestionnairePrevious />
            <QuestionnaireSkip />
            <QuestionnaireNext />
            <QuestionnaireSubmit>Finish</QuestionnaireSubmit>
          </QuestionnaireActions>
        </Questionnaire>

        {submitted ? (
          <p className="text-sm mt-4 rounded-lg bg-background-secondary px-3 py-2 text-fg-secondary">
            Submitted: {submitted}
          </p>
        ) : null}
      </DocBand>

      <DocBand
        id="multiple"
        title="Multiple choice"
        description="The same cards become checkboxes for several answers."
        contentClassName="max-w-xl"
      >
        <Questionnaire
          items={[
            { name: "channels", required: true, choices: channels },
          ]}
          shortcuts="numbers"
          onSubmit={(event) => event.preventDefault()}
        >
          <QuestionnaireItem name="channels" required multiple>
            <QuestionnaireTitle>Where should we send updates?</QuestionnaireTitle>
            <QuestionnaireDescription>
              Select every channel you want to use.
            </QuestionnaireDescription>
            <QuestionnaireChoices>
              <QuestionnaireChoice value="email">Email</QuestionnaireChoice>
              <QuestionnaireChoice value="push">Push notifications</QuestionnaireChoice>
              <QuestionnaireChoice value="digest">Weekly digest</QuestionnaireChoice>
            </QuestionnaireChoices>
            <QuestionnaireError />
          </QuestionnaireItem>
          <QuestionnaireActions>
            <QuestionnaireSubmit>Save preferences</QuestionnaireSubmit>
          </QuestionnaireActions>
        </Questionnaire>
      </DocBand>

      <DocBand
        id="optional"
        title="Optional questions"
        description="Skip advances past a question without submitting an empty answer."
        contentClassName="max-w-xl"
      >
        <Questionnaire items={optionalItems} onSubmit={(event) => event.preventDefault()}>
          <QuestionnaireProgress />
          <QuestionnaireItem name="cadence" required>
            <QuestionnaireTitle>How often should we check in?</QuestionnaireTitle>
            <QuestionnaireChoices>
              <QuestionnaireChoice value="daily">Daily</QuestionnaireChoice>
              <QuestionnaireChoice value="weekly">Weekly</QuestionnaireChoice>
            </QuestionnaireChoices>
            <QuestionnaireError />
          </QuestionnaireItem>
          <QuestionnaireItem name="note">
            <QuestionnaireTitle>Add a note</QuestionnaireTitle>
            <QuestionnaireDescription>
              This is optional and can be skipped.
            </QuestionnaireDescription>
            <QuestionnaireInput placeholder="A note for the team…" />
            <QuestionnaireError />
          </QuestionnaireItem>
          <QuestionnaireActions>
            <QuestionnairePrevious />
            <QuestionnaireSkip />
            <QuestionnaireNext />
            <QuestionnaireSubmit />
          </QuestionnaireActions>
        </Questionnaire>
      </DocBand>
    </div>
  )
}
