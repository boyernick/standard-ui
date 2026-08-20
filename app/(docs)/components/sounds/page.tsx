import type { Metadata } from "next"
import { CodeBlock } from "@/components/code-block"
import { DocCell, DocTable, Token } from "@/components/doc-table"
import { PageHeader } from "@/components/page-header"
import { SoundsExamples } from "./sounds-examples"
import { H2, H3 } from "@/components/prose"
import { PropsTable, StylingPropsNote, type GeneratedFamily } from "@/components/api-table"
import soundsApi from "@/lib/generated/api/sounds.json"

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
        <H2>Examples</H2>
        <SoundsExamples />
      </section>

      <section className="mt-14">
        <H2>Overview</H2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Wrap your app (or a demo) in <Token>SoundsProvider</Token>. Preview
          presets with <Token>Sound</Token>, mute with{" "}
          <Token>SoundToggle</Token>, or call <Token>play</Token> from{" "}
          <Token>useSounds</Token> after user gestures.
        </p>
        <CodeBlock
          className="mt-4"
          code={`import { SoundsProvider, Sound, useSounds } from "@boyernick/standard-ui-react"

<SoundsProvider>
  <Sound id="success" />
</SoundsProvider>`}
        />
      </section>

      <section className="mt-14">
        <H2>Usage</H2>
        <H3>Presets</H3>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Built-in ids: <Token>click</Token>, <Token>success</Token>,{" "}
          <Token>error</Token>, and <Token>notify</Token>. Tones are synthesized
          with the Web Audio API — no asset files required.
        </p>
        <H3>Accessibility</H3>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Never rely on sound alone. Prefer mute by default for dense surfaces,
          and always expose a mute control near first play.
        </p>
      </section>

      <section className="mt-14">
        <H2>API</H2>
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
        <H3>SoundsProvider props</H3>
        <PropsTable family={soundsApi as GeneratedFamily} part="SoundsProvider" />
        <StylingPropsNote />

        <H2>Guidelines</H2>
        <H3>Do</H3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>Trigger sounds from user gestures so AudioContext can resume</li>
          <li>Keep cues short and quiet</li>
        </ul>
        <H3>Don&apos;t</H3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>Don&apos;t play on page load or scroll</li>
          <li>Don&apos;t use error tones for routine navigation</li>
        </ul>
      </section>
    </div>
  )
}
