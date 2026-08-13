# Standard UI

Public design-system repository for **standardUI**. Foundations first: color, type, radius, and shadow — documented in a Geist-style site.

## Tokens

Source of truth: [`app/tokens.css`](app/tokens.css). Names and hex mirrors: [`lib/tokens.ts`](lib/tokens.ts).

- Scales: `gray`, `warm`, `green` with steps `100–1000`
- Semantic: `--bg`, `--bg-subtle`, `--surface`, `--border`, `--text`, `--text-secondary`, `--accent`
- Type: Instrument Serif (display), Geist Sans (UI), Geist Mono (code)
- Materials: `--radius-*`, `--shadow-*`

Use semantic names in UI. Do not use raw hex outside the token files.

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

| Route | Page |
| --- | --- |
| `/` | Introduction |
| `/colors` | Color scales |
| `/typography` | Type families and scale |
| `/materials` | Radius and shadow |
| `/brand` | Brand stub |

## Build

```bash
npm run build
npm start
```
