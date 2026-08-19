# Standard UI

Public design-system repository for **standardUI**. Live docs: **[https://ui.nickboyer.com](https://ui.nickboyer.com)** (also [https://standard-ui.vercel.app](https://standard-ui.vercel.app)).

Color primitives and type scale follow [Apps SDK UI](https://openai.github.io/apps-sdk-ui/). Docs layout is inspired by [Rogo](https://design.rogo.ai/system). Components sit on [Base UI](https://base-ui.com) for behavior and are styled with Standard UI tokens.

## Packages

| Package | Role |
| --- | --- |
| [`@standard-ui/tokens`](packages/tokens) | CSS variables + Tailwind `@theme` |
| [`@standard-ui/react`](packages/react) | Styled React components |

This monorepo also hosts the docs site (Next.js App Router).

## Icons

Standard UI uses [Central Icons](https://centralicons.com) — package `@central-icons-react/round-outlined-radius-2-stroke-2` (round, outlined, 2px radius, 2px stroke). Wrapped exports default to **20px**.

```bash
export CENTRAL_LICENSE_KEY=your_license_key
npm install
```

```tsx
import { IconHome, withCentralIconDefaults } from "@standard-ui/react"
import { IconAirplane } from "@central-icons-react/round-outlined-radius-2-stroke-2/IconAirplane"

<IconHome />
```

Copy [`.env.example`](.env.example) to `.env.local` for local installs. Do not commit the license key.

## Use in another project

Until published to npm, install from this repo with a `file:` dependency (or a relative path in a monorepo):

```bash
npm install file:../standard-ui/packages/tokens file:../standard-ui/packages/react
```

Or in `package.json`:

```json
{
  "dependencies": {
    "@standard-ui/tokens": "file:../standard-ui/packages/tokens",
    "@standard-ui/react": "file:../standard-ui/packages/react"
  }
}
```

Wire CSS once (Tailwind v4). Point `@source` at the react package so component classes are generated:

```css
@import "tailwindcss";
@import "@standard-ui/tokens/css/tokens.css";
@source "./node_modules/@standard-ui/react/src";

@custom-variant dark (&:where(.dark, .dark *));
```

In this monorepo the docs app imports tokens via a relative path (`../packages/tokens/css/tokens.css`) so Tailwind’s PostCSS resolver does not need package exports.

Local font CSS variables are already defined in `@standard-ui/tokens` (Font Book via `local()`, not redistributed):

- `--font-display` — Signifier (serif titles)
- `--font-sans` — Söhne (UI)
- `--font-mono` — Söhne Mono (code)

These resolve from local Font Book installs on macOS. They are not redistributed in the package. Missing faces use the listed fallbacks. Toggle dark mode with `class="dark"` on `<html>`.

```tsx
import { Button, Switch } from "@standard-ui/react"

export function Example() {
  return (
    <>
      <Button variant="primary">Save</Button>
      <Switch defaultChecked />
    </>
  )
}
```

Consumers should import from `@standard-ui/react`, not `@base-ui/react`.

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
