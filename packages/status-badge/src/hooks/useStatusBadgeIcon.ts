import type { IconMap } from '../consts/iconMap';
import type {
    StatusBadgeCustomIcon,
    StatusBadgeSizes,
    StatusBadgeViews,
} from '../types/statusBadgePropTypes';

export const combineIcons = (
    iconMap: IconMap,
    customIcons?: StatusBadgeCustomIcon | StatusBadgeCustomIcon[],
) => {
    let iconsMap = iconMap;

    // transform initial icons map
    if (customIcons) {
        const customIconsAll: StatusBadgeCustomIcon[] = Array.isArray(customIcons)
            ? customIcons
            : [customIcons];

        customIconsAll.forEach((customIconsSet) => {
            iconsMap = Object.keys(iconsMap).reduce(
                (acc, current) => ({
                    ...acc,
                    ...{
                        [current]: {
                            ...iconsMap[current as StatusBadgeViews],
                            ...customIconsSet[current as StatusBadgeViews],
                        },
                    },
                }),
                {} as IconMap,
            );
        });
    }

    return iconsMap;
};

export const useStatusBadgeIcon = (
    view: StatusBadgeViews,
    size: StatusBadgeSizes,
    iconMap: IconMap,
    customIcons?: StatusBadgeCustomIcon | StatusBadgeCustomIcon[],
) => {
    const iconsMap = combineIcons(iconMap, customIcons);
    const Icon = iconsMap[view][size];

    return { Icon };
};
