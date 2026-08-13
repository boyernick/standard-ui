export function PageHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <header className="mb-10">
      <h1 className="font-serif text-display text-fg">{title}</h1>
      <p className="mt-3 max-w-2xl text-body text-muted">{description}</p>
    </header>
  );
}
