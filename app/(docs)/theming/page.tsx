import type { Metadata } from "next"
import { CodeBlock } from "@/components/code-block"
import { DocCell, DocTable, Token } from "@/components/doc-table"
import { PageHeader } from "@/components/page-header"
import { H2, H3 } from "@/components/prose"
import { colorGroups } from "@/lib/tokens"

export const metadata: Metadata = {
  title: "Theming",
}

export default function ThemingPage() {
  return (
    <div className="w-full">
      <PageHeader
        title="Theming"
        description="How the token layers fit together, how dark mode resolves, and what to override when a product needs its own palette."
      />

      <section className="mt-12">
        <H2>Two layers</H2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Colour is defined twice, on purpose. Primitives are the raw scales —{" "}
          <Token>--gray-500</Token>, <Token>--red-400</Token>,{" "}
          <Token>--alpha-10</Token>. Semantic tokens name a job and point at a
          primitive — <Token>--background-primary</Token>,{" "}
          <Token>--border-primary</Token>, <Token>--destructive</Token>.
        </p>
        <p className="text-md mt-4 max-w-3xl text-fg-secondary">
          Components only ever reference the semantic layer. That indirection is
          what lets the palette move without touching a single component, and
          it is why reaching past it — writing{" "}
          <Token>bg-gray-75</Token> instead of{" "}
          <Token>bg-background-tertiary</Token> — breaks theming even though it
          looks identical in light mode.
        </p>
        <CodeBlock
          className="mt-4"
          lang="css"
          code={`/* primitive — a value */
--gray-1000: #0d0d0d;

/* semantic — a job, pointing at a value */
--text-primary: var(--gray-1000);

/* Tailwind theme layer — what utilities are generated from */
--color-fg-primary: var(--text-primary);`}
        />
      </section>

      <section className="mt-14">
        <H2>Dark mode</H2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Dark mode is a <Token>dark</Token> class on{" "}
          <Token>&lt;html&gt;</Token>, never{" "}
          <Token>prefers-color-scheme</Token> directly — that way a product can
          offer an explicit toggle rather than following the OS unconditionally.
          Register the variant once in your CSS:
        </p>
        <CodeBlock
          className="mt-4"
          lang="css"
          code={`@custom-variant dark (&:where(.dark, .dark *));`}
        />
        <p className="text-md mt-4 max-w-3xl text-fg-secondary">
          Set the class before first paint. Reading a stored preference in an
          effect means the page renders light and then flips, which is visible
          as a flash on every navigation.
        </p>
        <CodeBlock
          className="mt-4"
          lang="tsx"
          code={`<script
  dangerouslySetInnerHTML={{
    __html: \`(() => {
  const stored = localStorage.getItem("theme")
  const dark = stored
    ? stored === "dark"
    : matchMedia("(prefers-color-scheme: dark)").matches
  document.documentElement.classList.toggle("dark", dark)
})()\`,
  }}
/>`}
        />

        <H3>What actually flips</H3>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          This catches people out: the <strong>gray scale inverts between
          themes and the hue scales do not</strong>. In dark mode{" "}
          <Token>--gray-0</Token> becomes <Token>#0d0d0d</Token> and{" "}
          <Token>--gray-1000</Token> becomes white, so a semantic token pointing
          at gray flips for free. <Token>--red-500</Token> is the same value in
          both themes.
        </p>
        <p className="text-md mt-4 max-w-3xl text-fg-secondary">
          Two consequences. A token built on a hue scale needs an explicit dark
          value in the <Token>.dark</Token> block — that is why{" "}
          <Token>--destructive</Token> moves from <Token>--red-500</Token> to{" "}
          <Token>--red-400</Token>. And anything built on{" "}
          <Token>--alpha-*</Token> flips automatically, because those are mixed
          from <Token>--alpha-base</Token>, which is the one value in that scale
          that does change.
        </p>
        <CodeBlock
          className="mt-4"
          lang="css"
          code={`:root {
  --alpha-base: #0d0d0d;
  --border-primary: var(--alpha-10);   /* 10% black on light */
}

.dark {
  --alpha-base: #ffffff;               /* the only change needed */
}`}
        />
      </section>

      <section className="mt-14">
        <H2>Overriding tokens</H2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Redefine semantic tokens after the import. Because components resolve
          them at use time, an override reaches every component at once —
          including ones added later.
        </p>
        <CodeBlock
          className="mt-4"
          lang="css"
          code={`@import "@boyernick/standard-ui-tokens/css/tokens.css";

:root {
  /* point the brand at your own colour */
  --brand-primary: #1a73f2;
  --brand-primary-hover: #1660d4;
}

.dark {
  --brand-primary: #4d94ff;
}`}
        />
        <p className="text-md mt-4 max-w-3xl text-fg-secondary">
          Override the semantic layer, not the primitives. Redefining{" "}
          <Token>--gray-500</Token> moves every token that happens to reference
          it, in both themes, usually including several you did not intend.
        </p>
      </section>

      <section className="mt-14">
        <H2>Semantic tokens</H2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          The full set, with the value each resolves to in both themes.
        </p>
        {colorGroups.map((group) => (
          <div key={group.id} className="mt-8">
            <H3>{group.title}</H3>
            <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
              {group.description}
            </p>
            <DocTable headers={["Token", "Light", "Dark", "Usage"]}>
              {group.tokens.map((token) => (
                <tr key={token.cssVar}>
                  <DocCell mono>{token.cssVar}</DocCell>
                  <DocCell mono>{token.value.light}</DocCell>
                  <DocCell mono>{token.value.dark}</DocCell>
                  <DocCell>{token.usage}</DocCell>
                </tr>
              ))}
            </DocTable>
          </div>
        ))}
      </section>

      <section className="mt-14">
        <H2>Guidelines</H2>
        <H3>Do</H3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>
            Use semantic tokens in product code —{" "}
            <Token>bg-background-tertiary</Token>,{" "}
            <Token>text-fg-secondary</Token>, <Token>border-border-primary</Token>
          </li>
          <li>Override at the semantic layer so both themes stay coherent</li>
          <li>
            Give a hue-based token an explicit <Token>.dark</Token> value; only
            gray and alpha flip on their own
          </li>
          <li>Set the theme class before first paint to avoid a flash</li>
        </ul>

        <H3>Don&rsquo;t</H3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>
            Don&rsquo;t use primitives directly in components — it looks right
            in light mode and breaks in dark
          </li>
          <li>Don&rsquo;t redefine primitives to retheme; move the semantic token instead</li>
          <li>
            Don&rsquo;t branch on <Token>prefers-color-scheme</Token> in
            component CSS — the <Token>dark</Token> class is the single source
          </li>
          <li>Don&rsquo;t hardcode a hex where a token exists</li>
        </ul>
      </section>
    </div>
  )
}
