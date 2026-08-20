import type { Metadata } from "next"
import { CodeBlock } from "@/components/code-block"
import { DocCell, DocTable, Token } from "@/components/doc-table"
import { PageHeader } from "@/components/page-header"
import { ComboboxExamples } from "./combobox-examples"
import { H2, H3 } from "@/components/prose"
import { PropsTable, StylingPropsNote, type GeneratedFamily } from "@/components/api-table"
import comboboxApi from "@/lib/generated/api/combobox.json"

export const metadata: Metadata = {
  title: "Combobox",
}

export default function ComboboxPage() {
  return (
    <div className="w-full">
      <PageHeader
        title="Combobox"
        description="Searchable list for picking from known options. Prefer combobox when users need to filter a longer set."
      />

      <section className="mt-2">
        <H2>Examples</H2>
        <ComboboxExamples />
      </section>

      <section className="mt-14">
        <H2>Overview</H2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Combobox pairs an input with a filtered popup list. Pass{" "}
          <Token>items</Token> on the root and render list rows from the list
          render function. Use Select when filtering is not needed.
        </p>
        <CodeBlock
          className="mt-4"
          code={`import {
  Combobox,
  ComboboxInputGroup,
  ComboboxInput,
  ComboboxTrigger,
  ComboboxPortal,
  ComboboxPositioner,
  ComboboxPopup,
  ComboboxEmpty,
  ComboboxList,
  ComboboxItem,
} from "@boyernick/standard-ui-react"

const fruits = ["Apple", "Banana", "Cherry"]

<Combobox items={fruits}>
  <ComboboxInputGroup>
    <ComboboxInput placeholder="Search fruit…" />
    <ComboboxTrigger />
  </ComboboxInputGroup>
  <ComboboxPortal>
    <ComboboxPositioner>
      <ComboboxPopup>
        <ComboboxEmpty>No fruits found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxPopup>
    </ComboboxPositioner>
  </ComboboxPortal>
</Combobox>`}
        />
      </section>

      <section className="mt-14">
        <H2>Usage</H2>

        <H3>Items</H3>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Provide an <Token>items</Token> array so filtering and empty states
          work. Item values must match what you pass to each{" "}
          <Token>ComboboxItem</Token>.
        </p>
        <CodeBlock
          className="mt-4"
          size="sm"
          code={`<Combobox items={fruits}>
  {/* input group + popup */}
</Combobox>`}
        />

        <H3 className="mt-10">Anatomy</H3>
        <CodeBlock
          className="mt-4"
          size="sm"
          code={`Combobox
  ComboboxInputGroup
    ComboboxInput
    ComboboxTrigger
  ComboboxPortal
    ComboboxPositioner
      ComboboxPopup
        ComboboxEmpty
        ComboboxList
          ComboboxItem`}
        />
      </section>

      <section className="mt-14">
        <H2>API</H2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Root accepts Base UI Combobox props. Common props and parts:
        </p>
        <DocTable headers={["Prop / part", "Type", "Default", "Description"]}>
          <tr>
            <DocCell mono>items</DocCell>
            <DocCell mono>Value[]</DocCell>
            <DocCell mono>—</DocCell>
            <DocCell>Options used for filtering and list rendering.</DocCell>
          </tr>
          <tr>
            <DocCell mono>defaultValue</DocCell>
            <DocCell mono>Value | null</DocCell>
            <DocCell mono>—</DocCell>
            <DocCell>Uncontrolled initial selection.</DocCell>
          </tr>
          <tr>
            <DocCell mono>value</DocCell>
            <DocCell mono>Value | null</DocCell>
            <DocCell mono>—</DocCell>
            <DocCell>Controlled selection.</DocCell>
          </tr>
          <tr>
            <DocCell mono>multiple</DocCell>
            <DocCell mono>boolean</DocCell>
            <DocCell mono>false</DocCell>
            <DocCell>Allows selecting more than one item.</DocCell>
          </tr>
          <tr>
            <DocCell mono>ComboboxInput</DocCell>
            <DocCell mono>—</DocCell>
            <DocCell mono>—</DocCell>
            <DocCell>Filter field; label it or set aria-label.</DocCell>
          </tr>
          <tr>
            <DocCell mono>ComboboxEmpty</DocCell>
            <DocCell mono>—</DocCell>
            <DocCell mono>—</DocCell>
            <DocCell>Shown when the filtered list has no matches.</DocCell>
          </tr>
        </DocTable>
      </section>

      <section className="mt-14 mb-8">
        <H3>Combobox props</H3>
        <PropsTable family={comboboxApi as GeneratedFamily} part="Combobox" />
        <StylingPropsNote />

        <H2>Guidelines</H2>

        <H3>Do</H3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>Use combobox when the option set is long enough to search</li>
          <li>Provide an empty state for no matches</li>
          <li>Give the input an accessible name</li>
        </ul>

        <H3>Don&apos;t</H3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>
            Don&apos;t skip <Token>items</Token> if you rely on built-in filtering
          </li>
          <li>Don&apos;t use combobox for a handful of fixed choices — prefer Select</li>
          <li>Don&apos;t leave the popup without ComboboxPositioner</li>
        </ul>
      </section>
    </div>
  )
}
