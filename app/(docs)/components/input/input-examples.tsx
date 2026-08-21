import { Input } from "@boyernick/standard-ui-react"
import type { ReactNode } from "react"
import { DocBand } from "@/components/doc-band"

const BAND = "max-w-md"

/** Fields stack, so a band reads down rather than across. */
const Stack = ({ children }: { children: ReactNode }) => (
  <div className="flex flex-col gap-3">{children}</div>
)

export const InputExamples = () => (
  <div>
    <DocBand
      first
      id="default"
      title="Default"
      description="A bordered field, empty and filled."
      contentClassName={BAND}
    >
      <Stack>
        <Input placeholder="Email address" aria-label="Email address" />
        <Input defaultValue="standard@ui.dev" aria-label="Filled" />
      </Stack>
    </DocBand>

    <DocBand
      id="ghost"
      title="Ghost"
      description="No border or fill, for editing a value in place."
      contentClassName={BAND}
    >
      <Stack>
        <Input variant="ghost" placeholder="Search…" aria-label="Search" />
        <Input
          variant="ghost"
          defaultValue="Untitled document"
          aria-label="Title"
        />
      </Stack>
    </DocBand>

    <DocBand
      id="sizes"
      title="Sizes"
      description="Three heights: 32, 36 and 40 pixels."
      contentClassName={BAND}
    >
      <Stack>
        <Input size="sm" placeholder="Small" aria-label="Small" />
        <Input size="md" placeholder="Medium" aria-label="Medium" />
        <Input size="lg" placeholder="Large" aria-label="Large" />
      </Stack>
    </DocBand>

    <DocBand
      id="invalid"
      title="Invalid"
      description="A field carrying a validation failure."
      contentClassName={BAND}
    >
      {/* Only one specimen: ghost + invalid resolves to the same
          border-destructive, so a second field would render identically and
          the pair would look like a mistake rather than a comparison. */}
      <Input invalid defaultValue="not-an-email" aria-label="Invalid email" />
    </DocBand>

    <DocBand
      id="disabled"
      title="Disabled"
      description="Visible but not editable."
      contentClassName={BAND}
    >
      <Stack>
        <Input disabled placeholder="Disabled" aria-label="Disabled" />
        <Input
          disabled
          defaultValue="Read only value"
          aria-label="Disabled filled"
        />
      </Stack>
    </DocBand>
  </div>
)
