import { type CSSProperties, type HTMLAttributes } from 'react';

type NativeSpanProps = Omit<
    HTMLAttributes<HTMLSpanElement>,
    'aria-busy' | 'children' | 'className' | 'color' | 'dangerouslySetInnerHTML' | 'style'
>;

export type TextShimmerProps = NativeSpanProps & {
    /**
     * Текст, который рассыпается на частицы
     */
    children: string | number;

    /**
     * Управляет состоянием шиммера
     * @default false
     */
    active?: boolean;

    /**
     * Управляет движением частиц независимо от active
     * @default true
     */
    animate?: boolean;

    /**
     * Цвет частиц
     * @default var(--text-shimmer-particle-color)
     */
    color?: string;

    /**
     * Количество частиц. Допустимый диапазон — от 12 до 300
     */
    particleCount?: number;

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Дополнительные инлайн-стили корневого элемента
     */
    style?: CSSProperties;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
};
