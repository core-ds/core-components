import React, { type ReactNode } from 'react';

import { type PlatformProps, type TabsProps } from '../../typings';

import { ScrollableContainerDesktop } from './Component.desktop';
import { ScrollableContainerMobile } from './Component.mobile';

export type ScrollableContainerProps = {
    /**
     * Дополнительный класс враппера контейнера
     */
    containerWrapperClassName?: string;

    /**
     * Дополнительный класс контейнера
     */
    containerClassName?: string;

    /**
     * Дополнительный класс кнопок прокрутки
     */
    scrollControlsClassName?: string;

    /**
     * Дочерние компоненты
     */
    children: ReactNode;

    /**
     * Активный элемент (всегда будет в видимой области)
     */
    activeChild: HTMLElement | null;

    /**
     * Внешний вид заголовков табов
     */
    view: Exclude<TabsProps['view'], undefined>;

    /**
     *  Размер
     */
    size: TabsProps['size'];

    /**
     * Дополнительные инлайн стили для заголовка
     */
    inlineStyle?: React.CSSProperties;

    /**
     * Показать скелетон
     */
    showSkeleton?: boolean;
};

export const ScrollableContainer = ({
    platform,
    ...restProps
}: ScrollableContainerProps & Pick<TabsProps, 'fullWidthScroll'> & PlatformProps) => {
    if (platform === 'desktop') {
        return <ScrollableContainerDesktop {...restProps} />;
    }

    return <ScrollableContainerMobile {...restProps} />;
};
