export function PageHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <header className="mb-10">
      <h1 className="type-title-1 text-fg-primary">{title}</h1>
      <p className="type-body mt-3 max-w-2xl text-fg-secondary">{description}</p>
    </header>
  );
}
