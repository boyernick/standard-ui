import type { Metadata } from "next"
import {
  Button,
  IconChevronBottom,
  IconMagnifyingGlass,
  IconPlus,
} from "@boyernick/standard-ui-react"
import { CodeBlock } from "@/components/code-block"
import { ComponentCanvas } from "@/components/component-canvas"
import { DocCell, DocTable, Token } from "@/components/doc-table"
import { PageHeader } from "@/components/page-header"

export const metadata: Metadata = {
  title: "Button",
}

export default function ButtonPage() {
  return (
    <div className="w-full">
      <PageHeader
        title="Button"
        description="Buttons trigger actions. Use primary for the one main action on a surface, lower-emphasis variants for everything else."
      />

      <section className="mt-2">
        <h2 className="heading-sm text-fg-primary">Examples</h2>

        <div className="mt-6 flex flex-col gap-8">
          <ComponentCanvas
            label="Variants"
            code={`<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>`}
          >
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
          </ComponentCanvas>

          <ComponentCanvas
            label="Sizes"
            code={`<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`}
          >
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </ComponentCanvas>

          <ComponentCanvas
            label="With icons"
            code={`<Button variant="primary" prefix={<IconPlus size={16} aria-hidden />}>
  Add item
</Button>
<Button
  variant="outline"
  suffix={<IconChevronBottom size={16} aria-hidden />}
>
  Continue
</Button>`}
          >
            <Button
              variant="primary"
              prefix={<IconPlus size={16} aria-hidden />}
            >
              Add item
            </Button>
            <Button
              variant="outline"
              suffix={<IconChevronBottom size={16} aria-hidden />}
            >
              Continue
            </Button>
          </ComponentCanvas>

          <ComponentCanvas
            label="Loading"
            code={`<Button variant="primary" loading>Primary</Button>
<Button variant="outline" loading>Outline</Button>
<Button variant="ghost" loading>Ghost</Button>
<Button variant="destructive" loading>Destructive</Button>`}
          >
            <Button variant="primary" loading>
              Primary
            </Button>
            <Button variant="outline" loading>
              Outline
            </Button>
            <Button variant="ghost" loading>
              Ghost
            </Button>
            <Button variant="destructive" loading>
              Destructive
            </Button>
          </ComponentCanvas>

          <ComponentCanvas
            label="Icon only"
            code={`<Button iconOnly aria-label="Search" size="sm">
  <IconMagnifyingGlass size={16} aria-hidden />
</Button>
<Button iconOnly aria-label="Search">
  <IconMagnifyingGlass size={16} aria-hidden />
</Button>
<Button iconOnly aria-label="Search" size="lg">
  <IconMagnifyingGlass size={16} aria-hidden />
</Button>
<Button variant="ghost" iconOnly aria-label="Search">
  <IconMagnifyingGlass size={16} aria-hidden />
</Button>`}
          >
            <Button iconOnly aria-label="Search" size="sm">
              <IconMagnifyingGlass size={16} aria-hidden />
            </Button>
            <Button iconOnly aria-label="Search">
              <IconMagnifyingGlass size={16} aria-hidden />
            </Button>
            <Button iconOnly aria-label="Search" size="lg">
              <IconMagnifyingGlass size={16} aria-hidden />
            </Button>
            <Button variant="ghost" iconOnly aria-label="Search">
              <IconMagnifyingGlass size={16} aria-hidden />
            </Button>
          </ComponentCanvas>

          <ComponentCanvas
            label="Rounded"
            code={`<Button rounded>Subscribe</Button>
<Button rounded variant="outline">
  Follow
</Button>
<Button rounded iconOnly aria-label="Add">
  <IconPlus size={16} aria-hidden />
</Button>
<Button rounded variant="ghost" iconOnly aria-label="Add">
  <IconPlus size={16} aria-hidden />
</Button>`}
          >
            <Button rounded>Subscribe</Button>
            <Button rounded variant="outline">
              Follow
            </Button>
            <Button rounded iconOnly aria-label="Add">
              <IconPlus size={16} aria-hidden />
            </Button>
            <Button rounded variant="ghost" iconOnly aria-label="Add">
              <IconPlus size={16} aria-hidden />
            </Button>
          </ComponentCanvas>

          <ComponentCanvas
            label="Disabled"
            code={`<Button variant="primary" disabled>Primary</Button>
<Button variant="outline" disabled>Outline</Button>
<Button variant="ghost" disabled>Ghost</Button>
<Button variant="destructive" disabled>Destructive</Button>`}
          >
            <Button variant="primary" disabled>
              Primary
            </Button>
            <Button variant="outline" disabled>
              Outline
            </Button>
            <Button variant="ghost" disabled>
              Ghost
            </Button>
            <Button variant="destructive" disabled>
              Destructive
            </Button>
          </ComponentCanvas>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">Overview</h2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Button is the primary control for triggering actions. It supports
          multiple variants for different emphasis levels, three sizes, icons,
          loading, icon-only, and rounded (pill) shapes. Primary and destructive
          use a matching border plus a top inset highlight so solid fills read
          as raised rather than flat.
        </p>
        <CodeBlock
          className="mt-4"
          code={`import { Button } from "@boyernick/standard-ui-react"

<Button variant="primary" size="md">
  Click me
</Button>`}
        />
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">Usage</h2>

        <h3 className="heading-xs mt-8 text-fg-primary">Variants</h3>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Variants encode emphasis, not taste — pick by the action&apos;s role
          on the surface. The ladder, highest to lowest:{" "}
          <Token>primary</Token> → <Token>secondary</Token> /{" "}
          <Token>outline</Token> → <Token>ghost</Token>.{" "}
          <Token>destructive</Token> sits outside the ladder: it encodes
          danger, not importance.
        </p>
        <p className="text-md mt-3 max-w-3xl text-fg-secondary">
          Always write <Token>variant</Token> explicitly. The default is{" "}
          <Token>primary</Token>, so a button without a variant silently
          becomes a primary CTA.
        </p>
        <DocTable headers={["Variant", "Use it for"]}>
          {[
            [
              "primary",
              "The single most important action on a surface — modal confirm, form submit, page CTA. At most one per page, panel, modal, or form.",
            ],
            [
              "secondary",
              "Filled secondary actions on busy surfaces where a border adds noise — cards, dense panels, filter rows.",
            ],
            [
              "outline",
              "Standalone secondary actions — Cancel next to a primary confirm, header and form side actions. The default when unsure.",
            ],
            [
              "ghost",
              "Repeated and contextual actions — toolbars, icon buttons, per-row actions, close/dismiss.",
            ],
            [
              "destructive",
              "Irreversible or dangerous actions only — delete, remove, revoke. Usually the confirm of a confirmation dialog.",
            ],
          ].map(([variant, usage]) => (
            <tr key={variant}>
              <DocCell mono>{variant}</DocCell>
              <DocCell>{usage}</DocCell>
            </tr>
          ))}
        </DocTable>
        <CodeBlock
          className="mt-4"
          size="sm"
          code={`<Button variant="primary">Save changes</Button>
<Button variant="outline">Cancel</Button>
<Button variant="secondary">Edit</Button>
<Button variant="ghost">More options</Button>
<Button variant="destructive">Delete</Button>`}
        />

        <h3 className="heading-xs mt-10 text-fg-primary">Sizes</h3>
        <DocTable headers={["Size", "Height", "Use case"]}>
          {[
            ["sm", "32px", "Toolbars, inline actions, dense layouts"],
            ["md", "36px", "Default — most buttons in the interface"],
            ["lg", "40px", "Primary CTAs, hero sections"],
          ].map(([size, height, useCase]) => (
            <tr key={size}>
              <DocCell mono>{size}</DocCell>
              <DocCell mono>{height}</DocCell>
              <DocCell>{useCase}</DocCell>
            </tr>
          ))}
        </DocTable>
        <CodeBlock
          className="mt-4"
          size="sm"
          code={`<Button size="sm">Tag</Button>
<Button size="md">Submit</Button>
<Button size="lg">Get started</Button>`}
        />

        <h3 className="heading-xs mt-10 text-fg-primary">With icons</h3>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Prefer <Token>prefix</Token> / <Token>suffix</Token> so icons scale
          with the control. You can still pass icons as children. Mark
          decorative icons with <Token>aria-hidden</Token>.
        </p>
        <CodeBlock
          className="mt-4"
          size="sm"
          code={`import { Button, IconPlus } from "@boyernick/standard-ui-react"

<Button variant="primary" prefix={<IconPlus size={16} aria-hidden />}>
  Add item
</Button>`}
        />

        <h3 className="heading-xs mt-10 text-fg-primary">Loading</h3>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          When <Token>loading</Token> is true, a spinner replaces the prefix,
          the button disables, and <Token>aria-busy</Token> is set. Keep the
          label so width stays stable.
        </p>
        <CodeBlock
          className="mt-4"
          size="sm"
          code={`<Button loading={isSaving} onClick={handleSave}>
  Save changes
</Button>`}
        />

        <h3 className="heading-xs mt-10 text-fg-primary">Icon only</h3>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Use <Token>iconOnly</Token> for square icon buttons. Always provide
          an <Token>aria-label</Token>.
        </p>
        <CodeBlock
          className="mt-4"
          size="sm"
          code={`<Button iconOnly aria-label="Search">
  <IconMagnifyingGlass size={16} aria-hidden />
</Button>`}
        />

        <h3 className="heading-xs mt-10 text-fg-primary">Rounded</h3>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          <Token>rounded</Token> applies a pill shape. Works with all sizes and
          variants, including icon-only.
        </p>
        <CodeBlock
          className="mt-4"
          size="sm"
          code={`<Button rounded>Subscribe</Button>
<Button rounded iconOnly aria-label="Add">
  <IconPlus size={16} aria-hidden />
</Button>
<Button rounded variant="ghost" iconOnly aria-label="Add">
  <IconPlus size={16} aria-hidden />
</Button>`}
        />

        <h3 className="heading-xs mt-10 text-fg-primary">Disabled</h3>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Disabled buttons use reduced opacity and{" "}
          <Token>cursor-not-allowed</Token>. Prefer explaining why an action
          is unavailable (helper text or tooltip) instead of a silent disable.
        </p>
        <CodeBlock
          className="mt-4"
          size="sm"
          code={`<Button disabled={!isFormValid}>Submit</Button>`}
        />
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">API</h2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Button accepts all standard HTML button attributes.
        </p>
        <DocTable headers={["Prop", "Type", "Default", "Description"]}>
          <tr>
            <DocCell mono>variant</DocCell>
            <DocCell mono>
              &quot;primary&quot; | &quot;secondary&quot; | &quot;outline&quot;
              | &quot;ghost&quot; | &quot;destructive&quot;
            </DocCell>
            <DocCell mono>&quot;primary&quot;</DocCell>
            <DocCell>Visual style of the button.</DocCell>
          </tr>
          <tr>
            <DocCell mono>size</DocCell>
            <DocCell mono>
              &quot;sm&quot; | &quot;md&quot; | &quot;lg&quot;
            </DocCell>
            <DocCell mono>&quot;md&quot;</DocCell>
            <DocCell>Size of the button.</DocCell>
          </tr>
          <tr>
            <DocCell mono>iconOnly</DocCell>
            <DocCell mono>boolean</DocCell>
            <DocCell mono>false</DocCell>
            <DocCell>Square button for icon-only use.</DocCell>
          </tr>
          <tr>
            <DocCell mono>rounded</DocCell>
            <DocCell mono>boolean</DocCell>
            <DocCell mono>false</DocCell>
            <DocCell>Pill shape (fully rounded corners).</DocCell>
          </tr>
          <tr>
            <DocCell mono>prefix</DocCell>
            <DocCell mono>ReactNode</DocCell>
            <DocCell mono>—</DocCell>
            <DocCell>Element before the label.</DocCell>
          </tr>
          <tr>
            <DocCell mono>suffix</DocCell>
            <DocCell mono>ReactNode</DocCell>
            <DocCell mono>—</DocCell>
            <DocCell>Element after the label.</DocCell>
          </tr>
          <tr>
            <DocCell mono>loading</DocCell>
            <DocCell mono>boolean</DocCell>
            <DocCell mono>false</DocCell>
            <DocCell>Shows a spinner and disables the button.</DocCell>
          </tr>
          <tr>
            <DocCell mono>disabled</DocCell>
            <DocCell mono>boolean</DocCell>
            <DocCell mono>false</DocCell>
            <DocCell>Disables the button.</DocCell>
          </tr>
          <tr>
            <DocCell mono>type</DocCell>
            <DocCell mono>
              &quot;button&quot; | &quot;submit&quot; | &quot;reset&quot;
            </DocCell>
            <DocCell mono>&quot;button&quot;</DocCell>
            <DocCell>Native button type.</DocCell>
          </tr>
        </DocTable>
      </section>

      <section className="mt-14 mb-8">
        <h2 className="heading-sm text-fg-primary">Guidelines</h2>

        <h3 className="heading-xs mt-8 text-fg-primary">Do</h3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>
            Always pass <Token>variant</Token> explicitly — the default is{" "}
            <Token>primary</Token>, and an accidental primary is the most
            common variant bug
          </li>
          <li>
            Use <Token>primary</Token> for the main action on a page or in a
            modal — at most one per surface
          </li>
          <li>
            Use <Token>outline</Token> or <Token>secondary</Token> for
            secondary actions alongside a primary button
          </li>
          <li>
            Use <Token>ghost</Token> for tertiary, repeated, or contextual
            actions (toolbars, icon buttons, row actions)
          </li>
          <li>
            Use <Token>destructive</Token> only for irreversible or dangerous
            actions
          </li>
          <li>
            Pair modal footers as <Token>primary</Token> (or{" "}
            <Token>destructive</Token>) confirm + <Token>outline</Token> cancel
          </li>
          <li>
            Provide <Token>aria-label</Token> for icon-only buttons
          </li>
          <li>
            Use <Token>loading</Token> for async actions so the control stays
            focusable and announces busy state
          </li>
          <li>
            Keep labels concise and action-oriented (&quot;Save&quot;,
            &quot;Delete&quot;, &quot;Continue&quot;)
          </li>
        </ul>

        <h3 className="heading-xs mt-8 text-fg-primary">Don't</h3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>
            Don&apos;t use multiple <Token>primary</Token> buttons in the same
            context — there should be one clear primary action
          </li>
          <li>
            Don&apos;t use <Token>destructive</Token> for non-dangerous actions
            just for visual emphasis
          </li>
          <li>
            Don&apos;t disable buttons without explaining why (consider a
            tooltip or helper text)
          </li>
          <li>
            Don&apos;t use icon-only buttons without{" "}
            <Token>aria-label</Token>
          </li>
          <li>
            Don&apos;t mix too many button variants in one area — it creates
            visual noise
          </li>
          <li>
            Don&apos;t force <Token>cursor-pointer</Token> on buttons — reserve
            the hand cursor for links
          </li>
        </ul>
      </section>
    </div>
  )
}
