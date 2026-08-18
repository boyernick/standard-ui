"use client"

import {
  Select,
  SelectIcon,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectList,
  SelectPopup,
  SelectPortal,
  SelectPositioner,
  SelectTrigger,
  SelectValue,
} from "@standard-ui/react"
import { ComponentCanvas } from "@/components/component-canvas"

const fruitItems = {
  apple: "Apple",
  banana: "Banana",
  cherry: "Cherry",
} as const

export const SelectExamples = () => (
  <div className="mt-6 flex flex-col gap-8">
    <ComponentCanvas
      label="Fruit"
      contentClassName="w-full max-w-xs"
      code={`<Select
  items={{
    apple: "Apple",
    banana: "Banana",
    cherry: "Cherry",
  }}
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
            <SelectItemIndicator />
          </SelectItem>
          <SelectItem value="banana">
            <SelectItemText>Banana</SelectItemText>
            <SelectItemIndicator />
          </SelectItem>
          <SelectItem value="cherry">
            <SelectItemText>Cherry</SelectItemText>
            <SelectItemIndicator />
          </SelectItem>
        </SelectList>
      </SelectPopup>
    </SelectPositioner>
  </SelectPortal>
</Select>`}
    >
      <Select items={fruitItems} defaultValue="apple">
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
                  <SelectItemIndicator />
                </SelectItem>
                <SelectItem value="banana">
                  <SelectItemText>Banana</SelectItemText>
                  <SelectItemIndicator />
                </SelectItem>
                <SelectItem value="cherry">
                  <SelectItemText>Cherry</SelectItemText>
                  <SelectItemIndicator />
                </SelectItem>
              </SelectList>
            </SelectPopup>
          </SelectPositioner>
        </SelectPortal>
      </Select>
    </ComponentCanvas>
  </div>
)
