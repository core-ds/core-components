import React, { useEffect, useRef } from 'react';
import cn from 'classnames';
import { compute } from 'compute-scroll-into-view';

import { type TabsProps } from '../../typings';

import { type ScrollableContainerProps } from './Component.responsive';

import styles from './index.module.css';

/**
 * Дополнительная прокрутка при клике на не поместившийся таб
 */
const ADDITIONAL_SCROLL_LEFT_VALUE = 50;

export const ScrollableContainerMobile = ({
    containerWrapperClassName,
    containerClassName,
    children,
    activeChild,
    fullWidthScroll,
    inlineStyle,
}: ScrollableContainerProps & Pick<TabsProps, 'fullWidthScroll'>) => {
    const containerRef = useRef<HTMLDivElement>(null);

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
        </div>
    );
};
