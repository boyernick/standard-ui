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
    description: "Primary actions and links. Do not use as large page fills.",
    tokens: [
      {
        name: "brand-primary",
        cssVar: "--brand-primary",
        usage: "Buttons, links, key actions",
        value: { light: "#135b44", dark: "#1d7559" },
      },
      {
        name: "brand-primary-hover",
        cssVar: "--brand-primary-hover",
        usage: "Hover on brand",
        value: { light: "#1d7559", dark: "#1b6c52" },
      },
      {
        name: "brand-primary-active",
        cssVar: "--brand-primary-active",
        usage: "Pressed brand",
        value: { light: "#0c402f", dark: "#155641" },
      },
      {
        name: "brand-secondary",
        cssVar: "--brand-secondary",
        usage: "Tinted brand fill (alpha)",
        value: { light: "#0d8f6533", dark: "#0d8f6533" },
      },
      {
        name: "brand-secondary-solid",
        cssVar: "--brand-secondary-solid",
        usage: "Solid brand tint",
        value: { light: "#cfe9e0", dark: "#193127" },
      },
      {
        name: "brand-foreground",
        cssVar: "--brand-foreground",
        usage: "Text on brand fills",
        value: { light: "#f5f5f4", dark: "#f5f5f4" },
      },
    ],
  },
  {
    id: "decorative",
    title: "Decorative",
    description: "Non-brand accents for tags and illustrations. Not for primary actions.",
    tokens: [
      {
        name: "decorative-green",
        cssVar: "--decorative-green",
        usage: "Teal accent",
        value: { light: "#1b7463", dark: "#2a9583" },
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

export const radii = {
  sm: "0.25rem",
  md: "0.375rem",
  lg: "0.5rem",
  xl: "0.75rem",
  "2xl": "1rem",
  full: "9999px",
} as const;

export const shadows = [
  { name: "ring-xs", usage: "Panel shells, list cards, pills" },
  { name: "ring-sm", usage: "Popovers, small floating panels" },
  { name: "ring-md", usage: "Dropdowns, menus, selects" },
  { name: "ring-lg", usage: "Command palettes, menubars" },
  { name: "ring-xl", usage: "Modals and dialogs" },
  { name: "ring-2xl", usage: "Critical alerts — rare" },
] as const;

export const typeScale = [
  {
    token: "type-title-1",
    family: "Display",
    size: "36px",
    lineHeight: "2.5rem",
    weight: "400",
    sample: "Introduction",
    className: "type-title-1",
  },
  {
    token: "type-title-2",
    family: "Display",
    size: "30px",
    lineHeight: "2.25rem",
    weight: "400",
    sample: "Visual foundations",
    className: "type-title-2",
  },
  {
    token: "type-title-3",
    family: "Display",
    size: "24px",
    lineHeight: "1.75rem",
    weight: "400",
    sample: "Shared language",
    className: "type-title-3",
  },
  {
    token: "type-title-4",
    family: "Display",
    size: "20px",
    lineHeight: "1.5rem",
    weight: "400",
    sample: "Card title",
    className: "type-title-4",
  },
  {
    token: "type-title-5",
    family: "Body",
    size: "18px",
    lineHeight: "1.25rem",
    weight: "500",
    sample: "Section title",
    className: "type-title-5",
  },
  {
    token: "type-body",
    family: "Body",
    size: "16px",
    lineHeight: "1.5rem",
    weight: "400",
    sample: "The visual foundations and shared language behind Standard UI.",
    className: "type-body",
  },
  {
    token: "type-body-strong",
    family: "Body",
    size: "16px",
    lineHeight: "1.5rem",
    weight: "500",
    sample: "Emphasized body and labels",
    className: "type-body-strong",
  },
  {
    token: "type-small",
    family: "Body",
    size: "14px",
    lineHeight: "1.25rem",
    weight: "400",
    sample: "Captions, helper text, metadata",
    className: "type-small",
  },
  {
    token: "type-small-strong",
    family: "Body",
    size: "14px",
    lineHeight: "1.25rem",
    weight: "500",
    sample: "Button labels and table headers",
    className: "type-small-strong",
  },
  {
    token: "type-tiny",
    family: "Body",
    size: "12px",
    lineHeight: "1rem",
    weight: "400",
    sample: "Footnotes, timestamps, badges",
    className: "type-tiny",
  },
  {
    token: "type-tiny-strong",
    family: "Body",
    size: "12px",
    lineHeight: "1rem",
    weight: "500",
    sample: "Status indicators",
    className: "type-tiny-strong",
  },
] as const;

export function cssVar(name: string) {
  return `var(${name.startsWith("--") ? name : `--${name}`})`;
}
