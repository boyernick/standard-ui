/** Semantic color tokens, grouped by what they are for.
 *
 * Names mirror the `@theme` block in packages/tokens/css/tokens.css, so every
 * `<prefix>-<name>` on this page is a class you can actually type. Primitive
 * scales are deliberately absent: they feed these tokens and are not a public
 * palette. */

export type ColorPrefix = "bg" | "text" | "border" | "ring"

export type ColorToken = {
  name: string
  /** Overrides the group prefix where the token is used differently. */
  prefix?: ColorPrefix
  /** Underlying variable. `@theme inline` means --color-* is not emitted. */
  cssVar: string
  usage: string
}

export type ColorGroup = {
  id: string
  title: string
  description: string
  /** Utility prefix that makes `name` a real class. */
  prefix: ColorPrefix
  tokens: ColorToken[]
}

export const semanticColorGroups: ColorGroup[] = [
  {
    id: "backgrounds",
    title: "Backgrounds",
    description:
      "Layered page surfaces.",
    prefix: "bg",
    tokens: [
      { name: "background-primary", cssVar: "--background-primary", usage: "Default app background" },
      { name: "background-secondary", cssVar: "--background-secondary", usage: "Alternate sections and hover" },
      { name: "background-tertiary", cssVar: "--background-tertiary", usage: "Stronger differentiation" },
      {
        name: "background-quaternary", cssVar: "--background-quaternary",
        usage: "Strongest fill — use sparingly",
      },
      { name: "background-active", cssVar: "--background-active", usage: "Pressed and active fill" },
    ],
  },
  {
    id: "surfaces",
    title: "Surfaces",
    description: "Elevated UI that sits above the page: cards, menus, popovers.",
    prefix: "bg",
    tokens: [
      { name: "surface", cssVar: "--surface", usage: "Popovers, menus, cards" },
      { name: "surface-inverted", cssVar: "--surface-inverted", usage: "Tooltips and inverted blocks" },
      { name: "surface-raised", cssVar: "--surface-raised", usage: "Raised chip and tab fill" },
      { name: "elevated", cssVar: "--elevated", usage: "Hover overlay on dark fills" },
      { name: "elevated-active", cssVar: "--elevated-active", usage: "Pressed overlay on dark fills" },
    ],
  },
  {
    id: "text",
    title: "Text",
    description:
      "Foreground steps for hierarchy.",
    prefix: "text",
    tokens: [
      { name: "fg-primary", cssVar: "--text-primary", usage: "Headings and emphasis" },
      { name: "fg-secondary", cssVar: "--text-secondary", usage: "Body and standard UI" },
      { name: "fg-tertiary", cssVar: "--text-tertiary", usage: "Captions and labels" },
      { name: "fg-quaternary", cssVar: "--text-quaternary", usage: "Placeholders and disabled" },
      { name: "fg-inverted", cssVar: "--text-primary-inverted", usage: "Text on inverted surfaces" },
      {
        name: "fg-inverted-secondary", cssVar: "--text-secondary-inverted",
        usage: "Secondary text on inverted surfaces",
      },
    ],
  },
  {
    id: "borders",
    title: "Borders",
    description:
      "Hairlines and edges.",
    prefix: "border",
    tokens: [
      { name: "border-faint", cssVar: "--border-faint", usage: "Quiet edge on raised surfaces" },
      { name: "border-primary", cssVar: "--border-primary", usage: "Default hairline" },
      { name: "border-primary-solid", cssVar: "--border-primary-solid", usage: "Solid stand-in for primary" },
      { name: "border-secondary", cssVar: "--border-secondary", usage: "Inputs and focus chrome" },
      { name: "border-secondary-solid", cssVar: "--border-secondary-solid", usage: "Solid stand-in for secondary" },
      { name: "border-inverted", cssVar: "--border-inverted", usage: "Edge on inverted surfaces" },
    ],
  },
  {
    id: "brand",
    title: "Brand",
    description:
      "Primary actions and selected states.",
    prefix: "bg",
    tokens: [
      {
        name: "brand-primary", cssVar: "--brand-primary",
        usage: "Buttons, switches, key actions",
      },
      { name: "brand-primary-hover", cssVar: "--brand-primary-hover", usage: "Hover on brand" },
      { name: "brand-primary-active", cssVar: "--brand-primary-active", usage: "Pressed brand" },
      {
        name: "brand-primary-border",
        prefix: "border",
        cssVar: "--brand-primary-border",
        usage: "Edge on brand fills",
      },
      { name: "brand-secondary", cssVar: "--brand-secondary", usage: "Tinted brand fill" },
      { name: "brand-secondary-solid", cssVar: "--brand-secondary-solid", usage: "Solid brand tint" },
      { name: "brand-foreground", cssVar: "--brand-foreground", usage: "Text and icons on brand fills" },
      { name: "brand-inverted", cssVar: "--brand-inverted", usage: "Brand on inverted surfaces" },
    ],
  },
  {
    id: "decorative",
    title: "Decorative",
    description:
      "Named hues for text, strokes, and marks. They flip with the theme so\n      each stays legible; the chart slots hold the value that does not.",
    prefix: "bg",
    tokens: [
      { name: "decorative-green", cssVar: "--decorative-green", usage: "Green accent" },
      { name: "decorative-blue", cssVar: "--decorative-blue", usage: "Informational accent" },
      { name: "decorative-olive", cssVar: "--decorative-olive", usage: "Earthy complement" },
      { name: "decorative-orange", cssVar: "--decorative-orange", usage: "Orange accent" },
      { name: "decorative-purple", cssVar: "--decorative-purple", usage: "Purple accent" },
      { name: "decorative-pink", cssVar: "--decorative-pink", usage: "Pink accent" },
      { name: "decorative-crimson", cssVar: "--decorative-crimson", usage: "Decorative red — not destructive" },
    ],
  },
  {
    id: "status",
    title: "Status",
    description:
      "Semantic feedback pairs. Use the foreground and background from the same status.",
    prefix: "text",
    tokens: [
      { name: "status-info", cssVar: "--status-info", usage: "Informational text and icons" },
      {
        name: "status-info-background",
        prefix: "bg",
        cssVar: "--status-info-background",
        usage: "Soft informational fill",
      },
      { name: "status-success", cssVar: "--status-success", usage: "Successful and healthy states" },
      {
        name: "status-success-background",
        prefix: "bg",
        cssVar: "--status-success-background",
        usage: "Soft success fill",
      },
      { name: "status-warning", cssVar: "--status-warning", usage: "Caution and approaching limits" },
      {
        name: "status-warning-background",
        prefix: "bg",
        cssVar: "--status-warning-background",
        usage: "Soft warning fill",
      },
      { name: "status-critical", cssVar: "--status-critical", usage: "Failed and critical states" },
      {
        name: "status-critical-background",
        prefix: "bg",
        cssVar: "--status-critical-background",
        usage: "Soft critical fill",
      },
    ],
  },
  {
    id: "notifications",
    title: "Notifications",
    description: "Strong action colors and focus.",
    prefix: "bg",
    tokens: [
      { name: "destructive", cssVar: "--destructive", usage: "Destructive actions" },
      { name: "destructive-hover", cssVar: "--destructive-hover", usage: "Hovered destructive" },
      { name: "destructive-active", cssVar: "--destructive-active", usage: "Pressed destructive" },
      {
        name: "destructive-border",
        cssVar: "--destructive-border",
        usage: "Edge of a destructive fill",
      },
      {
        name: "destructive-foreground",
        cssVar: "--destructive-foreground",
        usage: "Text and icons on destructive fills",
      },
      { name: "warning", cssVar: "--warning", usage: "Strong warning fill" },
      { name: "ring", prefix: "ring", cssVar: "--ring", usage: "Focus ring" },
    ],
  },
]
