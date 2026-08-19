import type { Metadata } from "next"
import {
  CodeBlock,
  IllustrationEmpty,
  IllustrationError,
  IllustrationSearch,
  IllustrationSuccess,
} from "@boyernick/standard-ui-react"
import { PageHeader } from "@/components/page-header"

export const metadata: Metadata = {
  title: "Illustrations",
}

const illustrations = [
  { name: "Empty", Illustration: IllustrationEmpty },
  { name: "Error", Illustration: IllustrationError },
  { name: "Success", Illustration: IllustrationSuccess },
  { name: "Search", Illustration: IllustrationSearch },
] as const

export default function IllustrationsPage() {
  return (
    <div className="w-full">
      <PageHeader
        title="Illustrations"
        description="Simple state illustrations that inherit foreground and brand tokens across themes."
      />

      <section className="mt-2">
        <h2 className="heading-sm text-fg-primary">States</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {illustrations.map(({ name, Illustration }) => (
            <figure
              key={name}
              className="overflow-hidden rounded-2xl border border-border-primary bg-background-secondary"
            >
              <div className="flex min-h-56 items-center justify-center p-6">
                <Illustration className="h-auto w-full max-w-60" />
              </div>
              <figcaption className="border-t border-border-primary bg-surface px-4 py-3 text-sm text-fg-secondary">
                {name}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">Usage</h2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Pair an illustration with a concise heading, a useful explanation,
          and an action when recovery is possible. SVG strokes use current
          color while emphasis follows brand tokens, so no theme-specific
          assets are required.
        </p>
        <CodeBlock
          className="mt-4"
          code={`import { IllustrationEmpty } from "@boyernick/standard-ui-react"

<div className="text-fg-tertiary">
  <IllustrationEmpty className="w-60" />
  <h2>No projects yet</h2>
  <p>Create a project to start organizing your work.</p>
</div>`}
        />
      </section>

      <section className="mt-14 mb-8 grid gap-10 md:grid-cols-2">
        <div>
          <h2 className="heading-sm text-fg-primary">Do</h2>
          <ul className="text-md mt-4 list-disc space-y-2 pl-5 text-fg-secondary">
            <li>Choose the illustration that matches the system state</li>
            <li>Keep illustrations secondary to the message and action</li>
            <li>Use the inherited token colors in light and dark themes</li>
          </ul>
        </div>
        <div>
          <h2 className="heading-sm text-fg-primary">Don&apos;t</h2>
          <ul className="text-md mt-4 list-disc space-y-2 pl-5 text-fg-secondary">
            <li>Don&apos;t use an error illustration for an empty first-run state</li>
            <li>Don&apos;t replace actionable guidance with decoration</li>
            <li>Don&apos;t apply raw fill colors that break theme support</li>
          </ul>
        </div>
      </section>
    </div>
  )
}
