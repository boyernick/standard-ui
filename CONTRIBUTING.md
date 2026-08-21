# Contributing

The conventions here were previously discoverable only by reading `AGENTS.md`
and `.cursor/rules/*.mdc`, which meant they were invisible to anyone who had not
already worked in the repo. This is the short version; `AGENTS.md` remains the
long one.

## Layout

| Path | What it is |
| --- | --- |
| `packages/tokens` | CSS variables and the Tailwind `@theme` layer. No JS. |
| `packages/react` | Styled React components. Ships **raw TypeScript**. |
| `app/(docs)` | The docs site at ui.nickboyer.com. One route per component. |
| `components/` | Docs-site chrome only. Never import these from `packages/`. |

## Setup

`@central-icons-react` runs a postinstall license check that fails the whole
install when `CENTRAL_LICENSE_KEY` is unset.

```bash
export CENTRAL_LICENSE_KEY=your_license_key
npm install
npm run dev
```

Without a key, `npm install --ignore-scripts` resolves the icon package but
skips every other postinstall too.

## Before you push

```bash
npm run check
```

That runs lint, package typecheck, package tests, docs typecheck, and two
generated-artifact checks:

- **`check:docs`** typechecks every `code={…}` snippet in the docs against the
  real library types, so a snippet cannot drift from the component it documents.
- **`check:api`** regenerates the props tables in `lib/generated/api` and diffs
  them against what is committed. If it fails, run `npm run generate:api` and
  commit the result.

`npm run lint` is advisory — the tree carries pre-existing warnings. Do not add
new ones.

## House rules

These are enforced by review and by `.cursor/rules/*.mdc`, not by the linter.

- **Semantic tokens only.** Use `bg-background-tertiary`, `text-fg-secondary`,
  `border-border-primary`. Never a raw hex, and never a primitive like
  `--gray-75` directly — the semantic layer is what lets the palette move
  without touching components. See [Theming](https://ui.nickboyer.com/theming).
- **Sentence case** for all UI copy. Never force uppercase.
- **Nested radii stay concentric** — inner radius equals outer minus padding.
- **`cursor-pointer` on buttons and links.**
- **Dogfood the library** in the docs shell as components ship. The docs are the
  most-used consumer, so if a component is awkward there it is awkward
  everywhere.
- **Don't cite upstream systems** (Apps SDK and friends) in usage-guidelines
  copy. Say what the rule is, not where it came from.
- **Support both themes.** Dark mode is the `.dark` class, never
  `prefers-color-scheme`. Note that the gray scale inverts between themes and
  the hue scales do not, so a token built on `--red-*` needs an explicit dark
  value.

## Adding a component

1. Build it in `packages/react/src`. Behavior comes from
   [Base UI](https://base-ui.com) — do not hand-roll focus traps, keyboard
   navigation, or ARIA wiring it already provides.
2. Variants use `cva`, with a `defaultVariants` entry for every variant group.
   `generate-component-api.mjs` reads that object for the defaults it shows.
3. Export explicitly from `src/index.ts` — the named component, its variants
   object, and its props type. There are no `export *` barrels, and the docs
   checker reads this file to learn what the library offers.
4. Add a page at `app/(docs)/components/<name>/page.tsx` following the shape
   every other page uses: Examples → Overview → Usage → API → Guidelines.
   `.cursor/skills/write-component-docs/SKILL.md` has the detail.
5. Add the route to `lib/nav.ts`. Nothing is generated from the filesystem, so
   an unlisted page is unreachable.
6. Run `npm run generate:api` and commit the generated file.

## Releasing

Three lanes, documented in full at
[Installation](https://ui.nickboyer.com/installation):

- **Stable** — push a `v*` tag, which moves the `latest` dist-tag.
- **Canary** — published automatically on every merge to `main` that touches
  `packages/**`, so a change is installable minutes later.
- **Local link** — `npm install --no-save ../standard-ui/packages/*` for the
  tightest loop. Remember your bundler must dedupe React.
