import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@boyernick/standard-ui-react"
import { DocBand } from "@/components/doc-band"

const AVATAR_SRC =
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&h=96&fit=crop&crop=faces"

type Size = "sm" | "md" | "lg"

/** A photo that falls back to initials — the shape every specimen shares. */
const Photo = ({ size, src = AVATAR_SRC }: { size?: Size; src?: string }) => (
  <Avatar size={size}>
    <AvatarImage src={src} alt="Jordan Lee" />
    <AvatarFallback>JL</AvatarFallback>
  </Avatar>
)

/** Avatars sit on a shared centre line so mixed sizes read as one row. */
const Row = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-4">{children}</div>
)

export const AvatarExamples = () => (
  <div>
    <DocBand
      first
      id="sizes"
      title="Sizes"
      description="Three fixed sizes: 32, 40 and 48 pixels."
    >
      <Row>
        <Photo size="sm" />
        <Photo size="md" />
        <Photo size="lg" />
      </Row>
    </DocBand>

    <DocBand
      id="fallback"
      title="Fallback"
      description="Initials stand in while the image loads, and stay if it fails."
    >
      <Row>
        {/* No image at all — the fallback is all there is to render. */}
        <Avatar>
          <AvatarFallback>NB</AvatarFallback>
        </Avatar>
        {/* An image that resolves to nothing, so the fallback takes over. */}
        <Photo src="/missing.jpg" />
        <Avatar size="lg">
          <AvatarFallback>SK</AvatarFallback>
        </Avatar>
      </Row>
    </DocBand>
  </div>
)
