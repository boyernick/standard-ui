import type { Metadata } from "next"
import type { ReactNode } from "react"
import { CodeBlock } from "@/components/code-block"
import {
  GlassPreview,
  GlassTokenList,
  RadiusPreviewList,
  ShadowPreviewList,
} from "@/components/materials-preview"
import { PageHeader } from "@/components/page-header"
import { glass, radii, shadows } from "@/lib/tokens"

export const metadata: Metadata = {
  title: "Materials",
}

const Token = ({ children }: { children: ReactNode }) => (
  <code className="text-sm rounded-md bg-background-tertiary px-1.5 py-0.5 font-mono text-fg-secondary">
    {children}
  </code>
)

const DocTable = ({
  headers,
  children,
}: {
  headers: string[]
  children: ReactNode
}) => (
  <div className="mt-4 overflow-x-auto rounded-xl border border-border-primary bg-surface">
    <table className="w-full min-w-[36rem] border-collapse text-left">
      <thead>
        <tr className="border-b border-border-primary">
          {headers.map((header) => (
            <th
              key={header}
              scope="col"
              className="text-xs-strong px-4 py-3 text-fg-quaternary"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-border-primary text-sm text-fg-secondary">
        {children}
      </tbody>
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

export default function MaterialsPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader
        title="Materials"
        description="Elevation, radius, and glass edge fades for depth and scroll chrome."
      />

      <p className="text-md max-w-3xl text-fg-secondary">
        Use elevation for floating surfaces. Pair with{" "}
        <Token>shadow-hairline</Token> or a border for edges — lift and edge are
        separate tokens. Use glass fades when content scrolls under sticky
        chrome.
      </p>

      <div className="mt-6">
        <ShadowPreviewList />
      </div>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">Overview</h2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Materials cover how surfaces lift, how corners round, and how scroll
          edges soften. Shadows use elevation levels <Token>100</Token>–
          <Token>400</Token>, exposed as <Token>shadow-sm</Token> through{" "}
          <Token>shadow-xl</Token>, plus a dedicated hairline edge. Radius runs
          from <Token>2xs</Token> to <Token>4xl</Token>. Glass pairs masked{" "}
          <Token>backdrop-blur-md</Token> with a surface tint gradient.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">Shadow scale</h2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Four elevation levels plus a hairline edge token.
        </p>
        <DocTable headers={["Class", "Level", "Usage"]}>
          {shadows.map((item) => (
            <tr key={item.name}>
              <DocCell mono>{item.className}</DocCell>
              <DocCell mono>{item.level}</DocCell>
              <DocCell>{item.usage}.</DocCell>
            </tr>
          ))}
        </DocTable>
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">Component mapping</h2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Pick elevation from the role of the surface, not from visual preference
          alone.
        </p>
        <DocTable headers={["Component type", "Recommended shadow", "Rationale"]}>
          {[
            [
              "Switch thumbs, chips",
              "shadow-sm",
              "Barely lifted control chrome.",
            ],
            [
              "Tooltips, small popovers",
              "shadow-md",
              "Clear separation from the trigger.",
            ],
            [
              "Cards, menus, selects",
              "shadow-lg",
              "Default elevated panel depth.",
            ],
            [
              "Modals and dialogs",
              "shadow-xl",
              "Highest practical elevation for focus.",
            ],
            [
              "Flat cards and tables",
              "border / shadow-hairline",
              "Sit in the layout rather than above it.",
            ],
          ].map(([type, shadow, rationale]) => (
            <tr key={type}>
              <DocCell>{type}</DocCell>
              <DocCell mono>{shadow}</DocCell>
              <DocCell>{rationale}</DocCell>
            </tr>
          ))}
        </DocTable>
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">Shadow and hairline</h2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Elevation and edge are separate tokens. Choose based on whether the
          surface floats or sits flat in the layout.
        </p>
        <DocTable headers={["Pattern", "When to use"]}>
          <tr>
            <DocCell mono>shadow-sm … shadow-xl</DocCell>
            <DocCell>
              Elevated surfaces — cards, menus, dialogs, floating panels.
            </DocCell>
          </tr>
          <tr>
            <DocCell mono>shadow-hairline</DocCell>
            <DocCell>
              Theme-aware 1px edge when you want a crisp outline without a border
              token.
            </DocCell>
          </tr>
          <tr>
            <DocCell mono>border border-border-primary</DocCell>
            <DocCell>
              Non-elevated dividers, sidebars, tables, and flat cards-by-design.
            </DocCell>
          </tr>
        </DocTable>
        <p className="text-md mt-4 max-w-3xl text-fg-secondary">
          Prefer one clear edge treatment — hairline or border — unless the
          pattern needs both with <Token>shadow-lg</Token>.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">Hover states</h2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Increasing elevation on hover signals that a surface is interactive.
        </p>
        <DocTable headers={["State", "Class", "Usage"]}>
          <tr>
            <DocCell>Default</DocCell>
            <DocCell mono>shadow-sm</DocCell>
            <DocCell>Resting interactive card.</DocCell>
          </tr>
          <tr>
            <DocCell>Hover</DocCell>
            <DocCell mono>hover:shadow-md</DocCell>
            <DocCell>Subtle lift that reads as clickable.</DocCell>
          </tr>
          <tr>
            <DocCell>Active</DocCell>
            <DocCell mono>active:shadow-sm</DocCell>
            <DocCell>Return to base elevation for press feedback.</DocCell>
          </tr>
        </DocTable>
        <CodeBlock
          className="mt-4"
          lang="tsx"
          code={`<div className="shadow-sm hover:shadow-md active:shadow-sm transition-shadow">
  Card content
</div>`}
        />
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">Radius</h2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Prefer these corner radii over arbitrary <Token>rounded-[…]</Token>{" "}
          values.
        </p>
        <div className="mt-6">
          <RadiusPreviewList />
        </div>
        <DocTable headers={["Class", "Value", "Usage"]}>
          {radii.map((item) => (
            <tr key={item.name}>
              <DocCell mono>{`rounded-${item.name}`}</DocCell>
              <DocCell mono>
                {item.value} ({item.px})
              </DocCell>
              <DocCell>{item.usage}</DocCell>
            </tr>
          ))}
        </DocTable>

        <h3 className="heading-xs mt-10 text-fg-primary">Nested radius</h3>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          When a rounded child sits inside a padded, rounded parent, keep curves
          concentric:{" "}
          <Token>inner = outer − padding</Token>. Pick the nearest lower scale
          step when the result is not exact.
        </p>
        <DocTable headers={["Outer", "Padding", "Inner"]}>
          {(
            [
              ["rounded-md (8)", "p-1 (4)", "rounded-xs (4)"],
              ["rounded-lg (10)", "p-0.5 (2)", "rounded-md (8)"],
              ["rounded-xl (12)", "p-1 (4)", "rounded-md (8)"],
              ["rounded-xl (12)", "p-1.5 (6)", "rounded-sm (6)"],
              ["rounded-xl (12)", "p-2 (8)", "rounded-xs (4)"],
            ] as const
          ).map(([outer, padding, inner]) => (
            <tr key={`${outer}-${padding}`}>
              <DocCell mono>{outer}</DocCell>
              <DocCell mono>{padding}</DocCell>
              <DocCell mono>{inner}</DocCell>
            </tr>
          ))}
        </DocTable>
        <CodeBlock
          className="mt-4"
          lang="tsx"
          size="sm"
          code={`{/* Select popup: rounded-md + p-1 → items use rounded-xs */}
<div className="rounded-md border p-1">
  <button type="button" className="rounded-xs px-2.5 py-1.5">
    Apple
  </button>
</div>`}
        />
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">Glass</h2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Soften content as it scrolls under sticky chrome. Stack a masked blur
          with a tint gradient — not a solid translucent bar. Prefer{" "}
          <Token>EdgeFade</Token> so top and bottom edges stay consistent.
        </p>
        <div className="mt-6">
          <GlassPreview />
        </div>
        <div className="mt-6">
          <GlassTokenList />
        </div>
        <DocTable headers={["Layer", "Recipe", "Role"]}>
          {glass.map((item) => (
            <tr key={item.name}>
              <DocCell>{item.label}</DocCell>
              <DocCell mono>{item.className}</DocCell>
              <DocCell>{item.usage}.</DocCell>
            </tr>
          ))}
        </DocTable>

        <h3 className="heading-xs mt-10 text-fg-primary">Composition</h3>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Two absolute layers behind the chrome. Blur and tint share one mask
          so they ease out together — separate fade curves read as a milky wash.
          Tint uses <Token>from-surface/80 via-surface/40 to-transparent</Token>{" "}
          (or <Token>background-primary</Token> on the page canvas). Avoid{" "}
          <Token>overflow: hidden</Token> on ancestors of the fade or
          backdrop-filter may not sample the scrolling content.
        </p>
        <CodeBlock
          className="mt-4"
          lang="tsx"
          code={`import { EdgeFade } from "@/components/edge-fade"

<div className="sticky top-0 z-10">
  <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[calc(100%+0.75rem)]">
    <EdgeFade edge="top" tone="surface" />
  </div>
  <div className="relative px-5 pt-5 pb-4">
    {/* sticky chrome */}
  </div>
</div>

{/* Bottom edge — pin to the scroll viewport */}
<div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-12">
  <EdgeFade edge="bottom" tone="surface" />
</div>`}
        />
        <p className="text-md mt-4 max-w-3xl text-fg-secondary">
          Add bottom padding on the scroll content so the last items can clear
          the fade (about the same height as the bottom edge).
        </p>
      </section>

      <section className="mt-14 mb-8">
        <h2 className="heading-sm text-fg-primary">Usage guidelines</h2>

        <h3 className="heading-xs mt-8 text-fg-primary">Do</h3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>
            Use <Token>shadow-sm</Token>–<Token>shadow-xl</Token> for elevated
            surfaces
          </li>
          <li>
            Increase elevation on hover (
            <Token>shadow-sm</Token> → <Token>shadow-md</Token>) with{" "}
            <Token>transition-shadow</Token>
          </li>
          <li>
            Use <Token>shadow-lg</Token> for cards and menus,{" "}
            <Token>shadow-xl</Token> for modals
          </li>
          <li>
            Prefer radius tokens (<Token>rounded-md</Token>,{" "}
            <Token>rounded-xl</Token>) over custom radii
          </li>
          <li>
            Nest radii with <Token>inner = outer − padding</Token> (e.g. select
            items inside a padded popup)
          </li>
          <li>
            Use <Token>border</Token> or <Token>shadow-hairline</Token> for flat
            layout chrome
          </li>
          <li>
            Use masked <Token>backdrop-blur-md</Token> plus a tint gradient for
            scroll edges — prefer <Token>EdgeFade</Token>
          </li>
        </ul>

        <h3 className="heading-xs mt-8 text-fg-primary">Don&apos;t</h3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>Don’t invent one-off multi-glow shadows outside the scale</li>
          <li>
            Don’t jump from <Token>shadow-sm</Token> to{" "}
            <Token>shadow-xl</Token> on hover
          </li>
          <li>Don’t apply elevation to inline text or icons alone</li>
          <li>
            Don’t use <Token>rounded-[13px]</Token> when a scale step exists
          </li>
          <li>
            Don’t reuse the parent radius on a padded child — curves will clash
          </li>
          <li>
            Don’t skip transitions when elevation changes — abrupt lifts feel
            broken
          </li>
          <li>
            Don’t cover titles or last nav items with an oversized edge fade —
            keep the fade short and pad the scroll content
          </li>
          <li>
            Don’t use a flat opaque bar when the intent is glass — always mask
            the blur and fade the tint to transparent
          </li>
        </ul>
      </section>
    </div>
  )
}
