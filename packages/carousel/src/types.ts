import { type ComponentProps, type ComponentType, type ElementType, type ReactNode } from 'react';

export interface ItemProps {
    className?: string;
    key: React.Key;
    width?: number | string;
    height?: number | string;
    children?: ReactNode;
}

export interface PageIndicatorProps {
    activeElement: number;
    elements: number;
    className?: string;
    colors?: string;
}

export interface CarouselProps<T extends PageIndicatorProps = PageIndicatorProps> {
    minHeight?: string | number;
    height?: string | number;
    activeIndex?: number;
    defaultActiveIndex?: number;
    onActiveIndexChange?: (activeIndex: number) => void;
    gap?: number;
    visibleItems?: 'auto' | number;
    items: ItemProps[];
    colors?: 'default' | 'inverted';
    loop?: boolean;
    overflow?: 'hidden' | 'visible';
    mouseWheel?: boolean;

    PageIndicator?: ComponentType<T>;
    pageIndicatorProps?: T;
    Wrapper?: ElementType<ComponentProps<'div'>>;
    Item?: ElementType<ComponentProps<'div'>>;
}
