import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { useVirtualizer, Virtualizer } from '@tanstack/react-virtual';
import cn from 'classnames';

import { PrivateScrollbar } from '@alfalab/core-components-scrollbar';
import {
    devWarning,
    internalMergeRefs,
    isNonNullable,
    isNullable,
    useElementWidth,
} from '@alfalab/core-components-shared';

import styles from './index.module.css';

export type PrivateListRefType<
    ScrollElement extends HTMLElement = HTMLDivElement,
    ItemElement extends HTMLDivElement | HTMLLIElement = HTMLDivElement,
> = Virtualizer<ScrollElement, ItemElement>;

type PrivateListWidth = 'field' | 'content' | number | string;

type Measurement = Record<'size' | 'start' | 'end', number>;

export interface PrivateListProps<ItemType, ScrollElement extends HTMLElement = HTMLDivElement> {
    height:
        | ((measurements: Measurement[], count: number) => string | number)
        | { visibleItems: number }
        | string
        | number;
    width?: PrivateListWidth;
    minWidth?: number | string;
    data?: ItemType[];
    renderItem: (item: ItemType, index: number) => React.ReactNode;
    estimateItemSize: number;
    /**
     * @default 15
     */
    overscan?: number;
    /**
     * @default false
     */
    nativeScrollbar?: boolean;
    /**
     * Works only if {@link getScrollElement} is not passed or passed element matches list's internal scroll element
     */
    onScroll?: React.UIEventHandler<HTMLDivElement> | undefined;
    listElement?: Extract<keyof JSX.IntrinsicElements, 'div' | 'ol' | 'ul'>;
    itemElement?: Extract<keyof JSX.IntrinsicElements, 'div' | 'li'>;
    getScrollElement?: () => ScrollElement | null;
}

function PrivateListRenderFunc<
    ItemType,
    ScrollElement extends HTMLElement,
    ItemElement extends HTMLDivElement | HTMLLIElement,
>(
    ...[
        {
            height,
            width,
            minWidth,
            estimateItemSize,
            data = [],
            renderItem,
            overscan = 15,
            nativeScrollbar = false,
            onScroll,
            listElement: ListComponent = 'div',
            itemElement: ItemComponent = 'div',
            getScrollElement,
        },
        ref,
    ]: Parameters<
        React.ForwardRefRenderFunction<
            PrivateListRefType<ScrollElement, ItemElement>,
            PrivateListProps<ItemType, ScrollElement>
        >
    >
): ReturnType<
    React.ForwardRefRenderFunction<
        PrivateListRefType<ScrollElement, ItemElement>,
        PrivateListProps<ItemType, ScrollElement>
    >
> {
    const matchContentWidth = width === 'content';
    const [contentWidth, contentRef] =
        useElementWidth<React.ComponentRef<typeof ListComponent>>(matchContentWidth);
    const scrollElementRef = useRef<ScrollElement | null>(null);
    const count = data.length;
    const virtualizer = useVirtualizer<ScrollElement, ItemElement>({
        count,
        estimateSize: () => estimateItemSize,
        getScrollElement: () => scrollElementRef.current,
        overscan,
    });
    const computeWidth = () => {
        switch (width) {
            case 'content':
                return contentWidth;
            case 'field':
                return undefined;
            default:
                return width;
        }
    };
    const computeHeight = () => {
        const { measurementsCache } = virtualizer;

        switch (typeof height) {
            case 'function':
                return height(
                    measurementsCache.slice() /* always passing a new array not to break a memoized function */,
                    count,
                );
            case 'number':
            case 'string':
                return height;
            default: {
                const { visibleItems } = height;

                if (visibleItems === 0) {
                    return undefined;
                }

                const { scrollOffset } = virtualizer;
                const startItem = isNonNullable(scrollOffset)
                    ? virtualizer.getVirtualItemForOffset(scrollOffset)
                    : measurementsCache[0];

                if (isNullable(startItem)) {
                    return undefined;
                }

                const endIndex = Math.min(
                    measurementsCache.length - 1,
                    startItem.index + visibleItems,
                );
                const endItem = measurementsCache[endIndex];

                return (
                    (endIndex === measurementsCache.length - 1
                        ? endItem.end - Math.ceil(startItem.size / 2)
                        : endItem.start + Math.ceil(endItem.size / 2)) - startItem.start
                );
            }
        }
    };
    const computeMinWidth = () => {
        const fn = matchContentWidth ? 'min' : 'max';

        switch (typeof minWidth) {
            case 'string':
                return `${fn}(${minWidth}, 100%)`;
            case 'number':
                return `${fn}(${minWidth}px, 100%)`;
            default:
                return minWidth;
        }
    };
    const virtualItems = virtualizer.getVirtualItems();
    const [firstVirtualItem] = virtualItems;
    const style: React.CSSProperties = {
        height: computeHeight(),
        width: computeWidth(),
        minWidth,
    };

    const handleScroll: React.UIEventHandler<HTMLDivElement> = (event) => {
        if (!(scrollElementRef.current === event.target)) {
            devWarning(
                "[PrivateList]: onScroll doesn't work with different getScrollElement passed",
            );

            return;
        }

        onScroll?.(event);
    };

    if (isNonNullable(getScrollElement)) {
        const scrollElement = getScrollElement();

        if (!(scrollElementRef.current === scrollElement)) {
            scrollElementRef.current = scrollElement;
        }
    }

    useImperativeHandle(ref, () => virtualizer, [virtualizer]);

    return (
        <PrivateScrollbar style={style} native={nativeScrollbar} tabIndex={-1}>
            {({ scrollableNodeProps, contentNodeProps } = {}) => (
                <div
                    {...scrollableNodeProps}
                    ref={internalMergeRefs([
                        scrollableNodeProps?.ref,
                        isNonNullable(getScrollElement) ? null : scrollElementRef,
                    ])}
                    className={cn(styles.component, scrollableNodeProps?.className, {
                        [styles.nativeScrollbar]: nativeScrollbar && matchContentWidth,
                    })}
                    style={nativeScrollbar ? style : undefined}
                    onScroll={handleScroll}
                >
                    <div
                        {...contentNodeProps}
                        ref={internalMergeRefs([contentNodeProps?.ref])}
                        className={cn(styles.contentWrapper, contentNodeProps?.className, {
                            [styles.matchContent]: matchContentWidth,
                        })}
                        style={{ height: virtualizer.getTotalSize() }}
                    >
                        <ListComponent
                            ref={internalMergeRefs([contentRef])}
                            className={styles.content}
                            style={{
                                minWidth: computeMinWidth(),
                                transform: `translateY(${firstVirtualItem?.start ?? 0}px)`,
                            }}
                        >
                            {virtualItems.map(({ key, index }) => (
                                <ItemComponent
                                    key={key.toString()}
                                    ref={internalMergeRefs<HTMLElement | undefined>([
                                        virtualizer.measureElement,
                                    ])}
                                    data-index={index}
                                >
                                    {renderItem(data[index], index)}
                                </ItemComponent>
                            ))}
                        </ListComponent>
                    </div>
                </div>
            )}
        </PrivateScrollbar>
    );
}

/**
 * @deprecated
 */
export const PrivateList = forwardRef(PrivateListRenderFunc) as React.ForwardRefExoticComponent<
    React.PropsWithoutRef<PrivateListProps<never, never>> &
        React.RefAttributes<PrivateListRefType<never, never>>
> &
    (<
        ItemType,
        ScrollElement extends HTMLDivElement = HTMLDivElement,
        ItemElement extends HTMLDivElement | HTMLLIElement = HTMLDivElement,
    >(
        ...params: Parameters<
            React.ForwardRefExoticComponent<
                React.PropsWithoutRef<PrivateListProps<ItemType, ScrollElement>> &
                    React.RefAttributes<PrivateListRefType<ScrollElement, ItemElement>>
            >
        >
    ) => ReturnType<
        React.ForwardRefExoticComponent<
            React.PropsWithoutRef<PrivateListProps<ItemType, ScrollElement>> &
                React.RefAttributes<PrivateListRefType<ScrollElement, ItemElement>>
        >
    >);
