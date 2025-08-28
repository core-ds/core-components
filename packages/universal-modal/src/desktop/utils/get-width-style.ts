import { hasOwnProperty, isClient } from '@alfalab/core-components-shared';

import { UniversalModalDesktopProps } from '../types/props';

export const getWidthStyle = (
    width: Exclude<UniversalModalDesktopProps['width'], undefined>,
    margin: UniversalModalDesktopProps['margin'],
) => {
    let viewportWidth = 0;

    if (isClient()) {
        viewportWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    }

    if (width > viewportWidth || width === 'fullWidth') {
        const marginLeft = (margin && hasOwnProperty(margin, 'left') && margin.left) || 0;
        const marginRight = (margin && hasOwnProperty(margin, 'right') && margin.right) || 0;

        return `calc(100% - ${marginLeft}px - ${marginRight}px)`;
    }

    return `${width}px`;
};
