# @standard-ui/tokens

CSS custom properties and Tailwind v4 `@theme` for Standard UI.

```css
@import "@standard-ui/tokens/css/tokens.css";
```

Type families (from local Font Book on macOS; not shipped in the package):

- `--font-display` — Signifier
- `--font-sans` — Söhne
- `--font-mono` — Söhne Mono

Type scale (Apps SDK metrics, `2xl` → `2xs`):

- Headings: `heading-2xl|xl|lg` with `-sans` / `-serif`; `heading-md|sm|xs` (sans)
- Body: `text-lg|md|sm|xs|2xs` plus `-strong` variants

Spacing: `--spacing: 0.25rem` (4px) — use Tailwind `p-*` / `gap-*` / `m-*`.

Breakpoints (`--breakpoint-*`): `xs` 380px · `sm` 576px · `md` 768px · `lg` 1024px · `xl` 1280px · `2xl` 1536px.

Toggle dark with `class="dark"` on `<html>`.
