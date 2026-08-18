import type { Metadata } from "next"
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@standard-ui/react"
import { CodeBlock } from "@/components/code-block"
import { ComponentCanvas } from "@/components/component-canvas"
import { DocCell, DocTable, Token } from "@/components/doc-table"
import { PageHeader } from "@/components/page-header"

export const metadata: Metadata = {
  title: "Card",
}

export default function CardPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader
        title="Card"
        description="Surface for grouping related content and actions. Use when a bordered container clarifies a unit of work."
      />

      <section className="mt-2">
        <h2 className="heading-sm text-fg-primary">Examples</h2>

        <div className="mt-6 flex flex-col gap-8">
          <ComponentCanvas
            label="Composition"
            contentClassName="mx-auto w-full max-w-sm"
            minHeightClass="min-h-56"
            code={`<Card className="w-full max-w-sm">
  <CardHeader>
    <CardTitle>Project settings</CardTitle>
    <CardDescription>
      Update the name and visibility for this workspace.
    </CardDescription>
  </CardHeader>
  <CardContent>
    <p className="text-sm text-fg-secondary">
      Changes apply to everyone with access to the project.
    </p>
  </CardContent>
  <CardFooter>
    <Button variant="outline">Cancel</Button>
    <Button>Save</Button>
  </CardFooter>
</Card>`}
          >
            <Card className="w-full max-w-sm">
              <CardHeader>
                <CardTitle>Project settings</CardTitle>
                <CardDescription>
                  Update the name and visibility for this workspace.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-fg-secondary">
                  Changes apply to everyone with access to the project.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Cancel</Button>
                <Button>Save</Button>
              </CardFooter>
            </Card>
          </ComponentCanvas>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">Overview</h2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Card is a presentational shell: header, title, description, content,
          and footer slots. It does not manage state — nest forms, lists, or
          actions inside as needed.
        </p>
        <CodeBlock
          className="mt-4"
          code={`import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Button,
} from "@standard-ui/react"

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Short supporting line.</CardDescription>
  </CardHeader>
  <CardContent>Body</CardContent>
  <CardFooter>
    <Button>Continue</Button>
  </CardFooter>
</Card>`}
        />
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">Usage</h2>

        <h3 className="heading-xs mt-8 text-fg-primary">Slots</h3>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Use <Token>CardHeader</Token> for title and description,{" "}
          <Token>CardContent</Token> for the main body, and{" "}
          <Token>CardFooter</Token> for actions aligned in a row.
        </p>
        <CodeBlock
          className="mt-4"
          size="sm"
          code={`<CardHeader>
  <CardTitle>Billing</CardTitle>
  <CardDescription>Manage your plan and invoices.</CardDescription>
</CardHeader>
<CardContent>{/* fields or summary */}</CardContent>
<CardFooter>
  <Button variant="outline">Cancel</Button>
  <Button>Save</Button>
</CardFooter>`}
        />

        <h3 className="heading-xs mt-10 text-fg-primary">When to use</h3>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Prefer a card when the block is a discrete unit — a setting group,
          summary, or call-to-action. Skip cards for simple stacked text on a
          page that already has clear sections.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">API</h2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          All parts render semantic HTML and accept standard attributes plus{" "}
          <Token>className</Token>.
        </p>
        <DocTable headers={["Part", "Element", "Description"]}>
          <tr>
            <DocCell mono>Card</DocCell>
            <DocCell mono>div</DocCell>
            <DocCell>Bordered surface container.</DocCell>
          </tr>
          <tr>
            <DocCell mono>CardHeader</DocCell>
            <DocCell mono>div</DocCell>
            <DocCell>Top region for title and description.</DocCell>
          </tr>
          <tr>
            <DocCell mono>CardTitle</DocCell>
            <DocCell mono>h3</DocCell>
            <DocCell>Primary heading for the card.</DocCell>
          </tr>
          <tr>
            <DocCell mono>CardDescription</DocCell>
            <DocCell mono>p</DocCell>
            <DocCell>Secondary supporting text.</DocCell>
          </tr>
          <tr>
            <DocCell mono>CardContent</DocCell>
            <DocCell mono>div</DocCell>
            <DocCell>Main body with default padding.</DocCell>
          </tr>
          <tr>
            <DocCell mono>CardFooter</DocCell>
            <DocCell mono>div</DocCell>
            <DocCell>Action row, typically buttons.</DocCell>
          </tr>
        </DocTable>
      </section>

      <section className="mt-14 mb-8">
        <h2 className="heading-sm text-fg-primary">Guidelines</h2>

        <h3 className="heading-xs mt-8 text-fg-primary">Do</h3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>Keep one clear purpose per card</li>
          <li>Put primary actions in the footer</li>
          <li>Use description for a single supporting sentence</li>
        </ul>

        <h3 className="heading-xs mt-8 text-fg-primary">Don't</h3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>
            Don&apos;t nest cards inside cards without a strong hierarchy need
          </li>
          <li>
            Don&apos;t wrap every paragraph on a docs page in a card
          </li>
          <li>
            Don&apos;t place competing primary buttons in the same footer
          </li>
        </ul>
      </section>
    </div>
  )
}
