import type { Metadata } from "next"
import {
  Badge,
  IconCircleCheck,
  IconCircleInfo,
  IconExclamationCircle,
  IconExclamationTriangle,
  IconStar,
} from "@boyernick/standard-ui-react"
import { DocBand } from "@/components/doc-band"
import { DocPage } from "@/components/doc-page"

export const metadata: Metadata = {
  title: "Badge",
}

export default function BadgePage() {
  return (
    <DocPage
      title="Badge"
      description="Compact labels for status, category, and metadata."
      heading={null}
      bleed
    >
      <div>
        <DocBand
          first
          id="default"
          title="Default"
          description="A quiet filled label for neutral status and metadata."
        >
          <Badge>Default</Badge>
        </DocBand>

        <DocBand
          id="outline"
          title="Outline"
          description="A low-emphasis label for categories and secondary information."
        >
          <Badge variant="outline">Outline</Badge>
        </DocBand>

        <DocBand
          id="status"
          title="Status variants"
          description="Info, success, warning, and critical tones."
        >
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="info">Information</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="critical">Critical</Badge>
          </div>
        </DocBand>

        <DocBand
          id="status-icons"
          title="Status variants with icons"
          description="A symbol per tone, so status never relies on colour."
        >
          <div className="flex flex-wrap items-center gap-3">
            <Badge
              variant="info"
              prefix={<IconCircleInfo aria-hidden />}
            >
              Scheduled
            </Badge>
            <Badge
              variant="success"
              prefix={<IconCircleCheck aria-hidden />}
            >
              Active
            </Badge>
            <Badge
              variant="warning"
              prefix={<IconExclamationTriangle aria-hidden />}
            >
              Approaching limit
            </Badge>
            <Badge
              variant="critical"
              prefix={<IconExclamationCircle aria-hidden />}
            >
              Failed
            </Badge>
          </div>
        </DocBand>

        <DocBand
          id="sizes"
          title="Sizes"
          description="Five sizes, from dense data to prominent labels."
        >
          <div className="flex flex-wrap items-center gap-3">
            <Badge size="xxs">xxs</Badge>
            <Badge size="xs">xs</Badge>
            <Badge size="sm">sm</Badge>
            <Badge size="md">md</Badge>
            <Badge size="lg">lg</Badge>
          </div>
        </DocBand>

        <DocBand
          id="radius"
          title="Radius"
          description="A soft radius for labels, a pill for counts."
        >
          <div className="flex flex-wrap items-center gap-3">
            <Badge>Light radius</Badge>
            <Badge rounded>Fully rounded</Badge>
          </div>
        </DocBand>

        <DocBand
          id="icons"
          title="With icons"
          description="An icon before or after the label."
        >
          <div className="flex flex-wrap items-center gap-3">
            <Badge prefix={<IconCircleCheck aria-hidden />}>Verified</Badge>
            <Badge suffix={<IconStar aria-hidden />}>Featured</Badge>
          </div>
        </DocBand>

        <DocBand
          id="icon-only"
          title="Icon only"
          description="A square badge for a symbol that speaks for itself."
        >
          <div className="flex flex-wrap items-center gap-3">
            <Badge iconOnly aria-label="Verified" variant="success">
              <IconCircleCheck aria-hidden />
            </Badge>
            <Badge iconOnly aria-label="Warning" variant="warning">
              <IconExclamationTriangle aria-hidden />
            </Badge>
            <Badge iconOnly aria-label="Featured">
              <IconStar aria-hidden />
            </Badge>
          </div>
        </DocBand>
      </div>
    </DocPage>
  )
}
