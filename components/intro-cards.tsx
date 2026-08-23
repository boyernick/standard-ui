import {
  BrandWordmark,
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
} from "@boyernick/standard-ui-react"
import Link from "next/link"
import type { ReactNode } from "react"
import { PAGE_INNER } from "@/lib/chrome"

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

export const IntroductionPreview = () => (
  <div
    aria-hidden
    className="overflow-hidden rounded-xl border border-border-primary bg-surface shadow-sm"
  >
    <div className="flex h-11 items-center justify-between border-b border-border-primary px-4">
      <BrandWordmark size="sm" className="text-fg-primary" />
      <div className="flex items-center gap-1.5">
        <span className="size-1.5 rounded-full bg-fg-tertiary" />
        <span className="size-1.5 rounded-full bg-fg-tertiary" />
        <span className="size-1.5 rounded-full bg-fg-primary" />
      </div>
    </div>
    <div className="grid min-h-52 grid-cols-[5.5rem_1fr]">
      <div className="border-r border-border-primary bg-background-secondary p-3">
        <span className="block h-2 w-9 rounded-full bg-fg-primary" />
        <div className="mt-5 space-y-2.5">
          <span className="block h-1.5 w-full rounded-full bg-background-quaternary" />
          <span className="block h-1.5 w-3/4 rounded-full bg-background-tertiary" />
          <span className="block h-1.5 w-4/5 rounded-full bg-background-tertiary" />
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="block h-2 w-20 rounded-full bg-fg-primary" />
            <span className="mt-2 block h-1.5 w-28 rounded-full bg-background-quaternary" />
          </div>
          <span className="h-7 w-16 rounded-md bg-brand-primary" />
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-border-primary p-3">
            <span className="block size-6 rounded-md bg-status-success-background" />
            <span className="mt-6 block h-1.5 w-12 rounded-full bg-fg-primary" />
            <span className="mt-2 block h-1.5 w-16 rounded-full bg-background-quaternary" />
          </div>
          <div className="rounded-lg border border-border-primary p-3">
            <span className="block size-6 rounded-md bg-status-info-background" />
            <span className="mt-6 block h-1.5 w-14 rounded-full bg-fg-primary" />
            <span className="mt-2 block h-1.5 w-12 rounded-full bg-background-quaternary" />
          </div>
        </div>
      </div>
    </div>
  </div>
)

const SystemCard = ({
  href,
  index,
  title,
  description,
  className,
  children,
}: {
  href: string
  index: string
  title: string
  description: string
  className: string
  children: ReactNode
}) => (
  <Link
    href={href}
    className={`group flex min-h-72 cursor-pointer flex-col overflow-hidden rounded-xl border border-border-primary bg-surface outline-none transition-[border-color,box-shadow,transform] duration-[var(--duration-sm)] ease-enter hover:-translate-y-0.5 hover:border-border-secondary hover:shadow-md focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-offset-1 focus-visible:ring-offset-background-primary focus-visible:ring-ring/20 motion-reduce:transform-none motion-reduce:transition-none ${className}`}
  >
    <div
      aria-hidden
      className="flex h-44 shrink-0 items-center justify-center overflow-hidden border-b border-border-primary bg-background-secondary p-6 transition-transform duration-[var(--duration-md)] ease-enter group-hover:scale-[1.015] motion-reduce:transform-none motion-reduce:transition-none"
    >
      {children}
    </div>
    <div className="flex flex-1 items-start gap-5 p-5">
      <div className="min-w-0 flex-1">
        <span className="text-2xs font-mono text-fg-tertiary" aria-hidden>
          {index}
        </span>
        <h3 className="heading-sm mt-2 text-fg-primary">{title}</h3>
        <p className="text-sm mt-1 max-w-md text-fg-secondary">
          {description}
        </p>
      </div>
      <span className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-full border border-border-primary text-fg-secondary transition-[background-color,color,transform] duration-[var(--duration-sm)] ease-enter group-hover:translate-x-0.5 group-hover:bg-brand-primary group-hover:text-brand-foreground motion-reduce:transform-none motion-reduce:transition-none">
        <IconChevronRightSmall size={16} aria-hidden />
      </span>
    </div>
  </Link>
)

const BrandPreview = () => (
  <div className="flex flex-col items-center gap-5">
    <BrandWordmark markSize={42} className="text-fg-primary" />
    <div className="flex items-center gap-2">
      {["Clear", "Quiet", "Precise"].map((quality) => (
        <span
          key={quality}
          className="text-xs rounded-full border border-border-primary bg-surface px-2.5 py-1 text-fg-secondary"
        >
          {quality}
        </span>
      ))}
    </div>
  </div>
)

const ComponentsPreview = () => (
  <div className="w-full max-w-md">
    <div className="flex items-center gap-2">
      <span className="text-xs flex h-9 flex-1 items-center rounded-lg border border-border-secondary bg-surface px-3 text-fg-tertiary shadow-sm">
        Search components…
      </span>
      <span className="text-xs flex h-9 items-center rounded-lg bg-brand-primary px-3.5 text-brand-foreground shadow-sm">
        Create
      </span>
    </div>
    <div className="mt-4 flex flex-wrap items-center gap-2.5">
      <span className="text-xs rounded-full bg-brand-primary px-3 py-1.5 text-brand-foreground">
        Overview
      </span>
      <span className="text-xs rounded-full bg-background-tertiary px-3 py-1.5 text-fg-secondary">
        Activity
      </span>
      <span className="text-xs rounded-md bg-status-success-background px-2 py-1 text-status-success">
        Ready
      </span>
      <span className="relative ml-auto h-6 w-10 rounded-full bg-brand-primary">
        <span className="absolute top-1 right-1 size-4 rounded-full bg-brand-foreground" />
      </span>
    </div>
  </div>
)

const ColorsPreview = () => (
  <div className="grid w-full max-w-xs grid-cols-5 gap-2">
    <span className="h-24 rounded-lg border border-border-primary bg-brand-primary shadow-sm" />
    <span className="h-24 rounded-lg border border-border-primary bg-background-quaternary shadow-sm" />
    <span className="h-24 rounded-lg border border-border-primary bg-status-info-background shadow-sm" />
    <span className="h-24 rounded-lg border border-border-primary bg-status-success-background shadow-sm" />
    <span className="h-24 rounded-lg border border-border-primary bg-status-warning-background shadow-sm" />
  </div>
)

const TypographyPreview = () => (
  <div className="flex items-end gap-5 text-fg-primary">
    <span className="heading-2xl-serif leading-none">Aa</span>
    <span className="mb-1 h-12 w-px bg-border-secondary" />
    <div className="mb-1">
      <p className="heading-lg-sans leading-none">Ag</p>
      <p className="text-xs mt-2 font-mono text-fg-tertiary">12 / 16 / 24</p>
    </div>
  </div>
)

const IconsPreview = () => (
  <div className="grid grid-cols-8 gap-3 text-fg-secondary">
    {galleryIcons.map((Icon, index) => (
      <span
        key={index}
        className="flex size-8 items-center justify-center rounded-md border border-border-primary bg-surface shadow-sm"
      >
        <Icon size={16} aria-hidden />
      </span>
    ))}
  </div>
)

const MaterialsPreview = () => (
  <div className="relative h-28 w-52">
    <span className="absolute top-0 left-0 h-20 w-28 rounded-xl border border-border-primary bg-surface shadow-sm" />
    <span className="absolute top-4 left-12 h-20 w-28 rounded-xl border border-border-primary bg-surface shadow-md" />
    <span className="absolute top-8 left-24 h-20 w-28 rounded-xl border border-border-primary bg-surface shadow-lg" />
  </div>
)

const MotionPreview = () => (
  <div className="flex w-full max-w-xs items-center gap-3">
    <span className="h-px flex-1 bg-border-secondary" />
    <span className="size-9 rounded-lg border border-border-primary bg-surface opacity-40 shadow-sm transition-transform duration-[var(--duration-sm)] ease-enter group-hover:-translate-x-2 motion-reduce:transform-none motion-reduce:transition-none" />
    <span className="size-9 rounded-lg border border-border-primary bg-surface opacity-70 shadow-sm transition-transform duration-[var(--duration-md)] ease-enter group-hover:translate-x-1 motion-reduce:transform-none motion-reduce:transition-none" />
    <span className="size-9 rounded-lg bg-brand-primary shadow-md transition-transform duration-[var(--duration-lg)] ease-enter group-hover:translate-x-4 motion-reduce:transform-none motion-reduce:transition-none" />
    <span className="h-px flex-1 bg-border-secondary" />
  </div>
)

export const IntroCards = () => (
  <section aria-labelledby="explore-system" className="bg-background-secondary">
    <div className={`${PAGE_INNER} py-12 md:py-16`}>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h2 id="explore-system" className="heading-lg-sans text-fg-primary">
            Explore the system
          </h2>
          <p className="text-md mt-2 max-w-2xl text-fg-secondary">
            Start with the foundations, then move into the components that put
            them to work.
          </p>
        </div>
        <p className="text-xs font-mono text-fg-tertiary">
          Foundations / Components
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-12">
        <SystemCard
          href="/brand"
          index="01"
          title="Brand"
          description="The mark, wordmark, and principles behind a recognisable StandardUI experience."
          className="lg:col-span-5"
        >
          <BrandPreview />
        </SystemCard>
        <SystemCard
          href="/components/button"
          index="02"
          title="Components"
          description="Accessible building blocks with a consistent visual and interaction language."
          className="lg:col-span-7"
        >
          <ComponentsPreview />
        </SystemCard>
        <SystemCard
          href="/colors"
          index="03"
          title="Colors"
          description="Semantic roles that stay coherent across themes and product surfaces."
          className="lg:col-span-4"
        >
          <ColorsPreview />
        </SystemCard>
        <SystemCard
          href="/typography"
          index="04"
          title="Typography"
          description="A focused serif and sans scale for expressive hierarchy and calm reading."
          className="lg:col-span-4"
        >
          <TypographyPreview />
        </SystemCard>
        <SystemCard
          href="/icons"
          index="05"
          title="Icons"
          description="A refined symbol set sized and aligned for product interfaces."
          className="lg:col-span-4"
        >
          <IconsPreview />
        </SystemCard>
        <SystemCard
          href="/materials"
          index="06"
          title="Materials"
          description="Radius, border, and elevation choices that establish depth without noise."
          className="lg:col-span-6"
        >
          <MaterialsPreview />
        </SystemCard>
        <SystemCard
          href="/motion"
          index="07"
          title="Motion"
          description="Shared durations and easing that make every state change feel related."
          className="lg:col-span-6"
        >
          <MotionPreview />
        </SystemCard>
      </div>
    </div>
  </section>
)
