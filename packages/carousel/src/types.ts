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
    minHeight?: string | number;
    height?: string | number;
    activeIndex?: number;
    defaultActiveIndex?: number;
    onActiveIndexChange?: (nextActiveIndex: number) => void;
    gap?: number;
    visibleItems?: 'auto' | number;
    items?: ItemProps[];
    colors?: 'default' | 'inverted';
    loop?: boolean;
    overflow?: 'hidden' | 'visible';
    mouseWheel?: boolean;
}

export interface CarouselProps<T extends PaginationProps = PaginationProps>
    extends GeneralCarouselProps {
    navigation?: 'hover' | 'always' | 'never';
    navigationPosition?: 'start' | 'center';
    Pagination?: ComponentType<T>;
    paginationProps?: Omit<T, keyof PaginationProps>;
}
