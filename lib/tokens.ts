export type ThemeValue = { light: string; dark: string };

export type TokenRow = {
  name: string;
  cssVar: string;
  usage: string;
  value: ThemeValue;
};

export type TokenGroup = {
  id: string;
  title: string;
  description: string;
  tokens: TokenRow[];
};

export const colorGroups: TokenGroup[] = [
  {
    id: "backgrounds",
    title: "Backgrounds",
    description:
      "Layered page surfaces. Darker steps add hierarchy: primary → secondary → tertiary → quaternary.",
    tokens: [
      {
        name: "background-primary",
        cssVar: "--background-primary",
        usage: "Default app background",
        value: { light: "#fdfdfc", dark: "#1c1917" },
      },
      {
        name: "background-secondary",
        cssVar: "--background-secondary",
        usage: "Alternate sections and hover",
        value: { light: "#fafaf9", dark: "#1a1614" },
      },
      {
        name: "background-tertiary",
        cssVar: "--background-tertiary",
        usage: "Stronger differentiation",
        value: { light: "#f5f5f4", dark: "#292524" },
      },
      {
        name: "background-quaternary",
        cssVar: "--background-quaternary",
        usage: "Strongest fill — use sparingly",
        value: { light: "#eeedec", dark: "#2e2b29" },
      },
      {
        name: "background-active",
        cssVar: "--background-active",
        usage: "Pressed / active fill",
        value: { light: "#e7e5e4", dark: "#0f0d0c" },
      },
    ],
  },
  {
    id: "surfaces",
    title: "Surfaces",
    description: "Elevated UI that sits above the page: cards, menus, popovers.",
    tokens: [
      {
        name: "surface",
        cssVar: "--surface",
        usage: "Popovers, menus, cards",
        value: { light: "#ffffff", dark: "#292524" },
      },
      {
        name: "surface-inverted",
        cssVar: "--surface-inverted",
        usage: "Tooltips and inverted blocks",
        value: { light: "#292524", dark: "#292524" },
      },
      {
        name: "surface-raised",
        cssVar: "--surface-raised",
        usage: "Raised chip / tab fill",
        value: { light: "#ffffff", dark: "#363332" },
      },
      {
        name: "elevated",
        cssVar: "--elevated",
        usage: "Hover overlay on dark fills",
        value: { light: "#1c19170d", dark: "#e3e6e80d" },
      },
    ],
  },
  {
    id: "text",
    title: "Text",
    description:
      "Primary for headings, secondary for body, tertiary for captions, quaternary for placeholders.",
    tokens: [
      {
        name: "text-primary",
        cssVar: "--text-primary",
        usage: "Headings and emphasis",
        value: { light: "#1c1917", dark: "#fafaf9" },
      },
      {
        name: "text-secondary",
        cssVar: "--text-secondary",
        usage: "Body and standard UI",
        value: { light: "#44403c", dark: "#d6d3d1" },
      },
      {
        name: "text-tertiary",
        cssVar: "--text-tertiary",
        usage: "Captions and labels",
        value: { light: "#78716c", dark: "#a8a29e" },
      },
      {
        name: "text-quaternary",
        cssVar: "--text-quaternary",
        usage: "Placeholders and disabled",
        value: { light: "#a8a29e", dark: "#57534e" },
      },
      {
        name: "text-primary-inverted",
        cssVar: "--text-primary-inverted",
        usage: "Text on inverted surfaces",
        value: { light: "#fafaf9", dark: "#fafaf9" },
      },
      {
        name: "text-secondary-inverted",
        cssVar: "--text-secondary-inverted",
        usage: "Secondary on inverted surfaces",
        value: { light: "#d6d3d1", dark: "#d6d3d1" },
      },
    ],
  },
  {
    id: "borders",
    title: "Borders",
    description:
      "Alpha borders blend with the surface. Use solid variants when transparency fails.",
    tokens: [
      {
        name: "border-primary",
        cssVar: "--border-primary",
        usage: "Default hairline",
        value: { light: "#0c0a091a", dark: "#f0ecea12" },
      },
      {
        name: "border-primary-solid",
        cssVar: "--border-primary-solid",
        usage: "Solid stand-in for primary",
        value: { light: "#e7e5e4", dark: "#393634" },
      },
      {
        name: "border-secondary",
        cssVar: "--border-secondary",
        usage: "Inputs and focus chrome",
        value: { light: "#0c0a0933", dark: "#f0ecea33" },
      },
      {
        name: "border-secondary-solid",
        cssVar: "--border-secondary-solid",
        usage: "Solid stand-in for secondary",
        value: { light: "#d6d3d1", dark: "#524f4d" },
      },
      {
        name: "border-inverted",
        cssVar: "--border-inverted",
        usage: "Edge on inverted surfaces",
        value: { light: "#f0ecea1a", dark: "#f0ecea1a" },
      },
    ],
  },
  {
    id: "brand",
    title: "Brand",
    description:
      "Primary actions and selected controls. Maps to grayscale — not hue accents. Do not use as large page fills.",
    tokens: [
      {
        name: "brand-primary",
        cssVar: "--brand-primary",
        usage: "Buttons, switches, checkboxes, key actions",
        value: { light: "#181818", dark: "#ededed" },
      },
      {
        name: "brand-primary-hover",
        cssVar: "--brand-primary-hover",
        usage: "Hover on brand",
        value: { light: "#303030", dark: "#afafaf" },
      },
      {
        name: "brand-primary-active",
        cssVar: "--brand-primary-active",
        usage: "Pressed brand",
        value: { light: "#414141", dark: "#8f8f8f" },
      },
      {
        name: "brand-secondary",
        cssVar: "--brand-secondary",
        usage: "Tinted brand fill (alpha)",
        value: { light: "#0d0d0d1a", dark: "#ffffff1a" },
      },
      {
        name: "brand-secondary-solid",
        cssVar: "--brand-secondary-solid",
        usage: "Solid brand tint",
        value: { light: "#ededed", dark: "#181818" },
      },
      {
        name: "brand-foreground",
        cssVar: "--brand-foreground",
        usage: "Text on brand fills",
        value: { light: "#ffffff", dark: "#0d0d0d" },
      },
    ],
  },
  {
    id: "decorative",
    title: "Decorative",
    description:
      "Hue accents for tags and illustrations. Green is success/decorative only — not primary actions.",
    tokens: [
      {
        name: "decorative-green",
        cssVar: "--decorative-green",
        usage: "Success / green accent",
        value: { light: "#00692a", dark: "#04b84c" },
      },
      {
        name: "decorative-blue",
        cssVar: "--decorative-blue",
        usage: "Informational accent",
        value: { light: "#1c6182", dark: "#3f8aad" },
      },
      {
        name: "decorative-olive",
        cssVar: "--decorative-olive",
        usage: "Earthy complement",
        value: { light: "#60563e", dark: "#8a7d5c" },
      },
      {
        name: "decorative-crimson",
        cssVar: "--decorative-crimson",
        usage: "Decorative red — not destructive",
        value: { light: "#792a2a", dark: "#b04848" },
      },
    ],
  },
  {
    id: "feedback",
    title: "Notifications",
    description: "System feedback only.",
    tokens: [
      {
        name: "destructive",
        cssVar: "--destructive",
        usage: "Errors and destructive actions",
        value: { light: "#dc2626", dark: "#cf212d" },
      },
      {
        name: "warning",
        cssVar: "--warning",
        usage: "Caution",
        value: { light: "#f59e0b", dark: "#f59e0b" },
      },
      {
        name: "ring",
        cssVar: "--ring",
        usage: "Focus ring",
        value: { light: "#0d8f6533", dark: "#0d8f6533" },
      },
    ],
  },
];

export const chartTokens = [
  { name: "chart-1", cssVar: "--chart-1", channels: "27 140 108", label: "Green" },
  { name: "chart-2", cssVar: "--chart-2", channels: "83 167 210", label: "Blue" },
  { name: "chart-3", cssVar: "--chart-3", channels: "253 161 100", label: "Orange" },
  { name: "chart-4", cssVar: "--chart-4", channels: "60 102 126", label: "Dark teal" },
  { name: "chart-5", cssVar: "--chart-5", channels: "158 120 143", label: "Mauve" },
] as const;

export const radii = [
  { name: "2xs", value: "0.125rem", px: "2px", usage: "Tight chips and dense UI." },
  { name: "xs", value: "0.25rem", px: "4px", usage: "Badges and compact controls." },
  { name: "sm", value: "0.375rem", px: "6px", usage: "Small controls and inputs." },
  { name: "md", value: "0.5rem", px: "8px", usage: "Buttons, inputs, and checkboxes." },
  { name: "lg", value: "0.625rem", px: "10px", usage: "Larger controls and tiles." },
  { name: "xl", value: "0.75rem", px: "12px", usage: "Cards, menus, and popovers." },
  { name: "2xl", value: "1rem", px: "16px", usage: "Elevated panels and sheets." },
  { name: "3xl", value: "1.25rem", px: "20px", usage: "Feature cards and heroes." },
  { name: "4xl", value: "1.5rem", px: "24px", usage: "Composer and large shells." },
  { name: "full", value: "9999px", px: "full", usage: "Pills, avatars, and switches." },
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

export function cssVar(name: string) {
  return `var(${name.startsWith("--") ? name : `--${name}`})`
}
