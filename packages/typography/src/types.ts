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

export const TAGS_TITLE = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div'] as const;
export const VIEWS_TITLE = ['xlarge', 'large', 'medium', 'small', 'xsmall'] as const;
export const WEIGHTS_TITLE = ['regular', 'medium', 'bold', 'semibold'] as const;

export const WEIGHTS_TEXT = ['regular', 'medium', 'bold'] as const;
export const TAGS_BASE_TEXT = ['span', 'div'] as const;
export const TAGS_ALL_TEXT = ['span', 'div', 'p'] as const;
export const VIEWS_TEXT = [
    'primary-large',
    'primary-medium',
    'primary-small',
    'secondary-large',
    'secondary-medium',
    'secondary-small',
    /** @deprecated Используйте 'component-primary' */
    'component',
    'component-primary',
    'component-secondary',
    'caps',
    'tagline',
] as const;

export const FONTS = ['styrene', 'system'] as const;
export const ROW_LIMITS = [1, 2, 3] as const;
export const COLORS_MAIN = [
    'tertiary',
    'disabled',
    'accent',
    'primary',
    'attention',
    'positive',
    'secondary',
    'link',
    'negative',
] as const;

export const COLORS_INVERTED = [
    'tertiary-inverted',
    'primary-inverted',
    'secondary-inverted',
] as const;

export const COLORS_STATIC = [
    'static-primary-light',
    'static-secondary-light',
    'static-tertiary-light',
    'static-primary-dark',
    'static-secondary-dark',
    'static-tertiary-dark',
    'static-accent',
] as const;

export const COLORS = [...COLORS_MAIN, ...COLORS_INVERTED, ...COLORS_STATIC] as const;
export type TCOLORS = (typeof COLORS)[number];
