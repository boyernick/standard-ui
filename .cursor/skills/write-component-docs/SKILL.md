---
name: write-component-docs
description: Creates StandardUI component pages — a title, a one-line description, and visual specimens. Use when adding a route under app/(docs)/components.
---

# Write a StandardUI component page

StandardUI pages show the component. They do not explain it. There is no prose
documentation on this site — no overview, no usage guidance, no prop tables, no
code blocks, no install steps. If you catch yourself writing a sentence that
teaches rather than labels, delete it.

## Page anatomy

Create `app/(docs)/components/<component-name>/page.tsx`:

```tsx
import type { Metadata } from "next"
import { Thing } from "@boyernick/standard-ui-react"
import { ComponentCanvas } from "@/components/component-canvas"
import { DocPage } from "@/components/doc-page"

export const metadata: Metadata = {
  title: "Thing",
}

export default function ThingPage() {
  return (
    <DocPage
      title="Thing"
      description="One sentence on what it is and when to reach for it."
    >
      <ComponentCanvas label="Variants">
        <Thing variant="primary">Primary</Thing>
        <Thing variant="outline">Outline</Thing>
      </ComponentCanvas>

      <ComponentCanvas label="Sizes">…</ComponentCanvas>
    </DocPage>
  )
}
```

That is the whole page. `DocPage` renders the header band, the `Examples`
heading, and the prev/next footer.

Stateful or interactive specimens go in a sibling `"use client"` file named
`<component-name>-examples.tsx` that returns the `ComponentCanvas` list; the
page then renders `<ThingExamples />` as its only child.

Add a sentence-case entry to the `components` array in `lib/nav.ts`. The
`navGroups` array below it composes the groups, and everything else — sidebar,
mobile drawer, ⌘K search and its filter pills, prev/next paging — derives from
it. A new group is one entry in `navGroups`; nothing else needs touching.

## ComponentCanvas

- `label` — the short specimen caption ("Variants", "Sizes", "Disabled").
  Sentence case, no trailing punctuation.
- `minHeightClass` — only when a specimen needs reserved height (inline
  overlays, tall demos). Height is content-driven by default.
- `frame={false}` — for previews that already render their own bordered
  surface, so they aren't double-framed.
- `contentClassName="w-full items-stretch"` — for full-bleed specimens.

## Writing rules

- **Subtitles are one sentence.** Page descriptions and section descriptions
  alike: say what the thing is, as briefly as it can be said, and stop. Never
  add a second sentence of usage guidance — that is documentation, and this
  site does not carry it. If two facts genuinely both matter, merge them into
  one sentence rather than adding another.
- Cover the real surface of the component: variants, sizes, icons, loading,
  disabled, and any distinct shape or state. One canvas per axis.
- Use realistic, concise specimen copy.
- Import public components from `@boyernick/standard-ui-react`, never source
  files.
- Show token utilities and existing components, not raw colors or hand-rolled
  controls.
- Keep labels sentence case. Never use uppercase styling.

## Verification

- Open the route and exercise every interactive specimen.
- Check light and dark themes and a narrow viewport.
- Confirm the sidebar link, ⌘K search entry, and prev/next footer resolve.
- Run lint and build.
