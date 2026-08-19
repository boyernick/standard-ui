import type { Metadata } from "next";
import { CodeBlock } from "@/components/code-block";
import { DocCell, DocTable, Token } from "@/components/doc-table";
import { PageHeader } from "@/components/page-header";
import { OrbExamples } from "./orb-examples";

export const metadata: Metadata = { title: "Orb" };

export default function OrbPage() {
  return (
    <div className="w-full">
      <PageHeader
        title="Orb"
        description="Ambient brand loader for spacious, expressive waiting states."
      />
      <section className="mt-2">
        <h2 className="heading-sm text-fg-primary">Examples</h2>
        <OrbExamples />
      </section>
      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">Overview</h2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Orb softly pulses using brand and surface tokens. Its animation
          respects reduced-motion preferences and its <Token>size</Token> adapts
          to the layout.
        </p>
        <CodeBlock
          className="mt-4"
          code={`import { Orb } from "@standard-ui/react"\n\n<Orb size="lg" />`}
        />
      </section>
      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">API</h2>
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
        <h2 className="heading-sm text-fg-primary">Guidelines</h2>
        <h3 className="heading-xs mt-8 text-fg-primary">Do</h3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>Use for branded, indeterminate loading</li>
        </ul>
        <h3 className="heading-xs mt-8 text-fg-primary">Don&apos;t</h3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>Don&apos;t place several orbs in one view</li>
        </ul>
      </section>
    </div>
  );
}
