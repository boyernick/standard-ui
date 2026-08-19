import type { Metadata } from "next"
import { BrandMark, BrandWordmark } from "@standard-ui/react"
import { PageHeader } from "@/components/page-header"

export const metadata: Metadata = {
  title: "Brand",
}

export default function BrandPage() {
  return (
    <div className="w-full">
      <PageHeader
        title="Brand"
        description="Standard UI shares the solid disk mark used across nickboyer.com — a focused black circle as the system signature."
      />

      <section className="mt-2">
        <h2 className="heading-sm text-fg-primary">Mark</h2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          The mark is a filled circle. Use it alone as an app icon or favicon,
          or with the wordmark. In product UI it inherits{" "}
          <code className="font-mono text-sm">currentColor</code>; the favicon
          stays near-black for browser chrome.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="flex min-h-40 items-center justify-center rounded-2xl border border-border-primary bg-background-secondary">
            <BrandMark size={64} />
          </div>
          <div className="flex min-h-40 items-center justify-center rounded-2xl border border-border-primary bg-background-secondary">
            <BrandMark size={40} />
          </div>
          <div className="flex min-h-40 items-center justify-center rounded-2xl border border-border-primary bg-background-secondary">
            <BrandMark size={24} />
          </div>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">Wordmark</h2>
        <div className="mt-6 flex min-h-64 items-center justify-center rounded-2xl border border-border-primary bg-background-secondary p-8">
          <BrandWordmark markSize={48} className="[&_.heading-lg-serif]:text-[2rem] [&_.text-sm-strong]:text-lg" />
        </div>
        <p className="text-md mt-3 max-w-3xl text-fg-secondary">
          Pair the mark with Signifier for “Standard” and Söhne strong for
          “UI”. Compact lockups may show the mark with “UI” only in dense
          chrome.
        </p>
        <div className="mt-6 flex min-h-32 items-center justify-center rounded-2xl bg-background-tertiary p-6">
          <BrandWordmark compact markSize={28} />
        </div>
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">Clear space</h2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Leave clear space equal to the mark radius on every side. No type,
          controls, or illustration should enter this area.
        </p>
        <div className="mt-6 flex min-h-64 items-center justify-center rounded-2xl bg-background-tertiary p-8">
          <div className="border border-dashed border-border-secondary p-12">
            <BrandWordmark compact markSize={40} />
          </div>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">Light and dark</h2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Draw the mark and wordmark in a single foreground color. Prefer
          grayscale brand tokens — never recolor the disk independently from
          the type.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="flex min-h-48 items-center justify-center rounded-2xl border border-border-primary bg-white p-8 text-gray-1000">
            <BrandWordmark compact markSize={40} className="text-inherit" />
          </div>
          <div className="flex min-h-48 items-center justify-center rounded-2xl border border-gray-800 bg-gray-1000 p-8 text-white">
            <BrandWordmark compact markSize={40} className="text-inherit" />
          </div>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">Voice</h2>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>Sentence case everywhere — never shout in all caps</li>
          <li>Short, precise labels; prefer verbs for actions</li>
          <li>Name the product “Standard UI” in prose; “UI” is fine in chrome</li>
        </ul>
      </section>

      <section className="mt-14 mb-8 grid gap-10 md:grid-cols-2">
        <div>
          <h2 className="heading-sm text-fg-primary">Do</h2>
          <ul className="text-md mt-4 list-disc space-y-2 pl-5 text-fg-secondary">
            <li>Keep the solid disk as one mark</li>
            <li>Scale the lockup proportionally</li>
            <li>Use high-contrast surfaces</li>
            <li>Match the favicon to the same disk</li>
          </ul>
        </div>
        <div>
          <h2 className="heading-sm text-fg-primary">Don&apos;t</h2>
          <ul className="text-md mt-4 list-disc space-y-2 pl-5 text-fg-secondary">
            <li>Don&apos;t stretch, rotate, or hollow out the disk</li>
            <li>Don&apos;t add gradients, glows, or multicolor fills</li>
            <li>Don&apos;t replace Signifier with a decorative display face</li>
            <li>Don&apos;t place the mark on busy photography without a scrim</li>
          </ul>
        </div>
      </section>
    </div>
  )
}
