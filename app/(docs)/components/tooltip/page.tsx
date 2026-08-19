import type { Metadata } from "next"
import { CodeBlock } from "@/components/code-block"
import { DocCell, DocTable, Token } from "@/components/doc-table"
import { PageHeader } from "@/components/page-header"
import { TooltipExamples } from "./tooltip-examples"

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
        <h2 className="heading-sm text-fg-primary">Examples</h2>
        <TooltipExamples />
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">Overview</h2>
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
} from "@standard-ui/react"

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
        <h2 className="heading-sm text-fg-primary">Usage</h2>

        <h3 className="heading-xs mt-8 text-fg-primary">Provider</h3>
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

        <h3 className="heading-xs mt-10 text-fg-primary">Copy</h3>
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
        <h2 className="heading-sm text-fg-primary">API</h2>
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
        <h2 className="heading-sm text-fg-primary">Guidelines</h2>

        <h3 className="heading-xs mt-8 text-fg-primary">Do</h3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>
            Wrap with <Token>TooltipProvider</Token>
          </li>
          <li>Use tooltips for icon-only controls and truncated text</li>
          <li>Keep copy short and action-oriented</li>
        </ul>

        <h3 className="heading-xs mt-8 text-fg-primary">Don't</h3>
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
