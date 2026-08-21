import type { Metadata } from "next"
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@boyernick/standard-ui-react"
import { ComponentCanvas } from "@/components/component-canvas"
import { DocPage } from "@/components/doc-page"

export const metadata: Metadata = {
  title: "Card",
}

export default function CardPage() {
  return (
    <DocPage
      title="Card"
      description="Surface for grouping related content and actions."
    >
      <ComponentCanvas
        label="Composition"
        contentClassName="mx-auto w-full max-w-sm"
        minHeightClass="min-h-56"
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
    </DocPage>
  )
}
