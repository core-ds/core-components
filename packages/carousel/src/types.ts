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

export interface NavigationProps {
    activeElement: number;
    elements: number;
    className?: string;
    loop?: boolean;
    onActiveElementChange?: (nextActiveElement: number) => void;
}

export interface CarouselContextValue {
    activeElement: number;
    elements: number;
    className?: string;
    colors?: 'default' | 'inverted';
    loop?: boolean;
    onActiveElementChange?: (nextActiveElement: number) => void;
}

export interface LayoutProps<
    T,
    U extends PaginationProps = PaginationProps,
    V extends NavigationProps = NavigationProps,
> {
    layoutProps: T;

    children?: React.ReactNode;

    Pagination: ComponentType<U>;
    paginationProps: U;

    Navigation: ComponentType<V>;
    navigationProps: V;
}

export interface BaseCarouselProps<
    T,
    U extends PaginationProps = PaginationProps,
    V extends NavigationProps = NavigationProps,
> extends GeneralCarouselProps {
    Layout?: ComponentType<LayoutProps<T, U, V>>;
    getLayoutProps: (ctx: CarouselContextValue) => T;

    Pagination?: ComponentType<U>;
    getPaginationProps: (ctx: CarouselContextValue) => U;

    Navigation?: ComponentType<V>;
    getNavigationProps: (ctx: CarouselContextValue) => V;

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
}

export interface CarouselProps<T extends PaginationProps = PaginationProps>
    extends GeneralCarouselProps {
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
