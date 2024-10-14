import React, {
    CSSProperties,
    FC,
    forwardRef,
    ForwardRefRenderFunction,
    PropsWithoutRef,
    ReactNode,
    RefAttributes,
    UIEvent,
    useImperativeHandle,
    useRef,
} from 'react';
import mergeRefs from 'react-merge-refs';
import { useVirtualizer, Virtualizer } from '@tanstack/react-virtual';
import cn from 'classnames';

import { PrivateScrollbar } from '@alfalab/core-components-scrollbar/private-scrollbar';
import { createUseMeasure } from '@alfalab/core-components-shared';

import styles from './index.module.css';

type ScrollableElement = HTMLElement;
type ItemElement = HTMLElement;

interface ListController
    extends Pick<Virtualizer<ScrollableElement, ItemElement>, 'scrollToIndex'> {
    getScrollableElement(): ScrollableElement | null;
}

type ListWidth = 'field' | 'content' | number | string;

type Measurement = Record<'size' | 'start' | 'end', number>;

export interface ListProps<ItemType> {
    height:
        | ((measurements: Measurement[], count: number) => string | number)
        | { visibleItems: number }
        | string
        | number;
    width: ListWidth;
    renderItem: (item: ItemType, index: number) => ReactNode;
    estimateItemSize: number;
    data?: ItemType[];
    /**
     * @default false
     */
    nativeScrollbar?: boolean;
    overscan?: number;
    onScroll?: (event: UIEvent<HTMLElement>) => void;
}

const useContentWidth = createUseMeasure(
    ({ scrollWidth }: HTMLDivElement) => scrollWidth,
    9999 /* MAGIC NUMBER TO EXPAND CONTENT WIDTH */,
);

function ListRenderFunc<ItemType>(
    ...[
        {
            height,
            data = [],
            width,
            nativeScrollbar = false,
            renderItem,
            estimateItemSize,
            overscan,
            onScroll,
        },
        ref,
    ]: Parameters<ForwardRefRenderFunction<ListController, ListProps<ItemType>>>
): ReturnType<ForwardRefRenderFunction<ListController, ListProps<ItemType>>> {
    const matchContentWidth = width === 'content';
    const [contentWidth, contentRef] = useContentWidth();
    const scrollableElementRef = useRef<ScrollableElement>(null);
    const count = data.length;
    const virtualizer = useVirtualizer<ScrollableElement, ItemElement>({
        count,
        estimateSize: () => estimateItemSize,
        getScrollElement: () => scrollableElementRef.current,
        overscan,
    });
    const computeWidth = () => {
        switch (width) {
            case 'content':
                return contentWidth;
            case 'field':
                return '100%';
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
                const cacheSize = measurementsCache.length;

                if (cacheSize === 0) {
                    return Math.min(count, visibleItems + 0.5) * estimateItemSize;
                }

                const itemIndex = Math.min(cacheSize - 1, visibleItems);
                const virtualItem = measurementsCache[itemIndex];

                return cacheSize <= visibleItems + 1
                    ? virtualItem.end
                    : virtualItem.start + virtualItem.size / 2;
            }
        }
    };
    const virtualItems = virtualizer.getVirtualItems();
    const [firstVirtualItem] = virtualItems;
    const style: CSSProperties = {
        height: computeHeight(),
        width: computeWidth(),
    };

    useImperativeHandle(
        ref,
        () => ({
            scrollToIndex(index, options) {
                virtualizer.scrollToIndex(index, options);
            },
            getScrollableElement() {
                return scrollableElementRef.current;
            },
        }),
        [virtualizer],
    );

    return (
        <PrivateScrollbar style={style} native={nativeScrollbar}>
            {({ scrollableNodeProps, contentNodeProps } = {}) => (
                <div
                    {...scrollableNodeProps}
                    ref={mergeRefs([scrollableElementRef, scrollableNodeProps?.ref ?? null])}
                    className={cn(styles.component, scrollableNodeProps?.className, {
                        [styles.nativeScroll]: nativeScrollbar,
                    })}
                    style={nativeScrollbar ? style : undefined}
                    onScroll={onScroll}
                >
                    <div
                        {...contentNodeProps}
                        ref={mergeRefs([contentNodeProps?.ref ?? null])}
                        className={cn(styles.contentWrapper, contentNodeProps?.className)}
                        style={{ height: virtualizer.getTotalSize() }}
                    >
                        <div
                            className={cn(styles.content, {
                                [styles.matchContentWidth]: matchContentWidth,
                            })}
                            ref={matchContentWidth ? contentRef : undefined}
                            style={{
                                transform: `translateY(${firstVirtualItem?.start ?? 0}px)`,
                            }}
                        >
                            {virtualItems.map((virtualItem) => {
                                const { index } = virtualItem;

                                return (
                                    <div
                                        key={virtualItem.key}
                                        ref={virtualizer.measureElement}
                                        // needed for dynamic height measurement
                                        data-index={virtualItem.index}
                                    >
                                        {renderItem?.(data[index], index)}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </PrivateScrollbar>
    );
}

export const List = forwardRef(ListRenderFunc) as <ItemType>(
    ...params: Parameters<FC<PropsWithoutRef<ListProps<ItemType>> & RefAttributes<ListController>>>
) => ReturnType<FC<PropsWithoutRef<ListProps<ItemType>> & RefAttributes<ListController>>>;
