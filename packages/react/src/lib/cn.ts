import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

/**
 * StandardUI defines typography composites as custom `@utility` rules
 * (`text-sm-strong`, `text-md`, …). Tailwind Merge cannot know those are font
 * sizes, so it files them under text *color* — and then drops them whenever a
 * real color follows, as in `cn("text-sm-strong", "text-fg-primary")`. Grouping
 * them with font sizes keeps them conflicting with each other and with
 * `text-sm`, while leaving colors alone.
 *
 * `shadow-hairline` has the same problem in the shadow group. Custom font sizes
 * (`text-2xs`) and radii (`rounded-2xs`, `rounded-4xl`) already resolve
 * correctly and need no help.
 *
 * Keep this in step with the `@utility` rules in
 * @boyernick/standard-ui-tokens/css/tokens.css.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "2xs-strong",
            "xs-strong",
            "sm-strong",
            "md",
            "md-strong",
            "lg-strong",
          ],
        },
      ],
      shadow: [{ shadow: ["hairline"] }],
    },
  },
})

/**
 * Combines class names and resolves Tailwind conflicts so the last value wins.
 * Without the merge step a caller's `className` cannot override a built-in
 * utility: both classes land in the DOM and the winner is whichever rule sits
 * later in the stylesheet, which the caller does not control.
 */
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))
