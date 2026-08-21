import type { Metadata } from "next"
import {
  Button,
  IconChevronBottom,
  IconMagnifyingGlass,
  IconPlus,
} from "@boyernick/standard-ui-react"
import { ComponentCanvas } from "@/components/component-canvas"
import { DocPage } from "@/components/doc-page"

export const metadata: Metadata = {
  title: "Button",
}

export default function ButtonPage() {
  return (
    <DocPage
      title="Button"
      description="Trigger an action, with variants for descending levels of emphasis."
    >
      <ComponentCanvas label="Variants">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
      </ComponentCanvas>

      <ComponentCanvas label="Sizes">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </ComponentCanvas>

      <ComponentCanvas label="With icons">
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

      <ComponentCanvas label="Loading">
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

      <ComponentCanvas label="Icon only">
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

      <ComponentCanvas label="Rounded">
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

      <ComponentCanvas label="Disabled">
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
    </DocPage>
  )
}
