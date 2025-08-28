import { hasOwnProperty } from '@alfalab/core-components-shared';

import { UniversalModalDesktopProps } from '../types/props';

type Params = {
    styles: Record<string, string>;
    margin: UniversalModalDesktopProps['margin'];
};

export const getMarginStyles = (params: Params): Record<string, boolean> => {
    const { margin, styles } = params;

    if (margin) {
        return {
            [styles[`marginTop-${margin.top}`]]: hasOwnProperty(margin, 'top'),
            [styles[`marginRight-${margin.right}`]]: hasOwnProperty(margin, 'right'),
            [styles[`marginBottom-${margin.bottom}`]]: hasOwnProperty(margin, 'bottom'),
            [styles[`marginLeft-${margin.left}`]]: hasOwnProperty(margin, 'left'),
        };
    }

    return {};
};
