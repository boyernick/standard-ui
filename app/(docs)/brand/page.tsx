import type { Metadata } from "next"
import { BrandWordmark } from "@standard-ui/react"
import { PageHeader } from "@/components/page-header"

export const metadata: Metadata = {
  title: "Brand",
}

export default function BrandPage() {
  return (
    <div className="w-full">
      <PageHeader
        title="Brand"
        description="Solid disk + StandardUI. Black on light, white on dark — same lockup in chrome and docs."
      />

      <section className="mt-2">
        <h2 className="heading-sm text-fg-primary">Wordmark</h2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Pair the disk with <span className="text-fg-primary">StandardUI</span> in sans —
          one word, no space. Color follows the parent so the lockup flips to white on dark.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="flex min-h-48 items-center justify-center rounded-2xl border border-border-primary bg-white p-8 text-[#0d0d0d]">
            <BrandWordmark markSize={40} className="text-inherit" />
          </div>
          <div className="flex min-h-48 items-center justify-center rounded-2xl border border-border-primary bg-black p-8 text-white">
            <BrandWordmark markSize={40} className="text-inherit" />
          </div>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="flex min-h-32 items-center justify-center rounded-2xl border border-border-primary bg-white p-6 text-[#0d0d0d]">
            <BrandWordmark size="sm" className="text-inherit" />
          </div>
          <div className="flex min-h-32 items-center justify-center rounded-2xl border border-border-primary bg-black p-6 text-white">
            <BrandWordmark size="sm" className="text-inherit" />
          </div>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">Chrome</h2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Docs sidebar, top bar, and mobile nav use the small lockup. Theme tokens keep the
          disk and type black in light mode and white in dark mode.
        </p>
        <div className="mt-6 flex min-h-24 items-center rounded-2xl border border-border-primary bg-surface px-5 text-fg-primary">
          <BrandWordmark size="sm" />
        </div>
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">Clear space</h2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Leave clear space equal to the mark radius on every side. No type,
          controls, or illustration should enter this area.
        </p>
        <div className="mt-6 flex min-h-64 items-center justify-center rounded-2xl bg-background-tertiary p-8">
          <div className="border border-dashed border-border-secondary p-12 text-fg-primary">
            <BrandWordmark markSize={40} className="text-inherit" />
          </div>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">Voice</h2>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>Sentence case everywhere — never shout in all caps</li>
          <li>Short, precise labels; prefer verbs for actions</li>
          <li>
            Logo lockup is “StandardUI”; in prose write “Standard UI”
          </li>
        </ul>
      </section>

      <section className="mt-14 mb-8 grid gap-10 md:grid-cols-2">
        <div>
          <h2 className="heading-sm text-fg-primary">Do</h2>
          <ul className="text-md mt-4 list-disc space-y-2 pl-5 text-fg-secondary">
            <li>Keep the solid disk as one mark</li>
            <li>Invert the full lockup to white on dark backgrounds</li>
            <li>Scale the lockup proportionally</li>
            <li>Match the favicon to the same disk</li>
          </ul>
        </div>
        <div>
          <h2 className="heading-sm text-fg-primary">Don&apos;t</h2>
          <ul className="text-md mt-4 list-disc space-y-2 pl-5 text-fg-secondary">
            <li>Don&apos;t leave a black disk on a dark surface</li>
            <li>Don&apos;t stretch, rotate, or hollow out the disk</li>
            <li>Don&apos;t add gradients, glows, or multicolor fills</li>
            <li>Don&apos;t place the mark on busy photography without a scrim</li>
          </ul>
        </div>
      </section>
    </div>
  )
}
