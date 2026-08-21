"use client"

import {
  Button,
  Sound,
  SoundsProvider,
  SoundToggle,
  useSounds,
  type SoundId,
} from "@boyernick/standard-ui-react"
import { ComponentCanvas } from "@/components/component-canvas"

const TriggerDemo = () => {
  const { play } = useSounds()

  const handlePlay = (id: SoundId) => () => {
    play(id)
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Button type="button" size="sm" onClick={handlePlay("click")}>
        Click
      </Button>
      <Button type="button" size="sm" variant="secondary" onClick={handlePlay("success")}>
        Success
      </Button>
      <Button type="button" size="sm" variant="destructive" onClick={handlePlay("error")}>
        Error
      </Button>
      <Button type="button" size="sm" variant="outline" onClick={handlePlay("notify")}>
        Notify
      </Button>
    </div>
  )
}

export const SoundsExamples = () => (
  <SoundsProvider>
    <div className="mt-6 flex flex-col gap-8">
      <ComponentCanvas
        label="Catalog"
        contentClassName="w-full flex-col items-stretch gap-3"
      >
        <div className="flex justify-end">
          <SoundToggle />
        </div>
        <Sound id="click" />
        <Sound id="success" />
        <Sound id="error" />
        <Sound id="notify" />
      </ComponentCanvas>

      <ComponentCanvas
        label="Trigger from actions"
        contentClassName="w-full flex-col items-start gap-4"
      >
        <TriggerDemo />
      </ComponentCanvas>
    </div>
  </SoundsProvider>
)
