"use client"

import {
  Autocomplete,
  AutocompleteClear,
  AutocompleteEmpty,
  AutocompleteInput,
  AutocompleteInputGroup,
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopup,
  AutocompletePortal,
  AutocompletePositioner,
} from "@boyernick/standard-ui-react"
import { ComponentCanvas } from "@/components/component-canvas"

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

export const AutocompleteExamples = () => (
  <div className="mt-6 flex flex-col gap-8">
    <ComponentCanvas
      label="Tags"
      contentClassName="w-full max-w-xs"
      code={`const tags = ["Accessibility", "Animation", "Design tokens", …]

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
    >
      <Autocomplete items={tags}>
        <AutocompleteInputGroup>
          <AutocompleteInput
            placeholder="Search tags…"
            aria-label="Search tags"
          />
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
      </Autocomplete>
    </ComponentCanvas>

    <ComponentCanvas
      label="Auto highlight"
      contentClassName="w-full max-w-xs"
      code={`<Autocomplete items={tags} autoHighlight>
  <AutocompleteInputGroup>
    <AutocompleteInput placeholder="Type to filter…" />
    <AutocompleteClear />
  </AutocompleteInputGroup>
  <AutocompletePortal>
    <AutocompletePositioner>
      <AutocompletePopup>
        <AutocompleteEmpty>No matches.</AutocompleteEmpty>
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
    >
      <Autocomplete items={tags} autoHighlight>
        <AutocompleteInputGroup>
          <AutocompleteInput
            placeholder="Type to filter…"
            aria-label="Filter tags"
          />
          <AutocompleteClear />
        </AutocompleteInputGroup>
        <AutocompletePortal>
          <AutocompletePositioner>
            <AutocompletePopup>
              <AutocompleteEmpty>No matches.</AutocompleteEmpty>
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
      </Autocomplete>
    </ComponentCanvas>
  </div>
)
