import { hasOwnProperty } from '@alfalab/core-components-shared';

import { UniversalModalDesktopProps } from '../types/props';

export const getMaxHeightStyle = (margin: UniversalModalDesktopProps['margin']) => {
    const marginTop = (margin && hasOwnProperty(margin, 'top') && margin.top) || 0;
    const marginBottom = (margin && hasOwnProperty(margin, 'bottom') && margin.bottom) || 0;

    return `calc(100% - ${marginTop}px - ${marginBottom}px)`;
};
