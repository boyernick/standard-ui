import {
  centralIcons,
  type CentralIconName,
} from "@central-icons-react/round-outlined-radius-2-stroke-2/icons"

/** Rogo frequently-used set + Standard UI gallery defaults — shown first. */
const CURATED_ICON_NAMES = [
  "IconHome",
  "IconMagnifyingGlass",
  "IconSettingsGear1",
  "IconBell",
  "IconPeople",
  "IconSun",
  "IconMoon",
  "IconPlusMedium",
  "IconMinusMedium",
  "IconX",
  "IconCheckmark1",
  "IconChevronBottom",
  "IconClipboard",
  "IconChainLink1",
  "IconBubble2",
  "IconTable",
  "IconChart1",
  "IconCalendarClock",
  "IconZap",
  "IconFolder1",
  "IconSparklesSoft",
  "IconArrowInbox",
  "IconSquareBehindSquare1",
  "IconShareOs",
  "IconPlusSmall",
  "IconPencil",
  "IconTrashCan",
  "IconCrossMedium",
  "IconEditBig",
  "IconFilter2",
  "IconArrowBottomTop",
  "IconArrowLeft",
  "IconArrowRight",
  "IconChevronDownSmall",
  "IconChevronRightSmall",
  "IconSquareArrowTopRight",
  "IconDotGrid1x3Horizontal",
  "IconCircleCheck",
  "IconExclamationCircle",
  "IconExclamationTriangle",
  "IconCircleInfo",
  "IconLoadingCircle",
  "IconArrowOutOfBox",
  "IconCalendar1",
  "IconFileBend",
  "IconChevronRight",
  "IconFormCircle",
  "IconCircleHalfFill",
] as const satisfies readonly CentralIconName[]

export type GalleryIcon = {
  name: CentralIconName
  displayName: string
  title: string
  category: string
  svg: string
  searchText: string
}

export const stripIconPrefix = (name: string) =>
  name.startsWith("Icon") ? name.slice(4) : name

const buildGalleryIcon = (name: CentralIconName): GalleryIcon => {
  const entry = centralIcons[name]
  const displayName = stripIconPrefix(name)
  // `title` from the registry includes alias keywords (same as icons-index iconAliases)
  const searchText = [name, displayName, entry.title, entry.category]
    .join(" ")
    .toLowerCase()

  return {
    name,
    displayName,
    title: entry.title,
    category: entry.category,
    svg: entry.svg,
    searchText,
  }
}

const curatedRank = new Map<string, number>(
  CURATED_ICON_NAMES.map((name, index) => [name, index]),
)

const compareGalleryIcons = (a: GalleryIcon, b: GalleryIcon) => {
  const aRank = curatedRank.get(a.name)
  const bRank = curatedRank.get(b.name)
  const aCurated = aRank !== undefined
  const bCurated = bRank !== undefined

  if (aCurated && bCurated) return aRank - bRank
  if (aCurated) return -1
  if (bCurated) return 1
  return a.displayName.localeCompare(b.displayName)
}

export const galleryIcons: GalleryIcon[] = (
  Object.keys(centralIcons) as CentralIconName[]
)
  .map(buildGalleryIcon)
  .sort(compareGalleryIcons)

export const galleryCategories = [
  ...new Set(galleryIcons.map((icon) => icon.category)),
].sort((a, b) => a.localeCompare(b))

export const ALL_ICONS_CATEGORY = "All"

export const filterGalleryIcons = (
  icons: GalleryIcon[],
  query: string,
  category: string = ALL_ICONS_CATEGORY,
): GalleryIcon[] => {
  const normalized = query.trim().toLowerCase()
  return icons.filter((icon) => {
    if (category !== ALL_ICONS_CATEGORY && icon.category !== category) {
      return false
    }
    if (!normalized) return true
    return icon.searchText.includes(normalized)
  })
}

export const GALLERY_PAGE_SIZE = 80
