"use client"

import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "@boyernick/standard-ui-react"
import type { ReactNode } from "react"
import { DocBand } from "@/components/doc-band"

const Item = ({
  value,
  question,
  children,
  disabled,
}: {
  value: string
  question: string
  children: ReactNode
  disabled?: boolean
}) => (
  <AccordionItem value={value} disabled={disabled}>
    <AccordionHeader>
      <AccordionTrigger>{question}</AccordionTrigger>
    </AccordionHeader>
    <AccordionPanel>{children}</AccordionPanel>
  </AccordionItem>
)

export const AccordionExamples = () => (
  <div>
    <DocBand
      first
      id="default"
      title="Default"
      description="One panel open, the rest collapsed."
    >
      <Accordion defaultValue={["billing"]}>
        <Item value="billing" question="How does billing work?">
          You are billed monthly based on active seats. Downgrades take effect
          at the start of the next cycle.
        </Item>
        <Item value="export" question="Can I export my data?">
          Yes. Export projects as CSV or JSON from Settings → Data.
        </Item>
        <Item value="support" question="How do I contact support?">
          Open a ticket from Help, or email support@example.com for priority
          accounts.
        </Item>
      </Accordion>
    </DocBand>

    <DocBand
      id="multiple"
      title="Multiple open"
      description="Any number of panels can sit open at once."
    >
      <Accordion defaultValue={["shipping", "returns"]}>
        <Item value="shipping" question="When does my order ship?">
          Orders placed before 2pm ship the same working day.
        </Item>
        <Item value="returns" question="What is the returns window?">
          Thirty days from delivery, in original condition.
        </Item>
        <Item value="tracking" question="Where is my tracking number?">
          It arrives by email once the carrier scans the parcel.
        </Item>
      </Accordion>
    </DocBand>

    <DocBand
      id="disabled"
      title="Disabled"
      description="A disabled item stays visible but cannot be opened."
    >
      <Accordion defaultValue={["plan"]}>
        <Item value="plan" question="Change your plan">
          Switch between monthly and annual at any time.
        </Item>
        <Item value="seats" question="Manage seats" disabled>
          Available on Team plans.
        </Item>
        <Item value="invoices" question="Download invoices">
          Every invoice from the past two years is available as a PDF.
        </Item>
      </Accordion>
    </DocBand>
  </div>
)
