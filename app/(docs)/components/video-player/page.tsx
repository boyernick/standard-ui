import type { Metadata } from "next"
import { CodeBlock } from "@/components/code-block"
import { DocCell, DocTable, Token } from "@/components/doc-table"
import { PageHeader } from "@/components/page-header"
import { VideoPlayerExamples } from "./video-player-examples"
import { H2, H3 } from "@/components/prose"

export const metadata: Metadata = {
  title: "Video player",
}

export default function VideoPlayerPage() {
  return (
    <div className="w-full">
      <PageHeader
        title="Video player"
        description="Accessible video surface with play, seek, mute, and fullscreen controls styled with StandardUI tokens."
      />

      <section className="mt-2">
        <H2>Examples</H2>
        <VideoPlayerExamples />
      </section>

      <section className="mt-14">
        <H2>Overview</H2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Pass <Token>src</Token> (and optional <Token>poster</Token> /{" "}
          <Token>title</Token>). Controls sit under the frame; click the video
          to toggle playback.
        </p>
        <CodeBlock
          className="mt-4"
          code={`import { VideoPlayer } from "@boyernick/standard-ui-react"

<VideoPlayer src="/demo.webm" title="Walkthrough" />`}
        />
      </section>

      <section className="mt-14">
        <H2>API</H2>
        <DocTable headers={["Prop", "Type", "Default"]}>
          <tr>
            <DocCell mono>src</DocCell>
            <DocCell mono>string</DocCell>
            <DocCell mono>—</DocCell>
          </tr>
          <tr>
            <DocCell mono>poster</DocCell>
            <DocCell mono>string</DocCell>
            <DocCell mono>—</DocCell>
          </tr>
          <tr>
            <DocCell mono>title</DocCell>
            <DocCell mono>string</DocCell>
            <DocCell mono>—</DocCell>
          </tr>
        </DocTable>
      </section>

      <section className="mt-14 mb-8">
        <H2>Guidelines</H2>
        <H3>Do</H3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>Provide captions or transcripts for spoken content</li>
          <li>Use a poster for slow connections</li>
        </ul>
        <H3>Don&apos;t</H3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>Don&apos;t autoplay with sound</li>
          <li>Don&apos;t hide controls for instructional video</li>
        </ul>
      </section>
    </div>
  )
}
