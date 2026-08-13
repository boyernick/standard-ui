import { IntroCards } from "@/components/intro-cards";
import { PageHeader } from "@/components/page-header";

export default function IntroductionPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader
        title="Introduction"
        description="The visual foundations and shared language behind Standard UI."
      />
      <IntroCards />
    </div>
  );
}
