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

    const topGap = margin?.top ?? 0;
    const bottomGap = margin?.bottom ?? 0;

    return {
        [styles.hugContent]: true,
        [styles[`hugGap-${topGap}-${bottomGap}`]]: true,
    };
};
