"use client"

/**
 * Demo-only: register organization marks used by the specimen.
 * Unregistered ids fall back to the name's initial.
 */
import { BrandMark, registerCompanyIcons } from "@boyernick/standard-ui-react"

const FoundryIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className={className}
  >
    <rect x="4" y="6" width="16" height="12" rx="2" />
  </svg>
)

registerCompanyIcons({
  "standard-ui": {
    icon: ({ className }) => (
      <BrandMark size={16} title="" className={className} />
    ),
    sizeClassName: "h-4 w-4",
  },
  foundry: { icon: FoundryIcon, sizeClassName: "h-3.5 w-3.5" },
})

/** Render once anywhere in the tree so the registrations ship with the client bundle. */
export const DemoCompanyIcons = () => null
