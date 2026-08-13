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
      <div className="flex min-h-56 items-center justify-center rounded-xl bg-subtle">
        <p className="font-serif text-heading-lg text-fg">standardUI</p>
      </div>
    </div>
  );
}
