import React, { ReactNode, useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { compute } from 'compute-scroll-into-view';

import { PlatformProps, TabsProps } from '../../typings';
import { ScrollControls } from '../scroll-controls';

import styles from './index.module.css';

/**
 * Дополнительная прокрутка при клике на не поместившийся таб
 */
const ADDITIONAL_SCROLL_LEFT_VALUE = 50;

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
};

const isOverflown = (
    { clientWidth, scrollWidth }: HTMLDivElement,
    controlsNode: HTMLDivElement | null,
) => {
    const controlsWidth = controlsNode?.offsetWidth || 0;

    return scrollWidth > clientWidth + controlsWidth;
};

export const ScrollableContainer = ({
    containerWrapperClassName,
    containerClassName,
    scrollControlsClassName,
    children,
    activeChild,
    fullWidthScroll,
    view,
    size,
    platform,
    inlineStyle,
}: ScrollableContainerProps & Pick<TabsProps, 'fullWidthScroll'> & PlatformProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const controlsRef = useRef<HTMLDivElement>(null);
    const [overflown, setOverflown] = useState(false);

    useEffect(() => {
        if (activeChild) {
            const actions = compute(activeChild, {
                scrollMode: 'if-needed',
                block: 'nearest',
                inline: 'nearest',
                boundary: (parent) => !parent.isSameNode(containerRef.current),
            });

            // TODO: animate?
            actions.forEach(({ el, left }) => {
                // eslint-disable-next-line no-param-reassign
                el.scrollLeft =
                    el.scrollLeft > left
                        ? left - ADDITIONAL_SCROLL_LEFT_VALUE
                        : left + ADDITIONAL_SCROLL_LEFT_VALUE;
            });
        }
    }, [activeChild]);

    useEffect(() => {
        const scrollableNode = containerRef.current;
        const tabsContainer = scrollableNode?.firstElementChild;

        if (platform === 'desktop' && scrollableNode && tabsContainer && window.ResizeObserver) {
            const observerCb = () => {
                if (isOverflown(scrollableNode, controlsRef.current)) {
                    setOverflown(true);
                } else {
                    setOverflown(false);
                }
            };

            const observer = new ResizeObserver(observerCb);

            observer.observe(scrollableNode);
            observer.observe(tabsContainer);

            return () => observer.disconnect();
        }

        return () => {};
    }, [platform]);

    return (
        <div
            className={cn(styles.scrollableContainerWrapper, containerWrapperClassName)}
            style={inlineStyle}
        >
            <div
                ref={containerRef}
                className={cn(styles.container, containerClassName, {
                    [styles.fullWidthScroll]: fullWidthScroll,
                })}
            >
                {children}
            </div>
            {overflown && platform === 'desktop' ? (
                <ScrollControls
                    className={scrollControlsClassName}
                    ref={controlsRef}
                    containerRef={containerRef}
                    view={view}
                    size={size}
                />
            ) : null}
        </div>
    );
};
