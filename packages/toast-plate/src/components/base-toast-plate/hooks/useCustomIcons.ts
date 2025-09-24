import { type StatusBadgeCustomIcon } from '@alfalab/core-components-status-badge';

type GetCustomIcons = StatusBadgeCustomIcon | null;

export const useCustomIcons = () => {
    const getCustomIcons = (getBadgeIcons?: StatusBadgeCustomIcon): GetCustomIcons => {
        if (getBadgeIcons) {
            return getBadgeIcons;
        }

        return null;
    };

    return { getCustomIcons };
};
