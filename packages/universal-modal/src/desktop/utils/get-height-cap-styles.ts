import { type UniversalModalDesktopProps } from '../types/props';

interface Params {
    styles: Record<string, string>;
    margin: UniversalModalDesktopProps['margin'];
}

export const getHeightCapStyles = (params: Params): Record<string, boolean> => {
    const { margin, styles } = params;

    const topGap = margin?.top ?? 0;
    const bottomGap = margin?.bottom ?? 0;

    return {
        [styles.heightCap]: true,
        [styles[`heightGap-${topGap}-${bottomGap}`]]: true,
    };
};
