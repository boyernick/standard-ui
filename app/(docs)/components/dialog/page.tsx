import type { Metadata } from "next"
import { CodeBlock } from "@/components/code-block"
import { DocCell, DocTable, Token } from "@/components/doc-table"
import { PageHeader } from "@/components/page-header"
import { DialogExamples } from "./dialog-examples"

export const metadata: Metadata = {
  title: "Dialog",
}

export default function DialogPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader
        title="Dialog"
        description="Modal surface for focused tasks — forms, details, and short flows. Use alert dialog when the action is destructive or irreversible."
      />

      <section className="mt-2">
        <h2 className="heading-sm text-fg-primary">Examples</h2>
        <DialogExamples />
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">Overview</h2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Dialog opens a centered popup over a backdrop. Compose portal,
          backdrop, popup, title, description, and close. Style triggers and
          closes with Button via Base UI&apos;s <Token>render</Token> prop.
        </p>
        <CodeBlock
          className="mt-4"
          code={`import {
  Button,
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogBackdrop,
  DialogPopup,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@standard-ui/react"

<Dialog>
  <DialogTrigger render={<Button />}>Open dialog</DialogTrigger>
  <DialogPortal>
    <DialogBackdrop />
    <DialogPopup>
      <DialogTitle>Edit profile</DialogTitle>
      <DialogDescription>
        Make changes to your profile.
      </DialogDescription>
      <DialogClose render={<Button variant="outline" />}>
        Close
      </DialogClose>
    </DialogPopup>
  </DialogPortal>
</Dialog>`}
        />
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">Usage</h2>

        <h3 className="heading-xs mt-8 text-fg-primary">Trigger and close</h3>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Pass Button through <Token>render</Token> so the control keeps Standard
          UI styles without nesting buttons.
        </p>
        <CodeBlock
          className="mt-4"
          size="sm"
          code={`<DialogTrigger render={<Button />}>Open dialog</DialogTrigger>
<DialogClose render={<Button variant="outline" />}>Close</DialogClose>`}
        />

        <h3 className="heading-xs mt-10 text-fg-primary">Structure</h3>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Always include a title. Description is optional but recommended for
          context. Put primary and secondary actions in a trailing row inside
          the popup.
        </p>
        <CodeBlock
          className="mt-4"
          size="sm"
          code={`<DialogPopup>
  <DialogHeader>
    <DialogTitle>Edit profile</DialogTitle>
    <DialogDescription>
      Update your name and email address.
    </DialogDescription>
  </DialogHeader>
  {/* form fields + actions */}
</DialogPopup>`}
        />
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">API</h2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Parts mirror Base UI Dialog. Prefer{" "}
          <Token>render=&#123;&lt;Button /&gt;&#125;</Token> on trigger and
          close for consistent button styles.
        </p>
        <DocTable headers={["Part", "Role"]}>
          <tr>
            <DocCell mono>Dialog</DocCell>
            <DocCell>Root state and open control.</DocCell>
          </tr>
          <tr>
            <DocCell mono>DialogTrigger</DocCell>
            <DocCell>Opens the dialog. Use Button via render.</DocCell>
          </tr>
          <tr>
            <DocCell mono>DialogPortal</DocCell>
            <DocCell>Renders overlay content outside the tree.</DocCell>
          </tr>
          <tr>
            <DocCell mono>DialogBackdrop</DocCell>
            <DocCell>Dimmed layer behind the popup.</DocCell>
          </tr>
          <tr>
            <DocCell mono>DialogPopup</DocCell>
            <DocCell>Centered surface for title, body, and actions.</DocCell>
          </tr>
          <tr>
            <DocCell mono>DialogHeader</DocCell>
            <DocCell>Groups title and description with tight spacing.</DocCell>
          </tr>
          <tr>
            <DocCell mono>DialogTitle</DocCell>
            <DocCell>Accessible dialog title.</DocCell>
          </tr>
          <tr>
            <DocCell mono>DialogDescription</DocCell>
            <DocCell>Supporting explanation.</DocCell>
          </tr>
          <tr>
            <DocCell mono>DialogClose</DocCell>
            <DocCell>Dismisses the dialog. Style with Button.</DocCell>
          </tr>
        </DocTable>
      </section>

      <section className="mt-14 mb-8">
        <h2 className="heading-sm text-fg-primary">Guidelines</h2>

        <h3 className="heading-xs mt-8 text-fg-primary">Do</h3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>Use dialogs for focused tasks that need the page blocked</li>
          <li>Provide a clear title and an obvious dismiss action</li>
          <li>
            Prefer alert dialog for discard, delete, and other high-risk confirms
          </li>
        </ul>

        <h3 className="heading-xs mt-8 text-fg-primary">Don't</h3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>
            Don&apos;t nest a Button inside DialogTrigger — use{" "}
            <Token>render</Token>
          </li>
          <li>
            Don&apos;t open dialogs for content that belongs on a full page
          </li>
          <li>
            Don&apos;t leave the popup without a title for screen readers
          </li>
        </ul>
      </section>
    </div>
  )
}
