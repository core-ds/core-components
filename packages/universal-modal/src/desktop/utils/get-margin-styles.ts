import { hasOwnProperty } from '@alfalab/core-components-shared';

import { type UniversalModalDesktopProps } from '../types/props';

interface Params {
    styles: Record<string, string>;
    margin: UniversalModalDesktopProps['margin'];
}

export const getMarginStyles = (params: Params): Record<string, boolean> => {
    const { margin, styles } = params;

    if (!margin) {
        return {};
    }

    return {
        ...(hasOwnProperty(margin, 'top') && { [styles[`marginTop-${margin.top}`]]: true }),
        ...(hasOwnProperty(margin, 'right') && { [styles[`marginRight-${margin.right}`]]: true }),
        ...(hasOwnProperty(margin, 'bottom') && {
            [styles[`marginBottom-${margin.bottom}`]]: true,
        }),
        ...(hasOwnProperty(margin, 'left') && { [styles[`marginLeft-${margin.left}`]]: true }),
    };
};
