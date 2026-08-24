"use client"

import { cva, type VariantProps } from "class-variance-authority"
import {
  type ComponentProps,
  type KeyboardEvent,
  type MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"
import { cn } from "./lib/cn"
import {
  Tooltip,
  TooltipPopup,
  TooltipPortal,
  TooltipPositioner,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip"

const minimapVariants = cva("z-20 w-8", {
  variants: {
    position: {
      fixed:
        "fixed left-10 top-1/2 max-h-[min(70vh,32.5rem)] -translate-y-1/2 max-[1120px]:hidden",
      inline: "relative",
    },
  },
  defaultVariants: {
    position: "fixed",
  },
})

export type MinimapSection = {
  /** The id of the section heading or landmark to scroll to. */
  id: string
  /** The accessible name and tooltip shown for the section. */
  label: string
}

export type MinimapProps = Omit<ComponentProps<"nav">, "children"> &
  VariantProps<typeof minimapVariants> & {
    /** Ordered destinations represented by the ticks. */
    sections: readonly MinimapSection[]
    /** Controlled active section id. */
    activeId?: string | null
    /** Initial active section id when uncontrolled. */
    defaultActiveId?: string | null
    /** Called when observation or selection changes the active section. */
    onActiveChange?: (id: string) => void
    /** Optional scroll container used by the section observer. */
    root?: Element | Document | null
    /** Intersection observer margin used to choose the active section. */
    rootMargin?: string
    /** Scroll behavior used after a tick is selected. */
    scrollBehavior?: ScrollBehavior
    /** Delay before a section label appears on hover, in milliseconds. */
    tooltipDelay?: number
  }

export const Minimap = ({
  sections,
  activeId,
  defaultActiveId,
  onActiveChange,
  root = null,
  rootMargin = "-20% 0px -68% 0px",
  scrollBehavior = "smooth",
  tooltipDelay = 100,
  position,
  className,
  "aria-label": ariaLabel = "Page sections",
  ...props
}: MinimapProps) => {
  const [uncontrolledActiveId, setUncontrolledActiveId] = useState<
    string | null
  >(() => defaultActiveId ?? sections[0]?.id ?? null)
  const currentActiveId =
    activeId !== undefined ? activeId : uncontrolledActiveId
  const activeIndex = sections.findIndex(
    (section) => section.id === currentActiveId,
  )
  const tabbableIndex = activeIndex >= 0 ? activeIndex : 0
  const currentActiveIdRef = useRef(currentActiveId)

  useEffect(() => {
    currentActiveIdRef.current = currentActiveId
  }, [currentActiveId])

  const commitActiveId = useCallback(
    (nextId: string) => {
      const changed = currentActiveIdRef.current !== nextId
      currentActiveIdRef.current = nextId

      if (activeId === undefined) setUncontrolledActiveId(nextId)
      if (changed) onActiveChange?.(nextId)
    },
    [activeId, onActiveChange],
  )

  useEffect(() => {
    const elements = sections
      .map((section) => document.getElementById(section.id))
      .filter((element): element is HTMLElement => Boolean(element))

    if (!elements.length) return

    const getActiveElementId = () => {
      const rootRect =
        root instanceof Element ? root.getBoundingClientRect() : null
      const activationLine = rootRect
        ? rootRect.top + rootRect.height * 0.2
        : window.innerHeight * 0.2
      let nextId = elements[0]?.id

      elements.forEach((element) => {
        if (element.getBoundingClientRect().top <= activationLine) {
          nextId = element.id
        }
      })

      return nextId
    }

    const observer = new IntersectionObserver(
      () => {
        const nextId = getActiveElementId()
        if (nextId) commitActiveId(nextId)
      },
      {
        root,
        rootMargin,
        threshold: [0, 0.1, 1],
      },
    )

    elements.forEach((element) => observer.observe(element))

    const frame = requestAnimationFrame(() => {
      const nextId = getActiveElementId()
      if (nextId) commitActiveId(nextId)
    })

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
    }
  }, [commitActiveId, root, rootMargin, sections])

  const selectSection = useCallback(
    (section: MinimapSection) => {
      const target = document.getElementById(section.id)
      if (!target) return

      commitActiveId(section.id)
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches

      const behavior = prefersReducedMotion ? "auto" : scrollBehavior

      if (root instanceof Element) {
        const rootRect = root.getBoundingClientRect()
        const targetRect = target.getBoundingClientRect()
        const scrollMarginTop = Number.parseFloat(
          getComputedStyle(target).scrollMarginTop,
        )

        root.scrollTo({
          top:
            root.scrollTop +
            targetRect.top -
            rootRect.top -
            (Number.isFinite(scrollMarginTop) ? scrollMarginTop : 0),
          behavior,
        })
        return
      }

      target.scrollIntoView({ behavior, block: "start" })
    },
    [commitActiveId, root, scrollBehavior],
  )

  const handleKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    let nextIndex: number | null = null

    if (event.key === "ArrowDown") nextIndex = Math.min(index + 1, sections.length - 1)
    if (event.key === "ArrowUp") nextIndex = Math.max(index - 1, 0)
    if (event.key === "Home") nextIndex = 0
    if (event.key === "End") nextIndex = sections.length - 1
    if (nextIndex === null || nextIndex === index) return

    event.preventDefault()
    const nextSection = sections[nextIndex]
    const buttons = event.currentTarget
      .closest("ol")
      ?.querySelectorAll<HTMLButtonElement>("[data-minimap-mark]")

    buttons?.[nextIndex]?.focus()
    if (nextSection) selectSection(nextSection)
  }

  if (sections.length < 2) return null

  return (
    <TooltipProvider delay={tooltipDelay}>
      <nav
        aria-label={ariaLabel}
        className={cn(minimapVariants({ position }), className)}
        {...props}
      >
        <ol className="flex max-h-[min(70vh,32.5rem)] w-full list-none flex-col items-start justify-center gap-0.5 p-0">
          {sections.map((section, index) => {
            const isActive = section.id === currentActiveId

            return (
              <li
                key={section.id}
                className="relative flex w-full shrink-0 justify-start"
              >
                <Tooltip>
                  <TooltipTrigger
                    render={
                      <button
                        type="button"
                        aria-label={section.label}
                        aria-current={isActive ? "location" : undefined}
                        data-minimap-mark
                        tabIndex={index === tabbableIndex ? 0 : -1}
                        className="group/minimap-mark flex h-2 w-full cursor-pointer items-center justify-start border-0 bg-transparent p-0 outline-none"
                        onClick={(event: MouseEvent<HTMLButtonElement>) => {
                          selectSection(section)
                          if (event.detail > 0) event.currentTarget.blur()
                        }}
                        onKeyDown={(event: KeyboardEvent<HTMLButtonElement>) =>
                          handleKeyDown(event, index)
                        }
                      >
                        <span
                          aria-hidden
                          className="block h-0.5 w-3 origin-left rounded-full bg-fg-primary/20 transition-[width,background-color] duration-[var(--duration-sm)] ease-enter motion-reduce:transition-none group-hover/minimap-mark:w-5 group-hover/minimap-mark:bg-fg-primary group-focus-visible/minimap-mark:w-5 group-focus-visible/minimap-mark:bg-fg-primary"
                        />
                      </button>
                    }
                  />
                  <TooltipPortal>
                    <TooltipPositioner side="right" sideOffset={14}>
                      <TooltipPopup>{section.label}</TooltipPopup>
                    </TooltipPositioner>
                  </TooltipPortal>
                </Tooltip>
              </li>
            )
          })}
        </ol>
      </nav>
    </TooltipProvider>
  )
}

export { minimapVariants }
