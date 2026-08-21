
export const radii = [
  { name: "2xs", className: "rounded-2xs", value: "0.125rem", px: "2px", usage: "Tight chips and dense UI." },
  { name: "xs", className: "rounded-xs", value: "0.25rem", px: "4px", usage: "Badges and compact controls." },
  { name: "sm", className: "rounded-sm", value: "0.375rem", px: "6px", usage: "Small controls and inputs." },
  { name: "md", className: "rounded-md", value: "0.5rem", px: "8px", usage: "Buttons, inputs, and checkboxes." },
  { name: "lg", className: "rounded-lg", value: "0.625rem", px: "10px", usage: "Larger controls and tiles." },
  { name: "xl", className: "rounded-xl", value: "0.75rem", px: "12px", usage: "Cards, menus, and popovers." },
  { name: "2xl", className: "rounded-2xl", value: "1rem", px: "16px", usage: "Elevated panels and sheets." },
  { name: "3xl", className: "rounded-3xl", value: "1.25rem", px: "20px", usage: "Feature cards and heroes." },
  { name: "4xl", className: "rounded-4xl", value: "1.5rem", px: "24px", usage: "Composer and large shells." },
  { name: "full", className: "rounded-full", value: "9999px", px: "full", usage: "Pills, avatars, and switches." },
] as const

export const shadows = [
  {
    name: "hairline",
    label: "Hairline",
    className: "shadow-hairline",
    level: "edge",
    usage: "1px theme-aware edge without a separate border",
  },
  {
    name: "sm",
    label: "Small",
    className: "shadow-sm",
    level: "100",
    usage: "Subtle lift — chips, thumbs, tight cards",
  },
  {
    name: "md",
    label: "Medium",
    className: "shadow-md",
    level: "200",
    usage: "Popovers, tooltips, small floating panels",
  },
  {
    name: "lg",
    label: "Large",
    className: "shadow-lg",
    level: "300",
    usage: "Cards, menus, and elevated surfaces",
  },
  {
    name: "xl",
    label: "Extra large",
    className: "shadow-xl",
    level: "400",
    usage: "Modals, dialogs, and high-focus overlays",
  },
] as const

