import type { Metadata } from "next"
import { CodeBlock } from "@/components/code-block"
import { DocCell, DocTable, Token } from "@/components/doc-table"
import { PageHeader } from "@/components/page-header"
import { MenubarExamples } from "./menubar-examples"
import { H2, H3 } from "@/components/prose"
import { PropsTable, StylingPropsNote, type GeneratedFamily } from "@/components/api-table"
import menubarApi from "@/lib/generated/api/menubar.json"

export const metadata: Metadata = {
  title: "Menubar",
}

export default function MenubarPage() {
  return (
    <div className="w-full">
      <PageHeader
        title="Menubar"
        description="Persistent application menu bar. Compose with Menu parts for File / Edit / View style commands."
      />

      <section className="mt-2">
        <H2>Examples</H2>
        <MenubarExamples />
      </section>

      <section className="mt-14">
        <H2>Overview</H2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Menubar is the horizontal shell. Nest <Token>Menu</Token> trees inside
          for each top-level trigger. Arrow keys move across menus when open.
        </p>
        <CodeBlock
          className="mt-4"
          code={`import {
  Menubar,
  Menu,
  MenuTrigger,
  MenuPortal,
  MenuPositioner,
  MenuPopup,
  MenuItem,
} from "@boyernick/standard-ui-react"

<Menubar>
  <Menu>
    <MenuTrigger>File</MenuTrigger>
    <MenuPortal>
      <MenuPositioner>
        <MenuPopup>
          <MenuItem>New</MenuItem>
        </MenuPopup>
      </MenuPositioner>
    </MenuPortal>
  </Menu>
</Menubar>`}
        />
      </section>

      <section className="mt-14">
        <H2>API</H2>
        <DocTable headers={["Part", "Role"]}>
          <tr>
            <DocCell mono>Menubar</DocCell>
            <DocCell>Orientation, modal, and focus looping for menus.</DocCell>
          </tr>
          <tr>
            <DocCell mono>Menu*</DocCell>
            <DocCell>Reuse the Menu compound parts for each top item.</DocCell>
          </tr>
        </DocTable>
      </section>

      <section className="mt-14 mb-8">
        <H3>Menubar props</H3>
        <PropsTable family={menubarApi as GeneratedFamily} part="Menubar" />
        <StylingPropsNote />

        <H2>Guidelines</H2>
        <H3>Do</H3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>Keep top-level labels short (File, Edit, View)</li>
          <li>Group destructive actions with a separator</li>
        </ul>
        <H3>Don&apos;t</H3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>Don&apos;t use Menubar for site navigation — use Navigation menu</li>
          <li>Don&apos;t bury the only path to a primary action in a menubar</li>
        </ul>
      </section>
    </div>
  )
}
