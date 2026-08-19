import type { Metadata } from "next"
import { CodeBlock } from "@/components/code-block"
import { DocCell, DocTable, Token } from "@/components/doc-table"
import { PageHeader } from "@/components/page-header"
import { ContextMenuExamples } from "./context-menu-examples"

export const metadata: Metadata = {
  title: "Context menu",
}

export default function ContextMenuPage() {
  return (
    <div className="w-full">
      <PageHeader
        title="Context menu"
        description="Right-click (or long-press) menu for in-place actions on a region or object. Same item patterns as Menu."
      />

      <section className="mt-2">
        <h2 className="heading-sm text-fg-primary">Examples</h2>
        <ContextMenuExamples />
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">Overview</h2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Context menu opens from a trigger surface instead of a button. Compose
          portal, positioner, and popup the same way as Menu. Prefer Menu when
          the entry point is an explicit control.
        </p>
        <CodeBlock
          className="mt-4"
          code={`import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuPortal,
  ContextMenuPositioner,
  ContextMenuPopup,
  ContextMenuItem,
  ContextMenuSeparator,
} from "@standard-ui/react"

<ContextMenu>
  <ContextMenuTrigger>Right-click here</ContextMenuTrigger>
  <ContextMenuPortal>
    <ContextMenuPositioner>
      <ContextMenuPopup>
        <ContextMenuItem>Copy</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>Delete</ContextMenuItem>
      </ContextMenuPopup>
    </ContextMenuPositioner>
  </ContextMenuPortal>
</ContextMenu>`}
        />
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">Usage</h2>

        <h3 className="heading-xs mt-8 text-fg-primary">Trigger</h3>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Style the trigger as the interactive region (canvas, row, card). The
          menu opens on secondary click / context menu gesture.
        </p>
        <CodeBlock
          className="mt-4"
          size="sm"
          code={`<ContextMenuTrigger className="rounded-xl border border-dashed …">
  Right-click here
</ContextMenuTrigger>`}
        />

        <h3 className="heading-xs mt-10 text-fg-primary">Anatomy</h3>
        <CodeBlock
          className="mt-4"
          size="sm"
          code={`ContextMenu
  ContextMenuTrigger
  ContextMenuPortal
    ContextMenuPositioner
      ContextMenuPopup
        ContextMenuItem
        ContextMenuSeparator`}
        />
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">API</h2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Parts mirror Base UI Context Menu and align with Menu.
        </p>
        <DocTable headers={["Part", "Role"]}>
          <tr>
            <DocCell mono>ContextMenu</DocCell>
            <DocCell>Root state and open control.</DocCell>
          </tr>
          <tr>
            <DocCell mono>ContextMenuTrigger</DocCell>
            <DocCell>Region that opens on context menu gesture.</DocCell>
          </tr>
          <tr>
            <DocCell mono>ContextMenuPopup</DocCell>
            <DocCell>Surface for items, groups, and separators.</DocCell>
          </tr>
          <tr>
            <DocCell mono>ContextMenuItem</DocCell>
            <DocCell>Action row that closes the menu by default.</DocCell>
          </tr>
          <tr>
            <DocCell mono>ContextMenuSubmenuRoot</DocCell>
            <DocCell>Nested menu with ContextMenuSubmenuTrigger.</DocCell>
          </tr>
        </DocTable>
        <p className="text-md mt-4 max-w-3xl text-fg-secondary">
          Also exports checkbox, radio, group, and link item parts — same roles
          as Menu, prefixed with <Token>ContextMenu</Token>.
        </p>
      </section>

      <section className="mt-14 mb-8">
        <h2 className="heading-sm text-fg-primary">Guidelines</h2>

        <h3 className="heading-xs mt-8 text-fg-primary">Do</h3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>Scope the trigger to the object the actions apply to</li>
          <li>Mirror common OS actions (cut, copy) when they fit</li>
          <li>Keep destructive actions separated at the bottom</li>
        </ul>

        <h3 className="heading-xs mt-8 text-fg-primary">Don&apos;t</h3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>
            Don&apos;t hide the only path to a primary action in a context menu
          </li>
          <li>Don&apos;t use context menu for form value selection</li>
          <li>Don&apos;t nest deep submenu trees on mobile surfaces</li>
        </ul>
      </section>
    </div>
  )
}
