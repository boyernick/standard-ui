import Link from "next/link"
import { CodeBlock } from "@/components/code-block"
import { IntroCards } from "@/components/intro-cards"
import { PageHeader } from "@/components/page-header"
import { Token } from "@/components/doc-table"
import { H2 } from "@/components/prose"

export default function IntroductionPage() {
  return (
    <div className="w-full">
      <PageHeader
        title="Introduction"
        description="StandardUI is the shared visual language for product surfaces — tokens, components, and motion on Base UI."
      />

      <section className="mt-8 max-w-3xl">
        <p className="text-md text-fg-secondary">
          Behavior comes from{" "}
          <a
            href="https://base-ui.com"
            className="cursor-pointer text-fg-primary underline-offset-2 hover:underline"
          >
            Base UI
          </a>
          ; color, type, and chrome are styled with StandardUI tokens. Prefer
          package components in app chrome so the system stays dogfooded.
        </p>
      </section>

      <section className="mt-12">
        <H2>Install</H2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Both packages are published to npm. See{" "}
          <Link
            href="/installation"
            className="cursor-pointer text-fg-primary underline-offset-2 hover:underline"
          >
            Installation
          </Link>{" "}
          for the canary lane, the Tailwind wiring, and the license key the
          icon package needs.
        </p>
        <CodeBlock
          className="mt-4"
          lang="bash"
          code={`npm install @boyernick/standard-ui-tokens @boyernick/standard-ui-react`}
        />
        <CodeBlock
          className="mt-4"
          lang="css"
          code={`@import "tailwindcss";
@import "@boyernick/standard-ui-tokens/css/tokens.css";
@source "./node_modules/@boyernick/standard-ui-react/src";

@custom-variant dark (&:where(.dark, .dark *));`}
        />
      </section>

      <section className="mt-12">
        <H2>Principles</H2>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>Sentence case for UI copy; never force uppercase</li>
          <li>
            Soft focus rings —{" "}
            <Token>ring-[3px] ring-ring/20</Token> with a 1px offset
          </li>
          <li>Nested radii stay concentric (outer − padding)</li>
          <li>Buttons and links use <Token>cursor-pointer</Token></li>
        </ul>
      </section>

      <section className="mt-14">
        <H2>Explore</H2>
        <p className="text-md mt-0.5 mb-6 max-w-3xl text-fg-secondary">
          Start with foundations, then browse components A–Z.
        </p>
        <IntroCards />
      </section>
    </div>
  )
}
