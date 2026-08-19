import type { Metadata } from "next"
import { CodeBlock } from "@/components/code-block"
import { DocCell, DocTable, Token } from "@/components/doc-table"
import { PageHeader } from "@/components/page-header"
import { VideoPlayerExamples } from "./video-player-examples"

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
        <h2 className="heading-sm text-fg-primary">Examples</h2>
        <VideoPlayerExamples />
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">Overview</h2>
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
        <h2 className="heading-sm text-fg-primary">API</h2>
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
        <h2 className="heading-sm text-fg-primary">Guidelines</h2>
        <h3 className="heading-xs mt-8 text-fg-primary">Do</h3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>Provide captions or transcripts for spoken content</li>
          <li>Use a poster for slow connections</li>
        </ul>
        <h3 className="heading-xs mt-8 text-fg-primary">Don&apos;t</h3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>Don&apos;t autoplay with sound</li>
          <li>Don&apos;t hide controls for instructional video</li>
        </ul>
      </section>
    </div>
  )
}
