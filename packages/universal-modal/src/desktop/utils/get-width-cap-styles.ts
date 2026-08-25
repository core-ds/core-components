import { type UniversalModalDesktopProps } from '../types/props';

interface Params {
    styles: Record<string, string>;
    margin: UniversalModalDesktopProps['margin'];
}

export const getWidthCapStyles = (params: Params): string[] => {
    const { margin, styles } = params;

    const leftGap = margin?.left ?? 0;
    const rightGap = margin?.right ?? 0;

    return [styles.widthCap, styles[`widthGap-${leftGap}-${rightGap}`]];
};
