import type { ReactNode } from "react"
import { PAGE_INNER, PAGE_INNER_LEFT } from "@/lib/chrome"

/** A banded section, matching the foundations pages: full-width rules between
 *  sections, with content capped and padded on the shared page measure.
 *
 *  Specimens sit unframed. Most components bring their own bordered surface,
 *  and wrapping those in a ComponentCanvas double-frames them.
 */
export const DocBand = ({
  id,
  title,
  description,
  first,
  contentClassName = "max-w-lg",
  bleedContent,
  children,
}: {
  id: string
  title: string
  description: string
  /** Omits the top rule — the first band sits under the page header. */
  first?: boolean
  /** Caps the specimen. Pages run full width, so most specimens need a bound. */
  contentClassName?: string
  /**
   * Lets the specimen break the page measure.
   * - `right` — title inset, specimen bleeds to the main’s right edge
   * - `full` — title inset, specimen edge-to-edge in the main column
   */
  bleedContent?: "right" | "full"
  children: ReactNode
}) => {
  const header = (
    <div className={`${PAGE_INNER} ${bleedContent ? "pt-10" : ""}`}>
      <h2 id={id} className="heading-sm text-fg-primary">
        {title}
      </h2>
      <p className="text-sm mt-1 max-w-2xl text-fg-secondary">{description}</p>
    </div>
  )

  if (bleedContent === "full") {
    return (
      <section
        aria-labelledby={id}
        className={first ? "" : "border-t border-border-primary"}
      >
        {header}
        <div className={`mt-6 pb-10 ${contentClassName}`}>{children}</div>
      </section>
    )
  }

  if (bleedContent === "right") {
    return (
      <section
        aria-labelledby={id}
        className={first ? "" : "border-t border-border-primary"}
      >
        {header}
        <div className={`mt-6 ${PAGE_INNER_LEFT} pb-10 ${contentClassName}`}>
          {children}
        </div>
      </section>
    )
  }

  return (
    <section
      aria-labelledby={id}
      className={first ? "" : "border-t border-border-primary"}
    >
      <div className={`${PAGE_INNER} py-10`}>
        <h2 id={id} className="heading-sm text-fg-primary">
          {title}
        </h2>
        <p className="text-sm mt-1 max-w-2xl text-fg-secondary">{description}</p>
        <div className={`mt-6 ${contentClassName}`}>{children}</div>
      </div>
    </section>
  )
}
