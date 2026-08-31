import type { Metadata } from "next"
import {
  Button,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  IconDotGrid1x3Horizontal,
} from "@boyernick/standard-ui-react"
import { DocBand } from "@/components/doc-band"
import { DocPage } from "@/components/doc-page"

export const metadata: Metadata = {
  title: "Card",
}

export default function CardPage() {
  return (
    <DocPage
      title="Card"
      description="Surface for grouping related content and actions."
      heading={null}
      bleed
    >
      <div>
        <DocBand
          first
          id="variants"
          title="Variants"
          description="Elevated, outlined, or untreated surfaces."
          contentClassName="max-w-2xl"
        >
          <div className="grid gap-4 sm:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Elevated</CardTitle>
                <CardDescription>Drop shadow with no border.</CardDescription>
              </CardHeader>
            </Card>
            <Card variant="outline">
              <CardHeader>
                <CardTitle>Outline</CardTitle>
                <CardDescription>Flat, hairline border.</CardDescription>
              </CardHeader>
            </Card>
            <Card variant="ghost">
              <CardHeader>
                <CardTitle>Ghost</CardTitle>
                <CardDescription>No surface treatment.</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </DocBand>

        <DocBand
          id="composition"
          title="Header, content, and footer"
          description="Compose related information and actions with consistent spacing."
        >
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle>Notion connection expired</CardTitle>
              <CardDescription>
                Reconnect to keep using Notion in StandardUI.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-fg-secondary">
                Connections expire periodically for security. Reconnecting
                takes a few seconds.
              </p>
            </CardContent>
            <CardFooter className="justify-end">
              <Button size="sm" variant="ghost">
                Dismiss
              </Button>
              <Button size="sm">Reconnect</Button>
            </CardFooter>
          </Card>
        </DocBand>

        <DocBand
          id="action"
          title="With action"
          description="Pin a single control to the top-right of the header."
        >
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle>Usage</CardTitle>
              <CardDescription>This month across your workspace.</CardDescription>
              <CardAction>
                <Button
                  size="sm"
                  variant="ghost"
                  iconOnly
                  aria-label="Usage options"
                >
                  <IconDotGrid1x3Horizontal aria-hidden />
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold tabular-nums text-fg-primary">
                12,480
              </p>
            </CardContent>
          </Card>
        </DocBand>

        <DocBand
          id="custom-padding"
          title="Custom padding"
          description="Remove built-in spacing for compact or highly customized layouts."
        >
          <Card
            padding="none"
            className="w-full max-w-sm flex-row items-center gap-3 p-4"
          >
            <div className="size-9 shrink-0 rounded-lg bg-background-tertiary" />
            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
              <p className="text-sm-strong text-fg-primary">Compact row</p>
              <p className="text-sm text-fg-secondary">
                Use padding=&quot;none&quot; to control spacing yourself.
              </p>
            </div>
          </Card>
        </DocBand>
      </div>
    </DocPage>
  )
}
