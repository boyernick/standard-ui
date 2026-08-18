import type { Metadata } from "next"
import { ThemeScript } from "@/components/theme-script"
import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: "Standard UI",
    template: "%s · Standard UI",
  },
  description:
    "The visual foundations and shared language.",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full antialiased">
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-full bg-background-primary font-sans text-fg-primary">
        {children}
      </body>
    </html>
  )
}
