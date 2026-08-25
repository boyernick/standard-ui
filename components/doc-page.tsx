import type { ReactNode } from "react"
import { PAGE_INNER } from "@/lib/chrome"
import { PageFooter } from "@/components/page-footer"

type DocPageProps = {
  title: string
  description: string
  /** Section heading above the specimens. Pass null to omit. */
  heading?: string | null
  /** Children render their own full-width bands and cap their own content. */
  bleed?: boolean
  children: ReactNode
}

export const DocPage = ({
  title,
  description,
  heading = "Examples",
  bleed = false,
  children,
}: DocPageProps) => (
  <div className="flex w-full flex-1 flex-col pb-28">
    <header className="border-b border-border-primary">
      <div className={`${PAGE_INNER} py-9`}>
        <h1 className="heading-2xl-serif text-fg-primary">{title}</h1>
        <p className="text-md mt-2 max-w-2xl text-fg-secondary">{description}</p>
      </div>
    </header>
    {bleed ? (
      children
    ) : (
      <div className={`${PAGE_INNER} py-10`}>
        {heading ? (
          <h2 className="heading-sm mb-6 text-fg-primary">{heading}</h2>
        ) : null}
        <div className="flex flex-col gap-8">{children}</div>
      </div>
    )}
    <PageFooter />
  </div>
)
