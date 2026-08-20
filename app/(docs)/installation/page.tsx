import type { Metadata } from "next"
import type { ReactNode } from "react"
import { CodeBlock } from "@/components/code-block"
import { DocCell, DocTable, Token } from "@/components/doc-table"
import { PageHeader } from "@/components/page-header"
import { H2, H3 } from "@/components/prose"

export const metadata: Metadata = {
  title: "Installation",
}

const lanes = [
  {
    lane: "Stable",
    use: "Production, CI, anything deployed",
    range: "^0.1.0",
  },
  {
    lane: "Canary",
    use: "Iterating on a site against unreleased components",
    range: "@canary",
  },
  {
    lane: "Local link",
    use: "Editing a component while watching a site, uncommitted",
    range: "a path on your machine",
  },
]

const Section = ({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: ReactNode
}) => (
  <section className="mt-14">
    <H2>{title}</H2>
    {description ? (
      <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
        {description}
      </p>
    ) : null}
    {children}
  </section>
)

export default function InstallationPage() {
  return (
    <div className="w-full">
      <PageHeader
        title="Installation"
        description="Add StandardUI to a project — packages, Tailwind wiring, fonts, and the release lane to track."
      />

      <Section
        title="Install the packages"
        description="Tokens carry the CSS variables and the Tailwind theme layer; react carries the components. You want both."
      >
        <CodeBlock
          className="mt-4"
          lang="bash"
          code={`npm install @boyernick/standard-ui-tokens @boyernick/standard-ui-react`}
        />
        <p className="text-md mt-4 max-w-3xl text-fg-secondary">
          The icon dependency runs a postinstall license check that fails the
          whole install when <Token>CENTRAL_LICENSE_KEY</Token> is unset. Export
          it first, or install with <Token>--ignore-scripts</Token> — the icon
          package still resolves, but every other postinstall is skipped too.
        </p>
        <CodeBlock
          className="mt-4"
          lang="bash"
          code={`export CENTRAL_LICENSE_KEY=your_license_key
npm install`}
        />
      </Section>

      <Section
        title="Wire up Tailwind"
        description="Tailwind v4. Import the token layer, point @source at the component sources so their classes are scanned, and register the dark variant."
      >
        <CodeBlock
          className="mt-4"
          lang="css"
          code={`@import "tailwindcss";
@import "@boyernick/standard-ui-tokens/css/tokens.css";
@source "./node_modules/@boyernick/standard-ui-react/src";

@custom-variant dark (&:where(.dark, .dark *));`}
        />
        <p className="text-md mt-4 max-w-3xl text-fg-secondary">
          The <Token>@source</Token> line matters: the package ships raw
          TypeScript rather than compiled CSS, so without it Tailwind never sees
          the classes the components use and they render unstyled. The{" "}
          <Token>@custom-variant</Token> line is what makes{" "}
          <Token>dark:</Token> respond to a <Token>class=&quot;dark&quot;</Token>{" "}
          on <Token>&lt;html&gt;</Token>.
        </p>
      </Section>

      <Section
        title="Fonts"
        description="The type tokens reference three families that the package deliberately does not redistribute."
      >
        <DocTable headers={["Token", "Family", "Role"]}>
          {[
            ["--font-display", "Signifier", "Serif titles"],
            ["--font-sans", "Söhne", "UI"],
            ["--font-mono", "Söhne Mono", "Code"],
          ].map(([token, family, role]) => (
            <tr key={token}>
              <DocCell mono>{token}</DocCell>
              <DocCell>{family}</DocCell>
              <DocCell>{role}</DocCell>
            </tr>
          ))}
        </DocTable>
        <p className="text-md mt-4 max-w-3xl text-fg-secondary">
          These resolve through <Token>local()</Token> against fonts installed
          on the machine, so they are licensed by you and not shipped. Without
          them the stacks fall back — the layout holds, but the type will not
          match this site.
        </p>
      </Section>

      <Section
        title="Pick a release lane"
        description="Three ways to consume the packages, depending on how tight a loop you need."
      >
        <DocTable headers={["Lane", "Use it for", "Version"]}>
          {lanes.map((item) => (
            <tr key={item.lane}>
              <DocCell>{item.lane}</DocCell>
              <DocCell>{item.use}</DocCell>
              <DocCell mono>{item.range}</DocCell>
            </tr>
          ))}
        </DocTable>

        <H3>Stable</H3>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Published by pushing a <Token>v*</Token> tag. Moves the{" "}
          <Token>latest</Token> tag.
        </p>
        <CodeBlock
          className="mt-4"
          lang="bash"
          code={`npm install @boyernick/standard-ui-tokens @boyernick/standard-ui-react`}
        />

        <H3>Canary</H3>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Every merge to main that touches the packages publishes a prerelease,
          so a component change is installable minutes later without cutting a
          release.
        </p>
        <CodeBlock
          className="mt-4"
          lang="bash"
          code={`npm install @boyernick/standard-ui-tokens@canary @boyernick/standard-ui-react@canary`}
        />
        <p className="text-md mt-4 max-w-3xl text-fg-secondary">
          Canary versions are <Token>0.1.&lt;next&gt;-canary.&lt;run&gt;</Token>
          . They sort above the current stable release, but a caret range never
          resolves to one — a site pinned at <Token>^0.1.0</Token> keeps getting
          stable builds until it opts in. Installing a canary writes the exact
          version into <Token>package.json</Token>, so move back to a caret
          range before deploying.
        </p>

        <H3>Local link</H3>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          For the tightest loop — editing a component and watching a site
          repaint.
        </p>
        <CodeBlock
          className="mt-4"
          lang="bash"
          code={`npm install --no-save \\
  ../standard-ui/packages/tokens \\
  ../standard-ui/packages/react`}
        />
        <p className="text-md mt-4 max-w-3xl text-fg-secondary">
          Two things to know. <Token>--no-save</Token> keeps the
          machine-specific path out of <Token>package.json</Token>, which is
          what would otherwise break a deploy; a plain{" "}
          <Token>npm install</Token> restores the registry version. And a linked
          React library resolves its own copy of React, which surfaces as{" "}
          <Token>Invalid hook call</Token> — so the consumer&rsquo;s bundler
          must dedupe.
        </p>
        <CodeBlock
          className="mt-4"
          lang="ts"
          code={`resolve: { dedupe: ["react", "react-dom"] }`}
        />
        <p className="text-md mt-4 max-w-3xl text-fg-secondary">
          Prefer the canary lane for anything lasting more than an afternoon.
        </p>
      </Section>

      <Section
        title="Verify"
        description="Render one component. If it has no styling, the @source line is missing or pointing at the wrong path."
      >
        <CodeBlock
          className="mt-4"
          lang="tsx"
          code={`import { Button } from "@boyernick/standard-ui-react"

export default function Example() {
  return <Button variant="primary">Save changes</Button>
}`}
        />
      </Section>
    </div>
  )
}
