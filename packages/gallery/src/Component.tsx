import React, { FC, useCallback, useEffect, useState } from 'react';
import cn from 'classnames';
import SwiperCore from 'swiper';

import { BaseModal } from '@alfalab/core-components-base-modal';
import { useMedia } from '@alfalab/hooks';

import { Header, HeaderMobile, ImageViewer, InfoBar, NavigationBar } from './components';
import { GalleryContext } from './context';
import { GalleryImage, ImageMeta } from './types';

import styles from './index.module.css';

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
};

const DEFAULT_FULL_SCREEN = false;
const DEFAULT_MUTED_VIDEO = true;
const DEFAULT_PLAYING_VIDEO = true;
const DEFAULT_HIDE_NAVIGATION = false;

const Backdrop = () => null;

export const Gallery: FC<GalleryProps> = ({
    open,
    images,
    slideIndex,
    initialSlide = 0,
    loop = true,
    onClose,
    onSlideIndexChange,
    popupClassName,
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

    const [view] = useMedia<'desktop' | 'mobile'>(
        [
            ['mobile', '(max-width: 1023px)'],
            ['desktop', '(min-width: 1024px)'],
        ],
        'desktop',
    );

    const isMobile = view === 'mobile';

    const isCurrentVideo = !!imagesMeta[currentSlideIndex]?.player?.current;

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

    const slideNext = useCallback(() => {
        const lastIndex = images.length - 1;

        let nextIndex = currentSlideIndex + 1;

        if (nextIndex >= images.length) {
            nextIndex = loop ? 0 : lastIndex;
        }

        slideTo(nextIndex);
    }, [images.length, loop, currentSlideIndex, slideTo]);

    const slidePrev = useCallback(() => {
        const lastIndex = images.length - 1;

        let nextIndex = currentSlideIndex - 1;

        if (nextIndex < 0) {
            nextIndex = loop ? lastIndex : 0;
        }

        slideTo(nextIndex);
    }, [images.length, loop, currentSlideIndex, slideTo]);

    const setImageMeta = useCallback(
        (meta: ImageMeta, index: number) => {
            imagesMeta[index] = meta;

            setImagesMeta(imagesMeta.slice());
        },
        [imagesMeta],
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
                    slidePrev();
                    break;
                case 'ArrowRight':
                    slideNext();
                    break;
            }
        },
        [fullScreen, open, slideNext, slidePrev],
    );

    const onUnmount = useCallback(() => {
        setPlayingVideo(DEFAULT_PLAYING_VIDEO);
        setMutedVideo(DEFAULT_MUTED_VIDEO);
    }, [setPlayingVideo]);

    useEffect(() => {
        if (!uncontrolled && !swiper?.destroyed) {
            swiper?.slideTo(currentSlideIndex);
        }
    }, [uncontrolled, currentSlideIndex, swiper]);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    const singleSlide = images.length === 1;

    const showNavigationBar = !singleSlide && !fullScreen;

    // eslint-disable-next-line react/jsx-no-constructed-context-values
    const galleryContext: GalleryContext = {
        view,
        singleSlide,
        currentSlideIndex,
        images,
        imagesMeta,
        fullScreen,
        initialSlide: uncontrolled ? initialSlide : currentSlideIndex,
        setFullScreen,
        playingVideo,
        setPlayingVideo,
        mutedVideo,
        setMutedVideo,
        hideNavigation,
        setHideNavigation,
        setImageMeta,
        slideNext,
        slidePrev,
        slideTo,
        getSwiper: () => swiper,
        setSwiper,
        onClose: handleClose,
        setCurrentSlideIndex,
        getCurrentImage: () => images[currentSlideIndex],
        getCurrentImageMeta: () => imagesMeta[currentSlideIndex],
    };

    return (
        <GalleryContext.Provider value={galleryContext}>
            <BaseModal
                open={open}
                className={cn(styles.modal, popupClassName)}
                onEscapeKeyDown={handleEscapeKeyDown}
                Backdrop={Backdrop}
                onUnmount={onUnmount}
            >
                <div className={styles.container}>
                    {view === 'desktop' ? <Header /> : <HeaderMobile />}
                    <ImageViewer />
                    <nav
                        className={cn({
                            [styles.navigationVideo]: isCurrentVideo && isMobile,
                            [styles.hideNavigation]: hideNavigation && isMobile,
                        })}
                    >
                        {showNavigationBar && <NavigationBar />}
                        {view === 'mobile' && <InfoBar />}
                    </nav>
                </div>
            </BaseModal>
        </GalleryContext.Provider>
    );
};
