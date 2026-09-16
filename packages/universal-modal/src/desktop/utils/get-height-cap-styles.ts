import { type UniversalModalDesktopProps } from '../types/props';

interface Params {
    styles: Record<string, string>;
    margin: UniversalModalDesktopProps['margin'];
}

export const getHeightCapStyles = (params: Params): string[] => {
    const { margin, styles } = params;

    const topGap = margin?.top ?? 0;
    const bottomGap = margin?.bottom ?? 0;

    return [styles.heightCap, styles[`heightGap-${topGap}-${bottomGap}`]];
};
