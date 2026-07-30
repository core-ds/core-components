import { hasOwnProperty } from '@alfalab/core-components-shared';

import { type UniversalModalDesktopProps } from '../types/props';

interface Params {
    styles: Record<string, string>;
    margin: UniversalModalDesktopProps['margin'];
    height: NonNullable<UniversalModalDesktopProps['height']>;
}

export const getHugContentStyles = (params: Params): Record<string, boolean> => {
    const { margin, styles, height } = params;

    if (height !== 'hugContent') {
        return {};
    }

    return {
        [styles.hugContent]: true,
        ...(margin && {
            [styles[`topGap-${margin.top}`]]: hasOwnProperty(margin, 'top'),
            [styles[`bottomGap-${margin.bottom}`]]: hasOwnProperty(margin, 'bottom'),
        }),
    };
};
