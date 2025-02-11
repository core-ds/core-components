import { isClient } from './isClient';

const SafeArea = {
    top: '--sat',
    bottom: '--sab',
    left: '--sel',
    right: '--sar',
};

export type Directions = keyof typeof SafeArea;

const dimensionsCache: Partial<Record<Directions, number>> = {};

export const getSafeAreaValue = <T extends Directions>(direction: T) => {
    if (isClient()) {
        if (dimensionsCache[direction]) {
            return dimensionsCache[direction];
        }

        const safeAreaValue = Number(
            getComputedStyle(document.documentElement)
                .getPropertyValue(SafeArea[direction])
                .slice(0, -2),
        );

        dimensionsCache[direction] = safeAreaValue;

        return safeAreaValue;
    }

    return 0;
};
