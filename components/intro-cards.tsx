import {
  Badge,
  BrandWordmark,
  Button,
  IconBell,
  IconCalendar1,
  IconCheckmark1,
  IconChevronRightSmall,
  IconCircleCheck,
  IconCircleInfo,
  IconClipboard,
  IconHome,
  IconMagnifyingGlass,
  IconMinus,
  IconPeople,
  IconPlus,
  IconSettingsGear1,
  IconSquareBehindSquare6,
  IconStar,
  IconX,
  Input,
  Kbd,
  Switch,
} from "@boyernick/standard-ui-react"
import Link from "next/link"
import type { ReactNode } from "react"
import { PAGE_INNER, PAGE_INNER_LEFT, PAGE_INNER_RIGHT } from "@/lib/chrome"

/** Cell padding. The outer edge tracks the page measure so the text lines up
 *  with the header above it; the inner edge is a fixed gutter beside the
 *  divider. These are plain strings with no `cn` to resolve conflicts, so the
 *  inner edge deliberately stops at `md:` — adding the `lg:` step from
 *  `PAGE_INNER_*` would win the cascade and swallow the gutter. */
const CELL_LEFT = `${PAGE_INNER_LEFT} pr-4 md:pr-10`
const CELL_RIGHT = `pl-4 md:pl-10 ${PAGE_INNER_RIGHT}`

const cellClassName =
  "group flex flex-col py-8 outline-none transition-colors hover:bg-background-secondary focus-visible:bg-background-secondary"

/** One destination in the grid. The specimen is inert — the whole cell is a
 *  single link, so a control inside it must not take the press. */
const Cell = ({
  href,
  title,
  description,
  className,
  children,
}: {
  href: string
  title: string
  description: string
  className: string
  children: ReactNode
}) => (
  <Link href={href} className={`${cellClassName} ${className}`}>
    <div className="pointer-events-none flex h-44 items-center justify-center select-none">
      {children}
    </div>
    <h2 className="heading-sm mt-6 text-fg-primary">{title}</h2>
    <p className="text-sm mt-1 max-w-2xl text-fg-secondary">{description}</p>
  </Link>
)

/** A row of the grid. The rule above is full-bleed like every band on the
 *  site; the divider between columns is interior to the row. */
const Row = ({ first, children }: { first?: boolean; children: ReactNode }) => (
  <div
    className={`grid md:grid-cols-2 md:divide-x md:divide-border-primary ${
      first ? "" : "border-t border-border-primary"
    }`}
  >
    {children}
  </div>
)

const ComponentsPreview = () => (
  <div className="flex flex-wrap items-center gap-3">
    <Input className="w-40" placeholder="Text here" readOnly />
    <Button size="sm">Button</Button>
    <Badge size="sm" variant="success">
      Shipped
    </Badge>
    <Switch defaultChecked />
    <Kbd>⌘</Kbd>
  </div>
)

const TypographyPreview = () => (
  <div className="flex flex-col items-center gap-1 text-fg-primary">
    <p className="heading-xl-serif">Signifier</p>
    <p className="heading-md">Söhne</p>
    <p className="text-sm text-fg-secondary">Body copy at text-sm</p>
  </div>
)

const grays = ["--gray-0", "--gray-100", "--gray-300", "--gray-500", "--gray-1000"]
const hues = [
  "--red-400",
  "--orange-400",
  "--yellow-400",
  "--green-400",
  "--blue-400",
  "--purple-400",
  "--pink-400",
]

const ColorsPreview = () => (
  <div className="flex flex-col gap-3">
    {[grays, hues].map((row, index) => (
      <div key={index} className="flex justify-center">
        {row.map((token) => (
          <span
            key={token}
            className="-ml-1.5 size-7 rounded-full ring-2 ring-background-primary first:ml-0"
            style={{ background: `var(${token})` }}
          />
        ))}
      </div>
    ))}
  </div>
)

/** Listed here rather than taken from the package's `iconGallery`: that array
 *  lives in a `"use client"` module, so a server component importing it gets a
 *  client reference instead of the array itself. Icon *components* cross the
 *  boundary fine, which is what this maps over. */
const galleryIcons = [
  IconHome,
  IconMagnifyingGlass,
  IconSettingsGear1,
  IconBell,
  IconPeople,
  IconCalendar1,
  IconClipboard,
  IconStar,
  IconCheckmark1,
  IconPlus,
  IconMinus,
  IconX,
  IconCircleCheck,
  IconCircleInfo,
  IconChevronRightSmall,
  IconSquareBehindSquare6,
]

const IconsPreview = () => (
  <div className="grid grid-cols-8 gap-x-4 gap-y-4 text-fg-secondary">
    {galleryIcons.map((Icon, index) => (
      <Icon key={index} size={20} aria-hidden />
    ))}
  </div>
)

const MaterialsPreview = () => (
  <div className="flex items-end gap-4">
    <span className="size-12 rounded-md bg-surface shadow-sm" />
    <span className="size-14 rounded-lg bg-surface shadow-md" />
    <span className="size-16 rounded-xl bg-surface shadow-lg" />
  </div>
)

/** Motion has nothing to show at rest, so the specimen reads as one shape
 *  caught mid-travel. The copies are spaced rather than overlapped — stacked
 *  translucent greys just muddy into a single blur. */
const MotionPreview = () => (
  <div className="flex items-center gap-3">
    <span className="size-12 rounded-lg bg-background-tertiary opacity-40" />
    <span className="size-12 rounded-lg bg-background-tertiary opacity-70" />
    <span className="size-12 rounded-lg bg-background-tertiary" />
  </div>
)

export const IntroCards = () => (
  <div>
    <Row first>
      <Cell
        href="/brand"
        title="Brand"
        description="Wordmark and the foundational brand elements."
        className={CELL_LEFT}
      >
        <BrandWordmark markSize={40} className="text-fg-primary" />
      </Cell>
      <Cell
        href="/typography"
        title="Typography"
        description="Set in Signifier and Söhne, on a scale from 2xs to 2xl."
        className={CELL_RIGHT}
      >
        <TypographyPreview />
      </Cell>
    </Row>

    <Row>
      <Cell
        href="/colors"
        title="Colors"
        description="Gray, alpha and hue scales. Primary actions stay in grayscale."
        className={CELL_LEFT}
      >
        <ColorsPreview />
      </Cell>
      <Cell
        href="/icons"
        title="Icons"
        description="Central Icons, round outlined, at a default of 20px."
        className={CELL_RIGHT}
      >
        <IconsPreview />
      </Cell>
    </Row>

    <Row>
      <Cell
        href="/materials"
        title="Materials"
        description="Radius and elevation for surfaces and the popups above them."
        className={CELL_LEFT}
      >
        <MaterialsPreview />
      </Cell>
      <Cell
        href="/motion"
        title="Motion"
        description="Shared durations and easings for overlays, indicators and colour."
        className={CELL_RIGHT}
      >
        <MotionPreview />
      </Cell>
    </Row>

    <Row>
      <Cell
        href="/components/button"
        title="Components"
        description="Form controls, overlays, data display and layout primitives."
        className={`${PAGE_INNER} md:col-span-2`}
      >
        <ComponentsPreview />
      </Cell>
    </Row>
  </div>
)
