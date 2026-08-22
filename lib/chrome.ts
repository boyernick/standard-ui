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

/** One side of `PAGE_INNER`, for blocks that run edge to edge but still have
 *  to line their content up with everything else on the page.
 *
 * A full-bleed grid cannot use `PAGE_INNER` on a wrapper — that would pull the
 * rules in off the viewport edge. The padding moves onto the cells instead:
 * the outer edge of each end cell tracks the page measure, while the inner
 * edge gets a fixed gutter either side of the divider.
 */
export const PAGE_INNER_LEFT =
  "pl-4 md:pl-10 lg:pl-14 xl:pl-24 2xl:pl-40 3xl:pl-56"

export const PAGE_INNER_RIGHT =
  "pr-4 md:pr-10 lg:pr-14 xl:pr-24 2xl:pr-40 3xl:pr-56"
