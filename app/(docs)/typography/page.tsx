import type { Metadata } from "next"
import type { ReactNode } from "react"
import { PageHeader } from "@/components/page-header"
import { TypeScaleList } from "@/components/type-scale-list"
import {
  bodyScaleRows,
  fontFamilies,
  headingScaleRows,
} from "@/lib/type-scale"

export const metadata: Metadata = {
  title: "Typography",
}

const DocTable = ({
  headers,
  children,
}: {
  headers: string[]
  children: ReactNode
}) => (
  <div className="mt-4 overflow-x-auto rounded-xl border border-border-primary bg-surface">
    <table className="w-full min-w-[40rem] border-collapse text-left">
      <thead>
        <tr className="border-b border-border-primary">
          {headers.map((header) => (
            <th
              key={header}
              scope="col"
              className="text-xs-strong px-4 py-3 text-fg-tertiary"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="text-sm text-fg-secondary">{children}</tbody>
    </table>
  </div>
)

const DocCell = ({
  children,
  mono = false,
}: {
  children: ReactNode
  mono?: boolean
}) => (
  <td
    className={`px-4 py-3 align-top ${mono ? "font-mono text-fg-primary" : ""}`}
  >
    {children}
  </td>
)

export default function TypographyPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader
        title="Typography"
        description="Text styles for headings and body content."
      />

      <TypeScaleList />

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">Overview</h2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          The Standard UI typography system is built on three font families and
          the Apps SDK type scale from <code className="font-mono">2xl</code>{" "}
          down to <code className="font-mono">2xs</code>. Text styles are
          Tailwind utilities that combine family, size, line height, and weight.
          Prefer these tokens over ad-hoc font properties.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">Font families</h2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Three families cover UI, display, and code.
        </p>
        <DocTable
          headers={["CSS variable", "Tailwind class", "Font", "Usage"]}
        >
          {fontFamilies.map((row) => (
            <tr key={row.cssVar} className="border-b border-border-primary last:border-b-0">
              <DocCell mono>{row.cssVar}</DocCell>
              <DocCell mono>{row.className}</DocCell>
              <DocCell>{row.font}</DocCell>
              <DocCell>{row.usage}</DocCell>
            </tr>
          ))}
        </DocTable>
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">Type scale</h2>

        <h3 className="heading-xs mt-8 text-fg-primary">Headings</h3>
        <p className="text-md mt-2 max-w-3xl text-fg-secondary">
          Sizes <code className="font-mono">lg</code> through{" "}
          <code className="font-mono">2xl</code> ship as both Söhne (sans)
          and Signifier (serif) variants. Smaller headings use Söhne only.
        </p>
        <DocTable
          headers={[
            "Tailwind class",
            "Font",
            "Size",
            "Line height",
            "Weight",
            "Usage",
          ]}
        >
          {headingScaleRows.map((row) => (
            <tr
              key={row.token}
              className="border-b border-border-primary last:border-b-0"
            >
              <DocCell mono>{row.token}</DocCell>
              <DocCell>{row.font}</DocCell>
              <DocCell>{row.size}</DocCell>
              <DocCell>{row.lineHeight}</DocCell>
              <DocCell>{row.weight}</DocCell>
              <DocCell>{row.usage}</DocCell>
            </tr>
          ))}
        </DocTable>

        <h3 className="heading-xs mt-10 text-fg-primary">Body text</h3>
        <p className="text-md mt-2 max-w-3xl text-fg-secondary">
          Body styles use Söhne. Each size has a regular and strong (medium
          weight) variant.
        </p>
        <DocTable
          headers={[
            "Tailwind class",
            "Size",
            "Line height",
            "Weight",
            "Usage",
          ]}
        >
          {bodyScaleRows.map((row) => (
            <tr
              key={row.token}
              className="border-b border-border-primary last:border-b-0"
            >
              <DocCell mono>{row.token}</DocCell>
              <DocCell>{row.size}</DocCell>
              <DocCell>{row.lineHeight}</DocCell>
              <DocCell>{row.weight}</DocCell>
              <DocCell>{row.usage}</DocCell>
            </tr>
          ))}
        </DocTable>
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">Text colors</h2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Pair type tokens with semantic text colors for hierarchy. See Colors
          for the full palette.
        </p>
        <DocTable headers={["Tailwind class", "Usage"]}>
          {[
            ["text-fg-primary", "Headings and emphasized content."],
            ["text-fg-secondary", "Body text and standard content."],
            ["text-fg-tertiary", "Captions, labels, and supporting text."],
            [
              "text-fg-quaternary",
              "Placeholders, disabled text, and subtle hints.",
            ],
          ].map(([token, usage]) => (
            <tr
              key={token}
              className="border-b border-border-primary last:border-b-0"
            >
              <DocCell mono>{token}</DocCell>
              <DocCell>{usage}</DocCell>
            </tr>
          ))}
        </DocTable>
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">Usage guidelines</h2>

        <h3 className="heading-xs mt-8 text-fg-primary">Do</h3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>
            Use <code className="font-mono">heading-*</code> for titles to keep
            hierarchy consistent
          </li>
          <li>
            Use <code className="font-mono">text-md</code> for paragraphs,{" "}
            <code className="font-mono">text-sm</code> for secondary info
          </li>
          <li>
            Pair type tokens with semantic colors (
            <code className="font-mono">text-fg-primary</code>,{" "}
            <code className="font-mono">text-fg-secondary</code>)
          </li>
          <li>
            Prefer <code className="font-mono">-strong</code> variants over
            arbitrary font weights
          </li>
          <li>
            Pick <code className="font-mono">-serif</code> or{" "}
            <code className="font-mono">-sans</code> explicitly on lg–2xl
            headings
          </li>
          <li>Keep heading levels sequential — don’t skip steps</li>
        </ul>

        <h3 className="heading-xs mt-8 text-fg-primary">Don't</h3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>
            Don’t use raw sizes like <code className="font-mono">text-[17px]</code>{" "}
            for content typography
          </li>
          <li>Don’t mix arbitrary weights with type tokens</li>
          <li>
            Don’t use Signifier for body copy or sizes below{" "}
            <code className="font-mono">heading-lg</code>
          </li>
          <li>
            Don’t use <code className="font-mono">heading-2xl-*</code> more than
            once per page
          </li>
          <li>Don’t stack multiple type tokens on the same element</li>
          <li>
            Don’t use headings only for visual size — match semantic levels
          </li>
        </ul>
      </section>

      <section className="mt-14 mb-8">
        <h2 className="heading-sm text-fg-primary">Responsive typography</h2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          The scale works across breakpoints. Combine with Tailwind prefixes when
          you need a size jump.
        </p>
        <DocTable headers={["Pattern", "Usage"]}>
          {[
            [
              "heading-xl-serif md:heading-2xl-serif",
              "Larger page title on medium+ screens.",
            ],
            [
              "text-sm md:text-md",
              "Larger body text on medium+ screens.",
            ],
          ].map(([pattern, usage]) => (
            <tr
              key={pattern}
              className="border-b border-border-primary last:border-b-0"
            >
              <DocCell mono>{pattern}</DocCell>
              <DocCell>{usage}</DocCell>
            </tr>
          ))}
        </DocTable>
      </section>
    </div>
  )
}
