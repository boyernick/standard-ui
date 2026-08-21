"use client"

import {
  Autocomplete,
  AutocompleteClear,
  AutocompleteCollection,
  AutocompleteEmpty,
  AutocompleteGroup,
  AutocompleteGroupLabel,
  AutocompleteInput,
  AutocompleteInputGroup,
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopup,
  AutocompletePortal,
  AutocompletePositioner,
} from "@boyernick/standard-ui-react"
import type { ReactNode } from "react"
import { DocBand } from "@/components/doc-band"

const tags = [
  "Accessibility",
  "Animation",
  "Design tokens",
  "Forms",
  "Layout",
  "Navigation",
  "Overlays",
  "Typography",
]

const groups = [
  { value: "Foundations", items: ["Colors", "Materials", "Motion", "Typography"] },
  { value: "Components", items: ["Accordion", "Button", "Dialog", "Tooltip"] },
]

/** The shell every specimen shares — only the Root props and list differ. */
const Field = ({
  placeholder,
  label,
  children,
  ...root
}: {
  placeholder: string
  label: string
  children: ReactNode
} & Omit<React.ComponentProps<typeof Autocomplete>, "children">) => (
  <Autocomplete {...root}>
    <AutocompleteInputGroup>
      <AutocompleteInput placeholder={placeholder} aria-label={label} />
      <AutocompleteClear />
    </AutocompleteInputGroup>
    <AutocompletePortal>
      <AutocompletePositioner>
        <AutocompletePopup>
          <AutocompleteEmpty>No matches</AutocompleteEmpty>
          {children}
        </AutocompletePopup>
      </AutocompletePositioner>
    </AutocompletePortal>
  </Autocomplete>
)

const flatList = (
  <AutocompleteList>
    {(item: string) => (
      <AutocompleteItem key={item} value={item}>
        {item}
      </AutocompleteItem>
    )}
  </AutocompleteList>
)

export const AutocompleteExamples = () => (
  <div>
    <DocBand
      first
      id="default"
      title="Default"
      description="Free text filtered against a list of suggestions."
      contentClassName="max-w-xs"
    >
      <Field items={tags} placeholder="Search tags…" label="Search tags">
        {flatList}
      </Field>
    </DocBand>

    <DocBand
      id="auto-highlight"
      title="Auto highlight"
      description="The best match is selected as you type, so Enter accepts it."
      contentClassName="max-w-xs"
    >
      <Field
        items={tags}
        autoHighlight
        placeholder="Type to filter…"
        label="Filter tags"
      >
        {flatList}
      </Field>
    </DocBand>

    <DocBand
      id="inline"
      title="Inline autocomplete"
      description="Arrowing through results fills the field with the highlighted one."
      contentClassName="max-w-xs"
    >
      <Field
        items={tags}
        mode="both"
        placeholder="Type, then arrow down…"
        label="Complete a tag"
      >
        {flatList}
      </Field>
    </DocBand>

    <DocBand
      id="grouped"
      title="Grouped"
      description="Suggestions split under labels, filtered across every group."
      contentClassName="max-w-xs"
    >
      <Field
        items={groups}
        placeholder="Search the system…"
        label="Search the system"
      >
        <AutocompleteList>
          {(group: (typeof groups)[number]) => (
            <AutocompleteGroup key={group.value} items={group.items}>
              <AutocompleteGroupLabel>{group.value}</AutocompleteGroupLabel>
              <AutocompleteCollection>
                {(item: string) => (
                  <AutocompleteItem key={item} value={item}>
                    {item}
                  </AutocompleteItem>
                )}
              </AutocompleteCollection>
            </AutocompleteGroup>
          )}
        </AutocompleteList>
      </Field>
    </DocBand>
  </div>
)
