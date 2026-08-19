"use client"

import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "@boyernick/standard-ui-react"
import { ComponentCanvas } from "@/components/component-canvas"

export const AccordionExamples = () => (
  <div className="mt-6 flex flex-col gap-8">
    <ComponentCanvas
      label="FAQ"
      contentClassName="mx-auto w-full max-w-lg"
      minHeightClass="min-h-56"
      code={`<Accordion defaultValue={["billing"]}>
  <AccordionItem value="billing">
    <AccordionHeader>
      <AccordionTrigger>How does billing work?</AccordionTrigger>
    </AccordionHeader>
    <AccordionPanel>
      You are billed monthly based on active seats. Downgrades take
      effect at the start of the next cycle.
    </AccordionPanel>
  </AccordionItem>
  <AccordionItem value="export">
    <AccordionHeader>
      <AccordionTrigger>Can I export my data?</AccordionTrigger>
    </AccordionHeader>
    <AccordionPanel>
      Yes. Export projects as CSV or JSON from Settings → Data.
    </AccordionPanel>
  </AccordionItem>
  <AccordionItem value="support">
    <AccordionHeader>
      <AccordionTrigger>How do I contact support?</AccordionTrigger>
    </AccordionHeader>
    <AccordionPanel>
      Open a ticket from Help, or email support@example.com for
      priority accounts.
    </AccordionPanel>
  </AccordionItem>
</Accordion>`}
    >
      <Accordion defaultValue={["billing"]} className="w-full">
        <AccordionItem value="billing">
          <AccordionHeader>
            <AccordionTrigger>How does billing work?</AccordionTrigger>
          </AccordionHeader>
          <AccordionPanel>
            You are billed monthly based on active seats. Downgrades take
            effect at the start of the next cycle.
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem value="export">
          <AccordionHeader>
            <AccordionTrigger>Can I export my data?</AccordionTrigger>
          </AccordionHeader>
          <AccordionPanel>
            Yes. Export projects as CSV or JSON from Settings → Data.
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem value="support">
          <AccordionHeader>
            <AccordionTrigger>How do I contact support?</AccordionTrigger>
          </AccordionHeader>
          <AccordionPanel>
            Open a ticket from Help, or email support@example.com for
            priority accounts.
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </ComponentCanvas>
  </div>
)
