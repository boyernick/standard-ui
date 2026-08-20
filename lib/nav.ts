export const foundations = [
  { href: "/", label: "Introduction" },
  { href: "/installation", label: "Installation" },
  { href: "/theming", label: "Theming" },
  { href: "/accessibility", label: "Accessibility" },
  { href: "/brand", label: "Brand" },
  { href: "/colors", label: "Colors" },
  { href: "/typography", label: "Typography" },
  { href: "/structure", label: "Structure" },
  { href: "/materials", label: "Materials" },
  { href: "/motion", label: "Motion" },
  { href: "/icons", label: "Icons" },
  { href: "/illustrations", label: "Illustrations" },
] as const;

export const components = [
  { href: "/components/accordion", label: "Accordion" },
  { href: "/components/alert-dialog", label: "Alert dialog" },
  { href: "/components/autocomplete", label: "Autocomplete" },
  { href: "/components/avatar", label: "Avatar" },
  { href: "/components/badge", label: "Badge" },
  { href: "/components/breadcrumb", label: "Breadcrumb" },
  { href: "/components/button", label: "Button" },
  { href: "/components/calendar", label: "Calendar" },
  { href: "/components/card", label: "Card" },
  { href: "/components/carousel", label: "Carousel" },
  { href: "/components/chart", label: "Chart" },
  { href: "/components/checkbox", label: "Checkbox" },
  { href: "/components/checkbox-group", label: "Checkbox group" },
  { href: "/components/code-block", label: "Code block" },
  { href: "/components/collapsible", label: "Collapsible" },
  { href: "/components/combobox", label: "Combobox" },
  { href: "/components/command", label: "Command" },
  { href: "/components/context-menu", label: "Context menu" },
  { href: "/components/dialog", label: "Dialog" },
  { href: "/components/drawer", label: "Drawer" },
  { href: "/components/empty", label: "Empty" },
  { href: "/components/field", label: "Field" },
  { href: "/components/fieldset", label: "Fieldset" },
  { href: "/components/file-attachment", label: "File attachment" },
  { href: "/components/form", label: "Form" },
  { href: "/components/image-modal", label: "Image modal" },
  { href: "/components/input", label: "Input" },
  { href: "/components/markdown-editor", label: "Markdown editor" },
  { href: "/components/menu", label: "Menu" },
  { href: "/components/menubar", label: "Menubar" },
  { href: "/components/meter", label: "Meter" },
  { href: "/components/navigation-menu", label: "Navigation menu" },
  { href: "/components/number-field", label: "Number field" },
  { href: "/components/orb", label: "Orb" },
  { href: "/components/otp-field", label: "OTP field" },
  { href: "/components/pagination", label: "Pagination" },
  { href: "/components/popover", label: "Popover" },
  { href: "/components/preview-card", label: "Preview card" },
  { href: "/components/progress", label: "Progress" },
  { href: "/components/radio-group", label: "Radio group" },
  { href: "/components/scroll-area", label: "Scroll area" },
  { href: "/components/select", label: "Select" },
  { href: "/components/separator", label: "Separator" },
  { href: "/components/sidebar", label: "Sidebar" },
  { href: "/components/skeleton", label: "Skeleton" },
  { href: "/components/slider", label: "Slider" },
  { href: "/components/sounds", label: "Sounds" },
  { href: "/components/spinner", label: "Spinner" },
  { href: "/components/switch", label: "Switch" },
  { href: "/components/table", label: "Table" },
  { href: "/components/tabs", label: "Tabs" },
  { href: "/components/textarea", label: "Textarea" },
  { href: "/components/text-animate", label: "Text animate" },
  { href: "/components/ticker", label: "Ticker" },
  { href: "/components/toast", label: "Toast" },
  { href: "/components/toggle", label: "Toggle" },
  { href: "/components/toolbar", label: "Toolbar" },
  { href: "/components/tooltip", label: "Tooltip" },
  { href: "/components/video-player", label: "Video player" },
] as const;

export const upcomingComponents = [] as const;

/**
 * Ordered reading order across the whole site, used for prev/next. Derived from
 * the arrays above so it cannot drift out of sync with the sidebar.
 */
export const allPages = [...foundations, ...components] as const;

export type NavItem = { href: string; label: string };

/** Previous/next page in reading order, or null at either end. */
export const getAdjacentPages = (pathname: string) => {
  const index = allPages.findIndex((item) => item.href === pathname);
  if (index === -1) return { previous: null, next: null };
  return {
    previous: (allPages[index - 1] ?? null) as NavItem | null,
    next: (allPages[index + 1] ?? null) as NavItem | null,
  };
};

/** Section label a route belongs to, for the search palette's filters. */
export const getSectionForHref = (href: string) =>
  href.startsWith("/components/") ? "Components" : "Foundations";
