import type { Metadata } from "next"
import { CodeBlock } from "@/components/code-block"
import { DocCell, DocTable, Token } from "@/components/doc-table"
import { PageHeader } from "@/components/page-header"
import { AlertDialogExamples } from "./alert-dialog-examples"

export const metadata: Metadata = {
  title: "Alert dialog",
}

export default function AlertDialogPage() {
  return (
    <div className="w-full">
      <PageHeader
        title="Alert dialog"
        description="Interruptive confirmation for destructive or irreversible actions. Prefer a regular dialog when the user needs more context or form fields."
      />

      <section className="mt-2">
        <h2 className="heading-sm text-fg-primary">Examples</h2>
        <AlertDialogExamples />
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">Overview</h2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Alert dialog blocks the page until the user confirms or cancels. Use
          it for discard, delete, and other high-consequence choices. Compose
          with portal, backdrop, popup, title, description, and close actions.
          Style triggers and closes with Button via Base UI&apos;s{" "}
          <Token>render</Token> prop.
        </p>
        <CodeBlock
          className="mt-4"
          code={`import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogPortal,
  AlertDialogBackdrop,
  AlertDialogPopup,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogClose,
  Button,
} from "@boyernick/standard-ui-react"

<AlertDialog>
  <AlertDialogTrigger render={<Button variant="outline" />}>
    Discard draft
  </AlertDialogTrigger>
  {/* portal + popup */}
</AlertDialog>`}
        />
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">Usage</h2>

        <h3 className="heading-xs mt-8 text-fg-primary">Actions</h3>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Put Cancel as an outline close and the destructive action as a
          destructive close. Both should dismiss the dialog — wire the
          destructive path to your delete or discard handler via{" "}
          <Token>onClick</Token> on that close.
        </p>
        <CodeBlock
          className="mt-4"
          size="sm"
          code={`<div className="flex justify-end gap-2">
  <AlertDialogClose render={<Button variant="outline" />}>
    Cancel
  </AlertDialogClose>
  <AlertDialogClose
    render={<Button variant="destructive" />}
    onClick={handleDiscard}
  >
    Discard
  </AlertDialogClose>
</div>`}
        />

        <h3 className="heading-xs mt-10 text-fg-primary">Copy</h3>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Title the consequence as a question. Description should state what
          is lost and whether it can be undone.
        </p>
        <CodeBlock
          className="mt-4"
          size="sm"
          code={`<AlertDialogHeader>
  <AlertDialogTitle>Discard draft?</AlertDialogTitle>
  <AlertDialogDescription>
    Your unsaved changes will be lost. This can't be undone.
  </AlertDialogDescription>
</AlertDialogHeader>`}
        />
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">API</h2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Parts mirror Base UI Alert Dialog. Prefer the{" "}
          <Token>render</Token> prop with <Token>Button</Token> on trigger and
          close for consistent button styles.
        </p>
        <DocTable headers={["Part", "Role"]}>
          <tr>
            <DocCell mono>AlertDialog</DocCell>
            <DocCell>Root state and open control.</DocCell>
          </tr>
          <tr>
            <DocCell mono>AlertDialogTrigger</DocCell>
            <DocCell>Opens the dialog. Use Button via render.</DocCell>
          </tr>
          <tr>
            <DocCell mono>AlertDialogPortal</DocCell>
            <DocCell>Renders overlay content outside the tree.</DocCell>
          </tr>
          <tr>
            <DocCell mono>AlertDialogBackdrop</DocCell>
            <DocCell>Dimmed layer behind the popup.</DocCell>
          </tr>
          <tr>
            <DocCell mono>AlertDialogPopup</DocCell>
            <DocCell>Centered surface for title, body, and actions.</DocCell>
          </tr>
          <tr>
            <DocCell mono>AlertDialogHeader</DocCell>
            <DocCell>Groups title and description with tight spacing.</DocCell>
          </tr>
          <tr>
            <DocCell mono>AlertDialogTitle</DocCell>
            <DocCell>Accessible dialog title.</DocCell>
          </tr>
          <tr>
            <DocCell mono>AlertDialogDescription</DocCell>
            <DocCell>Supporting explanation of the consequence.</DocCell>
          </tr>
          <tr>
            <DocCell mono>AlertDialogClose</DocCell>
            <DocCell>Dismisses the dialog. Style with Button.</DocCell>
          </tr>
        </DocTable>
      </section>

      <section className="mt-14 mb-8">
        <h2 className="heading-sm text-fg-primary">Guidelines</h2>

        <h3 className="heading-xs mt-8 text-fg-primary">Do</h3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>Reserve alert dialogs for irreversible or high-risk actions</li>
          <li>
            Label the destructive button with the verb — Discard, Delete
          </li>
          <li>Keep Cancel available and visually quieter</li>
        </ul>

        <h3 className="heading-xs mt-8 text-fg-primary">Don't</h3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>
            Don&apos;t use alert dialogs for multi-step forms — use Dialog
          </li>
          <li>
            Don&apos;t hide Cancel or rely only on the backdrop to dismiss
          </li>
          <li>
            Don&apos;t use vague titles like &quot;Are you sure?&quot; without
            naming the action
          </li>
        </ul>
      </section>
    </div>
  )
}
