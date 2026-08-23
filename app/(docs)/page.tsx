import type { Metadata } from "next"
import { IntroductionPreview, IntroCards } from "@/components/intro-cards"
import { PageFooter } from "@/components/page-footer"
import { PAGE_INNER } from "@/lib/chrome"

export const metadata: Metadata = {
  title: "Introduction",
  description:
    "The shared visual and interaction language behind StandardUI products.",
}

export default function IntroductionPage() {
  return (
    <div className="flex w-full flex-1 flex-col pb-28">
      <header className="border-b border-border-primary">
        <div
          className={`${PAGE_INNER} grid gap-10 py-12 md:py-16 lg:grid-cols-[minmax(0,1fr)_minmax(22rem,0.8fr)] lg:items-center`}
        >
          <div>
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-brand-primary" />
              <p className="text-xs font-mono uppercase tracking-[0.14em] text-fg-tertiary">
                StandardUI design system
              </p>
            </div>
            <h1 className="heading-2xl-sans mt-5 text-fg-primary">
              Introduction
            </h1>
            <p className="heading-lg-serif mt-5 max-w-2xl text-fg-primary">
              One shared language for interfaces that feel clear, considered,
              and unmistakably related.
            </p>
            <p className="text-md mt-5 max-w-2xl text-fg-secondary">
              StandardUI brings foundations, accessible components, and motion
              into one system—giving teams fewer decisions to repeat and more
              room to make the product exceptional.
            </p>
          </div>
          <IntroductionPreview />
        </div>
      </header>

      <IntroCards />
      <PageFooter />
    </div>
  )
}
