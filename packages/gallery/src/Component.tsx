import React, { type FC, type MouseEvent, useCallback, useEffect, useState } from 'react';
import type SwiperCore from 'swiper';

import { useIsDesktop } from '@alfalab/core-components-mq';

import { GalleryView } from './components/gallery-view/Component';
import { useGalleryNavigation } from './hooks/use-gallery-navigation';
import { SWIPE_THRESHOLD } from './constants';
import { type GalleryContext } from './context';
import { type GalleryImage, type GalleryPaginationConfig, type ImageMeta } from './types';

export type { GalleryPaginationConfig } from './types';

export type GalleryProps = {
    /**
     * Управление видимостью
     */
    open: boolean;

    /**
     * Массив изображений
     */
    images: GalleryImage[];

    /**
     * Зациклить галерею
     * @default true
     */
    loop?: boolean;

    /**
     * Индекс открытого изображение
     * @default 0
     */
    initialSlide?: number;

    /**
     * Обработчик закрытия
     */
    onClose: () => void;

    /**
     * Индекс текущего изображения
     */
    slideIndex?: number;

    /**
     * Обработчик изменения текущего изображения
     */
    onSlideIndexChange?: (index: number) => void;

    /**
     * Дополнительный класс для попапа
     */
    popupClassName?: string;

    /**
     * обработчик нажатия на кнопку перехода к посту
     */
    navigateToPostHandler?: () => void;

    /**
     * Настройки пагинации галереи
     */
    paginationConfig?: GalleryPaginationConfig;
};

const DEFAULT_FULL_SCREEN = false;
const DEFAULT_MUTED_VIDEO = true;
const DEFAULT_PLAYING_VIDEO = true;
const DEFAULT_HIDE_NAVIGATION = false;

export const Gallery: FC<GalleryProps> = ({
    open,
    images,
    slideIndex,
    initialSlide = 0,
    loop = true,
    onClose,
    onSlideIndexChange,
    popupClassName,
    navigateToPostHandler,
    paginationConfig,
}) => {
    const currentSlideIndexState = useState(initialSlide);
    const uncontrolled = slideIndex === undefined;
    const [currentSlideIndex, setCurrentSlideIndex] = uncontrolled
        ? currentSlideIndexState
        : [slideIndex, onSlideIndexChange];

    const [swiper, setSwiper] = useState<SwiperCore>();
    const [imagesMeta, setImagesMeta] = useState<ImageMeta[]>([]);
    const [fullScreen, setFullScreen] = useState<boolean>(DEFAULT_FULL_SCREEN);
    const [mutedVideo, setMutedVideo] = useState<boolean>(DEFAULT_MUTED_VIDEO);
    const [playingVideo, setPlayingVideo] = useState<boolean>(DEFAULT_PLAYING_VIDEO);
    const [hideNavigation, setHideNavigation] = useState<boolean>(DEFAULT_HIDE_NAVIGATION);

    const isDesktop = useIsDesktop();

    const isCurrentVideo = !!imagesMeta[currentSlideIndex]?.player?.current;

    const bottomButton = images[currentSlideIndex]?.bottomButton;

    const slideTo = useCallback(
        (index: number) => {
            if (images[index]) {
                setCurrentSlideIndex?.(index);

                if (swiper) {
                    setPlayingVideo(true);
                    swiper.slideTo(index);
                }
            }
        },
        [images, setCurrentSlideIndex, swiper],
    );

    const { navigation, pagination } = useGalleryNavigation({
        state: { currentSlideIndex, images },
        actions: { setCurrentSlideIndex, slideTo },
        options: { loop, paginationConfig },
    });

    const setImageMeta = useCallback((meta: ImageMeta, index: number) => {
        setImagesMeta((prevImagesMeta) => {
            const nextImagesMeta = prevImagesMeta.slice();

            nextImagesMeta[index] = meta;

            return nextImagesMeta;
        });
    }, []);

    const handleBottomButtonClick = useCallback(
        (e: MouseEvent) => {
            e.stopPropagation();
            if (bottomButton?.onClick) {
                bottomButton.onClick(e);
            }
        },
        [bottomButton],
    );

    const handleClose = useCallback(() => {
        onClose();

        if (uncontrolled) {
            setCurrentSlideIndex?.(initialSlide);
        }

        setFullScreen(false);
    }, [initialSlide, onClose, setCurrentSlideIndex, uncontrolled]);

    const handleEscapeKeyDown = () => {
        if (fullScreen) {
            setFullScreen(false);
        } else {
            handleClose();
        }
    };

    const handleKeyDown = useCallback(
        (event: KeyboardEvent) => {
            if (!open || fullScreen) {
                return;
            }

            switch (event.key) {
                case 'ArrowLeft':
                    navigation.slidePrev();
                    break;
                case 'ArrowRight':
                    navigation.slideNext();
                    break;
            }
        },
        [fullScreen, navigation, open],
    );

    const onUnmount = useCallback(() => {
        setPlayingVideo(DEFAULT_PLAYING_VIDEO);
        setMutedVideo(DEFAULT_MUTED_VIDEO);
    }, [setPlayingVideo]);

    useEffect(() => {
        if (swiper && !swiper.destroyed && swiper.activeIndex !== currentSlideIndex) {
            swiper.slideTo(currentSlideIndex, 0);
        }
    }, [currentSlideIndex, swiper]);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    useEffect(() => {
        let startY: number;
        const abortController = new AbortController();
        const { signal } = abortController;

        document.addEventListener(
            'touchstart',
            (e) => {
                startY = e.touches[0].clientY;
            },
            { signal },
        );

        document.addEventListener(
            'touchmove',
            (e) => {
                const endY = e.changedTouches[0].clientY;
                const deltaY = startY - endY;

                // Если свайп вниз, закрываем галерею
                if (deltaY < SWIPE_THRESHOLD) {
                    onClose();
                }
            },
            { signal },
        );

        return () => {
            abortController.abort();
        };
    }, [onClose]);

    const singleSlide = images.length === 1;

    const showNavigationBar = !singleSlide && !fullScreen;

    // eslint-disable-next-line react/jsx-no-constructed-context-values
    const galleryContext: GalleryContext = {
        view: isDesktop ? 'desktop' : 'mobile',
        singleSlide,
        canSlideNext: navigation.canSlideNext,
        canSlidePrev: navigation.canSlidePrev,
        currentSlideIndex,
        images,
        imagesMeta,
        fullScreen,
        loadingSlide: pagination.loading,
        paginationError: pagination.error,
        initialSlide: uncontrolled ? initialSlide : currentSlideIndex,
        setFullScreen,
        playingVideo,
        setPlayingVideo,
        mutedVideo,
        setMutedVideo,
        hideNavigation,
        setHideNavigation,
        setImageMeta,
        slideNext: navigation.slideNext,
        slidePrev: navigation.slidePrev,
        retryPagination: pagination.retry,
        slideTo,
        getSwiper: () => swiper,
        setSwiper,
        onClose: handleClose,
        setCurrentSlideIndex,
        getCurrentImage: () => images[currentSlideIndex],
        getCurrentImageMeta: () => imagesMeta[currentSlideIndex],
        navigateToPostHandler,
    };

    return (
        <GalleryView
            bottomButton={bottomButton}
            galleryContext={galleryContext}
            handleBottomButtonClick={handleBottomButtonClick}
            handleEscapeKeyDown={handleEscapeKeyDown}
            hideNavigation={hideNavigation}
            isCurrentVideo={isCurrentVideo}
            isDesktop={isDesktop}
            hasPagination={pagination.enabled}
            onUnmount={onUnmount}
            open={open}
            popupClassName={popupClassName}
            showNavigationBar={showNavigationBar}
            singleSlide={singleSlide}
        />
    );
};
