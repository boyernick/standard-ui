import { CodeBlock } from "@boyernick/standard-ui-react"
import { DocBand } from "@/components/doc-band"

const component = `import { Button } from "@boyernick/standard-ui-react"

export const SaveButton = () => (
  <Button variant="primary">Save changes</Button>
)`

const install = `npm install @boyernick/standard-ui-react`

const tokens = `:root {
  --duration-sm: 150ms;
  --ease-snap: cubic-bezier(0.1, 0.9, 0.2, 1);
}`

/** Code runs wider than the default band measure. */
const WIDE = "max-w-2xl"

export const CodeBlockExamples = () => (
  <div>
    <DocBand
      first
      id="default"
      title="Default"
      description="A header carrying the language and a copy action."
      contentClassName={WIDE}
    >
      <CodeBlock code={component} className="w-full" />
    </DocBand>

    <DocBand
      id="small"
      title="Small"
      description="A tighter type scale and padding."
      contentClassName={WIDE}
    >
      <CodeBlock code={tokens} lang="css" size="sm" className="w-full" />
    </DocBand>

    <DocBand
      id="no-header"
      title="Without a header"
      description="The frame on its own, with no language label or copy action."
      contentClassName={WIDE}
    >
      <CodeBlock
        code={install}
        lang="shell"
        showHeader={false}
        className="w-full"
      />
    </DocBand>

    <DocBand
      id="bare"
      title="Bare"
      description="No frame, for code nested inside another surface."
      contentClassName={WIDE}
    >
      {/* `bare` only reaches the markup on the headerless branch — with a
          header the frame comes from the wrapper and the prop is ignored. */}
      <CodeBlock
        code={install}
        lang="shell"
        showHeader={false}
        bare
        className="w-full"
      />
    </DocBand>
  </div>
)
