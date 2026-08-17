import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "Brand",
};

export default function BrandPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader
        title="Brand"
        description="Logos and brand guidelines will live here. This section is a stub for the next slice."
      />
      <div className="flex min-h-56 items-center justify-center rounded-2xl bg-background-tertiary">
        <p className="type-title-3 text-fg-primary">standardUI</p>
      </div>
    </div>
  );
}
