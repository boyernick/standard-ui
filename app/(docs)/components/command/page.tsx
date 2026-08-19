import type { Metadata } from "next"
import { CodeBlock } from "@/components/code-block"
import { DocCell, DocTable, Token } from "@/components/doc-table"
import { PageHeader } from "@/components/page-header"
import { CommandExamples } from "./command-examples"

export const metadata: Metadata = {
  title: "Command",
}

export default function CommandPage() {
  return (
    <div className="w-full">
      <PageHeader
        title="Command"
        description="Searchable command menu for quick navigation — filters, keyboard selection, and a centered panel."
      />

      <section className="mt-2">
        <h2 className="heading-sm text-fg-primary">Examples</h2>
        <CommandExamples />
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">Overview</h2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Command builds on Dialog for focus trap and dismiss behavior. Style
          matches a site search palette: soft backdrop, tall surface, filter
          pills, and large result rows. Wire query and filter state in your app
          (or use ⌘K / Ctrl+K as in the example).
        </p>
        <CodeBlock
          className="mt-4"
          code={`import {
  Command,
  CommandTrigger,
  CommandPortal,
  CommandBackdrop,
  CommandPopup,
  CommandDialogTitle,
  CommandToolbar,
  CommandInput,
  CommandActions,
  CommandClose,
  CommandContent,
  CommandFilters,
  CommandFilter,
  CommandList,
  CommandItem,
  CommandEmpty,
} from "@standard-ui/react"

<Command>
  <CommandTrigger>Search…</CommandTrigger>
  <CommandPortal>
    <CommandBackdrop />
    <CommandPopup>
      <CommandDialogTitle>Search</CommandDialogTitle>
      <CommandToolbar>
        <CommandInput placeholder="Search…" />
        <CommandActions>
          <CommandClose />
        </CommandActions>
      </CommandToolbar>
      <CommandContent>
        <CommandFilters>
          <CommandFilter selected>All</CommandFilter>
        </CommandFilters>
        <CommandList>
          <CommandItem>Open settings</CommandItem>
        </CommandList>
      </CommandContent>
    </CommandPopup>
  </CommandPortal>
</Command>`}
        />
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">Usage</h2>

        <h3 className="heading-xs mt-8 text-fg-primary">Anatomy</h3>
        <CodeBlock
          className="mt-4"
          size="sm"
          code={`Command
  CommandTrigger
  CommandPortal
    CommandBackdrop
    CommandPopup
      CommandDialogTitle
      CommandToolbar
        CommandInput
        CommandActions
          CommandClear
          CommandDivider
          CommandClose
      CommandContent
        CommandFilters
          CommandFilter
        CommandList
          CommandItem
        CommandEmpty`}
        />

        <h3 className="heading-xs mt-10 text-fg-primary">Keyboard</h3>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Pass <Token>activeOptionId</Token> so the input can expose{" "}
          <Token>aria-activedescendant</Token>. Handle ArrowUp / ArrowDown /
          Enter on the input in your app, matching the example.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">API</h2>
        <DocTable headers={["Part", "Role"]}>
          <tr>
            <DocCell mono>Command</DocCell>
            <DocCell>Dialog root; accepts activeOptionId for a11y.</DocCell>
          </tr>
          <tr>
            <DocCell mono>CommandPopup</DocCell>
            <DocCell>Centered panel (max-w-xl, 32rem tall).</DocCell>
          </tr>
          <tr>
            <DocCell mono>CommandInput</DocCell>
            <DocCell>Search combobox wired to the listbox id.</DocCell>
          </tr>
          <tr>
            <DocCell mono>CommandFilter</DocCell>
            <DocCell>Pill filter with aria-pressed / selected styles.</DocCell>
          </tr>
          <tr>
            <DocCell mono>CommandItem</DocCell>
            <DocCell>
              Result row; pass <Token>href</Token> for links.
            </DocCell>
          </tr>
          <tr>
            <DocCell mono>CommandEmpty</DocCell>
            <DocCell>Empty or loading state in the list area.</DocCell>
          </tr>
        </DocTable>
      </section>

      <section className="mt-14 mb-8">
        <h2 className="heading-sm text-fg-primary">Guidelines</h2>
        <h3 className="heading-xs mt-8 text-fg-primary">Do</h3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>Keep result labels short and scannable</li>
          <li>Include a dialog title (CommandDialogTitle) for screen readers</li>
          <li>Offer a keyboard shortcut when search is a primary action</li>
        </ul>
        <h3 className="heading-xs mt-8 text-fg-primary">Don&apos;t</h3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>Don&apos;t nest forms or dense tables in the panel</li>
          <li>Don&apos;t omit empty state feedback when filters return nothing</li>
        </ul>
      </section>
    </div>
  )
}
