import type { Metadata } from "next"
import { CodeBlock } from "@/components/code-block"
import { DocCell, DocTable, Token } from "@/components/doc-table"
import { PageHeader } from "@/components/page-header"
import { ImageModalExamples } from "./image-modal-examples"
import { H2, H3 } from "@/components/prose"

export const metadata: Metadata = {
  title: "Image modal",
}

export default function ImageModalPage() {
  return (
    <div className="w-full">
      <PageHeader
        title="Image modal"
        description="Lightbox for expanding thumbnails into a focused image view with caption and close control."
      />

      <section className="mt-2">
        <H2>Examples</H2>
        <ImageModalExamples />
      </section>

      <section className="mt-14">
        <H2>Overview</H2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Built on Dialog. Pair <Token>ImageModalTrigger</Token> with{" "}
          <Token>ImageModalContent</Token> for a thumbnail → lightbox flow.
        </p>
        <CodeBlock
          className="mt-4"
          code={`import {
  ImageModal,
  ImageModalTrigger,
  ImageModalContent,
} from "@boyernick/standard-ui-react"

<ImageModal>
  <ImageModalTrigger>
    <img src="/thumb.jpg" alt="Product" />
  </ImageModalTrigger>
  <ImageModalContent src="/full.jpg" alt="Product" caption="Detail" />
</ImageModal>`}
        />
      </section>

      <section className="mt-14">
        <H2>API</H2>
        <DocTable headers={["Part", "Role"]}>
          <tr>
            <DocCell mono>ImageModal</DocCell>
            <DocCell>Dialog root.</DocCell>
          </tr>
          <tr>
            <DocCell mono>ImageModalTrigger</DocCell>
            <DocCell>Opens the lightbox (usually a thumbnail).</DocCell>
          </tr>
          <tr>
            <DocCell mono>ImageModalContent</DocCell>
            <DocCell>
              Portal, backdrop, image, optional <Token>caption</Token>, close.
            </DocCell>
          </tr>
        </DocTable>
      </section>

      <section className="mt-14 mb-8">
        <H2>Guidelines</H2>
        <H3>Do</H3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>Keep matching alt text on the thumbnail and lightbox</li>
          <li>Use for inspection, not navigation</li>
        </ul>
        <H3>Don&apos;t</H3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>Don&apos;t trap critical actions only inside the modal</li>
          <li>Don&apos;t open without a clear close affordance</li>
        </ul>
      </section>
    </div>
  )
}
