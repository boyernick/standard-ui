"use client"

import type { CentralIconBaseProps } from "@central-icons-react/round-outlined-radius-2-stroke-2/CentralIconBase"
import { IconArrowDown as IconArrowDownBase } from "@central-icons-react/round-outlined-radius-2-stroke-2/IconArrowDown"
import { IconBell as IconBellBase } from "@central-icons-react/round-outlined-radius-2-stroke-2/IconBell"
import { IconCalendar1 as IconCalendar1Base } from "@central-icons-react/round-outlined-radius-2-stroke-2/IconCalendar1"
import { IconChainLink1 as IconChainLink1Base } from "@central-icons-react/round-outlined-radius-2-stroke-2/IconChainLink1"
import { IconChainLink3 as IconChainLink3Base } from "@central-icons-react/round-outlined-radius-2-stroke-2/IconChainLink3"
import { IconCheckmark1 as IconCheckmark1Base } from "@central-icons-react/round-outlined-radius-2-stroke-2/IconCheckmark1"
import { IconChevronBottom as IconChevronBottomBase } from "@central-icons-react/round-outlined-radius-2-stroke-2/IconChevronBottom"
import { IconChevronDownSmall as IconChevronDownSmallBase } from "@central-icons-react/round-outlined-radius-2-stroke-2/IconChevronDownSmall"
import { IconChevronRightSmall as IconChevronRightSmallBase } from "@central-icons-react/round-outlined-radius-2-stroke-2/IconChevronRightSmall"
import { IconCircleCheck as IconCircleCheckBase } from "@central-icons-react/round-outlined-radius-2-stroke-2/IconCircleCheck"
import { IconCircleInfo as IconCircleInfoBase } from "@central-icons-react/round-outlined-radius-2-stroke-2/IconCircleInfo"
import { IconClipboard as IconClipboardBase } from "@central-icons-react/round-outlined-radius-2-stroke-2/IconClipboard"
import { IconCrossSmall as IconCrossSmallBase } from "@central-icons-react/round-outlined-radius-2-stroke-2/IconCrossSmall"
import { IconDotGrid1x3Horizontal as IconDotGrid1x3HorizontalBase } from "@central-icons-react/round-outlined-radius-2-stroke-2/IconDotGrid1x3Horizontal"
import { IconExclamationCircle as IconExclamationCircleBase } from "@central-icons-react/round-outlined-radius-2-stroke-2/IconExclamationCircle"
import { IconExclamationTriangle as IconExclamationTriangleBase } from "@central-icons-react/round-outlined-radius-2-stroke-2/IconExclamationTriangle"
import { IconHome as IconHomeBase } from "@central-icons-react/round-outlined-radius-2-stroke-2/IconHome"
import { IconFullScreen as IconFullScreenBase } from "@central-icons-react/round-outlined-radius-2-stroke-2/IconFullScreen"
import { IconMagnifyingGlass as IconMagnifyingGlassBase } from "@central-icons-react/round-outlined-radius-2-stroke-2/IconMagnifyingGlass"
import { IconMinusMedium as IconMinusBase } from "@central-icons-react/round-outlined-radius-2-stroke-2/IconMinusMedium"
import { IconPause as IconPauseBase } from "@central-icons-react/round-outlined-radius-2-stroke-2/IconPause"
import { IconMoon as IconMoonBase } from "@central-icons-react/round-outlined-radius-2-stroke-2/IconMoon"
import { IconPeople as IconPeopleBase } from "@central-icons-react/round-outlined-radius-2-stroke-2/IconPeople"
import { IconPlay as IconPlayBase } from "@central-icons-react/round-outlined-radius-2-stroke-2/IconPlay"
import { IconPlusMedium as IconPlusBase } from "@central-icons-react/round-outlined-radius-2-stroke-2/IconPlusMedium"
import { IconSettingsGear1 as IconSettingsGear1Base } from "@central-icons-react/round-outlined-radius-2-stroke-2/IconSettingsGear1"
import { IconSquareBehindSquare6 as IconSquareBehindSquare6Base } from "@central-icons-react/round-outlined-radius-2-stroke-2/IconSquareBehindSquare6"
import { IconStar as IconStarBase } from "@central-icons-react/round-outlined-radius-2-stroke-2/IconStar"
import { IconSun as IconSunBase } from "@central-icons-react/round-outlined-radius-2-stroke-2/IconSun"
import { IconVolumeFull as IconVolumeFullBase } from "@central-icons-react/round-outlined-radius-2-stroke-2/IconVolumeFull"
import { IconVolumeOff as IconVolumeOffBase } from "@central-icons-react/round-outlined-radius-2-stroke-2/IconVolumeOff"
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
    // Central's "masked" mode hardcodes one maskId per icon name. A second
    // instance on the page paints as a solid square. Raw mode avoids that.
    mode = "raw",
    ...props
  }: CentralIconProps) => <Icon {...props} size={size} mode={mode} />

  CentralIcon.displayName = Icon.displayName ?? Icon.name
  return CentralIcon
}

export const IconArrowDown = withCentralIconDefaults(IconArrowDownBase)
export const IconBell = withCentralIconDefaults(IconBellBase)
export const IconCalendar1 = withCentralIconDefaults(IconCalendar1Base)
export const IconChainLink1 = withCentralIconDefaults(IconChainLink1Base)
export const IconChainLink3 = withCentralIconDefaults(IconChainLink3Base)
export const IconCheckmark1 = withCentralIconDefaults(IconCheckmark1Base)
export const IconChevronBottom = withCentralIconDefaults(IconChevronBottomBase)
export const IconChevronDownSmall = withCentralIconDefaults(
  IconChevronDownSmallBase,
)
export const IconChevronRightSmall = withCentralIconDefaults(
  IconChevronRightSmallBase,
)
export const IconCircleCheck = withCentralIconDefaults(IconCircleCheckBase)
export const IconCircleInfo = withCentralIconDefaults(IconCircleInfoBase)
export const IconClipboard = withCentralIconDefaults(IconClipboardBase)
export const IconCrossSmall = withCentralIconDefaults(IconCrossSmallBase)
export const IconDotGrid1x3Horizontal = withCentralIconDefaults(
  IconDotGrid1x3HorizontalBase,
)
export const IconExclamationCircle = withCentralIconDefaults(
  IconExclamationCircleBase,
)
export const IconExclamationTriangle = withCentralIconDefaults(
  IconExclamationTriangleBase,
)
export const IconFullScreen = withCentralIconDefaults(IconFullScreenBase)
export const IconHome = withCentralIconDefaults(IconHomeBase)
export const IconMagnifyingGlass = withCentralIconDefaults(
  IconMagnifyingGlassBase,
)
export const IconMinus = withCentralIconDefaults(IconMinusBase)
export const IconPause = withCentralIconDefaults(IconPauseBase)
export const IconMoon = withCentralIconDefaults(IconMoonBase)
export const IconPeople = withCentralIconDefaults(IconPeopleBase)
export const IconPlay = withCentralIconDefaults(IconPlayBase)
export const IconPlus = withCentralIconDefaults(IconPlusBase)
export const IconSettingsGear1 = withCentralIconDefaults(IconSettingsGear1Base)
export const IconSquareBehindSquare6 = withCentralIconDefaults(
  IconSquareBehindSquare6Base,
)
export const IconStar = withCentralIconDefaults(IconStarBase)
export const IconSun = withCentralIconDefaults(IconSunBase)
export const IconVolumeFull = withCentralIconDefaults(IconVolumeFullBase)
export const IconVolumeOff = withCentralIconDefaults(IconVolumeOffBase)
export const IconX = withCentralIconDefaults(IconXBase)

export const iconGallery = [
  { name: "IconHome", Icon: IconHome },
  { name: "IconCalendar1", Icon: IconCalendar1 },
  { name: "IconMagnifyingGlass", Icon: IconMagnifyingGlass },
  { name: "IconSettingsGear1", Icon: IconSettingsGear1 },
  { name: "IconBell", Icon: IconBell },
  { name: "IconPeople", Icon: IconPeople },
  { name: "IconSun", Icon: IconSun },
  { name: "IconMoon", Icon: IconMoon },
  { name: "IconPlus", Icon: IconPlus },
  { name: "IconMinus", Icon: IconMinus },
  { name: "IconCrossSmall", Icon: IconCrossSmall },
  { name: "IconX", Icon: IconX },
  { name: "IconCheckmark1", Icon: IconCheckmark1 },
  { name: "IconChevronBottom", Icon: IconChevronBottom },
  { name: "IconChevronDownSmall", Icon: IconChevronDownSmall },
  { name: "IconChevronRightSmall", Icon: IconChevronRightSmall },
  { name: "IconCircleCheck", Icon: IconCircleCheck },
  { name: "IconCircleInfo", Icon: IconCircleInfo },
  { name: "IconClipboard", Icon: IconClipboard },
  { name: "IconDotGrid1x3Horizontal", Icon: IconDotGrid1x3Horizontal },
  { name: "IconSquareBehindSquare6", Icon: IconSquareBehindSquare6 },
  { name: "IconChainLink1", Icon: IconChainLink1 },
  { name: "IconChainLink3", Icon: IconChainLink3 },
  { name: "IconExclamationCircle", Icon: IconExclamationCircle },
  { name: "IconExclamationTriangle", Icon: IconExclamationTriangle },
  { name: "IconStar", Icon: IconStar },
] as const
