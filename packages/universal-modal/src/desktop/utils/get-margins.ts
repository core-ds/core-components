import { hasOwnProperty } from '@alfalab/core-components-shared';

import { UniversalModalDesktopProps } from '../types/props';

type Params = {
    styles: Record<string, string>;
    margin: UniversalModalDesktopProps['margin'];
};

export const getMargins = (params: Params): Record<string, boolean> => {
    const { margin, styles } = params;

    const hasMarginTop = (margin && hasOwnProperty(margin, 'top')) || false;
    const hasMarginRight = (margin && hasOwnProperty(margin, 'right')) || false;
    const hasMarginBottom = (margin && hasOwnProperty(margin, 'bottom')) || false;
    const hasMarginLeft = (margin && hasOwnProperty(margin, 'left')) || false;

    return {
        [styles[`marginTop-${margin?.top}`]]: hasMarginTop,
        [styles[`marginRight-${margin?.right}`]]: hasMarginRight,
        [styles[`marginBottom-${margin?.bottom}`]]: hasMarginBottom,
        [styles[`marginLeft-${margin?.left}`]]: hasMarginLeft,
    };
};
