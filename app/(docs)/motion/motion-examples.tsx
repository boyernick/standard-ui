"use client"

import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
  Button,
  Dialog,
  DialogBackdrop,
  DialogPopup,
  DialogPortal,
  DialogTrigger,
  Tabs,
  TabsIndicator,
  TabsList,
  TabsPanel,
  TabsTab,
} from "@boyernick/standard-ui-react"
import { useState } from "react"
import { ComponentCanvas } from "@/components/component-canvas"
import { PAGE_INNER } from "@/lib/chrome"
import {
  easings,
  motionGroups,
  type EasingToken,
  type MotionToken,
} from "@/lib/motion-tokens"

/** The demo runs at a deliberately slow 500ms — at the tokens' real
 *  100–300ms the difference between the curves is too brief to perceive.
 *  Onset is the share of the duration spent reaching the first 10% of travel;
 *  it is what orders the ladder. */
const EASE_CLASS: Record<string, string> = {
  "ease-passive": "ease-passive",
  "ease-enter": "ease-enter",
  "ease-move": "ease-move",
  "ease-snap": "ease-snap",
}

const EasingTrack = ({ className, value, onset, usage }: EasingToken) => (
  <div className="group">
    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
      <code className="text-sm font-mono text-fg-primary">{className}</code>
      <span className="text-xs text-fg-tertiary">hover the track</span>
    </div>
    <div className="relative mt-3 h-10 rounded-lg bg-background-tertiary">
      {/* `left` rather than a fixed translate, so the marker spans the whole
          track at any width. */}
      <span
        aria-hidden
        className={`absolute top-1 left-1 size-8 rounded-md bg-brand-primary transition-[left] duration-500 motion-reduce:transition-none group-hover:left-[calc(100%-2.25rem)] ${EASE_CLASS[className]}`}
      />
    </div>
    <p className="text-xs mt-2 font-mono text-fg-secondary">
      {value} · onset {onset} · {usage}
    </p>
  </div>
)

/** Same band/subgrid system as the other foundations pages. */
const BAND =
  "mt-6 sm:grid sm:grid-cols-[minmax(max-content,2fr)_minmax(max-content,2fr)_minmax(max-content,1fr)_minmax(max-content,1fr)] sm:gap-x-6"

const SUBGRID = "sm:col-span-4 sm:grid sm:grid-cols-subgrid sm:gap-x-6"

const HEAD = "text-xs-strong text-fg-tertiary"

const METRIC =
  "text-xs hidden font-mono text-fg-secondary tabular-nums sm:block sm:text-right"

const TokenRow = ({ token }: { token: MotionToken }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(token.name)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1200)
    } catch {
      // Clipboard unavailable — nothing useful to show.
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      title={`Copy ${token.name}`}
      className={`grid grid-cols-1 items-center gap-2 ${SUBGRID} sm:items-center w-full cursor-copy border-b border-border-primary-solid py-3 text-left outline-none transition-colors last:border-b-0 hover:bg-background-secondary focus-visible:bg-background-secondary focus-visible:ring-[3px] focus-visible:ring-inset focus-visible:ring-ring/20`}
    >
      <span className="text-sm min-w-0 truncate font-mono text-fg-primary">
        {token.name}
      </span>
      <span className="text-sm hidden min-w-0 text-fg-secondary sm:block">
        {copied ? "Copied" : token.usage}
      </span>
      <span className={METRIC}>{token.duration}</span>
      <span className={METRIC}>{token.easing}</span>
      <span className="sr-only">{copied ? "Copied" : token.name}</span>
    </button>
  )
}

export const MotionExamples = () => (
  <div>
    <section aria-labelledby="easing">
      <div className={`${PAGE_INNER} py-10`}>
        <h2 id="easing" className="heading-sm text-fg-primary">
          Easing
        </h2>
        <p className="text-sm mt-1 max-w-2xl text-fg-secondary">
          One ladder, ordered by how quickly a transition commits.
        </p>

        <div className="mt-6 flex flex-col gap-8">
          {easings.map((easing) => (
            <EasingTrack key={easing.className} {...easing} />
          ))}
        </div>
      </div>
    </section>

    {motionGroups.map((group) => (
      <section
        key={group.id}
        aria-labelledby={group.id}
        className="border-t border-border-primary"
      >
        <div className={`${PAGE_INNER} py-10`}>
          <h2 id={group.id} className="heading-sm text-fg-primary">
            {group.title}
          </h2>
          <p className="text-sm mt-1 max-w-2xl text-fg-secondary">
            {group.description}
          </p>

          <div className={BAND}>
            <div
              className={`${SUBGRID} hidden border-b border-border-primary pb-2 sm:grid`}
            >
              <span className={HEAD}>Token</span>
              <span className={HEAD}>Usage</span>
              <span className={`${HEAD} sm:text-right`}>Duration</span>
              <span className={`${HEAD} sm:text-right`}>Easing</span>
            </div>
            {group.tokens.map((token) => (
              <TokenRow key={token.name} token={token} />
            ))}
          </div>
        </div>
      </section>
    ))}

    {/* The tokens above are mount/unmount transitions driven by Base UI's
        data-starting-style attributes, so a still preview cell would show
        nothing. These run the real components instead. */}
    <section
      aria-labelledby="in-motion"
      className="border-t border-border-primary"
    >
      <div className={`${PAGE_INNER} py-10`}>
        <h2 id="in-motion" className="heading-sm text-fg-primary">
          In motion
        </h2>
        <p className="text-sm mt-1 max-w-2xl text-fg-secondary">
          Motion only reads when it plays — open each one.
        </p>

        <div className="mt-6 flex flex-col gap-8">
          <ComponentCanvas label="Backdrop and centred popup">
            <Dialog>
              <DialogTrigger render={<Button variant="outline" />}>
                Open dialog
              </DialogTrigger>
              <DialogPortal>
                <DialogBackdrop />
                <DialogPopup className="gap-3 p-5">
                  <p className="text-sm text-fg-primary">
                    The scrim fades while the popup scales.
                  </p>
                </DialogPopup>
              </DialogPortal>
            </Dialog>
          </ComponentCanvas>

          <ComponentCanvas
            label="Accordion panel"
            contentClassName="w-full items-stretch"
          >
            <Accordion className="w-full">
              <AccordionItem value="height">
                <AccordionHeader>
                  <AccordionTrigger>Expand and collapse</AccordionTrigger>
                </AccordionHeader>
                <AccordionPanel>
                  <p className="text-sm pt-2 text-fg-secondary">
                    Height eases on a longer curve than the overlays.
                  </p>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </ComponentCanvas>

          <ComponentCanvas
            label="Tabs indicator"
            contentClassName="w-full items-stretch"
          >
            <Tabs defaultValue="one">
              <TabsList>
                <TabsTab value="one">First</TabsTab>
                <TabsTab value="two">Second</TabsTab>
                <TabsTab value="three">Third</TabsTab>
                <TabsIndicator />
              </TabsList>
              <TabsPanel value="one">
                <p className="text-sm pt-3 text-fg-secondary">
                  Switch tabs — the indicator slides rather than cuts.
                </p>
              </TabsPanel>
              <TabsPanel value="two">
                <p className="text-sm pt-3 text-fg-secondary">
                  Width animates alongside position.
                </p>
              </TabsPanel>
              <TabsPanel value="three">
                <p className="text-sm pt-3 text-fg-secondary">
                  Both use the emphasised curve.
                </p>
              </TabsPanel>
            </Tabs>
          </ComponentCanvas>
        </div>
      </div>
    </section>
  </div>
)
