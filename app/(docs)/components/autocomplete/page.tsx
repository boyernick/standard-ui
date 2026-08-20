import type { Metadata } from "next"
import { CodeBlock } from "@/components/code-block"
import { DocCell, DocTable, Token } from "@/components/doc-table"
import { PageHeader } from "@/components/page-header"
import { AutocompleteExamples } from "./autocomplete-examples"
import { H2, H3 } from "@/components/prose"
import { PropsTable, StylingPropsNote, type GeneratedFamily } from "@/components/api-table"
import autocompleteApi from "@/lib/generated/api/autocomplete.json"

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
        <H2>Examples</H2>
        <AutocompleteExamples />
      </section>

      <section className="mt-14">
        <H2>Overview</H2>
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
        <H2>Usage</H2>

        <H3>Items</H3>
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

        <H3 className="mt-10">Auto highlight</H3>
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
        <H2>API</H2>
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
        <H3>Autocomplete props</H3>
        <PropsTable family={autocompleteApi as GeneratedFamily} part="Autocomplete" />
        <StylingPropsNote />

        <H2>Guidelines</H2>

        <H3>Do</H3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>Allow values outside the list when freeform input is valid</li>
          <li>Show an empty state when nothing matches</li>
          <li>Use Combobox when the value must be one of the items</li>
        </ul>

        <H3>Don&apos;t</H3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>Don&apos;t overload Autocomplete as a multi-select — use Combobox</li>
          <li>Don&apos;t hide the clear control on long queries</li>
          <li>Don&apos;t open suggestions with no items and no empty message</li>
        </ul>
      </section>
    </div>
  )
}
