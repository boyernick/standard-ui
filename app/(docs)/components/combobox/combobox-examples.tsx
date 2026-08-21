"use client"

import {
  Combobox,
  ComboboxChip,
  ComboboxChipRemove,
  ComboboxChips,
  ComboboxClear,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxInputGroup,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
  ComboboxPortal,
  ComboboxPositioner,
  ComboboxTrigger,
  ComboboxValue,
} from "@boyernick/standard-ui-react"
import { ComponentCanvas } from "@/components/component-canvas"

const fruits = ["Apple", "Banana", "Cherry", "Dragonfruit", "Elderberry"]

/** Combobox docs demos — selection is shown in the field/chips, not with list checkmarks. */
export const ComboboxExamples = () => (
  <div className="mt-6 flex flex-col gap-8">
    <ComponentCanvas
      label="Fruit"
      contentClassName="w-full max-w-xs"
    >
      <Combobox items={fruits}>
        <ComboboxInputGroup>
          <ComboboxInput
            placeholder="Search fruit…"
            aria-label="Search fruit"
          />
          <ComboboxClear />
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
      </Combobox>
    </ComponentCanvas>

    <ComponentCanvas
      label="Multiple"
      contentClassName="w-full max-w-sm"
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
      </Combobox>
    </ComponentCanvas>
  </div>
)
