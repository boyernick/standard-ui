import Link from "next/link";

function Card({
  href,
  title,
  description,
  children,
}: {
  href?: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  const inner = (
    <>
      <div className="flex min-h-40 items-center justify-center rounded-xl bg-background-tertiary p-6">
        {children}
      </div>
      <div className="px-1 pt-4">
        <h2 className="type-title-5 text-fg-primary">{title}</h2>
        <p className="type-small mt-1 text-fg-secondary">{description}</p>
      </div>
    </>
  );

  const className =
    "rounded-2xl bg-surface p-3 shadow-ring-xs transition-shadow hover:shadow-ring-sm";

  if (href) {
    return (
      <Link href={href} className={`${className} block`}>
        {inner}
      </Link>
    );
  }

  return <div className={className}>{inner}</div>;
}

function BrandPreview() {
  return (
    <p className="type-title-3 text-fg-primary">standardUI</p>
  );
}

function ComponentsPreview() {
  return (
    <div className="flex w-full max-w-xs flex-wrap items-center justify-center gap-2">
      <span className="h-8 w-24 rounded-md border border-border-primary bg-surface" />
      <span className="type-tiny inline-flex h-8 items-center gap-1 rounded-md border border-border-primary bg-surface px-2 text-fg-primary">
        + Button
        <svg viewBox="0 0 12 12" className="size-3 text-fg-tertiary" aria-hidden>
          <path d="M3 4.5 6 8l3-3.5" fill="none" stroke="currentColor" strokeWidth="1.3" />
        </svg>
      </span>
      <span className="type-tiny inline-flex h-8 items-center rounded-md bg-surface px-1">
        <span className="rounded-sm bg-background-tertiary px-2 py-1 text-fg-primary">Tab</span>
        <span className="px-2 py-1 text-fg-tertiary">Tab</span>
      </span>
      <span className="type-tiny inline-flex h-8 items-center gap-1.5 rounded-md border border-border-primary bg-surface px-2 text-fg-primary">
        Alerts
        <span className="type-tiny-strong inline-flex size-4 items-center justify-center rounded-full bg-surface-inverted text-fg-inverted">
          2
        </span>
      </span>
      <span className="relative inline-flex h-6 w-10 items-center rounded-full bg-brand-primary">
        <span className="absolute right-0.5 size-5 rounded-full bg-brand-foreground" />
      </span>
      <span className="type-tiny inline-flex items-center gap-1.5 text-fg-primary">
        <span className="size-3.5 rounded-full border-[4px] border-fg-primary" />
        Label
      </span>
    </div>
  );
}

function ColorsPreview() {
  return (
    <div className="flex gap-3">
      <div className="flex">
        {["#fdfdfc", "#f5f5f4", "#e7e5e4", "#44403c", "#1c1917"].map((hex) => (
          <span
            key={hex}
            className="size-6 rounded-full ring-2 ring-background-tertiary first:ml-0 -ml-1.5"
            style={{ background: hex }}
          />
        ))}
      </div>
      <div className="flex">
        {["#cfe9e0", "#1d7559", "#135b44", "#0c402f"].map((hex) => (
          <span
            key={hex}
            className="size-6 rounded-full ring-2 ring-background-tertiary first:ml-0 -ml-1.5"
            style={{ background: hex }}
          />
        ))}
      </div>
      <div className="flex">
        {["#1b7463", "#1c6182", "#60563e", "#792a2a"].map((hex) => (
          <span
            key={hex}
            className="size-6 rounded-full ring-2 ring-background-tertiary first:ml-0 -ml-1.5"
            style={{ background: hex }}
          />
        ))}
      </div>
    </div>
  );
}

function MaterialsPreview() {
  return (
    <div className="flex items-end gap-3">
      <span className="size-10 rounded-sm bg-surface shadow-ring-xs" />
      <span className="size-12 rounded-md bg-surface shadow-ring-sm" />
      <span className="size-14 rounded-lg bg-surface shadow-ring-md" />
    </div>
  );
}

export function IntroCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card
        href="/brand"
        title="Brand Assets"
        description="Foundational elements for the Standard UI brand."
      >
        <BrandPreview />
      </Card>
      <Card
        href="/components/button"
        title="Components"
        description="Button, Input, Badge, Switch, and Checkbox — more on the way."
      >
        <ComponentsPreview />
      </Card>
      <Card
        href="/colors"
        title="Colors"
        description="Semantic backgrounds, text, brand, and decorative tokens."
      >
        <ColorsPreview />
      </Card>
      <Card
        href="/materials"
        title="Materials"
        description="Radius and shadow-ring elevation with a baked-in hairline."
      >
        <MaterialsPreview />
      </Card>
    </div>
  );
}
