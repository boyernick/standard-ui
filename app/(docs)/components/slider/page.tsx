import type { Metadata } from "next"
import { CodeBlock } from "@/components/code-block"
import { DocCell, DocTable, Token } from "@/components/doc-table"
import { PageHeader } from "@/components/page-header"
import { SliderExamples } from "./slider-examples"

export const metadata: Metadata = {
  title: "Slider",
}

export default function SliderPage() {
  return (
    <div className="w-full">
      <PageHeader
        title="Slider"
        description="Choose a value along a continuous range. Use for volume, opacity, and other numeric settings."
      />

      <section className="mt-2">
        <h2 className="heading-sm text-fg-primary">Examples</h2>
        <SliderExamples />
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">Overview</h2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Slider lets users pick a number by dragging a thumb along a track.
          Compose control, track, indicator, and thumb under the root. Built on
          Base UI for keyboard and pointer interaction.
        </p>
        <CodeBlock
          className="mt-4"
          code={`import {
  Slider,
  SliderControl,
  SliderTrack,
  SliderIndicator,
  SliderThumb,
} from "@boyernick/standard-ui-react"

<Slider defaultValue={40}>
  <SliderControl>
    <SliderTrack>
      <SliderIndicator />
      <SliderThumb aria-label="Volume" />
    </SliderTrack>
  </SliderControl>
</Slider>`}
        />
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">Usage</h2>

        <h3 className="heading-xs mt-8 text-fg-primary">Structure</h3>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Nest <Token>SliderControl</Token> → <Token>SliderTrack</Token> →{" "}
          <Token>SliderIndicator</Token> and <Token>SliderThumb</Token>. The
          indicator fills from the start to the thumb.
        </p>
        <CodeBlock
          className="mt-4"
          size="sm"
          code={`<SliderControl>
  <SliderTrack>
    <SliderIndicator />
    <SliderThumb aria-label="Volume" />
  </SliderTrack>
</SliderControl>`}
        />

        <h3 className="heading-xs mt-10 text-fg-primary">Accessible name</h3>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Give the thumb an <Token>aria-label</Token> (or associate a visible
          label) so assistive tech can announce the control.
        </p>
        <CodeBlock
          className="mt-4"
          size="sm"
          code={`<SliderThumb aria-label="Opacity" />`}
        />
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">API</h2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Parts mirror Base UI Slider. Root accepts value and range props.
        </p>
        <DocTable headers={["Part", "Role"]}>
          <tr>
            <DocCell mono>Slider</DocCell>
            <DocCell>Root state and value.</DocCell>
          </tr>
          <tr>
            <DocCell mono>SliderControl</DocCell>
            <DocCell>Hit area and layout for the track.</DocCell>
          </tr>
          <tr>
            <DocCell mono>SliderTrack</DocCell>
            <DocCell>Background rail for the range.</DocCell>
          </tr>
          <tr>
            <DocCell mono>SliderIndicator</DocCell>
            <DocCell>Filled portion of the track.</DocCell>
          </tr>
          <tr>
            <DocCell mono>SliderThumb</DocCell>
            <DocCell>Draggable handle. Provide an accessible name.</DocCell>
          </tr>
        </DocTable>
        <DocTable headers={["Prop", "Type", "Default", "Description"]}>
          <tr>
            <DocCell mono>defaultValue</DocCell>
            <DocCell mono>number | number[]</DocCell>
            <DocCell mono>—</DocCell>
            <DocCell>Uncontrolled initial value.</DocCell>
          </tr>
          <tr>
            <DocCell mono>value</DocCell>
            <DocCell mono>number | number[]</DocCell>
            <DocCell mono>—</DocCell>
            <DocCell>Controlled value.</DocCell>
          </tr>
          <tr>
            <DocCell mono>min</DocCell>
            <DocCell mono>number</DocCell>
            <DocCell mono>0</DocCell>
            <DocCell>Minimum value.</DocCell>
          </tr>
          <tr>
            <DocCell mono>max</DocCell>
            <DocCell mono>number</DocCell>
            <DocCell mono>100</DocCell>
            <DocCell>Maximum value.</DocCell>
          </tr>
          <tr>
            <DocCell mono>step</DocCell>
            <DocCell mono>number</DocCell>
            <DocCell mono>1</DocCell>
            <DocCell>Increment between values.</DocCell>
          </tr>
          <tr>
            <DocCell mono>disabled</DocCell>
            <DocCell mono>boolean</DocCell>
            <DocCell mono>false</DocCell>
            <DocCell>Disables the slider.</DocCell>
          </tr>
        </DocTable>
      </section>

      <section className="mt-14 mb-8">
        <h2 className="heading-sm text-fg-primary">Guidelines</h2>

        <h3 className="heading-xs mt-8 text-fg-primary">Do</h3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>Label the thumb with aria-label or a visible field label</li>
          <li>Show the current value nearby when precision matters</li>
          <li>Use a slider for continuous ranges, not discrete short lists</li>
        </ul>

        <h3 className="heading-xs mt-8 text-fg-primary">Don&rsquo;t</h3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>
            Don&apos;t use a slider for yes/no settings — prefer a switch
          </li>
          <li>
            Don&apos;t leave the thumb unlabeled for screen readers
          </li>
          <li>
            Don&apos;t force <Token>cursor-pointer</Token> — keep the platform
            default for controls
          </li>
        </ul>
      </section>
    </div>
  )
}
