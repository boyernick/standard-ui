import { DocPagination } from "@/components/doc-pagination"
import { Sidebar } from "@/components/sidebar"
import { TableOfContents } from "@/components/toc"
import { ThemeProvider } from "@/components/theme-provider"
import { TopBar } from "@/components/top-bar"
import type { ReactNode } from "react"

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <a
        href="#main-content"
        className="sr-only fixed top-3 left-3 z-[200] cursor-pointer rounded-md border border-border-primary bg-surface px-3 py-2 text-sm text-fg-primary shadow-md outline-none focus:not-sr-only focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-offset-1 focus-visible:ring-offset-background-primary focus-visible:ring-ring/20"
      >
        Skip to content
      </a>
      <div className="flex min-h-full">
        <div className="sticky top-0 hidden h-svh md:block">
          <Sidebar />
        </div>
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="sticky top-0 z-40 md:hidden">
            <TopBar />
          </div>
          <main
            id="main-content"
            tabIndex={-1}
            className="flex-1 px-4 py-10 outline-none md:px-10 lg:px-14"
          >
            <div className="mx-auto flex w-full max-w-5xl gap-12">
              <div className="min-w-0 flex-1">
                {children}
                <DocPagination />
              </div>
              {/* The rail only appears where there is room for it beside the
                  content column; below xl the TOC would squeeze the prose. */}
              <div className="hidden xl:block">
                <div className="sticky top-10">
                  <TableOfContents />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </ThemeProvider>
  )
}
