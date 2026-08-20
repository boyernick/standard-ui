// Fails when the checked-in API data no longer matches the library's types.
//
// The generated tables are committed so Vercel does not have to run a
// TypeScript program at build time. That trade means the files can go stale, so
// this regenerates into a temp directory and diffs — the same discipline
// check-doc-snippets.mjs already applies to code snippets.

import { execFileSync } from "node:child_process"
import { mkdtempSync, readdirSync, readFileSync, rmSync } from "node:fs"
import { tmpdir } from "node:os"
import { dirname, join, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const committedDir = join(rootDir, "lib/generated/api")
const scratch = mkdtempSync(join(tmpdir(), "standard-ui-api-"))

const readDir = (dir) => {
  const out = new Map()
  let files = []
  try {
    files = readdirSync(dir).filter((name) => name.endsWith(".json"))
  } catch {
    return out
  }
  for (const name of files) {
    out.set(name, readFileSync(join(dir, name), "utf8"))
  }
  return out
}

try {
  execFileSync(
    process.execPath,
    [join(rootDir, "scripts/generate-component-api.mjs")],
    { cwd: rootDir, env: { ...process.env, API_OUT_DIR: scratch }, stdio: "pipe" },
  )

  const fresh = readDir(scratch)
  const committed = readDir(committedDir)

  const problems = []

  for (const [name, content] of fresh) {
    if (!committed.has(name)) {
      problems.push(`missing: ${name} (a new component family)`)
    } else if (committed.get(name) !== content) {
      problems.push(`stale:   ${name}`)
    }
  }
  for (const name of committed.keys()) {
    if (!fresh.has(name)) {
      problems.push(`orphan:  ${name} (no longer in the library)`)
    }
  }

  if (problems.length > 0) {
    console.error("check-generated-api: generated API data is out of date\n")
    for (const problem of problems) console.error(`  ${problem}`)
    console.error("\nRun `npm run generate:api` and commit the result.")
    process.exit(1)
  }

  console.log(
    `check-generated-api: ${committed.size} families match the library types.`,
  )
} finally {
  rmSync(scratch, { recursive: true, force: true })
}
