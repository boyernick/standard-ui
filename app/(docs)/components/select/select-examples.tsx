"use client"

import {
  Badge,
  IconCrossSmall,
  Select,
  SelectGroup,
  SelectGroupLabel,
  SelectItem,
  SelectItemText,
  SelectList,
  SelectPopup,
  SelectPortal,
  SelectPositioner,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@boyernick/standard-ui-react"
import type { ComponentProps, ReactNode } from "react"
import { useState } from "react"
import { DocBand } from "@/components/doc-band"

const BAND = "max-w-xs"

/** Trigger and popup — the shape every specimen shares. */
const Field = ({
  children,
  ...root
}: { children: ReactNode } & ComponentProps<typeof Select>) => (
  <Select {...root}>
    <SelectTrigger>
      <SelectValue />
    </SelectTrigger>
    <SelectPortal>
      <SelectPositioner>
        <SelectPopup>
          <SelectList>{children}</SelectList>
        </SelectPopup>
      </SelectPositioner>
    </SelectPortal>
  </Select>
)

/** One option. Selection reads from the trigger rather than a tick. */
const Option = ({ value, children }: { value: string; children: ReactNode }) => (
  <SelectItem value={value}>
    <SelectItemText>{children}</SelectItemText>
  </SelectItem>
)

const fruit = { apple: "Apple", banana: "Banana", cherry: "Cherry" } as const

const keys = Object.keys(fruit) as (keyof typeof fruit)[]

const timezones = {
  lisbon: "Lisbon",
  london: "London",
  berlin: "Berlin",
  chicago: "Chicago",
  "new-york": "New York",
} as const

/** Controlled, because the list has to know what is already taken. */
const MultipleSelect = () => {
  const [picked, setPicked] = useState<string[]>(["apple"])

  const drop = (key: string) =>
    setPicked((current) => current.filter((item) => item !== key))

  return (
    <Select
      items={fruit}
      multiple
      value={picked}
      onValueChange={(value) => setPicked(value as string[])}
    >
      {/* Chips wrap, so the trigger grows rather than clipping them. */}
      <SelectTrigger className="h-auto min-h-9 flex-wrap gap-1 py-1.5">
        <SelectValue>
          {(value: string[]) =>
            value.length === 0 ? (
              <span className="text-fg-quaternary">Choose fruit</span>
            ) : (
              <span className="flex flex-wrap gap-1">
                {value.map((key) => (
                  <Badge
                    key={key}
                    size={null}
                    className="text-2xs-strong gap-1 px-1.5 py-1"
                    suffix={
                      <span
                        role="button"
                        tabIndex={-1}
                        aria-label={`Remove ${fruit[key as keyof typeof fruit]}`}
                        className="-mx-[3.5px] inline-flex cursor-pointer text-fg-tertiary hover:text-fg-primary"
                        // Pointer down, not click: the trigger opens on press,
                        // so the popup would flash open as the chip is removed.
                        onPointerDown={(event) => {
                          event.preventDefault()
                          event.stopPropagation()
                          drop(key)
                        }}
                      >
                        <IconCrossSmall size={12} className="size-3" aria-hidden />
                      </span>
                    }
                  >
                    {fruit[key as keyof typeof fruit]}
                  </Badge>
                ))}
              </span>
            )
          }
        </SelectValue>
      </SelectTrigger>
      <SelectPortal>
        <SelectPositioner>
          <SelectPopup>
            <SelectList>
              {/* Every item stays mounted and picked ones are hidden, not
                  unmounted: Base UI resolves a selection against the items it
                  has registered, so removing them from the tree drops the
                  value on the next pick. */}
              {keys.map((key) => (
                <SelectItem
                  key={key}
                  value={key}
                  // Disabled as well as hidden: Base UI reads `disabled` off
                  // the element to decide which indices arrow keys skip, so
                  // without it the highlight would stop on invisible rows.
                  disabled={picked.includes(key)}
                  className="data-selected:hidden"
                >
                  <SelectItemText>{fruit[key]}</SelectItemText>
                </SelectItem>
              ))}
              {picked.length === keys.length ? (
                <p className="px-3 py-2 text-sm text-fg-tertiary">
                  Nothing left to add
                </p>
              ) : null}
            </SelectList>
          </SelectPopup>
        </SelectPositioner>
      </SelectPortal>
    </Select>
  )
}

export const SelectExamples = () => (
  <div>
    <DocBand
      first
      id="default"
      title="Default"
      description="One choice from a known list."
      contentClassName={BAND}
    >
      <Field items={fruit} defaultValue="apple">
        <Option value="apple">Apple</Option>
        <Option value="banana">Banana</Option>
        <Option value="cherry">Cherry</Option>
      </Field>
    </DocBand>

    <DocBand
      id="grouped"
      title="Grouped"
      description="Options gathered under labels, split by a rule."
      contentClassName={BAND}
    >
      <Field items={timezones} defaultValue="london">
        <SelectGroup>
          <SelectGroupLabel>Europe</SelectGroupLabel>
          <Option value="lisbon">Lisbon</Option>
          <Option value="london">London</Option>
          <Option value="berlin">Berlin</Option>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectGroupLabel>Americas</SelectGroupLabel>
          <Option value="chicago">Chicago</Option>
          <Option value="new-york">New York</Option>
        </SelectGroup>
      </Field>
    </DocBand>

    <DocBand
      id="multiple"
      title="Multiple"
      description="Each pick becomes a chip and leaves the list."
      contentClassName={BAND}
    >
      <MultipleSelect />
    </DocBand>

    <DocBand
      id="disabled"
      title="Disabled"
      description="The trigger keeps its value but will not open."
      contentClassName={BAND}
    >
      <Field items={fruit} defaultValue="banana" disabled>
        <Option value="apple">Apple</Option>
        <Option value="banana">Banana</Option>
        <Option value="cherry">Cherry</Option>
      </Field>
    </DocBand>
  </div>
)
