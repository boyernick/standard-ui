import type { Metadata } from "next"
import { CodeBlock } from "@/components/code-block"
import { DocCell, DocTable, Token } from "@/components/doc-table"
import { PageHeader } from "@/components/page-header"
import { SelectExamples } from "./select-examples"

export const metadata: Metadata = {
  title: "Select",
}

export default function SelectPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader
        title="Select"
        description="Single-choice menu for forms and filters. Prefer select when options are longer than a short radio group."
      />

      <section className="mt-2">
        <h2 className="heading-sm text-fg-primary">Examples</h2>
        <SelectExamples />
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">Overview</h2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Select is a composed Base UI control: trigger with value and icon,
          then a portaled popup list of items. Pass an{" "}
          <Token>items</Token> map on the root so SelectValue can show labels
          instead of raw values.
        </p>
        <CodeBlock
          className="mt-4"
          code={`import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectIcon,
  SelectPortal,
  SelectPositioner,
  SelectPopup,
  SelectList,
  SelectItem,
  SelectItemText,
} from "@standard-ui/react"

<Select
  items={{ apple: "Apple", banana: "Banana", cherry: "Cherry" }}
  defaultValue="apple"
>
  <SelectTrigger>
    <SelectValue />
    <SelectIcon />
  </SelectTrigger>
  <SelectPortal>
    <SelectPositioner>
      <SelectPopup>
        <SelectList>
          <SelectItem value="apple">
            <SelectItemText>Apple</SelectItemText>
          </SelectItem>
        </SelectList>
      </SelectPopup>
    </SelectPositioner>
  </SelectPortal>
</Select>`}
        />
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">Usage</h2>

        <h3 className="heading-xs mt-8 text-fg-primary">Items map</h3>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          When you pass <Token>items</Token>, SelectValue renders the matching
          label for the selected value. Keep keys aligned with each item&apos;s{" "}
          <Token>value</Token>.
        </p>
        <CodeBlock
          className="mt-4"
          size="sm"
          code={`<Select
  items={{ apple: "Apple", banana: "Banana", cherry: "Cherry" }}
  defaultValue="apple"
>
  {/* trigger + popup */}
</Select>`}
        />

        <h3 className="heading-xs mt-10 text-fg-primary">Anatomy</h3>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Compose the full tree so positioning and accessibility stay intact:
          trigger → portal → positioner → popup → list → item.
        </p>
        <CodeBlock
          className="mt-4"
          size="sm"
          code={`Select
  SelectTrigger
    SelectValue
    SelectIcon
  SelectPortal
    SelectPositioner
      SelectPopup
        SelectList
          SelectItem
            SelectItemText`}
        />
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">API</h2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Root accepts Base UI Select props. Common props and parts:
        </p>
        <DocTable headers={["Prop / part", "Type", "Default", "Description"]}>
          <tr>
            <DocCell mono>items</DocCell>
            <DocCell mono>Record&lt;string, ReactNode&gt;</DocCell>
            <DocCell mono>—</DocCell>
            <DocCell>Value → label map for SelectValue.</DocCell>
          </tr>
          <tr>
            <DocCell mono>defaultValue</DocCell>
            <DocCell mono>string | null</DocCell>
            <DocCell mono>—</DocCell>
            <DocCell>Uncontrolled initial value.</DocCell>
          </tr>
          <tr>
            <DocCell mono>value</DocCell>
            <DocCell mono>string | null</DocCell>
            <DocCell mono>—</DocCell>
            <DocCell>Controlled value.</DocCell>
          </tr>
          <tr>
            <DocCell mono>onValueChange</DocCell>
            <DocCell mono>
              (value, event) =&gt; void
            </DocCell>
            <DocCell mono>—</DocCell>
            <DocCell>Called when the selection changes.</DocCell>
          </tr>
          <tr>
            <DocCell mono>disabled</DocCell>
            <DocCell mono>boolean</DocCell>
            <DocCell mono>false</DocCell>
            <DocCell>Disables the select.</DocCell>
          </tr>
          <tr>
            <DocCell mono>SelectTrigger</DocCell>
            <DocCell mono>—</DocCell>
            <DocCell mono>—</DocCell>
            <DocCell>Opens the popup; hosts value and icon.</DocCell>
          </tr>
          <tr>
            <DocCell mono>SelectItem</DocCell>
            <DocCell mono>—</DocCell>
            <DocCell mono>—</DocCell>
            <DocCell>
              Option row. Requires a <Token>value</Token>.
            </DocCell>
          </tr>
        </DocTable>
      </section>

      <section className="mt-14 mb-8">
        <h2 className="heading-sm text-fg-primary">Guidelines</h2>

        <h3 className="heading-xs mt-8 text-fg-primary">Do</h3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>
            Pass <Token>items</Token> when values differ from display labels
          </li>
          <li>Keep option labels short and scannable</li>
          <li>Use a placeholder on SelectValue when nothing is selected</li>
        </ul>

        <h3 className="heading-xs mt-8 text-fg-primary">Don't</h3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>
            Don&apos;t skip SelectPositioner — placement depends on it
          </li>
          <li>
            Don&apos;t use select for binary on/off — prefer Switch
          </li>
          <li>
            Don&apos;t leave items without a stable <Token>value</Token>
          </li>
        </ul>
      </section>
    </div>
  )
}
