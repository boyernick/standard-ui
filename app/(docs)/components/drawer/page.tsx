import type { Metadata } from "next"
import { CodeBlock } from "@/components/code-block"
import { DocCell, DocTable, Token } from "@/components/doc-table"
import { PageHeader } from "@/components/page-header"
import { DrawerExamples } from "./drawer-examples"
import { H2, H3 } from "@/components/prose"
import { PropsTable, StylingPropsNote, type GeneratedFamily } from "@/components/api-table"
import drawerApi from "@/lib/generated/api/drawer.json"

export const metadata: Metadata = {
  title: "Drawer",
}

export default function DrawerPage() {
  return (
    <div className="w-full">
      <PageHeader
        title="Drawer"
        description="Edge panel with swipe dismissal. Use for side sheets and bottom sheets when Dialog is too centered."
      />

      <section className="mt-2">
        <H2>Examples</H2>
        <DrawerExamples />
      </section>

      <section className="mt-14">
        <H2>Overview</H2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Drawer extends dialog with gesture support. Set{" "}
          <Token>swipeDirection</Token> to match the edge the panel sits on —
          <Token>&quot;right&quot;</Token> for a side panel,{" "}
          <Token>&quot;down&quot;</Token> for a bottom sheet. Prefer Dialog when
          you do not need swipe or snap points.
        </p>
        <CodeBlock
          className="mt-4"
          code={`import {
  Button,
  Drawer,
  DrawerTrigger,
  DrawerPortal,
  DrawerBackdrop,
  DrawerViewport,
  DrawerPopup,
  DrawerContent,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
  DrawerHeader,
} from "@boyernick/standard-ui-react"

<Drawer swipeDirection="right">
  <DrawerTrigger render={<Button />}>Open drawer</DrawerTrigger>
  <DrawerPortal>
    <DrawerBackdrop />
    <DrawerViewport>
      <DrawerPopup>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Account</DrawerTitle>
            <DrawerDescription>
              Manage profile details and preferences.
            </DrawerDescription>
          </DrawerHeader>
          <DrawerClose render={<Button variant="outline" />}>
            Close
          </DrawerClose>
        </DrawerContent>
      </DrawerPopup>
    </DrawerViewport>
  </DrawerPortal>
</Drawer>`}
        />
      </section>

      <section className="mt-14">
        <H2>Usage</H2>

        <H3>Swipe direction</H3>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          <Token>swipeDirection</Token> controls both dismissal direction and
          which edge styles apply on DrawerPopup.
        </p>
        <CodeBlock
          className="mt-4"
          size="sm"
          code={`<Drawer swipeDirection="right">{/* side panel */}</Drawer>
<Drawer swipeDirection="down">{/* bottom sheet */}</Drawer>`}
        />

        <H3 className="mt-10">Anatomy</H3>
        <CodeBlock
          className="mt-4"
          size="sm"
          code={`Drawer
  DrawerTrigger
  DrawerPortal
    DrawerBackdrop
    DrawerViewport
      DrawerPopup
        DrawerContent
          DrawerHeader
          DrawerClose`}
        />
      </section>

      <section className="mt-14">
        <H2>API</H2>
        <DocTable headers={["Part / prop", "Role"]}>
          <tr>
            <DocCell mono>swipeDirection</DocCell>
            <DocCell>
              <Token>up</Token> | <Token>down</Token> | <Token>left</Token> |{" "}
              <Token>right</Token>. Defaults to <Token>down</Token>.
            </DocCell>
          </tr>
          <tr>
            <DocCell mono>DrawerTrigger</DocCell>
            <DocCell>Opens the drawer. Use Button via render.</DocCell>
          </tr>
          <tr>
            <DocCell mono>DrawerViewport</DocCell>
            <DocCell>Full-screen positioning container.</DocCell>
          </tr>
          <tr>
            <DocCell mono>DrawerPopup</DocCell>
            <DocCell>Sliding panel surface.</DocCell>
          </tr>
          <tr>
            <DocCell mono>DrawerContent</DocCell>
            <DocCell>Scrollable body; safer for text selection while swiping.</DocCell>
          </tr>
          <tr>
            <DocCell mono>DrawerHeader</DocCell>
            <DocCell>Layout helper for title and description.</DocCell>
          </tr>
        </DocTable>
      </section>

      <section className="mt-14 mb-8">
        <H3>Drawer props</H3>
        <PropsTable family={drawerApi as GeneratedFamily} part="Drawer" />
        <StylingPropsNote />

        <H2>Guidelines</H2>

        <H3>Do</H3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>Match swipeDirection to the panel edge</li>
          <li>Keep drawer content focused on one task</li>
          <li>Provide a clear title and an explicit close action</li>
        </ul>

        <H3>Don&apos;t</H3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>
            Don&apos;t use Drawer when a centered Dialog is enough
          </li>
          <li>Don&apos;t omit DrawerViewport — placement depends on it</li>
          <li>Don&apos;t nest deep multi-step flows without clear exit paths</li>
        </ul>
      </section>
    </div>
  )
}
