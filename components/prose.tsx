import { Children, isValidElement, type ReactNode } from "react"

/**
 * Section headings that give themselves an id and a hover anchor.
 *
 * Docs pages are TSX with no frontmatter, so ids have to come from the heading
 * text itself. The same slug rule is duplicated in
 * scripts/generate-search-index.mjs — search results deep-link to these
 * anchors, so the two must agree.
 */
export const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")

/** Flattens heading children to text so a heading containing a <Token> still slugs. */
const textOf = (node: ReactNode): string => {
  if (typeof node === "string" || typeof node === "number") return String(node)
  if (Array.isArray(node)) return node.map(textOf).join("")
  if (isValidElement(node)) {
    const props = node.props as { children?: ReactNode }
    return Children.toArray(props.children).map(textOf).join("")
  }
  return ""
}

const AnchorLink = ({ id, label }: { id: string; label: string }) => (
  <a
    href={`#${id}`}
    aria-label={`Link to ${label}`}
    tabIndex={-1}
    className="ml-2 cursor-pointer align-middle text-fg-quaternary opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none"
  >
    #
  </a>
)

type HeadingProps = {
  children: ReactNode
  /** Override when the derived slug would collide or read badly. */
  id?: string
  className?: string
}

export const H2 = ({ children, id, className = "" }: HeadingProps) => {
  const label = textOf(children)
  const headingId = id ?? slugify(label)
  return (
    <h2
      id={headingId}
      className={`heading-sm group scroll-mt-24 text-fg-primary ${className}`.trim()}
    >
      {children}
      <AnchorLink id={headingId} label={label} />
    </h2>
  )
}

export const H3 = ({ children, id, className = "mt-8" }: HeadingProps) => {
  const label = textOf(children)
  const headingId = id ?? slugify(label)
  return (
    <h3
      id={headingId}
      className={`heading-xs group scroll-mt-24 text-fg-primary ${className}`.trim()}
    >
      {children}
      <AnchorLink id={headingId} label={label} />
    </h3>
  )
}
