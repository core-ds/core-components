import { ICON_MAP, type IconMap } from '../consts/iconMap';
import {
    type StatusBadgeCustomIcon,
    type StatusBadgeSizes,
    type StatusBadgeViews,
} from '../types/statusBadgePropTypes';

export const useStatusBadgeIcon = (
    view: StatusBadgeViews,
    size: StatusBadgeSizes,
    customIcons?: StatusBadgeCustomIcon,
) => {
    let iconsMap = ICON_MAP;

    // transform initial icons map
    if (customIcons) {
        iconsMap = Object.keys(ICON_MAP).reduce(
            (acc, current) => ({
                ...acc,
                ...{
                    [current]: {
                        ...ICON_MAP[current as StatusBadgeViews],
                        ...customIcons[current as StatusBadgeViews],
                    },
                },
            }),
            {} as IconMap,
        );
    }

    const Icon = iconsMap[view][size];

    return { Icon };
};
