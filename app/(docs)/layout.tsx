import { Sidebar } from "@/components/sidebar"
import { ThemeProvider } from "@/components/theme-provider"
import { TopBar } from "@/components/top-bar"
import type { ReactNode } from "react"

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <div className="flex min-h-full">
        <div className="sticky top-0 hidden h-svh md:block">
          <Sidebar />
        </div>
        <div className="flex min-w-0 flex-1 flex-col">
          <TopBar />
          <main className="flex-1 px-4 py-10 md:px-10 lg:px-14">{children}</main>
        </div>
      </div>
    </ThemeProvider>
  )
}
