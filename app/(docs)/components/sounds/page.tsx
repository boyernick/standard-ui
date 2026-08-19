import type { Metadata } from "next"
import { CodeBlock } from "@/components/code-block"
import { DocCell, DocTable, Token } from "@/components/doc-table"
import { PageHeader } from "@/components/page-header"
import { SoundsExamples } from "./sounds-examples"

export const metadata: Metadata = {
  title: "Sounds",
}

export default function SoundsPage() {
  return (
    <div className="w-full">
      <PageHeader
        title="Sounds"
        description="Short UI cues generated in the browser — click, success, error, and notify — with mute and volume control."
      />

      <section className="mt-2">
        <h2 className="heading-sm text-fg-primary">Examples</h2>
        <SoundsExamples />
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">Overview</h2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Wrap your app (or a demo) in <Token>SoundsProvider</Token>. Preview
          presets with <Token>Sound</Token>, mute with{" "}
          <Token>SoundToggle</Token>, or call <Token>play</Token> from{" "}
          <Token>useSounds</Token> after user gestures.
        </p>
        <CodeBlock
          className="mt-4"
          code={`import { SoundsProvider, Sound, useSounds } from "@standard-ui/react"

<SoundsProvider>
  <Sound id="success" />
</SoundsProvider>`}
        />
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">Usage</h2>
        <h3 className="heading-xs mt-8 text-fg-primary">Presets</h3>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Built-in ids: <Token>click</Token>, <Token>success</Token>,{" "}
          <Token>error</Token>, and <Token>notify</Token>. Tones are synthesized
          with the Web Audio API — no asset files required.
        </p>
        <h3 className="heading-xs mt-8 text-fg-primary">Accessibility</h3>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Never rely on sound alone. Prefer mute by default for dense surfaces,
          and always expose a mute control near first play.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">API</h2>
        <DocTable headers={["Export", "Role"]}>
          <tr>
            <DocCell mono>SoundsProvider</DocCell>
            <DocCell>Mute, volume, and play context.</DocCell>
          </tr>
          <tr>
            <DocCell mono>Sound</DocCell>
            <DocCell>Catalog row with play control.</DocCell>
          </tr>
          <tr>
            <DocCell mono>SoundToggle</DocCell>
            <DocCell>Mute / unmute control.</DocCell>
          </tr>
          <tr>
            <DocCell mono>useSounds</DocCell>
            <DocCell>
              Hook exposing <Token>play</Token>, <Token>muted</Token>, and{" "}
              <Token>volume</Token>.
            </DocCell>
          </tr>
        </DocTable>
      </section>

      <section className="mt-14 mb-8">
        <h2 className="heading-sm text-fg-primary">Guidelines</h2>
        <h3 className="heading-xs mt-8 text-fg-primary">Do</h3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>Trigger sounds from user gestures so AudioContext can resume</li>
          <li>Keep cues short and quiet</li>
        </ul>
        <h3 className="heading-xs mt-8 text-fg-primary">Don&apos;t</h3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>Don&apos;t play on page load or scroll</li>
          <li>Don&apos;t use error tones for routine navigation</li>
        </ul>
      </section>
    </div>
  )
}
