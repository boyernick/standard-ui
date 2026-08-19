import type { Metadata } from "next"
import { CodeBlock } from "@/components/code-block"
import { DocCell, DocTable, Token } from "@/components/doc-table"
import { PageHeader } from "@/components/page-header"
import { MenuExamples } from "./menu-examples"

export const metadata: Metadata = {
  title: "Menu",
}

export default function MenuPage() {
  return (
    <div className="w-full">
      <PageHeader
        title="Menu"
        description="Action list anchored to a trigger. Use for overflow actions, account menus, and in-context commands."
      />

      <section className="mt-2">
        <h2 className="heading-sm text-fg-primary">Examples</h2>
        <MenuExamples />
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">Overview</h2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Menu opens a positioned list of items from a trigger. Compose portal,
          positioner, and popup. Style the trigger with Button via{" "}
          <Token>render</Token>. Prefer Select or Combobox when the goal is
          choosing a form value.
        </p>
        <CodeBlock
          className="mt-4"
          code={`import {
  Button,
  Menu,
  MenuTrigger,
  MenuPortal,
  MenuPositioner,
  MenuPopup,
  MenuItem,
  MenuSeparator,
} from "@boyernick/standard-ui-react"

<Menu>
  <MenuTrigger render={<Button variant="outline" />}>
    Open menu
  </MenuTrigger>
  <MenuPortal>
    <MenuPositioner>
      <MenuPopup>
        <MenuItem>Profile</MenuItem>
        <MenuItem>Billing</MenuItem>
        <MenuSeparator />
        <MenuItem>Sign out</MenuItem>
      </MenuPopup>
    </MenuPositioner>
  </MenuPortal>
</Menu>`}
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
          code={`<MenuTrigger render={<Button variant="outline" />}>
  Open menu
</MenuTrigger>`}
        />

        <h3 className="heading-xs mt-10 text-fg-primary">Anatomy</h3>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Keep the full tree so positioning and keyboard behavior stay intact.
        </p>
        <CodeBlock
          className="mt-4"
          size="sm"
          code={`Menu
  MenuTrigger
  MenuPortal
    MenuPositioner
      MenuPopup
        MenuItem
        MenuSeparator`}
        />
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">API</h2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Parts mirror Base UI Menu. Common parts:
        </p>
        <DocTable headers={["Part", "Role"]}>
          <tr>
            <DocCell mono>Menu</DocCell>
            <DocCell>Root state and open control.</DocCell>
          </tr>
          <tr>
            <DocCell mono>MenuTrigger</DocCell>
            <DocCell>Opens the menu. Use Button via render.</DocCell>
          </tr>
          <tr>
            <DocCell mono>MenuPopup</DocCell>
            <DocCell>Surface for items, groups, and separators.</DocCell>
          </tr>
          <tr>
            <DocCell mono>MenuItem</DocCell>
            <DocCell>Action row that closes the menu by default.</DocCell>
          </tr>
          <tr>
            <DocCell mono>MenuCheckboxItem</DocCell>
            <DocCell>Toggleable preference inside the menu.</DocCell>
          </tr>
          <tr>
            <DocCell mono>MenuRadioGroup</DocCell>
            <DocCell>Single-choice options inside the menu.</DocCell>
          </tr>
          <tr>
            <DocCell mono>MenuSubmenuRoot</DocCell>
            <DocCell>Nested menu with MenuSubmenuTrigger.</DocCell>
          </tr>
        </DocTable>
      </section>

      <section className="mt-14 mb-8">
        <h2 className="heading-sm text-fg-primary">Guidelines</h2>

        <h3 className="heading-xs mt-8 text-fg-primary">Do</h3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>Use menus for actions and preferences, not long forms</li>
          <li>Group related items and separate destructive actions</li>
          <li>Keep labels short and verb-led when they perform an action</li>
        </ul>

        <h3 className="heading-xs mt-8 text-fg-primary">Don&apos;t</h3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>
            Don&apos;t nest a Button inside MenuTrigger — use{" "}
            <Token>render</Token>
          </li>
          <li>
            Don&apos;t use Menu when Select or Combobox fits the form better
          </li>
          <li>Don&apos;t bury primary actions only in a menu</li>
        </ul>
      </section>
    </div>
  )
}
