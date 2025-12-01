import { type TextSkeletonProps } from './types/text-skeleton-props';

export type TextSkeletonParams = {
    height: number;
    padding: string;
    rows: number;
};

const DEFAULT_FONT_SIZE = 16;
const DEFAULT_LINE_HEIGHT = 24;

export const getPadding = (lineHeight: number, fontSize: number) => {
    if (lineHeight <= fontSize) {
        return 0;
    }

    const diff = lineHeight - fontSize;

    return diff % 2 === 0 ? diff / 2 : (diff - 1) / 2;
};

export const getFallbackSkeletonParams = (
    skeletonProps?: TextSkeletonProps,
): TextSkeletonParams => {
    const padding = getPadding(DEFAULT_LINE_HEIGHT, DEFAULT_FONT_SIZE);

    return {
        height: DEFAULT_LINE_HEIGHT - padding * 2,
        padding: `${padding}px 0`,
        rows: skeletonProps?.rows ?? 1,
    };
};

export const measureSkeletonParams = (
    node: HTMLElement,
    skeletonProps?: TextSkeletonProps,
): TextSkeletonParams => {
    const style = getComputedStyle(node);
    const textHeight = node.offsetHeight;
    const fontSize = parseInt(style.fontSize, 10);
    const lineHeight = parseInt(style.lineHeight, 10);

    let padding = getPadding(lineHeight, fontSize);
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    /**
     * Расчет отступов с учётом размера глифа от базовой линии до верхней границы
     * Это позволяет отображать более приближённый размер скелетона к начертанию текста
     * @see DS-12535
     */
    if (context && node.textContent) {
        context.font = style.font;
        const metrics = context.measureText(node.textContent);

        padding = (lineHeight - metrics.actualBoundingBoxAscent) / 2;
    }

    return {
        height: lineHeight - padding * 2,
        padding: `${padding}px 0`,
        rows: skeletonProps?.rows ?? Math.ceil(textHeight / lineHeight),
    };
};
