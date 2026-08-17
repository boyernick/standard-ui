# Standard UI

Public design-system repository for **standardUI**. Tokens follow [Rogo’s system](https://design.rogo.ai/system). Components sit on [Base UI](https://base-ui.com) for behavior and are styled with Standard UI tokens.

## Packages

| Package | Role |
| --- | --- |
| [`@standard-ui/tokens`](packages/tokens) | CSS variables + Tailwind `@theme` |
| [`@standard-ui/react`](packages/react) | Styled React components |

This monorepo also hosts the docs site (Next.js App Router).

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

Set font CSS variables on `<html>` (docs use `next/font`):

- `--font-inter` — UI
- `--font-display` — serif titles
- `--font-roboto-mono` — code

Toggle dark mode with `class="dark"` on `<html>`.

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

Open [http://localhost:3000](http://localhost:3000).

| Route | Page |
| --- | --- |
| `/` | Introduction |
| `/colors` | Color tokens |
| `/typography` | Type scale |
| `/materials` | Radius + shadow-ring |
| `/components/button` | Button |
| `/components/input` | Input |
| `/components/badge` | Badge |
| `/components/switch` | Switch |
| `/components/checkbox` | Checkbox |

## Build

```bash
npm run build
```
