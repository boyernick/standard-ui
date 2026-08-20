import type { Metadata } from "next"
import { ColorsPalette } from "@/components/colors-palette"
import { DocCell, DocTable, Token } from "@/components/doc-table"
import { PageHeader } from "@/components/page-header"
import { H2, H3 } from "@/components/prose"

export const metadata: Metadata = {
  title: "Colors",
}

export default function ColorsPage() {
  return (
    <div className="w-full">
      <PageHeader
        title="Colors"
        description="Gray, alpha, and hue scales that semantic tokens build on."
      />

      <ColorsPalette />

      <section className="mt-14 mb-8">
        <H2>Semantic mapping</H2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Prefer semantic tokens in UI. Reach for raw hue steps only when no
          semantic token fits.
        </p>
        <DocTable headers={["Role", "Tokens", "Source"]}>
          {(
            [
              [
                "Primary actions",
                "brand-primary, brand-foreground",
                "gray-900 / gray-0",
              ],
              [
                "Surfaces & text",
                "background-*, surface, fg-*",
                "gray + alpha",
              ],
              [
                "Success / decorative green",
                "decorative-green",
                "green scale",
              ],
              ["Info", "decorative-blue", "blue scale"],
              ["Danger", "destructive", "red scale"],
              ["Warning", "warning", "orange scale"],
              ["Focus", "ring", "gray-1000"],
            ] as const
          ).map(([role, tokens, source]) => (
            <tr key={role}>
              <DocCell>{role}</DocCell>
              <DocCell mono>{tokens}</DocCell>
              <DocCell mono>{source}</DocCell>
            </tr>
          ))}
        </DocTable>

        <H3>Do</H3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>
            Use <Token>bg-brand-primary</Token> for primary buttons, checked
            switches, and selected checkboxes
          </li>
          <li>
            Use <Token>bg-background-*</Token> / <Token>bg-fg-*</Token> for
            foundation diagrams and neutral chrome
          </li>
          <li>
            Use hue scales (<Token>green-*</Token>, <Token>blue-*</Token>, …)
            for status, data viz, and decorative accents
          </li>
        </ul>

        <H3>Don&rsquo;t</H3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>
            Don&rsquo;t use <Token>green-*</Token> as the default fill for primary
            actions or docs illustrations
          </li>
          <li>
            Don&rsquo;t invent hex values outside the scales on this page
          </li>
          <li>
            Don&rsquo;t use <Token>destructive</Token> for decorative red — use{" "}
            <Token>decorative-crimson</Token>
          </li>
        </ul>
      </section>
    </div>
  )
}
