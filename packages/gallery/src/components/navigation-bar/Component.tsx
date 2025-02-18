import React, {
    FC,
    KeyboardEventHandler,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react';
import throttle from 'lodash.throttle';

import { GalleryContext } from '../../context';
import { getImageKey, TestIds } from '../../utils';
import { ImagePreview } from '../image-preview';

import styles from './index.module.css';

const MIN_SCROLL_STEP = 24;
const SCROLL_SPEED = 2; // Коэффициент скорости прокрутки (можно настроить)
const SCROLL_THRESHOLD = 150; // Расстояние от границы, при котором начинается прокрутка

export const NavigationBar: FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

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

    const handlePreviewMouseDown = () => {
        setIsNavMouseDowned(true);
    };

    const handlePreviewMouseUp = () => {
        setIsNavMouseDowned(false);
        if (containerRef.current) {
            containerRef.current.style.scrollBehavior = 'auto'; // Отключаем плавность для резкой остановки
        }
    };

    const handleMouseNavigationMove = throttle((e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current || !isNavMouseDowned) return;

        const container = containerRef.current;
        const { width: containerWidth, left: containerLeft } = container.getBoundingClientRect();
        const mouseX = e.clientX;

        // Если курсор близко к правой границе
        if (mouseX > containerWidth + containerLeft - SCROLL_THRESHOLD) {
            const scrollValue =
                (mouseX - (containerWidth + containerLeft - SCROLL_THRESHOLD)) * SCROLL_SPEED;

            container.scrollBy({ left: scrollValue, behavior: 'smooth' });
        }
        // Если курсор близко к левой границе
        else if (mouseX < containerLeft + SCROLL_THRESHOLD) {
            const scrollValue = (mouseX - (containerLeft + SCROLL_THRESHOLD)) * SCROLL_SPEED;

            container.scrollBy({ left: scrollValue, behavior: 'smooth' });
        }
    }, 150);

    const handleKeyDown: KeyboardEventHandler = (event) => {
        if (['ArrowLeft', 'ArrowRight'].includes(event.key)) {
            event.preventDefault();
        }
    };

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
            className={styles.component}
            ref={containerRef}
            onKeyDown={handleKeyDown}
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
                        className={styles.preview}
                    />
                );
            })}
        </div>
    );
};
