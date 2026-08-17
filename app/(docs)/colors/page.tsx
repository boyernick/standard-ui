import type { Metadata } from "next";
import { CopyToken } from "@/components/copy-token";
import { PageHeader } from "@/components/page-header";
import { chartTokens, colorGroups, cssVar } from "@/lib/tokens";

export const metadata: Metadata = {
  title: "Colors",
};

export default function ColorsPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader
        title="Colors"
        description="Semantic tokens for backgrounds, borders, text, and brand. Use these names — not raw hex."
      />

      {colorGroups.map((group) => (
        <section key={group.id} className="mt-12 first:mt-0">
          <h2 className="type-title-5 text-fg-primary">{group.title}</h2>
          <p className="type-small mt-1 text-fg-secondary">{group.description}</p>
          <div className="mt-4 overflow-hidden rounded-xl border border-border-primary bg-surface">
            {group.tokens.map((token) => (
              <CopyToken
                key={token.name}
                value={cssVar(token.cssVar)}
                className="flex w-full items-center gap-4 border-b border-border-primary px-4 py-3 last:border-b-0"
              >
                <span
                  className="size-10 shrink-0 rounded-md border border-border-primary"
                  style={{ background: `var(${token.cssVar})` }}
                />
                <span className="min-w-0 flex-1">
                  <span className="type-small-strong block font-mono text-fg-primary">
                    {token.cssVar}
                  </span>
                  <span className="type-tiny block text-fg-tertiary">{token.usage}</span>
                </span>
                <span className="type-tiny hidden font-mono text-fg-quaternary sm:block">
                  {token.value.light}
                </span>
              </CopyToken>
            ))}
          </div>
        </section>
      ))}

      <section className="mt-12">
        <h2 className="type-title-5 text-fg-primary">Charts</h2>
        <p className="type-small mt-1 text-fg-secondary">
          RGB channel triples. Use{" "}
          <code className="font-mono">rgb(var(--chart-1))</code> or add alpha with{" "}
          <code className="font-mono">rgb(var(--chart-1) / 0.5)</code>.
        </p>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-5">
          {chartTokens.map((token) => (
            <CopyToken
              key={token.name}
              value={`rgb(var(${token.cssVar}))`}
              className="overflow-hidden rounded-xl border border-border-primary bg-surface"
            >
              <div
                className="h-16"
                style={{ background: `rgb(var(${token.cssVar}))` }}
              />
              <div className="px-3 py-2">
                <p className="type-tiny-strong font-mono text-fg-primary">
                  {token.cssVar}
                </p>
                <p className="type-tiny text-fg-tertiary">{token.label}</p>
              </div>
            </CopyToken>
          ))}
        </div>
      </section>
    </div>
  );
}
