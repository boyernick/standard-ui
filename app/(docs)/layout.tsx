import { Sidebar } from "@/components/sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { TopBar } from "@/components/top-bar";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <div className="flex min-h-full">
        <div className="sticky top-0 hidden h-svh md:block">
          <Sidebar />
        </div>
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex h-12 items-center border-b border-line bg-surface px-4 md:hidden">
            <span className="text-heading-sm font-semibold tracking-tight">
              standardUI
            </span>
          </div>
          <TopBar />
          <main className="flex-1 px-4 py-10 md:px-10 lg:px-14">{children}</main>
        </div>
      </div>
    </ThemeProvider>
  );
}
