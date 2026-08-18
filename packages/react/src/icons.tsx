"use client"

import type { CentralIconBaseProps } from "@central-icons-react/round-outlined-radius-2-stroke-2/CentralIconBase"
import { IconBell as IconBellBase } from "@central-icons-react/round-outlined-radius-2-stroke-2/IconBell"
import { IconChainLink1 as IconChainLink1Base } from "@central-icons-react/round-outlined-radius-2-stroke-2/IconChainLink1"
import { IconCheckmark1 as IconCheckmark1Base } from "@central-icons-react/round-outlined-radius-2-stroke-2/IconCheckmark1"
import { IconChevronBottom as IconChevronBottomBase } from "@central-icons-react/round-outlined-radius-2-stroke-2/IconChevronBottom"
import { IconChevronDownSmall as IconChevronDownSmallBase } from "@central-icons-react/round-outlined-radius-2-stroke-2/IconChevronDownSmall"
import { IconChevronRightSmall as IconChevronRightSmallBase } from "@central-icons-react/round-outlined-radius-2-stroke-2/IconChevronRightSmall"
import { IconClipboard as IconClipboardBase } from "@central-icons-react/round-outlined-radius-2-stroke-2/IconClipboard"
import { IconHome as IconHomeBase } from "@central-icons-react/round-outlined-radius-2-stroke-2/IconHome"
import { IconMagnifyingGlass as IconMagnifyingGlassBase } from "@central-icons-react/round-outlined-radius-2-stroke-2/IconMagnifyingGlass"
import { IconMinusMedium as IconMinusBase } from "@central-icons-react/round-outlined-radius-2-stroke-2/IconMinusMedium"
import { IconMoon as IconMoonBase } from "@central-icons-react/round-outlined-radius-2-stroke-2/IconMoon"
import { IconPeople as IconPeopleBase } from "@central-icons-react/round-outlined-radius-2-stroke-2/IconPeople"
import { IconPlusMedium as IconPlusBase } from "@central-icons-react/round-outlined-radius-2-stroke-2/IconPlusMedium"
import { IconSettingsGear1 as IconSettingsGear1Base } from "@central-icons-react/round-outlined-radius-2-stroke-2/IconSettingsGear1"
import { IconSquareBehindSquare6 as IconSquareBehindSquare6Base } from "@central-icons-react/round-outlined-radius-2-stroke-2/IconSquareBehindSquare6"
import { IconSun as IconSunBase } from "@central-icons-react/round-outlined-radius-2-stroke-2/IconSun"
import { IconX as IconXBase } from "@central-icons-react/round-outlined-radius-2-stroke-2/IconX"
import type { ComponentType } from "react"

/** Round outlined Central Icons: 2px radius, 2px stroke, default 20px. */
export const CENTRAL_ICON_SIZE = 20

export type CentralIconProps = Omit<CentralIconBaseProps, "size"> & {
  size?: CentralIconBaseProps["size"]
}

export type CentralIconComponent = ComponentType<CentralIconProps>

export const withCentralIconDefaults = (
  Icon: ComponentType<CentralIconBaseProps>,
): CentralIconComponent => {
  const CentralIcon = ({
    size = CENTRAL_ICON_SIZE,
    ...props
  }: CentralIconProps) => <Icon size={size} {...props} />

  CentralIcon.displayName = Icon.displayName ?? Icon.name
  return CentralIcon
}

export const IconBell = withCentralIconDefaults(IconBellBase)
export const IconChainLink1 = withCentralIconDefaults(IconChainLink1Base)
export const IconCheckmark1 = withCentralIconDefaults(IconCheckmark1Base)
export const IconChevronBottom = withCentralIconDefaults(IconChevronBottomBase)
export const IconChevronDownSmall = withCentralIconDefaults(
  IconChevronDownSmallBase,
)
export const IconChevronRightSmall = withCentralIconDefaults(
  IconChevronRightSmallBase,
)
export const IconClipboard = withCentralIconDefaults(IconClipboardBase)
export const IconHome = withCentralIconDefaults(IconHomeBase)
export const IconMagnifyingGlass = withCentralIconDefaults(
  IconMagnifyingGlassBase,
)
export const IconMinus = withCentralIconDefaults(IconMinusBase)
export const IconMoon = withCentralIconDefaults(IconMoonBase)
export const IconPeople = withCentralIconDefaults(IconPeopleBase)
export const IconPlus = withCentralIconDefaults(IconPlusBase)
export const IconSettingsGear1 = withCentralIconDefaults(IconSettingsGear1Base)
export const IconSquareBehindSquare6 = withCentralIconDefaults(
  IconSquareBehindSquare6Base,
)
export const IconSun = withCentralIconDefaults(IconSunBase)
export const IconX = withCentralIconDefaults(IconXBase)

export const iconGallery = [
  { name: "IconHome", Icon: IconHome },
  { name: "IconMagnifyingGlass", Icon: IconMagnifyingGlass },
  { name: "IconSettingsGear1", Icon: IconSettingsGear1 },
  { name: "IconBell", Icon: IconBell },
  { name: "IconPeople", Icon: IconPeople },
  { name: "IconSun", Icon: IconSun },
  { name: "IconMoon", Icon: IconMoon },
  { name: "IconPlus", Icon: IconPlus },
  { name: "IconMinus", Icon: IconMinus },
  { name: "IconX", Icon: IconX },
  { name: "IconCheckmark1", Icon: IconCheckmark1 },
  { name: "IconChevronBottom", Icon: IconChevronBottom },
  { name: "IconChevronDownSmall", Icon: IconChevronDownSmall },
  { name: "IconChevronRightSmall", Icon: IconChevronRightSmall },
  { name: "IconClipboard", Icon: IconClipboard },
  { name: "IconSquareBehindSquare6", Icon: IconSquareBehindSquare6 },
  { name: "IconChainLink1", Icon: IconChainLink1 },
] as const
