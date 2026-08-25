import type { Metadata } from "next"
import Script from "next/script"
import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: "StandardUI",
    template: "%s · StandardUI",
  },
  description:
    "The visual foundations and shared language.",
  icons: {
    icon: [{ url: "/favicon.svg?v=8", type: "image/svg+xml" }],
    apple: [{ url: "/favicon.svg?v=8", type: "image/svg+xml" }],
  },
  openGraph: {
    title: "StandardUI",
    description: "The visual foundations and shared language.",
    siteName: "StandardUI",
    type: "website",
  },
}

const themeInitScript = `(function(){try{var t=localStorage.getItem("standard-ui-theme");var d=t==="dark"||(t!=="light"&&window.matchMedia("(prefers-color-scheme: dark)").matches);var h=document.documentElement;h.classList.toggle("dark",d);h.style.colorScheme=d?"dark":"light";}catch(e){}})();`

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full antialiased">
      <body className="min-h-full bg-background-primary font-sans text-fg-primary">
        <Script id="standard-ui-theme" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
        {children}
      </body>
    </html>
  )
}
