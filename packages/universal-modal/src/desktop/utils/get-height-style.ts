import { hasOwnProperty, isClient } from '@alfalab/core-components-shared';

import { type UniversalModalDesktopProps } from '../types/props';

export const getHeightStyle = (
    height: Exclude<UniversalModalDesktopProps['height'], undefined>,
    margin: UniversalModalDesktopProps['margin'],
) => {
    let viewportHeight = 0;

    if (isClient()) {
        viewportHeight = Math.max(
            document.documentElement.clientHeight || 0,
            window.innerHeight || 0,
        );
    }

    if (height > viewportHeight || height === 'fullHeight') {
        const marginTop = (margin && hasOwnProperty(margin, 'top') && margin.top) || 0;
        const marginBottom = (margin && hasOwnProperty(margin, 'bottom') && margin.bottom) || 0;

        return `calc(100% - ${marginTop}px - ${marginBottom}px)`;
    }

    return `${height}px`;
};
