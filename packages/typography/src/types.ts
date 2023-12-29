export type TextElementType = HTMLParagraphElement | HTMLSpanElement | HTMLDivElement;

type WidthUnit = number | string;

export type TextSkeletonProps = {
    /**
     *  Кол-во строк текста
     */
    rows?: number;

    /**
     * Ширина строки
     */
    width?: WidthUnit | WidthUnit[];

    /**
     * Выравнивание элементов по горизонтали
     */
    align?: 'left' | 'center' | 'right';

    /**
     * Класс для обертки скелетона
     */
    wrapperClassName?: string;
};
