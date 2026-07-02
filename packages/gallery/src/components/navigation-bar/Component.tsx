import React, { type FC, useCallback, useContext, useEffect, useRef, useState } from 'react';
import cn from 'classnames';

import { GalleryContext } from '../../context';
import { getImageKey, TestIds } from '../../utils';
import { ImagePreview } from '../image-preview';

import styles from './index.module.css';

const MIN_SCROLL_STEP = 24;
const DRAG_CLICK_THRESHOLD = 5;

export const NavigationBar: FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const dragStartXRef = useRef<number>(0);
    const dragStartScrollLeftRef = useRef<number>(0);
    const suppressClickRef = useRef<boolean>(false);

    const [isDragging, setIsDragging] = useState<boolean>(false);

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

    const handlePreviewMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.button !== 0 || !containerRef.current) {
            return;
        }

        dragStartXRef.current = e.clientX;
        dragStartScrollLeftRef.current = containerRef.current.scrollLeft;
        suppressClickRef.current = false;
        setIsDragging(true);
    };

    const handlePreviewMouseUp = useCallback(() => {
        setIsDragging(false);
    }, []);

    const dragTo = useCallback((clientX: number) => {
        const container = containerRef.current;

        if (!container) {
            return;
        }

        const deltaX = clientX - dragStartXRef.current;

        if (Math.abs(deltaX) > DRAG_CLICK_THRESHOLD) {
            suppressClickRef.current = true;
        }

        container.scrollLeft = dragStartScrollLeftRef.current - deltaX;
    }, []);

    const handleMouseNavigationMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isDragging) {
            return;
        }

        dragTo(e.clientX);
    };

    const handleClickCapture = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!suppressClickRef.current) {
            return;
        }

        e.preventDefault();
        e.stopPropagation();
        suppressClickRef.current = false;
    };

    useEffect(() => {
        if (!isDragging) {
            return undefined;
        }

        const handleDocumentMouseMove = (event: MouseEvent) => {
            dragTo(event.clientX);
        };

        document.addEventListener('mousemove', handleDocumentMouseMove);
        document.addEventListener('mouseup', handlePreviewMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleDocumentMouseMove);
            document.removeEventListener('mouseup', handlePreviewMouseUp);
        };
    }, [dragTo, handlePreviewMouseUp, isDragging]);

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
            className={cn(styles.component, {
                [styles.mobile]: view === 'mobile',
                [styles.dragging]: isDragging,
            })}
            ref={containerRef}
            data-test-id={TestIds.NAVIGATION_BAR}
            onMouseDown={handlePreviewMouseDown}
            onMouseUp={handlePreviewMouseUp}
            onMouseMove={handleMouseNavigationMove}
            onClickCapture={handleClickCapture}
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
