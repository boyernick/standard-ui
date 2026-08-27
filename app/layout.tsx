import type { Metadata } from "next"
import Script from "next/script"
import "./globals.css"

export const metadata: Metadata = {
  // Absolute base for og:image. Without it the file-convention image resolves
  // against VERCEL_PROJECT_PRODUCTION_URL, which is the vercel.app host.
  metadataBase: new URL("https://ui.nickboyer.com"),
  title: {
    default: "StandardUI",
    template: "%s · StandardUI",
  },
  description: "Tokens and components for building consistent interfaces",
  icons: {
    icon: [{ url: "/favicon.svg?v=8", type: "image/svg+xml" }],
    apple: [{ url: "/favicon.svg?v=8", type: "image/svg+xml" }],
  },
  // No title or description here on purpose. Pages do not declare their own
  // `openGraph`, so a title set here would be inherited verbatim and every
  // page would unfurl as "StandardUI". Left absent, Next fills og:title and
  // og:description from the resolved page metadata, which already carries the
  // "%s · StandardUI" template above.
  openGraph: {
    siteName: "StandardUI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
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
