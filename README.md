# StandardUI

Public design-system repository for **standardUI**. Live docs: **[https://ui.nickboyer.com](https://ui.nickboyer.com)** (also [https://standard-ui.vercel.app](https://standard-ui.vercel.app)).

Color primitives and type scale follow [Apps SDK UI](https://openai.github.io/apps-sdk-ui/). Docs layout is inspired by [Rogo](https://design.rogo.ai/system). Components sit on [Base UI](https://base-ui.com) for behavior and are styled with StandardUI tokens.

## Packages

| Package | Role |
| --- | --- |
| [`@boyernick/standard-ui-tokens`](packages/tokens) | CSS variables + Tailwind `@theme` |
| [`@boyernick/standard-ui-react`](packages/react) | Styled React components |

This monorepo also hosts the docs site (Next.js App Router).

## Icons

StandardUI uses [Central Icons](https://centralicons.com) — package `@central-icons-react/round-outlined-radius-2-stroke-2` (round, outlined, 2px radius, 2px stroke). Wrapped exports default to **20px**.

```bash
export CENTRAL_LICENSE_KEY=your_license_key
npm install
```

```tsx
import { IconHome, withCentralIconDefaults } from "@boyernick/standard-ui-react"
import { IconAirplane } from "@central-icons-react/round-outlined-radius-2-stroke-2/IconAirplane"

<IconHome />
```

Copy [`.env.example`](.env.example) to `.env.local` for local installs. Do not commit the license key.

## Use in another project

Consumers always install from npm. Three lanes, differing only in which version they pull:

| Lane | When | Version |
| --- | --- | --- |
| Stable | Production, CI, anything deployed | `^0.1.0` |
| Canary | Iterating on a site against unreleased components | `@canary` |
| Local link | Editing a component while watching a site, uncommitted | a path on your machine |

### Stable

```bash
npm install @boyernick/standard-ui-tokens @boyernick/standard-ui-react
```

Published by pushing a `v*` tag or running **Publish packages** via Actions. This moves the `latest` tag.

Repo secrets required: `NPM_TOKEN` (automation token) and `CENTRAL_LICENSE_KEY` (for `npm ci` in CI).

### Canary

Every merge to `main` that touches `packages/**` publishes a prerelease under the `canary` tag, so a component change is installable minutes later without cutting a release.

```bash
npm install @boyernick/standard-ui-tokens@canary @boyernick/standard-ui-react@canary
```

Canary versions are `0.1.<next>-canary.<run>`. They sort above the current stable release but a caret range never resolves to them, so a site pinned at `^0.1.0` keeps getting stable builds until you opt in. Installing a canary writes the exact version into the consumer's `package.json`; move back to a caret range before deploying.

### Local link

For the tightest loop — editing a component and watching a site repaint — point the consumer at your checkout, without committing it:

```bash
npm install --no-save \
  ../standard-ui/packages/tokens \
  ../standard-ui/packages/react
```

Two things to know. `--no-save` keeps the machine-specific path out of `package.json`, which is what would otherwise break the Vercel build; `npm install` restores the registry version. And a linked React library resolves its own copy of React, which surfaces as `Invalid hook call` — so the consumer's bundler must dedupe. For Vite:

```ts
resolve: { dedupe: ["react", "react-dom"] }
```

Prefer the canary lane for anything lasting more than an afternoon.

Wire CSS once (Tailwind v4). Point `@source` at the react package so component classes are generated:

```css
@import "tailwindcss";
@import "@boyernick/standard-ui-tokens/css/tokens.css";
@source "./node_modules/@boyernick/standard-ui-react/src";

@custom-variant dark (&:where(.dark, .dark *));
```

In this monorepo the docs app imports tokens via a relative path (`../packages/tokens/css/tokens.css`) so Tailwind’s PostCSS resolver does not need package exports.

Local font CSS variables are already defined in `@boyernick/standard-ui-tokens` (Font Book via `local()`, not redistributed):

- `--font-display` — Signifier (serif titles)
- `--font-sans` — Söhne (UI)
- `--font-mono` — Söhne Mono (code)

These resolve from local Font Book installs on macOS. They are not redistributed in the package. Missing faces use the listed fallbacks. Toggle dark mode with `class="dark"` on `<html>`.

```tsx
import { Button, Switch } from "@boyernick/standard-ui-react"

export function Example() {
  return (
    <>
      <Button variant="primary">Save</Button>
      <Switch defaultChecked />
    </>
  )
}
```

Consumers should import from `@boyernick/standard-ui-react`, not `@base-ui/react`.

## Develop this repo

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Production docs: [https://ui.nickboyer.com](https://ui.nickboyer.com).

| Route | Page |
| --- | --- |
| `/` | Introduction |
| `/brand` | Brand |
| `/colors` | Colors |
| `/typography` | Typography |
| `/structure` | Structure |
| `/materials` | Materials |
| `/motion` | Motion |
| `/icons` | Icons |
| `/illustrations` | Illustrations |
| `/components/*` | Component docs |

### Custom domain DNS

`ui.nickboyer.com` is attached to the Vercel project. At your DNS provider set:

```text
A  ui.nickboyer.com  76.76.21.21
```

(or the CNAME target Vercel shows in the project domains UI).

## Build

```bash
npm run build
```
