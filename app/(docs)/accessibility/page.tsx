import type { Metadata } from "next"
import { CodeBlock } from "@/components/code-block"
import { DocCell, DocTable, Token } from "@/components/doc-table"
import { PageHeader } from "@/components/page-header"
import { H2, H3 } from "@/components/prose"

export const metadata: Metadata = {
  title: "Accessibility",
}

const checklist = [
  {
    check: "Reachable by keyboard",
    how: "Tab to every interactive element. Anything you can click, you must be able to reach.",
  },
  {
    check: "Visible focus",
    how: "The ring must appear on keyboard focus and not on mouse click — that is what :focus-visible buys.",
  },
  {
    check: "Accessible name",
    how: "Icon-only controls need aria-label. Read the control with a screen reader, not just the DOM.",
  },
  {
    check: "Escape closes",
    how: "Any layer that traps focus — dialog, drawer, popover, menu — must close on Escape and restore focus to its trigger.",
  },
  {
    check: "State is announced",
    how: "Toggles expose aria-pressed or aria-checked; invalid fields expose aria-invalid; busy controls expose aria-busy.",
  },
  {
    check: "Works at 200% zoom",
    how: "Text reflows rather than clipping, and nothing overlaps.",
  },
  {
    check: "Both themes",
    how: "Contrast holds in light and dark. The gray scale inverts; hue scales do not.",
  },
]

export default function AccessibilityPage() {
  return (
    <div className="w-full">
      <PageHeader
        title="Accessibility"
        description="Where behavior comes from, the conventions this system commits to, and what to check before shipping."
      />

      <section className="mt-12">
        <H2>Behavior is inherited, not written</H2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          35 of 62 components wrap{" "}
          <a
            href="https://base-ui.com"
            className="cursor-pointer text-fg-primary underline-offset-2 hover:underline"
          >
            Base UI
          </a>
          , which owns focus management, focus trapping and restoration, ARIA
          roles and relationships, and keyboard interaction. This system owns
          styling.
        </p>
        <p className="text-md mt-4 max-w-3xl text-fg-secondary">
          The practical rule: <strong>do not hand-roll behavior Base UI already
          provides.</strong> A hand-written focus trap or arrow-key handler will
          be subtly wrong, and it will drift from the primitive underneath it.
          If a component seems to be missing an interaction, check the Base UI
          primitive before adding one.
        </p>
      </section>

      <section className="mt-14">
        <H2>Focus</H2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          One ring, used by 26 components. It is a soft 3px ring at 20% opacity
          with a 1px offset, and the border shifts to the ring colour so the
          control keeps a crisp edge inside it.
        </p>
        <CodeBlock
          className="mt-4"
          lang="tsx"
          code={`<button
  type="button"
  className="outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-offset-1 focus-visible:ring-offset-background-primary focus-visible:ring-ring/20"
>
  Save changes
</button>`}
        />
        <p className="text-md mt-4 max-w-3xl text-fg-secondary">
          Always <Token>:focus-visible</Token>, never <Token>:focus</Token> — a
          ring that appears on mouse click reads as an error state. And never
          remove the ring without replacing it; <Token>outline-none</Token> on
          its own is how a component becomes unusable by keyboard.
        </p>
      </section>

      <section className="mt-14">
        <H2>Keyboard</H2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Per-component keyboard tables are not written yet. Rather than
          transcribe the ARIA authoring practices and assume the primitive
          matches, each one needs verifying against the component as it actually
          behaves — the two do diverge.
        </p>

        <H3>A worked example of why</H3>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          The classic accordion pattern moves focus between headers with the
          arrow keys. Base UI does not do this, and says so: its{" "}
          <Token>loopFocus</Token> and <Token>orientation</Token> props are
          marked deprecated, &ldquo;following the APG guidance update to remove
          roving focus. This prop no longer affects keyboard focus behavior.&rdquo;
          Accordion triggers are ordinary buttons in the tab order.
        </p>
        <p className="text-md mt-4 max-w-3xl text-fg-secondary">
          Documenting the textbook pattern would have described keys that do
          nothing. Tabs, by contrast, do use roving tabindex and arrow keys —
          and move focus without changing selection, so activation is manual.
          The two components sit in the same library and follow different rules.
        </p>

        <H3>What holds everywhere</H3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>
            Everything interactive is reachable with <Token>Tab</Token>, in
            document order
          </li>
          <li>
            <Token>Escape</Token> closes any layer that took focus, and focus
            returns to whatever opened it
          </li>
          <li>
            <Token>Enter</Token> and <Token>Space</Token> activate buttons;{" "}
            <Token>Space</Token> toggles checkboxes and switches
          </li>
          <li>
            A component that manages a group with arrow keys uses roving
            tabindex, so the group is one tab stop rather than many
          </li>
        </ul>
      </section>

      <section className="mt-14">
        <H2>Naming</H2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          The most common real failure in this system is an icon-only control
          with no accessible name. There is no visible text, so without{" "}
          <Token>aria-label</Token> a screen reader announces
          &ldquo;button&rdquo; and nothing else.
        </p>
        <CodeBlock
          className="mt-4"
          lang="tsx"
          code={`import { Button, IconX } from "@boyernick/standard-ui-react"

{/* Wrong — announces as "button" */}
<Button iconOnly><IconX /></Button>

{/* Right */}
<Button iconOnly aria-label="Dismiss"><IconX /></Button>`}
        />
        <p className="text-md mt-4 max-w-3xl text-fg-secondary">
          Decorative icons take <Token>aria-hidden</Token> so they are not
          announced twice — that is why it is the most-used ARIA attribute in
          the component sources.
        </p>
      </section>

      <section className="mt-14">
        <H2>Before shipping</H2>
        <DocTable minWidthClass="min-w-[40rem]" headers={["Check", "How"]}>
          {checklist.map((item) => (
            <tr key={item.check}>
              <DocCell>{item.check}</DocCell>
              <DocCell>{item.how}</DocCell>
            </tr>
          ))}
        </DocTable>
        <p className="text-md mt-4 max-w-3xl text-fg-secondary">
          Automated checks catch contrast and missing names. They do not catch a
          focus order that makes no sense, a dialog that drops focus on close, or
          a control that is reachable but unusable. Tab through the thing.
        </p>
      </section>
    </div>
  )
}
