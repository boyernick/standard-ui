import type { Metadata } from "next"
import { CodeBlock } from "@/components/code-block"
import { DocCell, DocTable, Token } from "@/components/doc-table"
import { PageHeader } from "@/components/page-header"
import { TextAnimateExamples } from "./text-animate-examples"

export const metadata: Metadata = {
  title: "Text animate",
}

export default function TextAnimatePage() {
  return (
    <div className="w-full">
      <PageHeader
        title="Text animate"
        description="Typewriter, decode, fade, and blur reveals for headlines and empty-state copy."
      />

      <section className="mt-2">
        <h2 className="heading-sm text-fg-primary">Examples</h2>
        <TextAnimateExamples />
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">Overview</h2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Pass <Token>text</Token> and an <Token>effect</Token>. Typewriter and
          decode run character-by-character; fade and blur use CSS keyframes.
          Respect reduced motion by keeping body copy static when it matters.
        </p>
        <CodeBlock
          className="mt-4"
          code={`import { TextAnimate } from "@standard-ui/react"

<TextAnimate text="Hello" effect="typewriter" />
<TextAnimate text="StandardUI" effect="decode" speed={30} />`}
        />
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">API</h2>
        <DocTable headers={["Prop", "Type", "Default"]}>
          <tr>
            <DocCell mono>text</DocCell>
            <DocCell mono>string</DocCell>
            <DocCell mono>—</DocCell>
          </tr>
          <tr>
            <DocCell mono>effect</DocCell>
            <DocCell mono>
              typewriter | decode | fade | blur
            </DocCell>
            <DocCell mono>typewriter</DocCell>
          </tr>
          <tr>
            <DocCell mono>speed</DocCell>
            <DocCell mono>number</DocCell>
            <DocCell mono>40</DocCell>
          </tr>
          <tr>
            <DocCell mono>delay</DocCell>
            <DocCell mono>number</DocCell>
            <DocCell mono>0</DocCell>
          </tr>
        </DocTable>
      </section>

      <section className="mt-14 mb-8">
        <h2 className="heading-sm text-fg-primary">Guidelines</h2>
        <h3 className="heading-xs mt-8 text-fg-primary">Do</h3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>Use on short headlines and status lines</li>
          <li>Keep full text in aria-label while glyphs scramble</li>
        </ul>
        <h3 className="heading-xs mt-8 text-fg-primary">Don&apos;t</h3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>Don&apos;t animate long paragraphs</li>
          <li>Don&apos;t rely on animation for critical instructions</li>
        </ul>
      </section>
    </div>
  )
}
