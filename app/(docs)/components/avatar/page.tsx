import type { Metadata } from "next"
import { Avatar, AvatarFallback, AvatarImage } from "@standard-ui/react"
import { CodeBlock } from "@/components/code-block"
import { ComponentCanvas } from "@/components/component-canvas"
import { DocCell, DocTable, Token } from "@/components/doc-table"
import { PageHeader } from "@/components/page-header"

export const metadata: Metadata = {
  title: "Avatar",
}

const AVATAR_SRC =
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&h=96&fit=crop&crop=faces"

export default function AvatarPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader
        title="Avatar"
        description="Circular identity for people and accounts. Prefer a photo when available; fall back to initials."
      />

      <section className="mt-2">
        <h2 className="heading-sm text-fg-primary">Examples</h2>

        <div className="mt-6 flex flex-col gap-8">
          <ComponentCanvas
            label="Sizes"
            code={`<Avatar size="sm">
  <AvatarImage src="${AVATAR_SRC}" alt="Jordan Lee" />
  <AvatarFallback>JL</AvatarFallback>
</Avatar>
<Avatar size="md">
  <AvatarImage src="${AVATAR_SRC}" alt="Jordan Lee" />
  <AvatarFallback>JL</AvatarFallback>
</Avatar>
<Avatar size="lg">
  <AvatarImage src="${AVATAR_SRC}" alt="Jordan Lee" />
  <AvatarFallback>JL</AvatarFallback>
</Avatar>`}
          >
            <Avatar size="sm">
              <AvatarImage src={AVATAR_SRC} alt="Jordan Lee" />
              <AvatarFallback>JL</AvatarFallback>
            </Avatar>
            <Avatar size="md">
              <AvatarImage src={AVATAR_SRC} alt="Jordan Lee" />
              <AvatarFallback>JL</AvatarFallback>
            </Avatar>
            <Avatar size="lg">
              <AvatarImage src={AVATAR_SRC} alt="Jordan Lee" />
              <AvatarFallback>JL</AvatarFallback>
            </Avatar>
          </ComponentCanvas>

          <ComponentCanvas
            label="Fallback"
            code={`<Avatar>
  <AvatarImage src="/missing.jpg" alt="Alex Rivera" />
  <AvatarFallback>AR</AvatarFallback>
</Avatar>
<Avatar>
  <AvatarFallback>NB</AvatarFallback>
</Avatar>
<Avatar size="lg">
  <AvatarFallback>SK</AvatarFallback>
</Avatar>`}
          >
            <Avatar>
              <AvatarImage src="/missing.jpg" alt="Alex Rivera" />
              <AvatarFallback>AR</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>NB</AvatarFallback>
            </Avatar>
            <Avatar size="lg">
              <AvatarFallback>SK</AvatarFallback>
            </Avatar>
          </ComponentCanvas>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">Overview</h2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Avatar shows a person&apos;s image or initials in a circle. Pair{" "}
          <Token>AvatarImage</Token> with <Token>AvatarFallback</Token> so
          missing or slow images still identify the user. Built on Base UI.
        </p>
        <CodeBlock
          className="mt-4"
          code={`import { Avatar, AvatarImage, AvatarFallback } from "@standard-ui/react"

<Avatar>
  <AvatarImage src="/avatar.jpg" alt="Jordan Lee" />
  <AvatarFallback>JL</AvatarFallback>
</Avatar>`}
        />
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">Usage</h2>

        <h3 className="heading-xs mt-8 text-fg-primary">Initials</h3>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Use one or two characters from the display name. Keep fallback text
          short so it stays readable at <Token>sm</Token>.
        </p>
        <CodeBlock
          className="mt-4"
          size="sm"
          code={`<Avatar>
  <AvatarFallback>JL</AvatarFallback>
</Avatar>`}
        />

        <h3 className="heading-xs mt-10 text-fg-primary">Alt text</h3>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Always pass a meaningful <Token>alt</Token> on{" "}
          <Token>AvatarImage</Token> — usually the person&apos;s name. Decorative
          avatars next to visible names can use an empty alt when appropriate.
        </p>
        <CodeBlock
          className="mt-4"
          size="sm"
          code={`<AvatarImage src={src} alt="Jordan Lee" />`}
        />
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">API</h2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          <Token>Avatar</Token> accepts Base UI root props plus{" "}
          <Token>size</Token>. Image and fallback pass through to their Base UI
          parts.
        </p>
        <DocTable headers={["Prop", "Type", "Default", "Description"]}>
          <tr>
            <DocCell mono>size</DocCell>
            <DocCell mono>
              &quot;sm&quot; | &quot;md&quot; | &quot;lg&quot;
            </DocCell>
            <DocCell mono>&quot;md&quot;</DocCell>
            <DocCell>Diameter and type scale of the avatar.</DocCell>
          </tr>
          <tr>
            <DocCell mono>src</DocCell>
            <DocCell mono>string</DocCell>
            <DocCell mono>—</DocCell>
            <DocCell>
              On <Token>AvatarImage</Token> — image URL.
            </DocCell>
          </tr>
          <tr>
            <DocCell mono>alt</DocCell>
            <DocCell mono>string</DocCell>
            <DocCell mono>—</DocCell>
            <DocCell>
              On <Token>AvatarImage</Token> — accessible name.
            </DocCell>
          </tr>
        </DocTable>
      </section>

      <section className="mt-14 mb-8">
        <h2 className="heading-sm text-fg-primary">Guidelines</h2>

        <h3 className="heading-xs mt-8 text-fg-primary">Do</h3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>Always include a fallback for missing images</li>
          <li>Match size to density — sm in lists, lg in profiles</li>
          <li>Use consistent initials rules across the product</li>
        </ul>

        <h3 className="heading-xs mt-8 text-fg-primary">Don't</h3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>
            Don&apos;t omit <Token>alt</Token> on meaningful photos
          </li>
          <li>
            Don&apos;t use long fallback strings — two characters max
          </li>
          <li>
            Don&apos;t mix rounded and square treatments in one product surface
          </li>
        </ul>
      </section>
    </div>
  )
}
