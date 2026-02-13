import { type TextSkeletonProps } from './types/text-skeleton-props';

type PaddingParams = {
    lineHeight: number;
    fontSize: number;
};

/**
 * Возвращает вертикальный padding для выравнивания текста внутри скелетона.
 */
export const getPadding = ({ lineHeight, fontSize }: PaddingParams) => {
    if (lineHeight <= fontSize) {
        return 0;
    }

    const diff = lineHeight - fontSize;

    return diff % 2 === 0 ? diff / 2 : (diff - 1) / 2;
};

export type TextSkeletonParams = {
    height: number;
    padding: string;
    rows: number;
};

/**
 * Возвращает параметры скелетона по умолчанию, когда нет реальных размеров текста.
 */
export const getFallbackSkeletonParams = (
    skeletonProps?: TextSkeletonProps,
): TextSkeletonParams => {
    const padding = getPadding({ lineHeight: 24, fontSize: 16 });

    return {
        height: 24 - padding * 2,
        padding: `${padding}px 0`,
        rows: skeletonProps?.rows ?? 1,
    };
};

/**
 * Вычисляет параметры скелетона по реальному DOM-узлу.
 *
 * @param node элемент, по которому считаются размеры текста
 * @param skeletonProps пропсы скелетона (для переопределения rows)
 * @returns высота, паддинги и количество строк скелетона
 */
export const measureSkeletonParams = (
    node: HTMLElement,
    skeletonProps?: TextSkeletonProps,
): TextSkeletonParams => {
    const style = getComputedStyle(node);
    const textHeight = node.offsetHeight;
    const fontSize = parseInt(style.fontSize, 10);
    const lineHeight = parseInt(style.lineHeight, 10);

    let padding = getPadding({ lineHeight, fontSize });

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
