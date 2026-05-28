import React, { type ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';

import { NoopComponent, PassThroughComponent } from '@alfalab/core-components-shared';
import { useLayoutEffect_SAFE_FOR_SSR } from '@alfalab/hooks';

import { CarouselContext } from './context';
import { type CoordsCallback, type SwipeCallback, useMouseWheel, useSwipe } from './hooks';
import { type CarouselContextValue, type HeadlessCarouselProps } from './types';
import { clamp, findActiveIndex, getStylePropertyValue, sum } from './utils';

import styles from './index.module.css';

export function HeadlessCarousel<T, U, V>({
    activeIndex: activeIndexFromProps,
    defaultActiveIndex = 0,
    onActiveIndexChange,
    visibleItems: visibleItemsFromProps = 'auto',
    gap = 8,
    height = 'auto',
    minHeight,
    items = [],
    colors = 'default',
    Layout = PassThroughComponent,
    layoutProps,
    Navigation = NoopComponent,
    navigationProps,
    Pagination = NoopComponent,
    paginationProps,
    Wrapper = 'div',
    Item = 'div',
    overflow = 'hidden',
    mouseWheel,
    touchMoveStopPropagation = false,
    captureEvent = false,
    loop = false,
    shortSwipe = true,
    longSwipeTimeMs = 300,
}: HeadlessCarouselProps<T, U, V>): ReactNode {
    const visibleItems =
        visibleItemsFromProps === 'auto' ? 'auto' : clamp(visibleItemsFromProps, 1, items.length);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [translate, setTranslate] = useState(0);
    const uncontrolled = activeIndexFromProps === undefined;
    const [swiping, setSwiping] = useState(false);
    const [activeIndex, setActiveIndex] = useState(() =>
        Math.max(activeIndexFromProps ?? defaultActiveIndex, 0),
    );
    const [sizes, setSizes] = useState<number[]>([]);
    const [containerSize, setContainerSize] = useState<number>(0);
    const snaps = useMemo<number[]>(() => {
        const DEFAULT_TRANSLATE = 0;
        const result = [DEFAULT_TRANSLATE];
        const [min] = result;
        const max = Math.max(sizes.reduce(sum, 0) + gap * (sizes.length - 1) - containerSize, min);

        if (max !== min) {
            for (let index = 0; index < sizes.length; index++) {
                const size = sizes[index];
                const nextSnap = Math.min(result[index] + size + gap, max);

                result.push(nextSnap);

                if (nextSnap >= max) {
                    break;
                }
            }
        }

        return result;
    }, [containerSize, gap, sizes]);

    const count =
        visibleItems === 'auto' ? snaps.length : items.length - Math.floor(visibleItems) + 1;

    const contextValue = useMemo<CarouselContextValue>(
        () => ({
            activeIndex,
            count,
            colors,
            loop,
            onActiveIndexChange: (nextActiveIndex: number) => {
                if (nextActiveIndex !== activeIndex) {
                    onActiveIndexChange?.(nextActiveIndex);

                    if (uncontrolled) {
                        setActiveIndex(nextActiveIndex);
                    }
                }
            },
        }),
        [activeIndex, colors, count, loop, onActiveIndexChange, uncontrolled],
    );

    const handleSwipeStart = () => {
        setSwiping(true);
    };

    const handleSwiping: SwipeCallback = ({ currentX, previousX }) => {
        const resistanceRatio = 0.85;
        const delta = currentX! - previousX!;
        const [min] = snaps;
        const max = snaps[snaps.length - 1];

        setTranslate((prevTranslate) => {
            const next = prevTranslate - delta;

            if (next < min || next > max) {
                return prevTranslate - Math.abs(delta) ** resistanceRatio * Math.sign(delta);
            }

            return next;
        });
    };

    const handleSwipeStop: SwipeCallback = ({ startX, currentX }, { isMoved, startTime }) => {
        setSwiping(false);

        let nextActiveIndex = findActiveIndex(translate, snaps, sizes);

        if (
            shortSwipe &&
            isMoved &&
            nextActiveIndex === activeIndex &&
            Date.now() - startTime! <= longSwipeTimeMs
        ) {
            const shift = currentX! - startX! > 0 ? -1 : 1;

            nextActiveIndex = clamp(activeIndex + shift, 0, snaps.length - 1);
        }

        contextValue.onActiveIndexChange(nextActiveIndex);
    };

    const handleMouseWheel: CoordsCallback = ({ currentX, previousX }) => {
        const delta = currentX! - previousX!;
        const [min] = snaps;
        const max = snaps[snaps.length - 1];

        setTranslate((prevTranslate) => clamp(prevTranslate - delta, min, max));
    };

    const handleMouseWheelStop = () => {
        setSwiping(false);

        const nextActiveIndex = findActiveIndex(translate, snaps, sizes);

        contextValue.onActiveIndexChange(nextActiveIndex);
    };

    useLayoutEffect_SAFE_FOR_SSR(() => {
        const listener = () => {
            const wrapper = wrapperRef.current;

            if (wrapper) {
                const container = wrapper.parentElement! as HTMLDivElement;
                const nodes = Array.from(
                    wrapper.querySelectorAll<HTMLDivElement>(`.${styles.wrapper} > [data-index]`),
                );

                const nextContainerSize =
                    container.clientWidth -
                    ['padding-left', 'padding-right']
                        .map((prop) => parseFloat(getStylePropertyValue(container, prop)))
                        .reduce(sum);

                setSizes(
                    nodes.map((node) => {
                        if (visibleItems === 'auto') {
                            const { width } = node.getBoundingClientRect();

                            return width;
                        }

                        return (
                            (nextContainerSize - gap * (Math.ceil(visibleItems) - 1)) / visibleItems
                        );
                    }),
                );

                setContainerSize(nextContainerSize);
            } else {
                setSizes([]);
                setContainerSize(0);
            }
        };

        const ro = new ResizeObserver(listener);
        const wrapper = wrapperRef.current;

        [wrapper, wrapper?.parentElement].forEach((node) => {
            if (node) {
                ro.observe(node);
            }
        });

        // sync call to optimize render
        listener();

        return () => ro.disconnect();
    }, [gap, visibleItems]);

    useEffect(
        () =>
            setActiveIndex((prevActiveIndex) =>
                clamp(activeIndexFromProps ?? prevActiveIndex, 0, snaps.length - 1),
            ),
        [activeIndexFromProps, snaps.length],
    );

    useLayoutEffect_SAFE_FOR_SSR(() => {
        if (!swiping) {
            setTranslate(snaps[activeIndex]);
        }
    }, [snaps, activeIndex, swiping]);

    const [swipeRef, getStyle] = useSwipe<HTMLDivElement>(
        'x',
        {
            onStartSwipe: handleSwipeStart,
            onSwiping: handleSwiping,
            onStopSwipe: handleSwipeStop,
        },
        { touchMoveStopPropagation, captureEvent },
    );

    const [mouseWheelRef] = useMouseWheel<HTMLDivElement>('x', {
        onStartSwipe: handleSwipeStart,
        onSwiping: handleMouseWheel,
        onStopSwipe: handleMouseWheelStop,
    });

    return (
        <CarouselContext.Provider value={contextValue}>
            <Layout
                layoutProps={layoutProps}
                Navigation={Navigation}
                navigationProps={navigationProps}
                Pagination={Pagination}
                paginationProps={paginationProps}
            >
                <div
                    ref={mergeRefs([swipeRef, mouseWheel ? mouseWheelRef : null])}
                    className={cn(styles.container)}
                    style={{ ...getStyle(), height, minHeight, overflow }}
                >
                    <Wrapper
                        ref={wrapperRef}
                        style={{ transform: `translate(${-translate}px, 0px)` }}
                        className={cn(styles.wrapper, { [styles.swiping]: swiping })}
                    >
                        {items.map((item, index) => {
                            const width = visibleItems === 'auto' ? item.width : sizes[index];
                            const itemHeight = height === 'auto' ? item.height : undefined;

                            return (
                                <Item
                                    key={item.key}
                                    data-index={index}
                                    className={cn(styles.item, item.className)}
                                    style={{ marginRight: gap, width, height: itemHeight }}
                                >
                                    {item.children}
                                </Item>
                            );
                        })}
                    </Wrapper>
                </div>
            </Layout>
        </CarouselContext.Provider>
    );
}
