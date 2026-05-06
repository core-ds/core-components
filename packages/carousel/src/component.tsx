import React, { type ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';

import { NoopComponent, PassThroughComponent } from '@alfalab/core-components-shared';
import { useLayoutEffect_SAFE_FOR_SSR } from '@alfalab/hooks';

import { AnimatedWrapper } from './components/animated-wrapper';
import { Layout as DefaultLayout } from './components/layout';
import { Navigation as DefaultNavigation } from './components/navigation';
import { type CoordsCallback, useMouseWheel, useSwipe } from './hook';
import {
    type BaseCarouselProps,
    type CarouselProps,
    type NavigationProps,
    type PaginationProps,
} from './types';
import { clamp, findActiveIndex, getStylePropertyValue, identity, sum } from './utils';

import styles from './index.module.css';

export function BaseCarousel<T, U extends PaginationProps, V extends NavigationProps>({
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
    getLayoutProps,
    Navigation = NoopComponent,
    getNavigationProps,
    Pagination = NoopComponent,
    getPaginationProps,
    Wrapper = 'div',
    Item = 'div',
    overflow = 'hidden',
    mouseWheel,
    loop,
}: BaseCarouselProps<T, U, V>): ReactNode {
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

    const handleActiveIndexChange = (nextActiveIndex: number) => {
        if (nextActiveIndex !== activeIndex) {
            onActiveIndexChange?.(nextActiveIndex);

            if (uncontrolled) {
                setActiveIndex(nextActiveIndex);
            }
        }
    };

    const handleSwipeStart: CoordsCallback = () => {
        setSwiping(true);
    };

    const handleMouseWheel: CoordsCallback = ({ currentX, currentY, previousX, previousY }) => {
        const deltaX = currentX! - previousX!;
        const deltaY = currentY! - previousY!;
        const delta = Math.abs(deltaX) > Math.abs(deltaY) ? deltaX : deltaY;
        const [min] = snaps;
        const max = snaps[snaps.length - 1];

        setTranslate((prevTranslate) => clamp(prevTranslate - delta, min, max));
    };

    const handleSwiping: CoordsCallback = ({ currentX, previousX }) => {
        const resistanceRatio = 0.85;
        const delta = (currentX! - previousX!) * resistanceRatio;

        setTranslate((prevTranslate) => prevTranslate - delta);
    };

    const handleSwipeStop: CoordsCallback = () => {
        setSwiping(false);

        const nextActiveIndex = findActiveIndex(translate, snaps, sizes);

        handleActiveIndexChange(nextActiveIndex);
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

    const count =
        visibleItems === 'auto' ? snaps.length : items.length - Math.floor(visibleItems) + 1;

    const [ref, getStyle] = useSwipe<HTMLDivElement>('x', {
        onStartSwipe: handleSwipeStart,
        onSwiping: handleSwiping,
        onStopSwipe: handleSwipeStop,
    });

    const [mouseWheelRef] = useMouseWheel<HTMLDivElement>({
        onStartSwipe: handleSwipeStart,
        onSwiping: handleMouseWheel,
        onStopSwipe: handleSwipeStop,
    });

    const contextValue = {
        activeElement: activeIndex,
        elements: count,
        colors,
        loop,
        onActiveElementChange: handleActiveIndexChange,
    };

    return (
        <Layout
            layoutProps={getLayoutProps(contextValue)}
            Navigation={Navigation}
            navigationProps={getNavigationProps(contextValue)}
            Pagination={Pagination}
            paginationProps={getPaginationProps(contextValue)}
        >
            <div
                ref={mergeRefs([ref, mouseWheel ? mouseWheelRef : null])}
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
    );
}

export function Carousel<T extends PaginationProps>({
    navigation = 'never',
    navigationPosition = 'center',
    Pagination = NoopComponent,
    paginationProps,
    ...restProps
}: CarouselProps<T>): ReactNode {
    return (
        <BaseCarousel
            {...restProps}
            Wrapper={AnimatedWrapper}
            Layout={DefaultLayout}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            Pagination={Pagination}
            Navigation={navigation === 'never' ? NoopComponent : DefaultNavigation}
            getNavigationProps={identity}
            getPaginationProps={(ctx) => ({ ...paginationProps, ...ctx })}
            getLayoutProps={() => ({
                navigationDisplay: navigation,
                navigationPosition,
            })}
        />
    );
}
