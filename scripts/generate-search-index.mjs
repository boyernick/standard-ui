// Builds the search index the ⌘K palette reads.
//
// Docs pages are TSX, not MDX, so there is no frontmatter to harvest. Rather
// than regex the source, walk it with the TypeScript AST — the same approach
// check-doc-snippets.mjs already uses against this repo — and pull the props
// that are actually rendered: PageHeader title/description, h2/h3 text, and
// ComponentCanvas labels.
//
// Output is public/search-index.json, fetched lazily on first open so it stays
// out of the route bundles.

import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, join, relative, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import ts from "typescript"

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const outFile = join(rootDir, "public", "search-index.json")

/** "Getting started" → "getting-started", matching components/prose.tsx. */
export const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")

/** Route for a page file: app/(docs)/components/button/page.tsx → /components/button */
const routeFor = (file) => {
  const rel = relative(join(rootDir, "app", "(docs)"), file)
  const dir = dirname(rel)
  return dir === "." ? "/" : `/${dir.split("/").join("/")}`
}

/** Text of a JSX attribute that is a plain string or a simple template. */
const literalAttr = (node, name) => {
  if (!ts.isJsxSelfClosingElement(node) && !ts.isJsxOpeningElement(node)) return
  for (const attr of node.attributes.properties) {
    if (!ts.isJsxAttribute(attr) || attr.name.getText() !== name) continue
    const init = attr.initializer
    if (!init) return
    if (ts.isStringLiteral(init)) return init.text
    if (
      ts.isJsxExpression(init) &&
      init.expression &&
      ts.isNoSubstitutionTemplateLiteral(init.expression)
    ) {
      return init.expression.text
    }
    if (
      ts.isJsxExpression(init) &&
      init.expression &&
      ts.isStringLiteral(init.expression)
    ) {
      return init.expression.text
    }
  }
}

/** Concatenated plain-text children of a JSX element, or undefined if dynamic. */
const plainTextChildren = (node) => {
  let text = ""
  for (const child of node.children ?? []) {
    if (ts.isJsxText(child)) {
      text += child.text
    } else if (
      ts.isJsxExpression(child) &&
      child.expression &&
      ts.isStringLiteral(child.expression)
    ) {
      text += child.expression.text
    } else if (ts.isJsxElement(child)) {
      // One level of nesting (e.g. a <Token> inside a heading) is common.
      const nested = plainTextChildren(child)
      if (nested === undefined) return undefined
      text += nested
    } else if (child.kind !== ts.SyntaxKind.JsxText) {
      return undefined
    }
  }
  const collapsed = text.replace(/\s+/g, " ").trim()
  return collapsed || undefined
}

const tagNameOf = (node) => {
  const opening = ts.isJsxElement(node) ? node.openingElement : node
  return opening.tagName?.getText?.() ?? ""
}

const indexPage = (file) => {
  const source = ts.createSourceFile(
    file,
    readFileSync(file, "utf8"),
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  )

  const record = {
    path: routeFor(file),
    title: "",
    description: "",
    headings: [],
    keywords: [],
  }

  const visit = (node) => {
    if (ts.isJsxSelfClosingElement(node) || ts.isJsxOpeningElement(node)) {
      const tag = node.tagName.getText()

      if (tag === "PageHeader") {
        record.title = literalAttr(node, "title") ?? record.title
        record.description =
          literalAttr(node, "description") ?? record.description
      }

      // Canvas labels name the thing a reader is usually hunting for
      // ("Loading", "Icon only"), so they make good search keywords.
      if (tag === "ComponentCanvas") {
        const label = literalAttr(node, "label")
        if (label) record.keywords.push(label)
      }
    }

    if (ts.isJsxElement(node)) {
      const tag = tagNameOf(node)
      if (tag === "h2" || tag === "h3") {
        const text = plainTextChildren(node)
        if (text) {
          record.headings.push({ text, slug: slugify(text), level: tag })
        }
      }
    }

    ts.forEachChild(node, visit)
  }

  visit(source)
  return record
}

/** Every page.tsx under app/(docs), recursively. */
const collectPages = (dir) => {
  const found = []
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) found.push(...collectPages(full))
    else if (entry.name === "page.tsx") found.push(full)
  }
  return found
}

const pageFiles = collectPages(join(rootDir, "app", "(docs)"))

const records = pageFiles
  .map(indexPage)
  // A page with no title never made it through PageHeader; skip rather than
  // ship an unlabelled row into the palette.
  .filter((record) => record.title)
  .sort((a, b) => a.path.localeCompare(b.path))

mkdirSync(dirname(outFile), { recursive: true })
writeFileSync(outFile, `${JSON.stringify(records, null, 2)}\n`)

const headingCount = records.reduce((sum, r) => sum + r.headings.length, 0)
console.log(
  `generate-search-index: ${records.length} pages, ${headingCount} headings -> ${relative(rootDir, outFile)}`,
)

const missing = pageFiles.length - records.length
if (missing > 0) {
  console.log(`generate-search-index: ${missing} page(s) skipped (no title)`)
}
