import React, { type ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import cn from 'classnames';

import { noop, NoopComponent } from '@alfalab/core-components-shared';
import { useLayoutEffect_SAFE_FOR_SSR } from '@alfalab/hooks';

import { AnimatedWrapper } from './components/animated-wrapper';
import { type SwipeCallback, useSwipe } from './hook';
import { type CarouselProps, type PageIndicatorProps } from './types';
import { clamp, findActiveIndex, getStylePropertyValue, sum } from './utils';

import styles from './index.module.css';

export function Carousel<T extends PageIndicatorProps>({
    activeIndex: activeIndexFromProps,
    defaultActiveIndex = 0,
    onActiveIndexChange,
    visibleItems: visibleItemsFromProps = 'auto',
    gap = 8,
    height = 'auto',
    minHeight,
    items,
    colors = 'default',
    PageIndicator = NoopComponent,
    pageIndicatorProps = { colors } as T,
    Wrapper = AnimatedWrapper,
    Item = 'div',
    overflow = 'hidden',
}: CarouselProps<T>): ReactNode {
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
        const [MIN_TRANSLATE] = result;
        const MAX_TRANSLATE = Math.max(
            sizes.reduce(sum, 0) + gap * (sizes.length - 1) - containerSize,
            MIN_TRANSLATE,
        );

        if (MAX_TRANSLATE !== MIN_TRANSLATE) {
            for (let index = 0; index < sizes.length; index++) {
                const size = sizes[index];
                const nextSnap = Math.min(result[index] + size + gap, MAX_TRANSLATE);

                result.push(nextSnap);

                if (nextSnap >= MAX_TRANSLATE) {
                    break;
                }
            }
        }

        return result;
    }, [containerSize, gap, sizes]);

    const handleSwipeStart: SwipeCallback = () => {
        setSwiping(true);
    };

    const handleSwiping: SwipeCallback = ({ currentX, previousX }) => {
        const resistanceRatio = 0.85;
        const delta = (currentX! - previousX!) * resistanceRatio;

        setTranslate((prevTranslate) => prevTranslate - delta);
    };

    const handleSwipeStop: SwipeCallback = () => {
        setSwiping(false);

        const nextActiveIndex = findActiveIndex(translate, snaps, sizes);

        if (nextActiveIndex === activeIndex) {
            setTranslate(snaps[activeIndex]);
        } else {
            onActiveIndexChange?.(nextActiveIndex);

            if (uncontrolled) {
                setActiveIndex(nextActiveIndex);
            }
        }
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

    useLayoutEffect_SAFE_FOR_SSR(
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

    const total =
        visibleItems === 'auto' ? snaps.length : items.length - Math.floor(visibleItems) + 1;

    const [ref, getStyle] = useSwipe<HTMLDivElement>('x', {
        onStartSwipe: handleSwipeStart,
        onSwiping: handleSwiping,
        onStopSwipe: handleSwipeStop,
    });

    return (
        <div className={styles.component}>
            <div
                ref={ref}
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
            <PageIndicator
                {...pageIndicatorProps}
                className={cn(styles.pagination, pageIndicatorProps.className)}
                activeElement={activeIndex}
                elements={total}
            />
        </div>
    );
}

// TODO mouse wheel
export function useMouseWheel<T extends HTMLElement = HTMLElement>(
    timeout: number = 500,
): [getDirection: (event: React.WheelEvent<T>) => number, ref: React.Ref<T>] {
    const ref = useRef<T>(null);
    const delta = useRef(0);

    useEffect(() => {
        const node = ref.current;

        if (node) {
            const listener = (event: WheelEvent) => {
                event.preventDefault();
            };

            node.addEventListener('wheel', listener, { capture: true, passive: false });

            return () => {
                node.removeEventListener('wheel', listener, { capture: true });
            };
        }

        return noop;
    }, []);
    /*
     * -1 => backward
     * 0 => nothing
     * 1 => forward
     */
    const direction = useRef(0);
    const timer = useRef<number>();

    const getDirection = ({ deltaX, deltaY }: React.WheelEvent<Element>): number => {
        const lastDelta = delta.current;
        const lastDirection = direction.current;
        const nextDelta = Math.max(Math.abs(deltaX), Math.abs(deltaY));
        const nextDirection = Math.sign(Math.abs(deltaX) > Math.abs(deltaY) ? deltaX : deltaY);

        delta.current = nextDelta;
        direction.current = nextDirection;

        if (lastDirection === nextDirection || lastDelta > nextDelta || deltaX === deltaY) {
            return 0;
        }

        clearTimeout(timer.current);

        timer.current = window.setTimeout(() => {
            direction.current = 0;
            delta.current = 0;
        }, timeout);

        return nextDirection;
    };

    return [getDirection, ref];
}
