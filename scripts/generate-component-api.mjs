// Generates the props tables the docs render, from the library's own types.
//
// Why generate: only 25 of 59 component pages had a real Prop/Type/Default
// table. The other 34 had an "API" section that was an anatomy list — names and
// one-line roles, no types. And 48 exported parts appeared nowhere at all.
// Every table was a hand transcription with nothing keeping it honest.
//
// Why this is cheap: packages/react ships raw TypeScript (its package.json
// points both "types" and "default" at src/index.ts), and Base UI ships full
// JSDoc plus @default tags in its .d.ts. So descriptions and defaults come out
// of the compiler for free for every Base UI-backed prop.
//
// The trick that makes the output readable is bucketing by *declaring file*.
// ButtonProps resolves to 294 properties: 287 of them are React's HTML
// attributes, and exactly 7 are ours. Suppress the React bucket, render the
// rest, and footnote the passthrough.

import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, join, relative, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import ts from "typescript"

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const entry = resolve(rootDir, "packages/react/src/index.ts")
const srcDir = resolve(rootDir, "packages/react/src")
// check-generated-api.mjs redirects this to a temp dir to diff against the
// committed output.
const outDir = process.env.API_OUT_DIR
  ? resolve(process.env.API_OUT_DIR)
  : resolve(rootDir, "lib/generated/api")

const COMPILER_OPTIONS = {
  jsx: ts.JsxEmit.ReactJSX,
  strict: true,
  noEmit: true,
  skipLibCheck: true,
  esModuleInterop: true,
  module: ts.ModuleKind.ESNext,
  moduleResolution: ts.ModuleResolutionKind.Bundler,
  target: ts.ScriptTarget.ES2017,
  lib: ["lib.dom.d.ts", "lib.esnext.d.ts"],
  baseUrl: rootDir,
  paths: { "@/*": ["./*"] },
}

/**
 * Props every Base UI part carries. Repeating them across ~300 tables is noise;
 * the page states them once instead.
 */
const UNIVERSAL_PROPS = new Set(["className", "style", "render"])

/** Long enough to wreck a table cell. Base UI's render/initialFocus run to 300+. */
const TYPE_MAX = 90

const bucketOf = (declaration) => {
  const file = declaration?.getSourceFile?.().fileName ?? ""
  if (file.startsWith(srcDir)) return "own"
  if (file.includes("@base-ui")) return "base-ui"
  if (file.includes("@types/react")) return "react"
  return "other"
}

/**
 * Printed types are where the output quality lives. Raw, they carry `| undefined`
 * on every optional prop, React namespace prefixes, and the `| null` that
 * VariantProps adds — all noise that makes a generated table worse than a
 * hand-written one.
 */
const normalizeType = (text) => {
  let out = text
    .replace(/\s*\|\s*undefined\b/g, "")
    .replace(/\bReact\./g, "")
    .replace(/\s+/g, " ")
    .trim()
  if (out.startsWith("(") && out.endsWith(")")) out = out.slice(1, -1).trim()
  return out
}

const truncateType = (text) =>
  text.length > TYPE_MAX ? `${text.slice(0, TYPE_MAX - 1)}…` : text

/**
 * cva variant props have no declaration site to document — VariantProps maps
 * over an object literal — so their defaults come from reading the
 * defaultVariants object in the component source instead.
 */
const readCvaDefaults = () => {
  const defaults = new Map()
  for (const file of readdirSync(srcDir)) {
    if (!file.endsWith(".tsx") && !file.endsWith(".ts")) continue
    const full = join(srcDir, file)
    const text = readFileSync(full, "utf8")
    if (!text.includes("defaultVariants")) continue

    const source = ts.createSourceFile(
      full,
      text,
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TSX,
    )

    const visit = (node) => {
      if (
        ts.isPropertyAssignment(node) &&
        node.name.getText() === "defaultVariants" &&
        ts.isObjectLiteralExpression(node.initializer)
      ) {
        const key = file.replace(/\.tsx?$/, "")
        const entryMap = defaults.get(key) ?? new Map()
        for (const prop of node.initializer.properties) {
          if (!ts.isPropertyAssignment(prop)) continue
          entryMap.set(prop.name.getText(), prop.initializer.getText())
        }
        defaults.set(key, entryMap)
      }
      ts.forEachChild(node, visit)
    }
    visit(source)
  }
  return defaults
}

const program = ts.createProgram([entry], COMPILER_OPTIONS)
const checker = program.getTypeChecker()
const sourceFile = program.getSourceFile(entry)
const moduleSymbol = checker.getSymbolAtLocation(sourceFile)

if (!moduleSymbol) {
  console.error("generate-component-api: could not resolve the package barrel")
  process.exit(1)
}

const exportedSymbols = checker.getExportsOfModule(moduleSymbol)
const exportNames = new Set(exportedSymbols.map((s) => s.getName()))
const cvaDefaults = readCvaDefaults()

/**
 * Source file a component is declared in, used both to group families and to
 * find cva defaults. Everything here arrives through the barrel's re-exports,
 * so the symbol must be un-aliased first — otherwise every component reports
 * index.ts and the whole library collapses into one "family".
 */
const resolveAlias = (symbol) =>
  symbol.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(symbol) : symbol

const declaringModule = (symbol) => {
  const target = resolveAlias(symbol)
  for (const decl of target.declarations ?? []) {
    const file = decl.getSourceFile?.().fileName ?? ""
    if (file.startsWith(srcDir)) {
      return relative(srcDir, file).replace(/\.tsx?$/, "")
    }
  }
  return null
}

const describeProps = (propsSymbol, componentName) => {
  const type = checker.getDeclaredTypeOfSymbol(propsSymbol)
  const properties = checker.getPropertiesOfType(type)

  const componentSymbol = exportedSymbols.find(
    (s) => s.getName() === componentName,
  )
  const moduleName = componentSymbol ? declaringModule(componentSymbol) : null
  const variantDefaults = moduleName ? cvaDefaults.get(moduleName) : undefined

  const rows = []
  let reactPassthrough = 0
  let universal = 0

  for (const prop of properties) {
    const declaration = prop.declarations?.[0]
    const bucket = bucketOf(declaration)

    if (bucket === "react") {
      reactPassthrough += 1
      continue
    }
    if (UNIVERSAL_PROPS.has(prop.getName())) {
      universal += 1
      continue
    }

    const propType = checker.getTypeOfSymbolAtLocation(
      prop,
      declaration ?? sourceFile,
    )
    const printed = normalizeType(
      checker.typeToString(
        propType,
        undefined,
        ts.TypeFormatFlags.NoTruncation |
          ts.TypeFormatFlags.UseSingleQuotesForStringLiteralType,
      ),
    )

    const docTag = prop
      .getJsDocTags(checker)
      .find((tag) => tag.name === "default")
    const jsDocDefault = docTag ? ts.displayPartsToString(docTag.text) : null
    const cvaDefault = variantDefaults?.get(prop.getName()) ?? null

    // VariantProps<typeof x> widens every variant to `| null`. That is an
    // artefact of cva's typing, not something a consumer should pass, so drop
    // it — but only for props we know are cva variants, since other props do
    // legitimately accept null.
    const cleaned = cvaDefault
      ? printed.replace(/\s*\|\s*null\b/g, "")
      : printed

    rows.push({
      name: prop.getName(),
      type: truncateType(cleaned),
      typeFull: cleaned.length > TYPE_MAX ? cleaned : undefined,
      required: !(prop.flags & ts.SymbolFlags.Optional),
      default: jsDocDefault ?? cvaDefault,
      description: ts
        .displayPartsToString(prop.getDocumentationComment(checker))
        .replace(/\s+/g, " ")
        .trim(),
      source: bucket,
    })
  }

  rows.sort((a, b) => {
    if (a.required !== b.required) return a.required ? -1 : 1
    return a.name.localeCompare(b.name)
  })

  return { props: rows, reactPassthrough, universal }
}

// Group exports into families by their declaring module, so Combobox and all
// its parts land in one file rather than 54 scattered records.
const families = new Map()

for (const symbol of exportedSymbols) {
  const name = symbol.getName()
  if (!name.endsWith("Props")) continue

  const componentName = name.slice(0, -"Props".length)
  if (!exportNames.has(componentName)) continue

  const componentSymbol = exportedSymbols.find(
    (s) => s.getName() === componentName,
  )
  const moduleName = componentSymbol ? declaringModule(componentSymbol) : null
  if (!moduleName) continue // recharts re-exports, icons, illustrations

  const described = describeProps(symbol, componentName)
  // A part with no own or Base UI props tells the reader nothing.
  if (described.props.length === 0 && described.reactPassthrough === 0) continue

  const family = families.get(moduleName) ?? { module: moduleName, parts: [] }
  family.parts.push({ name: componentName, ...described })
  families.set(moduleName, family)
}

mkdirSync(outDir, { recursive: true })

let totalParts = 0
let totalProps = 0
let documented = 0

for (const [moduleName, family] of [...families].sort()) {
  family.parts.sort((a, b) => a.name.localeCompare(b.name))
  totalParts += family.parts.length
  for (const part of family.parts) {
    totalProps += part.props.length
    documented += part.props.filter((p) => p.description).length
  }
  writeFileSync(
    join(outDir, `${moduleName}.json`),
    `${JSON.stringify(family, null, 2)}\n`,
  )
}

const pct = totalProps ? Math.round((documented / totalProps) * 100) : 0
console.log(
  `generate-component-api: ${families.size} families, ${totalParts} parts, ${totalProps} props (${pct}% with descriptions) -> ${relative(rootDir, outDir)}`,
)
