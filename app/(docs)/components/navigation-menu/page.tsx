import type { Metadata } from "next"
import { CodeBlock } from "@/components/code-block"
import { DocCell, DocTable, Token } from "@/components/doc-table"
import { PageHeader } from "@/components/page-header"
import { NavigationMenuExamples } from "./navigation-menu-examples"

export const metadata: Metadata = {
  title: "Navigation menu",
}

export default function NavigationMenuPage() {
  return (
    <div className="w-full">
      <PageHeader
        title="Navigation menu"
        description="Site navigation with optional flyout panels for product sections and resource links."
      />

      <section className="mt-2">
        <h2 className="heading-sm text-fg-primary">Examples</h2>
        <NavigationMenuExamples />
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">Overview</h2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Compose list items with triggers and content, then a shared portal
          popup + viewport. Top-level links without panels use{" "}
          <Token>NavigationMenuLink</Token> with{" "}
          <Token>navigationMenuTriggerClassName</Token>.
        </p>
        <CodeBlock
          className="mt-4"
          code={`import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuPortal,
  NavigationMenuPositioner,
  NavigationMenuPopup,
  NavigationMenuViewport,
} from "@boyernick/standard-ui-react"

<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Product</NavigationMenuTrigger>
      <NavigationMenuContent>{/* links */}</NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
  <NavigationMenuPortal>
    <NavigationMenuPositioner>
      <NavigationMenuPopup>
        <NavigationMenuViewport />
      </NavigationMenuPopup>
    </NavigationMenuPositioner>
  </NavigationMenuPortal>
</NavigationMenu>`}
        />
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">API</h2>
        <DocTable headers={["Part", "Role"]}>
          <tr>
            <DocCell mono>NavigationMenu</DocCell>
            <DocCell>Root open state and delay.</DocCell>
          </tr>
          <tr>
            <DocCell mono>NavigationMenuTrigger</DocCell>
            <DocCell>Opens a panel; includes chevron icon.</DocCell>
          </tr>
          <tr>
            <DocCell mono>NavigationMenuContent</DocCell>
            <DocCell>Panel body projected into the viewport.</DocCell>
          </tr>
          <tr>
            <DocCell mono>NavigationMenuPopup</DocCell>
            <DocCell>Shared surface that animates width/height.</DocCell>
          </tr>
          <tr>
            <DocCell mono>NavigationMenuLink</DocCell>
            <DocCell>Link row; compose with Next.js Link via render.</DocCell>
          </tr>
        </DocTable>
      </section>

      <section className="mt-14 mb-8">
        <h2 className="heading-sm text-fg-primary">Guidelines</h2>
        <h3 className="heading-xs mt-8 text-fg-primary">Do</h3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>Keep panel content scannable — titles plus one short line</li>
          <li>Use a plain link item for destinations without a submenu</li>
        </ul>
        <h3 className="heading-xs mt-8 text-fg-primary">Don&apos;t</h3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>Don&apos;t omit the portal/positioner/popup/viewport tree</li>
          <li>Don&apos;t pack forms or dense tables into nav panels</li>
        </ul>
      </section>
    </div>
  )
}
