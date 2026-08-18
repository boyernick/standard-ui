import { CodeBlock } from "@/components/code-block"
import { IntroCards } from "@/components/intro-cards"
import { PageHeader } from "@/components/page-header"
import { Token } from "@/components/doc-table"

export default function IntroductionPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader
        title="Introduction"
        description="Standard UI is the shared visual language for product surfaces — tokens, components, and motion on Base UI."
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
          ; color, type, and chrome are styled with Standard UI tokens. Prefer
          package components in app chrome so the system stays dogfooded.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="heading-sm text-fg-primary">Install</h2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Until packages are on npm, install from this repo with{" "}
          <Token>file:</Token> dependencies (or workspace links).
        </p>
        <CodeBlock
          className="mt-4"
          lang="bash"
          code={`npm install file:../standard-ui/packages/tokens file:../standard-ui/packages/react`}
        />
        <CodeBlock
          className="mt-4"
          lang="css"
          code={`@import "tailwindcss";
@import "@standard-ui/tokens/css/tokens.css";
@source "./node_modules/@standard-ui/react/src";

@custom-variant dark (&:where(.dark, .dark *));`}
        />
      </section>

      <section className="mt-12">
        <h2 className="heading-sm text-fg-primary">Principles</h2>
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
        <h2 className="heading-sm text-fg-primary">Explore</h2>
        <p className="text-md mt-0.5 mb-6 max-w-3xl text-fg-secondary">
          Start with foundations, then browse components A–Z.
        </p>
        <IntroCards />
      </section>
    </div>
  )
}
