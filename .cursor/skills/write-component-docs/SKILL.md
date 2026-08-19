---
name: write-component-docs
description: Creates StandardUI component documentation pages with the established examples, overview, usage, API, and guidelines structure. Use when documenting a component or adding a route under app/(docs)/components.
---

# Write StandardUI component docs

## Page anatomy

Create `app/(docs)/components/<component-name>/page.tsx` with:

1. Next.js `Metadata` using the sentence-case component name.
2. A `max-w-5xl` page container and `PageHeader`.
3. **Examples** using `ComponentCanvas`; move stateful examples into a nearby `"use client"` file when needed.
4. **Overview** with a direct package import example in `CodeBlock`.
5. **Usage** for variants, composition, behavior, and accessibility.
6. **API** using `DocTable`, `DocCell`, and `Token`.
7. **Guidelines** with specific Do and Don't lists.
8. A sentence-case entry in the `components` array in `lib/nav.ts`.

## Writing rules

- Describe what the component does and when to use it.
- Use realistic, concise example copy.
- Import public components from `@standard-ui/react`, not source files.
- Use `@/components/code-block`, `component-canvas`, `doc-table`, and `page-header` helpers.
- Document accessible names, keyboard interaction, invalid states, and disabled behavior when relevant.
- Keep headings and labels in sentence case. Never use uppercase styling.
- Show token utilities and existing components instead of raw colors or hand-rolled controls.
- Keep code examples complete enough to paste.

## Verification

- Open the route and exercise every interactive example.
- Check light and dark themes and a narrow viewport.
- Confirm the navigation link resolves.
- Run lint and build.
