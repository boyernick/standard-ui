import type { Metadata } from "next"
import { CodeBlock } from "@/components/code-block"
import { DocCell, DocTable, Token } from "@/components/doc-table"
import { PageHeader } from "@/components/page-header"
import { ToastExamples } from "./toast-examples"
import { H2, H3 } from "@/components/prose"

export const metadata: Metadata = {
  title: "Toast",
}

export default function ToastPage() {
  return (
    <div className="w-full">
      <PageHeader
        title="Toast"
        description="Transient notifications for saves, errors, and confirmations. Stack in a viewport and dismiss with close or timeout."
      />

      <section className="mt-2">
        <H2>Examples</H2>
        <ToastExamples />
      </section>

      <section className="mt-14">
        <H2>Overview</H2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Wrap the app (or a demo) in <Token>ToastProvider</Token>, render a
          portal viewport that maps <Token>toasts</Token> from{" "}
          <Token>useToastManager</Token>, then call{" "}
          <Token>toastManager.add()</Token> from buttons or async flows.
        </p>
        <CodeBlock
          className="mt-4"
          code={`import {
  ToastProvider,
  ToastPortal,
  ToastViewport,
  ToastRoot,
  ToastContent,
  ToastTitle,
  ToastDescription,
  ToastClose,
  useToastManager,
} from "@boyernick/standard-ui-react"

<ToastProvider>
  <ToastPortal>
    <ToastViewport>
      {toasts.map((toast) => (
        <ToastRoot key={toast.id} toast={toast}>
          <ToastContent>
            <ToastTitle />
            <ToastDescription />
            <ToastClose aria-label="Close" />
          </ToastContent>
        </ToastRoot>
      ))}
    </ToastViewport>
  </ToastPortal>
</ToastProvider>`}
        />
      </section>

      <section className="mt-14">
        <H2>Usage</H2>

        <H3>Add a toast</H3>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Call <Token>useToastManager</Token> inside the provider, then pass
          title, description, and optional action props.
        </p>
        <CodeBlock
          className="mt-4"
          size="sm"
          code={`const toastManager = useToastManager()

toastManager.add({
  title: "Saved",
  description: "Draft stored locally.",
})`}
        />

        <H3 className="mt-10">Anatomy</H3>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Provider owns the queue; viewport renders each root with content
          parts.
        </p>
        <CodeBlock
          className="mt-4"
          size="sm"
          code={`ToastProvider
  ToastPortal
    ToastViewport
      ToastRoot
        ToastContent
          ToastTitle
          ToastDescription
          ToastAction
          ToastClose`}
        />
      </section>

      <section className="mt-14">
        <H2>API</H2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Parts mirror Base UI Toast. Common pieces:
        </p>
        <DocTable headers={["Part", "Role"]}>
          <tr>
            <DocCell mono>ToastProvider</DocCell>
            <DocCell>Context and queue for the toast manager.</DocCell>
          </tr>
          <tr>
            <DocCell mono>ToastViewport</DocCell>
            <DocCell>Fixed stack region for visible toasts.</DocCell>
          </tr>
          <tr>
            <DocCell mono>ToastRoot</DocCell>
            <DocCell>Single toast shell; pass the toast object.</DocCell>
          </tr>
          <tr>
            <DocCell mono>useToastManager</DocCell>
            <DocCell>Hook for add, close, update, and toasts list.</DocCell>
          </tr>
          <tr>
            <DocCell mono>createToastManager</DocCell>
            <DocCell>Global manager for use outside React trees.</DocCell>
          </tr>
        </DocTable>
      </section>

      <section className="mt-14 mb-8">
        <H2>Guidelines</H2>

        <H3>Do</H3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>Keep copy short — title plus one supporting line</li>
          <li>Offer Undo when the action is destructive and reversible</li>
          <li>Mount one provider high in the tree for shared toasts</li>
        </ul>

        <H3>Don&apos;t</H3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>Don&apos;t use toasts for critical errors that need a dialog</li>
          <li>Don&apos;t spam the queue — coalesce or replace when possible</li>
          <li>Don&apos;t omit a close control for long-lived messages</li>
        </ul>
      </section>
    </div>
  )
}
