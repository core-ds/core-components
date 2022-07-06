import React, { ReactNode, useEffect, UIEvent, forwardRef } from 'react';
import cn from 'classnames';
import computeScrollIntoView from 'compute-scroll-into-view';

import styles from './index.module.css';

export type ScrollableContainerProps = {
    /**
     * Дополнительный класс контейнера
     */
    containerClassName?: string;

    /**
     * Обработчик скрола
     */
    onScroll?: (e: UIEvent<HTMLDivElement>) => void;

    /**
     * Дочерние компоненты
     */
    children: ReactNode;

    /**
     * Активный элемент (всегда будет в видимой области)
     */
    activeChild: HTMLElement | null;
};

export const ScrollableContainer = forwardRef<HTMLDivElement, ScrollableContainerProps>(
    ({ containerClassName, children, activeChild, onScroll }, ref) => {
        useEffect(() => {
            if (activeChild) {
                const actions = computeScrollIntoView(activeChild, {
                    scrollMode: 'if-needed',
                    block: 'nearest',
                    inline: 'nearest',
                });

                // TODO: animate?
                actions.forEach(({ el, left }) => {
                    // eslint-disable-next-line no-param-reassign
                    el.scrollLeft = left;
                });
            }
        }, [activeChild]);

        return (
            <div ref={ref} onScroll={onScroll} className={cn(styles.container, containerClassName)}>
                {children}
            </div>
        );
    },
);
