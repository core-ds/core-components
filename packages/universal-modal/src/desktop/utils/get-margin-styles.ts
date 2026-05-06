import cn from 'classnames';

import { type UniversalModalDesktopProps } from '../types/props';

interface Params {
    styles: Record<string, string>;
    margin: NonNullable<UniversalModalDesktopProps['margin']>;
    height: NonNullable<UniversalModalDesktopProps['height']>;
}

export const getMarginStyles = (params: Params): string => {
    const { margin, styles, height } = params;
    const { top, right, bottom, left } = margin;

    const isHugContent = height === 'hugContent';

    return cn(
        styles[`marginTop-${top}`],
        styles[`marginRight-${right}`],
        styles[`marginBottom-${bottom}`],
        styles[`marginLeft-${left}`],
        isHugContent && [styles.hugContent, styles[`topGap-${top}`], styles[`bottomGap-${bottom}`]],
    );
};
