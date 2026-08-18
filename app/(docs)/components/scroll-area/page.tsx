import type { Metadata } from "next"
import { CodeBlock } from "@/components/code-block"
import { DocCell, DocTable, Token } from "@/components/doc-table"
import { PageHeader } from "@/components/page-header"
import { ScrollAreaExamples } from "./scroll-area-examples"

export const metadata: Metadata = {
  title: "Scroll area",
}

export default function ScrollAreaPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader
        title="Scroll area"
        description="Custom scrollable region with a styled scrollbar. Use when native overflow would break a fixed layout."
      />

      <section className="mt-2">
        <h2 className="heading-sm text-fg-primary">Examples</h2>
        <ScrollAreaExamples />
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">Overview</h2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Scroll area composes a root, viewport, content, scrollbar, and thumb.
          Give the root a fixed height (or width for horizontal scroll) so
          overflow can appear. Built on Base UI Scroll Area.
        </p>
        <CodeBlock
          className="mt-4"
          code={`import {
  ScrollArea,
  ScrollAreaViewport,
  ScrollAreaContent,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
} from "@standard-ui/react"

<ScrollArea className="h-48">
  <ScrollAreaViewport>
    <ScrollAreaContent>
      {/* long content */}
    </ScrollAreaContent>
  </ScrollAreaViewport>
  <ScrollAreaScrollbar orientation="vertical">
    <ScrollAreaThumb />
  </ScrollAreaScrollbar>
</ScrollArea>`}
        />
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">Usage</h2>

        <h3 className="heading-xs mt-8 text-fg-primary">Structure</h3>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Put scrollable children inside <Token>ScrollAreaContent</Token>,
          nested in <Token>ScrollAreaViewport</Token>. Add a scrollbar with
          matching orientation and a <Token>ScrollAreaThumb</Token>.
        </p>
        <CodeBlock
          className="mt-4"
          size="sm"
          code={`<ScrollArea className="h-48 w-full">
  <ScrollAreaViewport>
    <ScrollAreaContent className="p-4">
      …
    </ScrollAreaContent>
  </ScrollAreaViewport>
  <ScrollAreaScrollbar orientation="vertical">
    <ScrollAreaThumb />
  </ScrollAreaScrollbar>
</ScrollArea>`}
        />

        <h3 className="heading-xs mt-10 text-fg-primary">Orientation</h3>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Set <Token>orientation=&quot;vertical&quot;</Token> or{" "}
          <Token>&quot;horizontal&quot;</Token> on the scrollbar. Default is
          vertical.
        </p>
        <CodeBlock
          className="mt-4"
          size="sm"
          code={`<ScrollAreaScrollbar orientation="vertical">
  <ScrollAreaThumb />
</ScrollAreaScrollbar>`}
        />
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">API</h2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Parts mirror Base UI Scroll Area. Style the root for size and
          overflow; compose scrollbar and thumb for the track.
        </p>
        <DocTable headers={["Part", "Role"]}>
          <tr>
            <DocCell mono>ScrollArea</DocCell>
            <DocCell>Root container. Set a fixed height or width.</DocCell>
          </tr>
          <tr>
            <DocCell mono>ScrollAreaViewport</DocCell>
            <DocCell>Focusable scrolling viewport.</DocCell>
          </tr>
          <tr>
            <DocCell mono>ScrollAreaContent</DocCell>
            <DocCell>Wraps the scrollable children.</DocCell>
          </tr>
          <tr>
            <DocCell mono>ScrollAreaScrollbar</DocCell>
            <DocCell>Track for vertical or horizontal scroll.</DocCell>
          </tr>
          <tr>
            <DocCell mono>ScrollAreaThumb</DocCell>
            <DocCell>Draggable thumb inside the scrollbar.</DocCell>
          </tr>
        </DocTable>

        <h3 className="heading-xs mt-10 text-fg-primary">
          ScrollAreaScrollbar
        </h3>
        <DocTable headers={["Prop", "Type", "Default", "Description"]}>
          <tr>
            <DocCell mono>orientation</DocCell>
            <DocCell mono>
              &quot;vertical&quot; | &quot;horizontal&quot;
            </DocCell>
            <DocCell mono>&quot;vertical&quot;</DocCell>
            <DocCell>Scroll direction the bar controls.</DocCell>
          </tr>
          <tr>
            <DocCell mono>keepMounted</DocCell>
            <DocCell mono>boolean</DocCell>
            <DocCell mono>false</DocCell>
            <DocCell>
              Keep the bar in the DOM when content is not scrollable.
            </DocCell>
          </tr>
        </DocTable>
      </section>

      <section className="mt-14 mb-8">
        <h2 className="heading-sm text-fg-primary">Guidelines</h2>

        <h3 className="heading-xs mt-8 text-fg-primary">Do</h3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>
            Give the root a constrained size so overflow is intentional
          </li>
          <li>
            Use in sidebars, dialogs, and panels where native scrollbars clash
            with chrome
          </li>
          <li>Keep paragraphs short so scrolling content stays scannable</li>
        </ul>

        <h3 className="heading-xs mt-8 text-fg-primary">Don't</h3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>
            Don&apos;t wrap the whole page — prefer native document scroll
          </li>
          <li>
            Don&apos;t omit a scrollbar when content can overflow
          </li>
          <li>
            Don&apos;t nest scroll areas unless both axes are clearly needed
          </li>
        </ul>
      </section>
    </div>
  )
}
