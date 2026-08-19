"use client"

import { useEffect, useState } from "react"
import {
  Progress,
  ProgressIndicator,
  ProgressLabel,
  ProgressTrack,
  ProgressValue,
} from "@boyernick/standard-ui-react"
import { ComponentCanvas } from "@/components/component-canvas"

export const ProgressExamples = () => {
  const [value, setValue] = useState(20)

  useEffect(() => {
    const id = window.setInterval(() => {
      setValue((prev) => (prev >= 100 ? 20 : prev + 10))
    }, 900)
    return () => window.clearInterval(id)
  }, [])

  return (
    <div className="mt-6 flex flex-col gap-8">
      <ComponentCanvas
        label="Basic"
        contentClassName="w-full max-w-sm flex-col items-stretch"
        code={`<Progress value={60}>
  <ProgressLabel>Uploading</ProgressLabel>
  <ProgressValue />
  <ProgressTrack>
    <ProgressIndicator />
  </ProgressTrack>
</Progress>`}
      >
        <Progress value={60}>
          <ProgressLabel>Uploading</ProgressLabel>
          <ProgressValue />
          <ProgressTrack>
            <ProgressIndicator />
          </ProgressTrack>
        </Progress>
      </ComponentCanvas>

      <ComponentCanvas
        label="Animated"
        contentClassName="w-full max-w-sm flex-col items-stretch"
        code={`const [value, setValue] = useState(20)

useEffect(() => {
  const id = setInterval(() => {
    setValue((prev) => (prev >= 100 ? 20 : prev + 10))
  }, 900)
  return () => clearInterval(id)
}, [])

<Progress value={value}>
  <ProgressLabel>Syncing</ProgressLabel>
  <ProgressValue />
  <ProgressTrack>
    <ProgressIndicator />
  </ProgressTrack>
</Progress>`}
      >
        <Progress value={value}>
          <ProgressLabel>Syncing</ProgressLabel>
          <ProgressValue />
          <ProgressTrack>
            <ProgressIndicator />
          </ProgressTrack>
        </Progress>
      </ComponentCanvas>
    </div>
  )
}
