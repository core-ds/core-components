/* eslint-disable @typescript-eslint/ban-types */
import { type ComponentProps, type ComponentType, type ElementType, type ReactNode } from 'react';

export interface ItemProps {
    className?: string;
    key: React.Key;
    width?: number | string;
    height?: number | string;
    children?: ReactNode;
}

export interface PaginationProps {
    activeElement: number;
    elements?: number;
    className?: string;
}

export interface CarouselContextValue {
    activeIndex: number;
    onActiveIndexChange: (nextActiveElement: number) => void;
    count: number;
    colors?: 'default' | 'inverted';
    loop?: boolean;
}

export interface LayoutProps<T = {}, U = {}, V = {}> {
    layoutProps: T;

    children?: React.ReactNode;

    Pagination: ComponentType<U>;
    paginationProps: U;

    Navigation: ComponentType<V>;
    navigationProps: V;
}

export interface HeadlessCarouselProps<T, U, V> extends GeneralCarouselProps {
    Layout?: ComponentType<LayoutProps<T, U, V>>;
    layoutProps: T;

    Pagination?: ComponentType<U>;
    paginationProps: U;

    Navigation?: ComponentType<V>;
    navigationProps: V;

    Wrapper?: ElementType<ComponentProps<'div'>>;
    Item?: ElementType<ComponentProps<'div'>>;
}

export interface GeneralCarouselProps {
    /**
     * Минимальная высота карусели
     */
    minHeight?: string | number;
    /**
     * Высота карусели
     * @default auto
     */
    height?: string | number;
    /**
     * Индекс активного элемента карусели
     */
    activeIndex?: number;
    /**
     * Индекс активного элемента карусели по-умолчанию
     */
    defaultActiveIndex?: number;
    /**
     * Обработчик изменения индекса активного элемента карусели
     */
    onActiveIndexChange?: (nextActiveIndex: number) => void;
    /**
     * Отступ между элементами карусели
     * @default 8
     */
    gap?: number;
    /**
     * Количество видимых элементов карусели
     * @default auto
     */
    visibleItems?: 'auto' | number;
    /**
     * Массив элементов карусели
     * @default auto
     */
    items?: ItemProps[];
    /**
     * Набор цветов для карусели
     * @default default
     */
    colors?: 'default' | 'inverted';
    /**
     * Зациклена ли карусель
     * @default false
     */
    loop?: boolean;
    /**
     * Поведение при переполнении контента элементов карусели
     * @default hidden
     */
    overflow?: 'hidden' | 'visible';
    /**
     * Управление каруселью через колесо мыши
     * @default false
     */
    mouseWheel?: boolean;
    /**
     * Остановка всплытия событий при свайпе
     * @default false
     */
    touchMoveStopPropagation?: boolean;
    /**
     * Захват события при свайпе
     * @default false
     */
    captureEvent?: boolean;
}

export interface CarouselProps<T extends PaginationProps> extends GeneralCarouselProps {
    /**
     * Управление каруселью через кнопки навигации
     * @default never
     */
    navigation?: 'hover' | 'always' | 'never';
    /**
     * Положение кнопок навигации
     * @default center
     */
    navigationPosition?: 'start' | 'center';
    /**
     * Компонент для рендера пагинации
     */
    Pagination?: ComponentType<T>;
    /**
     * Дополнительные пропс для компонента пагинации
     */
    paginationProps?: Omit<T, keyof PaginationProps>;
}
