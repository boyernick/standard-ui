import type { Metadata } from "next"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@boyernick/standard-ui-react"
import { ComponentCanvas } from "@/components/component-canvas"
import { DocPage } from "@/components/doc-page"

export const metadata: Metadata = {
  title: "Avatar",
}

const AVATAR_SRC =
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&h=96&fit=crop&crop=faces"

export default function AvatarPage() {
  return (
    <DocPage
      title="Avatar"
      description="Circular identity for people and accounts."
    >
      <ComponentCanvas label="Sizes">
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

      <ComponentCanvas label="Fallback">
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
    </DocPage>
  )
}
