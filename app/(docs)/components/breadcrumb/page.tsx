import type { Metadata } from "next";
import { CodeBlock } from "@/components/code-block";
import { DocCell, DocTable, Token } from "@/components/doc-table";
import { PageHeader } from "@/components/page-header";
import { BreadcrumbExamples } from "./breadcrumb-examples";

export const metadata: Metadata = { title: "Breadcrumb" };

export default function BreadcrumbPage() {
  return (
    <div className="w-full">
      <PageHeader
        title="Breadcrumb"
        description="Hierarchical navigation that shows the current page within a larger structure."
      />
      <section className="mt-2">
        <h2 className="heading-sm text-fg-primary">Examples</h2>
        <BreadcrumbExamples />
      </section>
      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">Overview</h2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Build an ordered trail with links, separators, and a final{" "}
          <Token>BreadcrumbPage</Token> marked as current.
        </p>
        <CodeBlock
          className="mt-4"
          code={`import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbPage } from "@standard-ui/react"\n\n<Breadcrumb>\n  <BreadcrumbList>\n    <BreadcrumbItem><BreadcrumbPage>Settings</BreadcrumbPage></BreadcrumbItem>\n  </BreadcrumbList>\n</Breadcrumb>`}
        />
      </section>
      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">API</h2>
        <DocTable headers={["Part", "Role"]}>
          <tr>
            <DocCell mono>Breadcrumb</DocCell>
            <DocCell>Navigation landmark.</DocCell>
          </tr>
          <tr>
            <DocCell mono>BreadcrumbLink</DocCell>
            <DocCell>Ancestor page link.</DocCell>
          </tr>
          <tr>
            <DocCell mono>BreadcrumbPage</DocCell>
            <DocCell>Current page label.</DocCell>
          </tr>
        </DocTable>
      </section>
      <section className="mt-14 mb-8">
        <h2 className="heading-sm text-fg-primary">Guidelines</h2>
        <h3 className="heading-xs mt-8 text-fg-primary">Do</h3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>Keep labels short and recognizable</li>
        </ul>
        <h3 className="heading-xs mt-8 text-fg-primary">Don&apos;t</h3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>Don&apos;t link the current page</li>
        </ul>
      </section>
    </div>
  );
}
