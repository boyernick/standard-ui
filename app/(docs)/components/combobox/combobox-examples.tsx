"use client"

import {
  Combobox,
  ComboboxChip,
  ComboboxChipRemove,
  ComboboxChips,
  ComboboxCollection,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxGroupLabel,
  ComboboxInput,
  ComboboxInputGroup,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
  ComboboxPortal,
  ComboboxPositioner,
  ComboboxValue,
} from "@boyernick/standard-ui-react"
import type { ComponentProps, ReactNode } from "react"
import { DocBand } from "@/components/doc-band"

const fruits = ["Apple", "Banana", "Cherry", "Dragonfruit", "Elderberry"]

const groups = [
  { value: "Citrus", items: ["Grapefruit", "Lemon", "Lime", "Orange"] },
  { value: "Berries", items: ["Blackberry", "Blueberry", "Raspberry"] },
]

/** The popup every specimen shares — only the list inside it differs. */
const Popup = ({ children }: { children: ReactNode }) => (
  <ComboboxPortal>
    <ComboboxPositioner>
      <ComboboxPopup>
        <ComboboxEmpty>No matches</ComboboxEmpty>
        {children}
      </ComboboxPopup>
    </ComboboxPositioner>
  </ComboboxPortal>
)

/** Single-select shell: one input, a clear action and the open trigger. */
const Field = ({
  placeholder,
  label,
  children,
  ...root
}: {
  placeholder: string
  label: string
  children: ReactNode
} & Omit<ComponentProps<typeof Combobox>, "children">) => (
  <Combobox {...root}>
    <ComboboxInputGroup>
      <ComboboxInput placeholder={placeholder} aria-label={label} />
    </ComboboxInputGroup>
    <Popup>{children}</Popup>
  </Combobox>
)

const flatList = (
  <ComboboxList>
    {(item: string) => (
      <ComboboxItem key={item} value={item}>
        {item}
      </ComboboxItem>
    )}
  </ComboboxList>
)

export const ComboboxExamples = () => (
  <div>
    <DocBand
      first
      id="default"
      title="Default"
      description="Search a list and pick one option."
      contentClassName="max-w-xs"
    >
      <Field items={fruits} placeholder="Search fruit…" label="Search fruit">
        {flatList}
      </Field>
    </DocBand>

    <DocBand
      id="multiple"
      title="Multiple"
      description="Each selection becomes a chip you can remove."
      contentClassName="max-w-sm"
    >
      <Combobox items={fruits} multiple defaultValue={["Apple"]}>
        <ComboboxInputGroup>
          <ComboboxChips>
            <ComboboxValue>
              {(selected: string[]) =>
                selected.map((item) => (
                  <ComboboxChip key={item}>
                    {item}
                    <ComboboxChipRemove aria-label={`Remove ${item}`} />
                  </ComboboxChip>
                ))
              }
            </ComboboxValue>
            <ComboboxInput
              placeholder="Add fruit…"
              aria-label="Add fruit"
              className="h-7 min-w-24 flex-1 rounded-sm px-1"
            />
          </ComboboxChips>
        </ComboboxInputGroup>
        <Popup>{flatList}</Popup>
      </Combobox>
    </DocBand>

    <DocBand
      id="grouped"
      title="Grouped"
      description="Options split under labels, searched across every group."
      contentClassName="max-w-xs"
    >
      <Field
        items={groups}
        placeholder="Search fruit…"
        label="Search grouped fruit"
      >
        <ComboboxList>
          {(group: (typeof groups)[number]) => (
            <ComboboxGroup key={group.value} items={group.items}>
              <ComboboxGroupLabel>{group.value}</ComboboxGroupLabel>
              <ComboboxCollection>
                {(item: string) => (
                  <ComboboxItem key={item} value={item}>
                    {item}
                  </ComboboxItem>
                )}
              </ComboboxCollection>
            </ComboboxGroup>
          )}
        </ComboboxList>
      </Field>
    </DocBand>
  </div>
)
