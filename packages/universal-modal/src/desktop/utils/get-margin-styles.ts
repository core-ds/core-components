import { type UniversalModalDesktopProps } from '../types/props';

interface Params {
    styles: Record<string, string>;
    margin: UniversalModalDesktopProps['margin'];
}

export const getMarginStyles = (params: Params): string[] => {
    const { margin, styles } = params;

    const topGap = margin?.top ?? 0;
    const rightGap = margin?.right ?? 0;
    const bottomGap = margin?.bottom ?? 0;
    const leftGap = margin?.left ?? 0;

    return [
        styles[`marginTop-${topGap}`],
        styles[`marginRight-${rightGap}`],
        styles[`marginBottom-${bottomGap}`],
        styles[`marginLeft-${leftGap}`],
    ];
};
