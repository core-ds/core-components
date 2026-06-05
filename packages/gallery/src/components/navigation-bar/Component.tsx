import React, { type FC, useCallback, useContext, useEffect, useRef, useState } from 'react';
import cn from 'classnames';

import { GalleryContext } from '../../context';
import { getImageKey, TestIds } from '../../utils';
import { ImagePreview } from '../image-preview';

import styles from './index.module.css';

const MIN_SCROLL_STEP = 24;
const SCROLL_SPEED = 0.05;
const SCROLL_THRESHOLD = 150;

export const NavigationBar: FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const mousePositionRef = useRef<number>(0);
    const animationFrameRef = useRef<number | undefined>(undefined);
    const previousFrameTimeRef = useRef<number | undefined>(undefined);

    const [isNavMouseDowned, setIsNavMouseDowned] = useState<boolean>(false);

    const { images, currentSlideIndex, setCurrentSlideIndex, getSwiper, setPlayingVideo, view } =
        useContext(GalleryContext);

    const swiper = getSwiper();

    const handlePreviewSelect = (index: number) => {
        setCurrentSlideIndex?.(index);

        if (swiper) {
            setPlayingVideo(true);
            swiper.slideTo(index);
        }
    };

    const scroll = useCallback((scrollValue: number) => {
        if (containerRef.current) {
            containerRef.current.scroll({
                top: 0,
                left: containerRef.current.scrollLeft + scrollValue,
                behavior: 'smooth',
            });
        }
    }, []);

    const stopAutoScroll = useCallback(() => {
        if (animationFrameRef.current !== undefined) {
            cancelAnimationFrame(animationFrameRef.current);
            animationFrameRef.current = undefined;
        }

        previousFrameTimeRef.current = undefined;
    }, []);

    const startAutoScroll = useCallback(() => {
        if (animationFrameRef.current !== undefined) {
            return;
        }

        const scrollToMousePosition = (time: number) => {
            const container = containerRef.current;

            if (!container) {
                stopAutoScroll();

                return;
            }

            const { width: containerWidth, left: containerLeft } =
                container.getBoundingClientRect();
            const rightThreshold = containerLeft + containerWidth - SCROLL_THRESHOLD;
            const leftThreshold = containerLeft + SCROLL_THRESHOLD;
            const mouseX = mousePositionRef.current;
            const previousFrameTime = previousFrameTimeRef.current ?? time;
            const frameDuration = time - previousFrameTime;

            previousFrameTimeRef.current = time;

            if (mouseX > rightThreshold) {
                container.scrollLeft += (mouseX - rightThreshold) * SCROLL_SPEED * frameDuration;
            } else if (mouseX < leftThreshold) {
                container.scrollLeft += (mouseX - leftThreshold) * SCROLL_SPEED * frameDuration;
            }

            animationFrameRef.current = requestAnimationFrame(scrollToMousePosition);
        };

        animationFrameRef.current = requestAnimationFrame(scrollToMousePosition);
    }, [stopAutoScroll]);

    const handlePreviewMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        mousePositionRef.current = e.clientX;
        setIsNavMouseDowned(true);
        startAutoScroll();
    };

    const handlePreviewMouseUp = () => {
        setIsNavMouseDowned(false);
        stopAutoScroll();
    };

    const handleMouseNavigationMove = (e: React.MouseEvent<HTMLDivElement>) => {
        mousePositionRef.current = e.clientX;

        if (isNavMouseDowned) {
            startAutoScroll();
        }
    };

    useEffect(() => stopAutoScroll, [stopAutoScroll]);

    const handlePreviewPosition = useCallback(
        (preview: Element, containerWidth: number) => {
            const { right, left, x } = preview.getBoundingClientRect();

            if (view === 'mobile') {
                scroll(x - containerWidth / 2 + MIN_SCROLL_STEP); // Передвигаем в центр активное превью
            }

            if (right > containerWidth) {
                const scrollValue = right - containerWidth + MIN_SCROLL_STEP;

                scroll(scrollValue);
            } else if (left < 0) {
                const scrollValue = left - MIN_SCROLL_STEP;

                scroll(scrollValue);
            }
        },
        [scroll, view],
    );

    useEffect(() => {
        if (containerRef.current) {
            const { width: containerWidth } = containerRef.current.getBoundingClientRect();

            const activePreview = containerRef.current.children[currentSlideIndex];

            if (activePreview) {
                handlePreviewPosition(activePreview, containerWidth);
            }
        }
    }, [currentSlideIndex, handlePreviewPosition, scroll]);

    return (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div
            className={cn(styles.component, { [styles.mobile]: view === 'mobile' })}
            ref={containerRef}
            data-test-id={TestIds.NAVIGATION_BAR}
            onMouseDown={handlePreviewMouseDown}
            onMouseUp={handlePreviewMouseUp}
            onMouseMove={handleMouseNavigationMove}
        >
            {images.map((image, index) => {
                const active = index === currentSlideIndex;

                return (
                    <ImagePreview
                        key={getImageKey(image, index)}
                        image={image}
                        active={active}
                        index={index}
                        onSelect={handlePreviewSelect}
                        className={cn(styles.preview, { [styles.mobile]: view === 'mobile' })}
                    />
                );
            })}
        </div>
    );
};
