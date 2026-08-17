import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { typeScale } from "@/lib/tokens";

export const metadata: Metadata = {
  title: "Typography",
};

const families = [
  {
    name: "Instrument Serif",
    role: "Display — stand-in for Martina Plantijn",
    token: "--font-display",
    className: "type-title-3",
    sample: "Introduction",
  },
  {
    name: "Inter",
    role: "Body and UI",
    token: "--font-inter",
    className: "type-title-5",
    sample: "Standard UI",
  },
  {
    name: "Roboto Mono",
    role: "Code and tokens",
    token: "--font-roboto-mono",
    className: "font-mono type-small",
    sample: "var(--brand-primary)",
  },
];

export default function TypographyPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader
        title="Typography"
        description="Serif display for titles 1–4. Inter for UI. Roboto Mono for code. Sentence case everywhere — never all caps."
      />

      <section>
        <h2 className="type-title-5 text-fg-primary">Families</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {families.map((family) => (
            <div
              key={family.name}
              className="rounded-xl border border-border-primary bg-surface p-5"
            >
              <p className={`${family.className} text-fg-primary`}>{family.sample}</p>
              <p className="type-small-strong mt-4 text-fg-primary">{family.name}</p>
              <p className="type-tiny text-fg-tertiary">{family.role}</p>
              <p className="type-tiny mt-1 font-mono text-fg-quaternary">
                {family.token}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="type-title-5 text-fg-primary">Scale</h2>
        <div className="mt-4 divide-y divide-border-primary overflow-hidden rounded-xl border border-border-primary bg-surface">
          {typeScale.map((item) => (
            <div key={item.token} className="grid gap-4 p-5 md:grid-cols-[12rem_1fr]">
              <div className="type-tiny text-fg-tertiary">
                <p className="font-mono text-fg-primary">{item.token}</p>
                <p className="mt-1">
                  {item.size} / {item.lineHeight} / {item.weight}
                </p>
                <p>{item.family}</p>
              </div>
              <p className={`${item.className} text-fg-primary`}>{item.sample}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
