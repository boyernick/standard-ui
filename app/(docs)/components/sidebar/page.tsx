import type { Metadata } from "next";
import { CodeBlock } from "@/components/code-block";
import { DocCell, DocTable, Token } from "@/components/doc-table";
import { PageHeader } from "@/components/page-header";
import { SidebarExamples } from "./sidebar-examples";

export const metadata: Metadata = { title: "Sidebar" };

export default function SidebarPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader
        title="Sidebar"
        description="Persistent panel structure for application navigation and supporting controls."
      />
      <section className="mt-2">
        <h2 className="heading-sm text-fg-primary">Examples</h2>
        <SidebarExamples />
      </section>
      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">Overview</h2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Compose fixed header and footer regions around scrollable content.
          Mark the current destination with the <Token>active</Token> prop.
        </p>
        <CodeBlock
          className="mt-4"
          code={`import { Sidebar, SidebarContent, SidebarNavItem } from "@standard-ui/react"\n\n<Sidebar>\n  <SidebarContent>\n    <SidebarNavItem active>Overview</SidebarNavItem>\n  </SidebarContent>\n</Sidebar>`}
        />
      </section>
      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">API</h2>
        <DocTable headers={["Part", "Role"]}>
          <tr>
            <DocCell mono>Sidebar</DocCell>
            <DocCell>Panel shell.</DocCell>
          </tr>
          <tr>
            <DocCell mono>SidebarContent</DocCell>
            <DocCell>Scrollable main region.</DocCell>
          </tr>
          <tr>
            <DocCell mono>SidebarNavItem</DocCell>
            <DocCell>Interactive navigation item.</DocCell>
          </tr>
        </DocTable>
      </section>
      <section className="mt-14 mb-8">
        <h2 className="heading-sm text-fg-primary">Guidelines</h2>
        <h3 className="heading-xs mt-8 text-fg-primary">Do</h3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>Group related destinations</li>
          <li>Show one active item</li>
        </ul>
        <h3 className="heading-xs mt-8 text-fg-primary">Don&apos;t</h3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>Don&apos;t overload the footer with navigation</li>
        </ul>
      </section>
    </div>
  );
}
