import type { Metadata } from "next"
import { CodeBlock } from "@/components/code-block"
import { DocCell, DocTable, Token } from "@/components/doc-table"
import { PageHeader } from "@/components/page-header"
import { OTPFieldExamples } from "./otp-field-examples"
import { H2, H3 } from "@/components/prose"

export const metadata: Metadata = {
  title: "OTP field",
}

export default function OTPFieldPage() {
  return (
    <div className="w-full">
      <PageHeader
        title="OTP field"
        description="One-time password slots for verification codes. Prefer for SMS and email codes, not general text entry."
      />

      <section className="mt-2">
        <H2>Examples</H2>
        <OTPFieldExamples />
      </section>

      <section className="mt-14">
        <H2>Overview</H2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          OTP field renders one input per character. Set <Token>length</Token>{" "}
          on the root, label the first slot with a matching <Token>id</Token>,
          and add <Token>aria-label</Token> on the remaining slots.
        </p>
        <CodeBlock
          className="mt-4"
          code={`import { OTPField, OTPFieldInput, OTPFieldSeparator } from "@boyernick/standard-ui-react"

<label htmlFor="verification-code">Verification code</label>
<OTPField id="verification-code" length={6}>
  <OTPFieldInput />
  <OTPFieldInput aria-label="Character 2 of 6" />
  <OTPFieldInput aria-label="Character 3 of 6" />
  <OTPFieldSeparator />
  <OTPFieldInput aria-label="Character 4 of 6" />
  <OTPFieldInput aria-label="Character 5 of 6" />
  <OTPFieldInput aria-label="Character 6 of 6" />
</OTPField>`}
        />
      </section>

      <section className="mt-14">
        <H2>Usage</H2>

        <H3>Grouping</H3>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Use <Token>OTPFieldSeparator</Token> to chunk codes such as{" "}
          <Token>123-456</Token> without changing the underlying value.
        </p>
        <CodeBlock
          className="mt-4"
          size="sm"
          code={`<OTPField length={6}>
  <OTPFieldInput />
  <OTPFieldInput />
  <OTPFieldInput />
  <OTPFieldSeparator />
  <OTPFieldInput />
  <OTPFieldInput />
  <OTPFieldInput />
</OTPField>`}
        />

        <H3 className="mt-10">Anatomy</H3>
        <CodeBlock
          className="mt-4"
          size="sm"
          code={`OTPField
  OTPFieldInput
  OTPFieldSeparator`}
        />
      </section>

      <section className="mt-14">
        <H2>API</H2>
        <DocTable headers={["Prop / part", "Type", "Default", "Description"]}>
          <tr>
            <DocCell mono>length</DocCell>
            <DocCell mono>number</DocCell>
            <DocCell mono>—</DocCell>
            <DocCell>Required slot count.</DocCell>
          </tr>
          <tr>
            <DocCell mono>validationType</DocCell>
            <DocCell mono>string</DocCell>
            <DocCell mono>numeric</DocCell>
            <DocCell>Filters accepted characters.</DocCell>
          </tr>
          <tr>
            <DocCell mono>mask</DocCell>
            <DocCell mono>boolean</DocCell>
            <DocCell mono>false</DocCell>
            <DocCell>Masks entered characters.</DocCell>
          </tr>
          <tr>
            <DocCell mono>autoSubmit</DocCell>
            <DocCell mono>boolean</DocCell>
            <DocCell mono>false</DocCell>
            <DocCell>Submits the owning form when complete.</DocCell>
          </tr>
          <tr>
            <DocCell mono>OTPFieldInput</DocCell>
            <DocCell mono>—</DocCell>
            <DocCell mono>—</DocCell>
            <DocCell>One character slot.</DocCell>
          </tr>
          <tr>
            <DocCell mono>OTPFieldSeparator</DocCell>
            <DocCell mono>—</DocCell>
            <DocCell mono>—</DocCell>
            <DocCell>Visual divider between slot groups.</DocCell>
          </tr>
        </DocTable>
      </section>

      <section className="mt-14 mb-8">
        <H2>Guidelines</H2>

        <H3>Do</H3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>Label the first slot and name the remaining ones</li>
          <li>Match length to the code your product sends</li>
          <li>Keep paste and autofill enabled for one-time codes</li>
        </ul>

        <H3>Don&apos;t</H3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>Don&apos;t use OTP field for passwords or long secrets</li>
          <li>Don&apos;t omit length — the root needs it</li>
          <li>Don&apos;t leave secondary slots without aria-labels</li>
        </ul>
      </section>
    </div>
  )
}
