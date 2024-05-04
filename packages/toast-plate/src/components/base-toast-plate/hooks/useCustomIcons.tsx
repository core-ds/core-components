import { StatusBadgeCustomIcon, StatusBadgeViews } from '@alfalab/core-components-status-badge';

import { BadgeIcons } from '../types/BaseToastPlatePropTypes';
import { unsafe_BadgeProps } from '../types/unsafeBadgeProps';

type GetCustomIcons = StatusBadgeCustomIcon | null;

type GetCustomIconsParams = {
    iconDefaultComponents: BadgeIcons;
    transformDeprecatedBadge: (deprecatedBadge: unsafe_BadgeProps) => StatusBadgeViews;
    getBadgeIcons?: (icons: BadgeIcons) => BadgeIcons;
    customBadgeIcons?: StatusBadgeCustomIcon;
};

type UseCustomIcons = {
    getCustomIcons: (params: GetCustomIconsParams) => GetCustomIcons;
};

export const useCustomIcons = (): UseCustomIcons => {
    const getCustomIcons = (params: GetCustomIconsParams): GetCustomIcons => {
        const { customBadgeIcons, iconDefaultComponents, transformDeprecatedBadge, getBadgeIcons } =
            params;

        if (getBadgeIcons) {
            const badgeIcons: BadgeIcons = getBadgeIcons(iconDefaultComponents);

            return Object.keys(badgeIcons).reduce(
                (acc, current) => ({
                    ...acc,
                    [transformDeprecatedBadge(current as unsafe_BadgeProps)]: {
                        24: () => badgeIcons[current as unsafe_BadgeProps],
                    },
                }),
                {},
            );
        }

        if (customBadgeIcons) {
            return customBadgeIcons;
        }

        return null;
    };

    return { getCustomIcons };
};
