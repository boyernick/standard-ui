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
  ComboboxItemIndicator,
  ComboboxList,
  ComboboxPopup,
  ComboboxPortal,
  ComboboxPositioner,
  ComboboxTrigger,
  ComboboxValue,
} from "@standard-ui/react"
import { ComponentCanvas } from "@/components/component-canvas"

const fruits = ["Apple", "Banana", "Cherry", "Dragonfruit", "Elderberry"]

export const ComboboxExamples = () => (
  <div className="mt-6 flex flex-col gap-8">
    <ComponentCanvas
      label="Fruit"
      contentClassName="w-full max-w-xs"
      code={`const fruits = ["Apple", "Banana", "Cherry", "Dragonfruit", "Elderberry"]

<Combobox items={fruits}>
  <ComboboxInputGroup>
    <ComboboxInput placeholder="Search fruit…" />
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
              <ComboboxItemIndicator />
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxPopup>
    </ComboboxPositioner>
  </ComboboxPortal>
</Combobox>`}
    >
      <Combobox items={fruits}>
        <ComboboxInputGroup>
          <ComboboxInput placeholder="Search fruit…" aria-label="Search fruit" />
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
                    <ComboboxItemIndicator />
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
      code={`<Combobox items={fruits} multiple defaultValue={["Apple"]}>
  <ComboboxInputGroup>
    <ComboboxChips>
      <ComboboxValue>
        {(selected: string[]) =>
          selected.map((item) => (
            <ComboboxChip key={item}>
              {item}
              <ComboboxChipRemove aria-label={\`Remove \${item}\`} />
            </ComboboxChip>
          ))
        }
      </ComboboxValue>
      <ComboboxInput placeholder="Add fruit…" />
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
              <ComboboxItemIndicator />
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxPopup>
    </ComboboxPositioner>
  </ComboboxPortal>
</Combobox>`}
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
              className="min-w-24 flex-1 px-1"
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
                    <ComboboxItemIndicator />
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
