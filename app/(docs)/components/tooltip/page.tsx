import type { Metadata } from "next"
import { CodeBlock } from "@/components/code-block"
import { DocCell, DocTable, Token } from "@/components/doc-table"
import { PageHeader } from "@/components/page-header"
import { TooltipExamples } from "./tooltip-examples"
import { H2, H3 } from "@/components/prose"

export const metadata: Metadata = {
  title: "Tooltip",
}

export default function TooltipPage() {
  return (
    <div className="w-full">
      <PageHeader
        title="Tooltip"
        description="Short hint on hover or focus. Use for icon buttons and truncated labels — not for critical instructions."
      />

      <section className="mt-2">
        <H2>Examples</H2>
        <TooltipExamples />
      </section>

      <section className="mt-14">
        <H2>Overview</H2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Wrap demos (and usually your app subtree) in{" "}
          <Token>TooltipProvider</Token>. Each tooltip is a root with a trigger,
          portal, positioner, and popup. Style the trigger with Button via{" "}
          <Token>render</Token>.
        </p>
        <CodeBlock
          className="mt-4"
          code={`import {
  Button,
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipPortal,
  TooltipPositioner,
  TooltipPopup,
} from "@boyernick/standard-ui-react"

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger render={<Button />}>Save</TooltipTrigger>
    <TooltipPortal>
      <TooltipPositioner>
        <TooltipPopup>Save changes</TooltipPopup>
      </TooltipPositioner>
    </TooltipPortal>
  </Tooltip>
</TooltipProvider>`}
        />
      </section>

      <section className="mt-14">
        <H2>Usage</H2>

        <H3>Provider</H3>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Place one <Token>TooltipProvider</Token> near the top of the tree so
          delay and grouping stay consistent across tooltips.
        </p>
        <CodeBlock
          className="mt-4"
          size="sm"
          code={`<TooltipProvider>
  {/* tooltips */}
</TooltipProvider>`}
        />

        <H3 className="mt-10">Copy</H3>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Keep popup text to a few words. Name the action the control performs —
          for example &quot;Save changes&quot; on a Save button.
        </p>
        <CodeBlock
          className="mt-4"
          size="sm"
          code={`<TooltipPopup>Save changes</TooltipPopup>`}
        />
      </section>

      <section className="mt-14">
        <H2>API</H2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Parts mirror Base UI Tooltip. Prefer{" "}
          <Token>render=&#123;&lt;Button /&gt;&#125;</Token> on the trigger.
        </p>
        <DocTable headers={["Part", "Role"]}>
          <tr>
            <DocCell mono>TooltipProvider</DocCell>
            <DocCell>Shared delay and provider context.</DocCell>
          </tr>
          <tr>
            <DocCell mono>Tooltip</DocCell>
            <DocCell>Root open state for one tooltip.</DocCell>
          </tr>
          <tr>
            <DocCell mono>TooltipTrigger</DocCell>
            <DocCell>Anchor that opens the tooltip. Use Button via render.</DocCell>
          </tr>
          <tr>
            <DocCell mono>TooltipPortal</DocCell>
            <DocCell>Renders the popup outside the tree.</DocCell>
          </tr>
          <tr>
            <DocCell mono>TooltipPositioner</DocCell>
            <DocCell>
              Positions the popup. Default <Token>sideOffset</Token> is 6.
            </DocCell>
          </tr>
          <tr>
            <DocCell mono>TooltipPopup</DocCell>
            <DocCell>Visible hint content.</DocCell>
          </tr>
        </DocTable>
      </section>

      <section className="mt-14 mb-8">
        <H2>Guidelines</H2>

        <H3>Do</H3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>
            Wrap with <Token>TooltipProvider</Token>
          </li>
          <li>Use tooltips for icon-only controls and truncated text</li>
          <li>Keep copy short and action-oriented</li>
        </ul>

        <H3>Don&rsquo;t</H3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>
            Don&apos;t put essential instructions only in a tooltip
          </li>
          <li>
            Don&apos;t nest a Button inside TooltipTrigger — use{" "}
            <Token>render</Token>
          </li>
          <li>
            Don&apos;t use long paragraphs or interactive content in the popup
          </li>
        </ul>
      </section>
    </div>
  )
}
