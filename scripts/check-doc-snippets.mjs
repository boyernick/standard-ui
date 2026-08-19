/**
 * Typechecks the code samples shown in the docs against the real component types.
 *
 * Doc pages pass their snippets to <ComponentCanvas code={`...`}> and
 * <CodeBlock code={`...`}> as plain strings, independent of the live JSX
 * rendered beside them. Nothing keeps the two in agreement, so a renamed prop
 * or a dropped variant leaves the rendered demo correct and the printed snippet
 * quietly wrong. This compiles each snippet against the library and reports
 * anything that no longer typechecks.
 *
 * What counts as a finding:
 *   - a component the library no longer exports
 *   - a prop or variant value the component no longer accepts
 *
 * What does not:
 *   - demo data and state (`items={tags}`, `open`) — declared as `any`
 *   - snippets that do not parse — illustrative pseudo-code, counted as skipped
 *
 * Usage: node scripts/check-doc-snippets.mjs
 */
import { execFileSync } from "node:child_process"
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import ts from "typescript"

const rootDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..")
const PACKAGE = "@boyernick/standard-ui-react"

/** React hooks a snippet may call; imported for real so type arguments work. */
const REACT_HOOKS = [
  "useState", "useRef", "useEffect", "useMemo", "useCallback", "useId",
  "useReducer", "useTransition", "useLayoutEffect",
]

/**
 * Demo state is often named after a DOM global (`open`, `status`, `name`), which
 * resolves to `window.*` instead of failing and gets compared against the wrong
 * type. Declared at module scope in each snippet so it shadows the global.
 */
const DOM_COLLISIONS = [
  "open", "name", "status", "length", "closed", "top", "self", "parent",
  "origin", "event", "location", "history", "screen", "focus", "blur",
  "close", "print", "scroll", "find", "stop", "frames", "menubar",
]

/** Snippets are template literals, so an interpolation means runtime composition. */
const isDynamic = (body) => body.includes("${")

/**
 * Snippets are read as source text, so escape sequences authored inside the
 * template literal arrive as backslash pairs. Restore them before parsing.
 */
const unescape = (body) =>
  body
    .replace(/\\`/g, "`")
    .replace(/\\n/g, "\n")
    .replace(/\\t/g, "\t")
    .replace(/\\\\/g, "\\")

const listDocFiles = () =>
  execFileSync("git", ["ls-files", "app", "components"], {
    cwd: rootDir,
    encoding: "utf8",
  })
    .trim()
    .split("\n")
    .filter((file) => file.endsWith(".tsx"))

const extractSnippets = (file) => {
  const source = readFileSync(path.join(rootDir, file), "utf8")
  const pattern = /code=\{`([\s\S]*?)`\}/g
  const found = []
  let match
  while ((match = pattern.exec(source))) {
    if (isDynamic(match[1])) continue
    found.push({
      file,
      line: source.slice(0, match.index).split("\n").length,
      body: unescape(match[1]).trim(),
    })
  }
  return found
}

/**
 * Anatomy blocks list component names one per line to show composition. They are
 * not compilable code, so check the names against the exports directly.
 */
const isAnatomyList = (body) =>
  !body.startsWith("<") &&
  !body.startsWith("import") &&
  body.split("\n").every((line) => /^\s*[A-Z][A-Za-z0-9]*\s*$/.test(line))

const readExports = () => {
  const indexPath = path.join(rootDir, "packages/react/src/index.ts")
  const source = ts.createSourceFile(
    indexPath,
    readFileSync(indexPath, "utf8"),
    ts.ScriptTarget.ESNext,
    true,
  )
  const names = new Set()
  source.forEachChild((node) => {
    if (ts.isExportDeclaration(node) && node.exportClause && ts.isNamedExports(node.exportClause)) {
      for (const element of node.exportClause.elements) names.add(element.name.text)
    }
  })
  return names
}

/** Split a snippet into its import lines, leading statements, and trailing markup. */
const splitSnippet = (body) => {
  const imports = []
  const rest = []
  let inImport = false
  for (const line of body.split("\n")) {
    const starts = rest.length === 0 && /^\s*import\b/.test(line)
    if (starts || inImport) {
      imports.push(line)
      inImport = !/from\s+['"][^'"]+['"]|^\s*import\s+['"][^'"]+['"]/.test(line)
      continue
    }
    rest.push(line)
  }
  const firstJsx = rest.findIndex((line) => /^\s*</.test(line))
  return {
    imports,
    statements: firstJsx === -1 ? rest : rest.slice(0, firstJsx),
    markup: firstJsx === -1 ? [] : rest.slice(firstJsx),
  }
}

/**
 * Names the snippet binds itself — imported, declared, or destructured. Shimming
 * one of these would collide with the snippet's own declaration.
 */
const localNames = (body) => {
  const names = new Set()
  const add = (list) => {
    for (const raw of list.split(",")) {
      const name = raw.trim().split(/\s+as\s+/).pop()?.trim()
      if (name && /^[A-Za-z_$][\w$]*$/.test(name)) names.add(name)
    }
  }
  for (const match of body.matchAll(/import\s+(?:type\s+)?\{([^}]*)\}/g)) add(match[1])
  for (const match of body.matchAll(/import\s+([A-Za-z_$][\w$]*)\s+from/g)) names.add(match[1])
  for (const match of body.matchAll(/\b(?:const|let|var|function)\s+([A-Za-z_$][\w$]*)/g)) {
    names.add(match[1])
  }
  for (const match of body.matchAll(/\b(?:const|let|var)\s*[[{]([^\]}]*)[\]}]/g)) add(match[1])
  return names
}

const buildModule = (snippet, exported, shims) => {
  const { imports, statements, markup } = splitSnippet(snippet.body)
  const ownsImports = imports.some((line) => line.includes(PACKAGE))

  let jsx = markup.join("\n")
  const header = [...imports]

  // Without its own import, route tags through a namespace import so a renamed
  // component surfaces as a missing property. Only qualify names the library
  // actually exports — anything else is a docs-local component.
  if (!ownsImports) {
    header.unshift(`import * as StandardUI from "${PACKAGE}"`, "void StandardUI")
    jsx = jsx.replace(/<(\/?)([A-Z][A-Za-z0-9]*)/g, (whole, slash, name) =>
      exported.has(name) ? `<${slash}StandardUI.${name}` : whole,
    )
  }

  const used = REACT_HOOKS.filter((hook) => new RegExp(`\\b${hook}\\b`).test(snippet.body))
  if (used.length > 0) header.push(`import { ${used.join(", ")} } from "react"`)

  // Module scope, so these shadow same-named globals from lib.dom. Anything the
  // snippet binds itself is left alone to avoid a redeclaration conflict.
  const bound = localNames(snippet.body)
  const declarations = [...shims]
    .filter((name) => !used.includes(name) && !bound.has(name))
    .map((name) => `declare const ${name}: any`)

  const parts = [...header, ...declarations]
  if (markup.length === 0) return `${parts.join("\n")}\n${statements.join("\n")}\n`

  return [
    ...parts,
    "export default function Snippet() {",
    statements.join("\n"),
    "  return (",
    "    <>",
    jsx,
    "    </>",
    "  )",
    "}",
    "",
  ].join("\n")
}

const COMPILER_OPTIONS = {
  jsx: ts.JsxEmit.ReactJSX,
  strict: true,
  // Snippets write untyped callbacks like `(item) => item.label` for brevity.
  // That is a docs style choice, not drift from the library.
  noImplicitAny: false,
  noEmit: true,
  skipLibCheck: true,
  esModuleInterop: true,
  module: ts.ModuleKind.ESNext,
  moduleResolution: ts.ModuleResolutionKind.Bundler,
  target: ts.ScriptTarget.ES2017,
  lib: ["lib.dom.d.ts", "lib.esnext.d.ts"],
  baseUrl: rootDir,
  // Snippets may reference docs-local components (`@/components/...`).
  paths: { "@/*": ["./*"] },
}

const main = () => {
  const files = listDocFiles()
  const snippets = files.flatMap(extractSnippets)
  const exported = readExports()

  const failures = []
  const compilable = []

  for (const snippet of snippets) {
    if (!isAnatomyList(snippet.body)) {
      compilable.push(snippet)
      continue
    }
    for (const name of snippet.body.split("\n").map((l) => l.trim()).filter(Boolean)) {
      if (!exported.has(name)) {
        failures.push({ ...snippet, message: `${PACKAGE} does not export ${name}` })
      }
    }
  }

  // Generated inside the repo so imports resolve through the real node_modules.
  const workDir = mkdtempSync(path.join(rootDir, ".doc-snippets-"))
  let skipped = 0
  try {
    const shims = new Set(DOM_COLLISIONS)

    const emit = () =>
      compilable.map((snippet, index) => {
        const fileName = path.join(workDir, `snippet-${index}.tsx`)
        writeFileSync(fileName, buildModule(snippet, exported, shims))
        return { fileName, snippet }
      })

    const check = (entries) => {
      const program = ts.createProgram(entries.map((e) => e.fileName), COMPILER_OPTIONS)
      return {
        syntactic: program.getSyntacticDiagnostics(),
        semantic: program.getSemanticDiagnostics(),
      }
    }

    // First pass discovers the demo identifiers that need declaring; the second
    // reports what remains once they are no longer unresolved.
    for (const diagnostic of check(emit()).semantic) {
      if (diagnostic.code !== 2304) continue
      const text = ts.flattenDiagnosticMessageText(diagnostic.messageText, " ")
      const name = /Cannot find name '([^']+)'/.exec(text)?.[1]
      if (name && /^[a-z]/.test(name)) shims.add(name)
    }

    const entries = emit()
    const { syntactic, semantic } = check(entries)

    // A snippet that does not parse is illustrative pseudo-code — an unclosed
    // fragment showing structure, not a claim about the API. Only snippets that
    // parse can be meaningfully typechecked.
    const unparsed = new Set(syntactic.map((d) => d.file?.fileName).filter(Boolean))
    skipped = unparsed.size

    for (const diagnostic of semantic) {
      if (!diagnostic.file || unparsed.has(diagnostic.file.fileName)) continue
      const entry = entries.find((item) => item.fileName === diagnostic.file.fileName)
      if (!entry) continue
      failures.push({
        ...entry.snippet,
        message: ts.flattenDiagnosticMessageText(diagnostic.messageText, " "),
      })
    }
  } finally {
    rmSync(workDir, { recursive: true, force: true })
  }

  const note = skipped > 0 ? ` ${skipped} illustrative snippet(s) skipped.` : ""
  if (failures.length === 0) {
    console.log(
      `check-doc-snippets: ${snippets.length} snippets across ${files.length} files match the library.${note}`,
    )
    return
  }

  console.error(`check-doc-snippets: ${failures.length} snippet(s) disagree with the library.\n`)
  for (const failure of failures) {
    console.error(`  ${failure.file}:${failure.line}`)
    console.error(`    ${failure.message}\n`)
  }
  process.exitCode = 1
}

main()
