import type { Metadata } from "next"
import { ThemeScript } from "@/components/theme-script"
import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: "StandardUI",
    template: "%s · StandardUI",
  },
  description:
    "The visual foundations and shared language.",
  icons: {
    icon: [{ url: "/favicon.svg?v=7", type: "image/svg+xml" }],
    apple: [{ url: "/favicon.svg?v=7", type: "image/svg+xml" }],
  },
  openGraph: {
    title: "StandardUI",
    description: "The visual foundations and shared language.",
    siteName: "StandardUI",
    type: "website",
  },
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
