import type { Metadata } from "next"
import {
  Button,
  IconChevronBottom,
  IconMagnifyingGlass,
  IconPlus,
} from "@boyernick/standard-ui-react"
import { DocBand } from "@/components/doc-band"
import { DocPage } from "@/components/doc-page"

export const metadata: Metadata = {
  title: "Button",
}

export default function ButtonPage() {
  return (
    <DocPage
      title="Button"
      description="Triggers an action, across levels of emphasis."
      heading={null}
      bleed
    >
      <div>
        <DocBand
          first
          id="variants"
          title="Variants"
          description="Emphasis matched to the weight of the action."
        >
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
          </div>
        </DocBand>

        <DocBand
          id="sizes"
          title="Sizes"
          description="Three heights, from compact to prominent."
        >
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
        </DocBand>

        <DocBand
          id="icons"
          title="With icons"
          description="Place a supporting icon before or after the label."
        >
          <div className="flex flex-wrap items-center gap-3">
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
          </div>
        </DocBand>

        <DocBand
          id="loading"
          title="Loading"
          description="Shows progress and blocks repeat submissions."
        >
          <div className="flex flex-wrap items-center gap-3">
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
          </div>
        </DocBand>

        <DocBand
          id="icon-only"
          title="Icon only"
          description="A square button for actions that need no label."
        >
          <div className="flex flex-wrap items-center gap-3">
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
          </div>
        </DocBand>

        <DocBand
          id="rounded"
          title="Rounded"
          description="A soft radius, or a pill for compact actions."
        >
          <div className="flex flex-wrap items-center gap-3">
            <Button>Default radius</Button>
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
          </div>
        </DocBand>

        <DocBand
          id="disabled"
          title="Disabled"
          description="Disabled buttons remain visible while clearly unavailable."
        >
          <div className="flex flex-wrap items-center gap-3">
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
          </div>
        </DocBand>
      </div>
    </DocPage>
  )
}
