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

**Two lanes**

| Lane | When | Dependency |
| --- | --- | --- |
| Local link | Day-to-day design loop (docs ↔ apps, instant) | `file:` path to this repo’s packages |
| Registry | Vercel / CI / other machines | `@boyernick/standard-ui-*` from npm after publish |

### Local link (bidirectional)

From a sibling app (example: `Documents/nickboyer.com` → `Projects/standard-ui`):

```bash
npm install \
  file:../../Projects/standard-ui/packages/tokens \
  file:../../Projects/standard-ui/packages/react
```

Or in `package.json`:

```json
{
  "dependencies": {
    "@boyernick/standard-ui-tokens": "file:../../Projects/standard-ui/packages/tokens",
    "@boyernick/standard-ui-react": "file:../../Projects/standard-ui/packages/react"
  }
}
```

`file:` installs symlink to these packages. Edits in the docs app or a production app hit the same source. Point Vite `server.fs.allow` / watch at the packages root and exclude `@boyernick/standard-ui-react` from `optimizeDeps` so HMR tracks the real files.

### Registry (deploy)

1. Publish under your `@boyernick` npm account.
2. Add repo secrets: `NPM_TOKEN` (automation token), `CENTRAL_LICENSE_KEY` (for `npm ci` in CI).
3. Publish: push a tag `v0.1.0` or run **Publish packages** via Actions → workflow_dispatch.
4. In consumers:

```bash
npm install @boyernick/standard-ui-tokens @boyernick/standard-ui-react
```

```json
{
  "dependencies": {
    "@boyernick/standard-ui-tokens": "^0.1.0",
    "@boyernick/standard-ui-react": "^0.1.0"
  }
}
```

Bump the consumer and redeploy after each publish. For bleeding-edge local work, keep the `file:` lane.

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
