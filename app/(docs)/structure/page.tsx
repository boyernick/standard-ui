import type { Metadata } from "next"
import { CodeBlock } from "@/components/code-block"
import {
  BreakpointsPreview,
  GridPreview,
  SpacingPreviewList,
} from "@/components/layout-preview"
import { DocCell, DocTable, Token } from "@/components/doc-table"
import { PageHeader } from "@/components/page-header"
import {
  breakpoints,
  contentWidths,
  gridPatterns,
  shellMeasures,
  spacingSteps,
} from "@/lib/layout"

export const metadata: Metadata = {
  title: "Structure",
}

export default function StructurePage() {
  return (
    <div className="w-full">
      <PageHeader
        title="Structure"
        description="Spacing, page layout, and breakpoints — how UI sits in the viewport."
      />

      <section className="mt-2">
        <h2 className="heading-sm text-fg-primary">Spacing</h2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Driven by <Token>--spacing</Token> at <Token>0.25rem</Token> (4px).
          Prefer <Token>p-4</Token>, <Token>gap-3</Token>, and{" "}
          <Token>space-y-6</Token> over arbitrary values. Click a row to copy a
          padding class.
        </p>
        <div className="mt-6">
          <SpacingPreviewList />
        </div>
        <DocTable headers={["Step", "Value", "Usage"]}>
          {spacingSteps.map((step) => (
            <tr key={step.token}>
              <DocCell mono>{step.token}</DocCell>
              <DocCell mono>
                {step.rem} ({step.px})
              </DocCell>
              <DocCell>{step.usage}</DocCell>
            </tr>
          ))}
        </DocTable>
        <DocTable headers={["Role", "Typical steps", "Examples"]}>
          {[
            [
              "Inline / control",
              "1 – 3",
              "Icon + label gaps, badge padding, dense rows",
            ],
            [
              "Component padding",
              "3 – 5",
              "Buttons, inputs, cards, menu items",
            ],
            [
              "Section rhythm",
              "6 – 12",
              "Stacked sections, page blocks, form groups",
            ],
            [
              "Page / hero",
              "10 – 16",
              "Major separations and first-viewport breathing room",
            ],
          ].map(([role, steps, examples]) => (
            <tr key={role}>
              <DocCell>{role}</DocCell>
              <DocCell mono>{steps}</DocCell>
              <DocCell>{examples}</DocCell>
            </tr>
          ))}
        </DocTable>
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">Widths and grid</h2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Docs pages center content with a max width, then pad the main column
          with responsive gutters. Grids handle multi-column regions without
          inventing custom track sizes.
        </p>
        <h3 className="heading-xs mt-8 text-fg-primary">Content widths</h3>
        <DocTable headers={["Name", "Class", "Value", "Usage"]}>
          {contentWidths.map((item) => (
            <tr key={item.className}>
              <DocCell>{item.name}</DocCell>
              <DocCell mono>{item.className}</DocCell>
              <DocCell mono>
                {item.value} ({item.px})
              </DocCell>
              <DocCell>{item.usage}</DocCell>
            </tr>
          ))}
        </DocTable>
        <h3 className="heading-xs mt-8 text-fg-primary">Shell measures</h3>
        <DocTable headers={["Name", "Class", "Value", "Usage"]}>
          {shellMeasures.map((item) => (
            <tr key={item.className}>
              <DocCell>{item.name}</DocCell>
              <DocCell mono>{item.className}</DocCell>
              <DocCell mono>
                {item.value} ({item.px})
              </DocCell>
              <DocCell>{item.usage}</DocCell>
            </tr>
          ))}
        </DocTable>
        <h3 className="heading-xs mt-8 text-fg-primary">Grid patterns</h3>
        <div className="mt-4">
          <GridPreview />
        </div>
        <DocTable headers={["Pattern", "Class", "Usage"]}>
          {gridPatterns.map((item) => (
            <tr key={item.name}>
              <DocCell>{item.name}</DocCell>
              <DocCell mono>{item.className}</DocCell>
              <DocCell>{item.usage}</DocCell>
            </tr>
          ))}
        </DocTable>
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">Breakpoints</h2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Mobile-first min-width steps. Base styles apply below the first step;
          each prefix applies from that width upward via{" "}
          <Token>--breakpoint-*</Token>.
        </p>
        <div className="mt-6">
          <BreakpointsPreview />
        </div>
        <DocTable headers={["Name", "Prefix", "Min width", "Usage"]}>
          {breakpoints.map((bp) => (
            <tr key={bp.name}>
              <DocCell mono>{bp.name}</DocCell>
              <DocCell mono>{bp.prefix}</DocCell>
              <DocCell mono>
                {bp.px} ({bp.rem})
              </DocCell>
              <DocCell>{bp.usage}</DocCell>
            </tr>
          ))}
        </DocTable>
        <h3 className="heading-xs mt-8 text-fg-primary">Common patterns</h3>
        <DocTable headers={["Pattern", "Classes", "Notes"]}>
          {[
            [
              "Docs sidebar",
              "hidden md:block",
              "Nav docks from md; TopBar handles smaller viewports.",
            ],
            [
              "Page gutters",
              "px-4 md:px-10 lg:px-14",
              "Padding steps up with available width.",
            ],
            [
              "Two-column grids",
              "grid-cols-1 md:grid-cols-2",
              "Stack on small screens; split from md.",
            ],
            [
              "Dense galleries",
              "grid-cols-2 sm:grid-cols-4",
              "Earlier column increase at sm for tiles.",
            ],
          ].map(([pattern, classes, notes]) => (
            <tr key={pattern}>
              <DocCell>{pattern}</DocCell>
              <DocCell mono>{classes}</DocCell>
              <DocCell>{notes}</DocCell>
            </tr>
          ))}
        </DocTable>
        <CodeBlock
          className="mt-4"
          lang="tsx"
          code={`<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
  <section>…</section>
  <section>…</section>
</div>`}
        />
      </section>

      <section className="mt-14 mb-8">
        <h2 className="heading-sm text-fg-primary">Usage guidelines</h2>

        <h3 className="heading-xs mt-8 text-fg-primary">Do</h3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>
            Use spacing scale utilities (<Token>gap-4</Token>,{" "}
            <Token>p-3</Token>, <Token>mt-6</Token>)
          </li>
          <li>
            Wrap page content in <Token>max-w-5xl</Token> (or{" "}
            <Token>max-w-6xl</Token> for wide galleries); keep guidelines to{" "}
            <Token>max-w-3xl</Token>
          </li>
          <li>
            Write mobile-first, then layer <Token>sm:</Token> /{" "}
            <Token>md:</Token> / <Token>lg:</Token>
          </li>
          <li>
            Match shell behavior: sidebar at <Token>md</Token>, wider gutters
            at <Token>lg</Token>
          </li>
          <li>
            Keep diagrams in neutrals (
            <Token>bg-fg-primary</Token>, <Token>bg-background-tertiary</Token>
            )
          </li>
        </ul>

        <h3 className="heading-xs mt-8 text-fg-primary">Don&rsquo;t</h3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>
            Don&rsquo;t use arbitrary spacing like <Token>p-[13px]</Token> or custom
            breakpoints like <Token>min-[900px]:</Token>
          </li>
          <li>
            Don&rsquo;t stretch unbounded content across ultra-wide viewports
          </li>
          <li>
            Don&rsquo;t design desktop-first and override everything downward
          </li>
          <li>
            Don&rsquo;t change layout at every breakpoint — reserve jumps for real
            structure changes
          </li>
        </ul>
      </section>
    </div>
  )
}
