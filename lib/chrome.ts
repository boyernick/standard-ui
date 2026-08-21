/** Height of the app chrome bar — the sidebar header and the top bar.
 *
 * Both bars must render at exactly this height with their bottom border
 * *outside* the box, so the two borders land on the same pixel and read as one
 * continuous line across the viewport. Put the border on a wrapper, not on the
 * element carrying this class: `border-box` sizing would otherwise absorb the
 * border into the height and leave the two bars 1px apart.
 */
export const CHROME_BAR_HEIGHT = "h-14"

/** Horizontal padding shared by every block on a page, the top bar included.
 *
 * Borders and rules go on a full-width parent; this goes on the child that
 * holds the content, so rules run the full width of the main area while every
 * block inside them starts on the same left edge. No max-width: capping the
 * measure centres the content and leaves blocks inset by differing amounts.
 */
export const PAGE_INNER =
  "px-4 md:px-10 lg:px-14 xl:px-24 2xl:px-40 3xl:px-56"
