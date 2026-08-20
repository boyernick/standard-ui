import type { Metadata } from "next";
import { CodeBlock } from "@/components/code-block";
import { DocCell, DocTable, Token } from "@/components/doc-table";
import { PageHeader } from "@/components/page-header";
import { OrbExamples } from "./orb-examples";
import { H2, H3 } from "@/components/prose"

export const metadata: Metadata = { title: "Orb" };

export default function OrbPage() {
  return (
    <div className="w-full">
      <PageHeader
        title="Orb"
        description="Ambient brand loader for spacious, expressive waiting states."
      />
      <section className="mt-2">
        <H2>Examples</H2>
        <OrbExamples />
      </section>
      <section className="mt-14">
        <H2>Overview</H2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Orb softly pulses using brand and surface tokens. Its animation
          respects reduced-motion preferences and its <Token>size</Token> adapts
          to the layout.
        </p>
        <CodeBlock
          className="mt-4"
          code={`import { Orb } from "@boyernick/standard-ui-react"\n\n<Orb size="lg" />`}
        />
      </section>
      <section className="mt-14">
        <H2>API</H2>
        <DocTable headers={["Prop", "Type", "Default", "Description"]}>
          <tr>
            <DocCell mono>size</DocCell>
            <DocCell mono>
              &quot;sm&quot; | &quot;md&quot; | &quot;lg&quot;
            </DocCell>
            <DocCell mono>md</DocCell>
            <DocCell>Orb dimensions.</DocCell>
          </tr>
        </DocTable>
      </section>
      <section className="mt-14 mb-8">
        <H2>Guidelines</H2>
        <H3>Do</H3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>Use for branded, indeterminate loading</li>
        </ul>
        <H3>Don&apos;t</H3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>Don&apos;t place several orbs in one view</li>
        </ul>
      </section>
    </div>
  );
}
