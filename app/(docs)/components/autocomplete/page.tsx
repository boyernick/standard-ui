import type { Metadata } from "next"
import { CodeBlock } from "@/components/code-block"
import { DocCell, DocTable, Token } from "@/components/doc-table"
import { PageHeader } from "@/components/page-header"
import { AutocompleteExamples } from "./autocomplete-examples"

export const metadata: Metadata = {
  title: "Autocomplete",
}

export default function AutocompletePage() {
  return (
    <div className="w-full">
      <PageHeader
        title="Autocomplete"
        description="Text field with filtered suggestions. Prefer Combobox when selecting a closed set of values; use Autocomplete for freeform input with hints."
      />

      <section className="mt-2">
        <h2 className="heading-sm text-fg-primary">Examples</h2>
        <AutocompleteExamples />
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">Overview</h2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Pass <Token>items</Token> to the root and render a filtered list in
          the popup. The input stays editable; choosing an item fills the field.
        </p>
        <CodeBlock
          className="mt-4"
          code={`import {
  Autocomplete,
  AutocompleteInputGroup,
  AutocompleteInput,
  AutocompleteClear,
  AutocompletePortal,
  AutocompletePositioner,
  AutocompletePopup,
  AutocompleteEmpty,
  AutocompleteList,
  AutocompleteItem,
} from "@boyernick/standard-ui-react"

<Autocomplete items={tags}>
  <AutocompleteInputGroup>
    <AutocompleteInput placeholder="Search tags…" />
    <AutocompleteClear />
  </AutocompleteInputGroup>
  <AutocompletePortal>
    <AutocompletePositioner>
      <AutocompletePopup>
        <AutocompleteEmpty>No tags found.</AutocompleteEmpty>
        <AutocompleteList>
          {(item) => (
            <AutocompleteItem key={item} value={item}>
              {item}
            </AutocompleteItem>
          )}
        </AutocompleteList>
      </AutocompletePopup>
    </AutocompletePositioner>
  </AutocompletePortal>
</Autocomplete>`}
        />
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">Usage</h2>

        <h3 className="heading-xs mt-8 text-fg-primary">Items</h3>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Infer item type from <Token>items</Token>. List children can be a
          render function over each item.
        </p>
        <CodeBlock
          className="mt-4"
          size="sm"
          code={`<Autocomplete items={tags}>
  <AutocompleteList>
    {(item) => (
      <AutocompleteItem key={item} value={item}>
        {item}
      </AutocompleteItem>
    )}
  </AutocompleteList>
</Autocomplete>`}
        />

        <h3 className="heading-xs mt-10 text-fg-primary">Auto highlight</h3>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Set <Token>autoHighlight</Token> so the first match highlights as the
          user types.
        </p>
        <CodeBlock
          className="mt-4"
          size="sm"
          code={`<Autocomplete items={tags} autoHighlight>`}
        />
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">API</h2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Parts mirror Base UI Autocomplete. Common parts:
        </p>
        <DocTable headers={["Part", "Role"]}>
          <tr>
            <DocCell mono>Autocomplete</DocCell>
            <DocCell>Root state, items, and filter behavior.</DocCell>
          </tr>
          <tr>
            <DocCell mono>AutocompleteInputGroup</DocCell>
            <DocCell>Styled shell for input, clear, and trigger.</DocCell>
          </tr>
          <tr>
            <DocCell mono>AutocompleteInput</DocCell>
            <DocCell>Editable text field.</DocCell>
          </tr>
          <tr>
            <DocCell mono>AutocompletePopup</DocCell>
            <DocCell>Suggestion surface with list and empty state.</DocCell>
          </tr>
          <tr>
            <DocCell mono>AutocompleteItem</DocCell>
            <DocCell>Selectable suggestion row.</DocCell>
          </tr>
        </DocTable>
      </section>

      <section className="mt-14 mb-8">
        <h2 className="heading-sm text-fg-primary">Guidelines</h2>

        <h3 className="heading-xs mt-8 text-fg-primary">Do</h3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>Allow values outside the list when freeform input is valid</li>
          <li>Show an empty state when nothing matches</li>
          <li>Use Combobox when the value must be one of the items</li>
        </ul>

        <h3 className="heading-xs mt-8 text-fg-primary">Don&apos;t</h3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>Don&apos;t overload Autocomplete as a multi-select — use Combobox</li>
          <li>Don&apos;t hide the clear control on long queries</li>
          <li>Don&apos;t open suggestions with no items and no empty message</li>
        </ul>
      </section>
    </div>
  )
}
