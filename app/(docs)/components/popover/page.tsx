import type { Metadata } from "next"
import { CodeBlock } from "@/components/code-block"
import { DocCell, DocTable, Token } from "@/components/doc-table"
import { PageHeader } from "@/components/page-header"
import { PopoverExamples } from "./popover-examples"

export const metadata: Metadata = {
  title: "Popover",
}

export default function PopoverPage() {
  return (
    <div className="w-full">
      <PageHeader
        title="Popover"
        description="Anchored surface for light content next to a control. Use for details and short actions that stay in context."
      />

      <section className="mt-2">
        <h2 className="heading-sm text-fg-primary">Examples</h2>
        <PopoverExamples />
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">Overview</h2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Popover opens a positioned popup from a trigger. Compose portal,
          positioner, popup, title, and description. Style the trigger with
          Button via Base UI&apos;s <Token>render</Token> prop.
        </p>
        <CodeBlock
          className="mt-4"
          code={`import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverPortal,
  PopoverPositioner,
  PopoverPopup,
  PopoverTitle,
  PopoverDescription,
} from "@boyernick/standard-ui-react"

<Popover>
  <PopoverTrigger render={<Button variant="outline" />}>
    Notifications
  </PopoverTrigger>
  <PopoverPortal>
    <PopoverPositioner>
      <PopoverPopup>
        <PopoverTitle>Notifications</PopoverTitle>
        <PopoverDescription>
          You're all caught up.
        </PopoverDescription>
      </PopoverPopup>
    </PopoverPositioner>
  </PopoverPortal>
</Popover>`}
        />
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">Usage</h2>

        <h3 className="heading-xs mt-8 text-fg-primary">Trigger</h3>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Pass Button through <Token>render</Token> so the control keeps
          StandardUI styles without nesting buttons.
        </p>
        <CodeBlock
          className="mt-4"
          size="sm"
          code={`<PopoverTrigger render={<Button variant="outline" />}>
  Notifications
</PopoverTrigger>`}
        />

        <h3 className="heading-xs mt-10 text-fg-primary">Structure</h3>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Always include a title. Description is optional but helpful for
          context. Keep content short — prefer a dialog for longer flows.
        </p>
        <CodeBlock
          className="mt-4"
          size="sm"
          code={`<PopoverPopup>
  <PopoverTitle>Notifications</PopoverTitle>
  <PopoverDescription>
    You're all caught up.
  </PopoverDescription>
</PopoverPopup>`}
        />
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">API</h2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Parts mirror Base UI Popover. Prefer{" "}
          <Token>render=&#123;&lt;Button /&gt;&#125;</Token> on the trigger
          for consistent button styles.
        </p>
        <DocTable headers={["Part", "Role"]}>
          <tr>
            <DocCell mono>Popover</DocCell>
            <DocCell>Root state and open control.</DocCell>
          </tr>
          <tr>
            <DocCell mono>PopoverTrigger</DocCell>
            <DocCell>Opens the popover. Use Button via render.</DocCell>
          </tr>
          <tr>
            <DocCell mono>PopoverPortal</DocCell>
            <DocCell>Renders popup content outside the tree.</DocCell>
          </tr>
          <tr>
            <DocCell mono>PopoverPositioner</DocCell>
            <DocCell>Positions the popup relative to the trigger.</DocCell>
          </tr>
          <tr>
            <DocCell mono>PopoverPopup</DocCell>
            <DocCell>Surface for title, body, and actions.</DocCell>
          </tr>
          <tr>
            <DocCell mono>PopoverTitle</DocCell>
            <DocCell>Accessible popover title.</DocCell>
          </tr>
          <tr>
            <DocCell mono>PopoverDescription</DocCell>
            <DocCell>Supporting explanation.</DocCell>
          </tr>
          <tr>
            <DocCell mono>PopoverClose</DocCell>
            <DocCell>Dismisses the popover.</DocCell>
          </tr>
          <tr>
            <DocCell mono>PopoverArrow</DocCell>
            <DocCell>Optional arrow pointing at the trigger.</DocCell>
          </tr>
        </DocTable>
      </section>

      <section className="mt-14 mb-8">
        <h2 className="heading-sm text-fg-primary">Guidelines</h2>

        <h3 className="heading-xs mt-8 text-fg-primary">Do</h3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>Use popovers for lightweight, in-context content</li>
          <li>Provide a clear title and keep copy short</li>
          <li>
            Prefer a dialog when the task needs focus or a longer form
          </li>
        </ul>

        <h3 className="heading-xs mt-8 text-fg-primary">Don&rsquo;t</h3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>
            Don&apos;t nest a Button inside PopoverTrigger — use{" "}
            <Token>render</Token>
          </li>
          <li>
            Don&apos;t put critical instructions only in a popover
          </li>
          <li>
            Don&apos;t leave the popup without a title for screen readers
          </li>
        </ul>
      </section>
    </div>
  )
}
