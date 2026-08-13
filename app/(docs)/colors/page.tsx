import type { Metadata } from "next";
import { CopyToken } from "@/components/copy-token";
import { PageHeader } from "@/components/page-header";
import {
  colors,
  cssVar,
  scaleLabels,
  scales,
  semantics,
  stepRoles,
  steps,
  type Scale,
} from "@/lib/tokens";

export const metadata: Metadata = {
  title: "Colors",
};

function ScaleRow({ scale }: { scale: Scale }) {
  return (
    <section className="mt-10">
      <div className="mb-3 flex items-baseline justify-between">
        <h2 className="text-heading-sm font-medium text-fg">
          {scaleLabels[scale]}
        </h2>
        <p className="text-caption text-muted">Click a swatch to copy</p>
      </div>
      <div className="overflow-hidden rounded-xl border border-line bg-surface">
        <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10">
          {steps.map((step) => {
            const token = `${scale}-${step}`;
            const hex = colors.light[scale][step];
            return (
              <CopyToken key={token} value={cssVar(token)} className="block">
                <div>
                  <div
                    className="aspect-[4/3]"
                    style={{ background: `var(--${token})` }}
                  />
                  <div className="px-2.5 py-2">
                    <p className="font-mono text-caption text-fg">{step}</p>
                    <p className="font-mono text-[10px] text-muted">{hex}</p>
                  </div>
                </div>
              </CopyToken>
            );
          })}
        </div>
      </div>
      <dl className="mt-3 grid gap-1 sm:grid-cols-2">
        {steps.map((step) => (
          <div key={step} className="flex gap-2 text-caption text-muted">
            <dt className="w-10 font-mono text-fg">{step}</dt>
            <dd>{stepRoles[step]}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export default function ColorsPage() {
  const semanticEntries = Object.entries(semantics.light);

  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader
        title="Colors"
        description="Three scales with Geist-style steps, plus semantic aliases. UI should use semantic names, not raw hex."
      />

      <section>
        <h2 className="text-heading-sm font-medium text-fg">Semantic</h2>
        <p className="mt-1 text-body text-muted">
          Mapped for light and dark. Click to copy the CSS variable.
        </p>
        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {semanticEntries.map(([name, hex]) => (
            <CopyToken
              key={name}
              value={cssVar(name)}
              className="flex items-center gap-3 rounded-lg border border-line bg-surface p-3"
            >
              <span
                className="size-10 shrink-0 rounded-md border border-line"
                style={{ background: `var(--${name})` }}
              />
              <span className="min-w-0">
                <span className="block font-mono text-caption text-fg">
                  --{name}
                </span>
                <span className="block font-mono text-[11px] text-muted">
                  {hex}
                </span>
              </span>
            </CopyToken>
          ))}
        </div>
      </section>

      {scales.map((scale) => (
        <ScaleRow key={scale} scale={scale} />
      ))}
    </div>
  );
}
