import type { Metadata } from "next"
import { CodeBlock } from "@/components/code-block"
import { DocCell, DocTable, Token } from "@/components/doc-table"
import { PageHeader } from "@/components/page-header"
import { MotionExamples } from "./motion-examples"

export const metadata: Metadata = {
  title: "Motion",
}

export default function MotionPage() {
  return (
    <div className="w-full">
      <PageHeader
        title="Motion"
        description="Shared transition classes for overlays, indicators, and color changes. Prefer CSS scale on centered modals so translate centering stays intact."
      />

      <section className="mt-2">
        <h2 className="heading-sm text-fg-primary">Examples</h2>
        <MotionExamples />
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">Overview</h2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Import <Token>motion</Token> from{" "}
          <Token>@standard-ui/react</Token> (via component internals) or copy
          the class strings from the table below. All tokens include{" "}
          <Token>motion-reduce:transition-none</Token>. For character-level
          reveals (typewriter, decode, fade, blur), use{" "}
          <Token>TextAnimate</Token> — see{" "}
          <a
            href="/components/text-animate"
            className="text-fg-primary underline underline-offset-2"
          >
            Text animate
          </a>
          .
        </p>
        <CodeBlock
          className="mt-4"
          code={`import { motion } from "@standard-ui/react"

<div className={cn(motion.backdrop, "fixed inset-0 bg-black/40")} />`}
        />
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">Tokens</h2>
        <DocTable headers={["Token", "Use"]}>
          <tr>
            <DocCell mono>motion.backdrop</DocCell>
            <DocCell>Overlay fade (Dialog, Command, Drawer).</DocCell>
          </tr>
          <tr>
            <DocCell mono>motion.popupCenter</DocCell>
            <DocCell>Centered modals — scale + opacity.</DocCell>
          </tr>
          <tr>
            <DocCell mono>motion.popupAnchor</DocCell>
            <DocCell>Menus, select, tooltip — transform-origin from Base UI.</DocCell>
          </tr>
          <tr>
            <DocCell mono>motion.accordionPanel</DocCell>
            <DocCell>Height expand/collapse.</DocCell>
          </tr>
          <tr>
            <DocCell mono>motion.tabsIndicator</DocCell>
            <DocCell>Sliding tab underline / pill.</DocCell>
          </tr>
          <tr>
            <DocCell mono>motion.colors</DocCell>
            <DocCell>Hover and pressed color transitions.</DocCell>
          </tr>
          <tr>
            <DocCell mono>motion.transform</DocCell>
            <DocCell>Icon rotates and simple transforms.</DocCell>
          </tr>
          <tr>
            <DocCell mono>motion.all</DocCell>
            <DocCell>Generic all-properties transition (sparingly).</DocCell>
          </tr>
        </DocTable>
      </section>

      <section className="mt-14 mb-8">
        <h2 className="heading-sm text-fg-primary">Guidelines</h2>
        <h3 className="heading-xs mt-8 text-fg-primary">Do</h3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>Keep durations short (150–200ms)</li>
          <li>Use popupCenter for dialogs; popupAnchor for floating UI</li>
        </ul>
        <h3 className="heading-xs mt-8 text-fg-primary">Don&apos;t</h3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>Don&apos;t animate translate on centered popups that already use -translate-x/y-1/2</li>
          <li>Don&apos;t skip reduced-motion handling</li>
        </ul>
      </section>
    </div>
  )
}
