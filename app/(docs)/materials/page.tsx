import type { Metadata } from "next"
import type { ReactNode } from "react"
import { CodeBlock } from "@/components/code-block"
import {
  RadiusPreviewList,
  ShadowPreviewList,
} from "@/components/materials-preview"
import { PageHeader } from "@/components/page-header"
import { radii, shadows } from "@/lib/tokens"

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
        description="Elevation and radius tokens for depth and surface shape."
      />

      <p className="text-md max-w-3xl text-fg-secondary">
        Use elevation for floating surfaces. Pair with{" "}
        <Token>shadow-hairline</Token> or a border for edges — lift and edge are
        separate tokens.
      </p>

      <div className="mt-6">
        <ShadowPreviewList />
      </div>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">Overview</h2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Materials cover how surfaces lift and how corners round. Shadows use
          elevation levels <Token>100</Token>–<Token>400</Token>, exposed as{" "}
          <Token>shadow-sm</Token> through <Token>shadow-xl</Token>, plus a
          dedicated hairline edge. Radius runs from <Token>2xs</Token> to{" "}
          <Token>4xl</Token>.
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
            Use <Token>border</Token> or <Token>shadow-hairline</Token> for flat
            layout chrome
          </li>
        </ul>

        <h3 className="heading-xs mt-8 text-fg-primary">Don't</h3>
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
            Don’t skip transitions when elevation changes — abrupt lifts feel
            broken
          </li>
        </ul>
      </section>
    </div>
  )
}
