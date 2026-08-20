/**
 * Descriptions the type extractor cannot know.
 *
 * Almost every prop's description comes out of the compiler — Base UI ships
 * JSDoc in its .d.ts, and our own props carry doc comments. The exception is
 * cva variant props: `VariantProps<typeof buttonVariants>` maps over an object
 * literal, so `variant` and `size` have no declaration site to attach a comment
 * to. Those live here.
 *
 * Seeded from the prose in the hand-written tables this replaced, so no
 * authored content was lost in the migration.
 *
 * Keys are "Part.prop" for a specific prop, or "Part" for a part-level summary
 * used by PartsTable.
 */
const OVERRIDES: Record<string, string> = {
  // Button
  "Button.variant":
    "Visual emphasis. Use primary for the single main action on a surface and lower-emphasis variants for everything else.",
  "Button.size": "Control height. md is the default for most buttons.",

  // Badge
  "Badge.variant": "Tone of the badge, matching the status it reports.",
  "Badge.size": "Control height.",

  // Input
  "Input.variant": "Visual treatment of the field.",
  "Input.size": "Control height.",

  // Textarea
  "Textarea.variant": "Visual treatment of the field.",
  "Textarea.size": "Control height.",

  // Avatar
  "Avatar.size": "Diameter of the avatar.",
  "Avatar.variant": "Shape of the avatar.",

  // Spinner
  "Spinner.size": "Diameter of the spinner.",

  // Skeleton
  "Skeleton.variant": "Shape of the placeholder.",

  // Orb
  "Orb.variant": "Visual treatment of the orb.",
  "Orb.size": "Diameter of the orb.",
}

/**
 * Description for a prop, or a part-level summary when prop is null.
 * Returns an empty string when nothing is registered, so callers can fall back.
 */
export const descriptionFor = (part: string, prop: string | null) =>
  OVERRIDES[prop ? `${part}.${prop}` : part] ?? ""
