import { Sidebar } from "@/components/sidebar"
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
          <div className="sticky top-0 z-40">
            <TopBar />
          </div>
          <main
            id="main-content"
            tabIndex={-1}
            className="flex flex-1 outline-none"
          >
            {children}
          </main>
        </div>
      </div>
    </ThemeProvider>
  )
}
