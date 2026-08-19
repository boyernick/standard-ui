<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# StandardUI

A design system in two published packages plus the docs site that exercises
them. The packages are consumed by real sites, so a change here ships to
production the next time a consumer bumps its version.

| Path | What it is |
| --- | --- |
| `packages/tokens` | CSS variables and the Tailwind `@theme` layer. No JS. |
| `packages/react` | Styled React components. Ships **raw TypeScript**. |
| `app/(docs)` | The docs site at ui.nickboyer.com. One route per component. |
| `components/` | Docs-site chrome only. Never import these from `packages/`. |

## Before you push

```bash
npm run check    # typecheck packages, typecheck docs app, verify doc snippets
```

`npm run lint` is advisory today — the tree carries pre-existing errors. Do not
add new ones.

## Writing a component

Behavior comes from [Base UI](https://base-ui.com); this repo owns styling. Do
not hand-roll focus traps, keyboard navigation, or ARIA wiring that Base UI
already provides.

- **Colors, spacing, type: semantic tokens only.** Use `bg-background-tertiary`,
  `text-fg-secondary`, `border-border-primary`. Never a raw hex, and never a
  primitive like `--gray-75` directly — the semantic layer is what lets the
  palette move without touching components. The component sources currently
  contain zero raw hex values; keep it that way.
- **Variants use `cva`.** Every variant value must be a real design decision, not
  a passthrough for arbitrary classes. Give every variant group a
  `defaultVariants` entry.
- **Merge classes with `cn`** from `./lib/cn`. Note it is `clsx` only, *not*
  `tailwind-merge`: a consumer's `className` does not automatically override a
  conflicting built-in class, so put the overridable class last in the base
  string rather than relying on merge semantics.
- **Mark client components.** Anything with state, effects, or event handlers
  needs `"use client"` at the top of the file — 48 of 62 component files have it.
- **One component family per file**, kebab-case (`alert-dialog.tsx` holds
  `AlertDialog`, `AlertDialogPopup`, and friends).
- **Export explicitly from `src/index.ts`** — the named component, its variants
  object if it has one, and its props type. There are no `export *` barrels, and
  the docs checker reads this file to learn what the library offers.
- **Support both themes.** Dark mode is the `.dark` class, never
  `prefers-color-scheme`. Semantic tokens already carry both values, which is
  another reason not to reach past them.

The package ships `src` uncompiled, so consumers transpile this source
themselves. That means no build step to hide mistakes: keep imports
bundler-resolvable and avoid anything that needs a compile pass to work.

## Documenting a component

Every component gets `app/(docs)/components/<name>/page.tsx`, following the
established order: `PageHeader`, Examples, Overview, Usage, API. Live demos go in
`<ComponentCanvas>`; put anything stateful in a sibling `<name>-examples.tsx`
marked `"use client"`.

The `code={...}` string on `ComponentCanvas` and `CodeBlock` is **compiled
against the real component types** by `scripts/check-doc-snippets.mjs`. Write
snippets as genuine code, because a renamed prop or a dropped variant will fail
CI here. Two things the checker deliberately tolerates: demo identifiers it
cannot resolve (treated as `any`) and snippets that do not parse, which it counts
as illustrative and skips — so an anatomy sketch is fine, but do not lean on that
to ship a snippet that is quietly wrong.

Keep the snippet and the rendered demo saying the same thing. They are separate
props, and only the snippet is verified.

## Releasing

Two lanes, both publishing with provenance:

- **Canary** — every merge to `main` touching `packages/**` publishes
  `0.1.<next>-canary.<run>` under the `canary` tag, via `publish-canary.yml`.
  Consumers opt in with `@canary`; a caret range never resolves to a
  prerelease, so production sites are unaffected.
- **Stable** — a `v*` tag or manual dispatch runs `publish-packages.yml` and
  moves `latest`. Bump both package versions together; they are versioned in
  lockstep and consumers install them as a pair.

Provenance requires this repository to stay **public**: npm dropped support for
publishing provenance from private source repositories in 2023, so making the
repo private would break both workflows.

`@central-icons-react` runs a postinstall license check, so `CENTRAL_LICENSE_KEY`
must be present for any install, locally and in CI.
