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

Every component gets `app/(docs)/components/<name>/page.tsx`. The page itself is
a thin `<DocPage>` carrying the title and a one-line description; the specimens
live in a sibling `<name>-examples.tsx` marked `"use client"` — 63 of the 66
pages have one.

The site is visual specimens, not prose: each page is a stack of unframed
`<DocBand>` sections, and there are no Overview, Usage or API sections to fill
in. Rules separate adjacent bands, but the final band must not add a closing
bottom rule; the fixed pagination footer provides the next visual boundary.

**Doc snippets are not verified.** `scripts/check-doc-snippets.mjs` used to
compile every `code={...}` string against the real component types, but the
script and the snippet-heavy page layout were removed together in `aa316ec`,
when the site was stripped to visual specimens. `components/component-canvas.tsx`
still exists but no page imports it. `npm run typecheck` does type-check the real
JSX in these pages, so a renamed prop breaks a *demo* loudly — it just will not
catch a stale prop inside a `code={...}` string. Keep any snippet you add in sync
by hand.

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
