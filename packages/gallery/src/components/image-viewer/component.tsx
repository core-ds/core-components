import React, {
    FC,
    KeyboardEventHandler,
    MouseEventHandler,
    SyntheticEvent,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
} from 'react';
import cn from 'classnames';
import elementClosest from 'element-closest';
import SwiperCore, { A11y, Controller, EffectFade } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { useFocus } from '@alfalab/hooks';
import { ChevronBackHeavyMIcon } from '@alfalab/icons-glyph/ChevronBackHeavyMIcon';
import { ChevronForwardHeavyMIcon } from '@alfalab/icons-glyph/ChevronForwardHeavyMIcon';

import { GalleryContext } from '../../context';
import { getImageAlt, getImageKey, isVideo, TestIds } from '../../utils';

import { Slide } from './slide';

import 'swiper/swiper.min.css';
import styles from './index.module.css';

SwiperCore.use([EffectFade, A11y, Controller]);

export const ImageViewer: FC = () => {
    const {
        singleSlide,
        images,
        imagesMeta,
        fullScreen,
        currentSlideIndex,
        initialSlide,
        onClose,
        setImageMeta,
        setCurrentSlideIndex,
        getSwiper,
        setSwiper,
        slidePrev,
        slideNext,
        getCurrentImage,
        view,
    } = useContext(GalleryContext);

    const isMobile = view === 'mobile';

    const leftArrowRef = useRef<HTMLDivElement>(null);
    const rightArrowRef = useRef<HTMLDivElement>(null);

    const [leftArrowFocused] = useFocus(leftArrowRef, 'keyboard');
    const [rightArrowFocused] = useFocus(rightArrowRef, 'keyboard');

    const swiper = getSwiper();
    const currentImage = getCurrentImage();

    const handleSlideChange = useCallback(() => {
        setCurrentSlideIndex?.(swiper?.activeIndex ?? initialSlide);
    }, [setCurrentSlideIndex, swiper, initialSlide]);

    const handlePrevClick = () => {
        slidePrev();
    };

    const handleNextClick = () => {
        slideNext();
    };

    const handleArrowLeftKeyDown: KeyboardEventHandler = (event) => {
        if (event.key === 'Enter') {
            slidePrev();
        }
    };

    const handleArrowRightKeyDown: KeyboardEventHandler = (event) => {
        if (event.key === 'Enter') {
            slideNext();
        }
    };

    const handleLoad = (event: SyntheticEvent<HTMLImageElement>, index: number) => {
        const target = event.currentTarget;

        const { naturalWidth, naturalHeight } = target;

        setImageMeta({ width: naturalWidth, height: naturalHeight }, index);
    };

    const handleLoadError = (index: number) => {
        setImageMeta({ width: 0, height: 0, broken: true }, index);
    };

    const handleWrapperClick = useCallback<MouseEventHandler>(
        (event) => {
            const eventTarget = event.target as HTMLElement;

            const isArrow =
                leftArrowRef.current?.contains(eventTarget) ||
                rightArrowRef.current?.contains(eventTarget);

            const isPlaceholder = Boolean(eventTarget.closest(`.${styles.placeholder}`));

            const isImg = eventTarget.tagName === 'IMG';

            if (!isImg && !isPlaceholder && !isArrow && !isMobile) {
                onClose();
            }
        },
        [isMobile, onClose],
    );

    useEffect(() => {
        elementClosest(window);
    }, []);

    const swiperProps = useMemo<Swiper>(
        () => ({
            slidesPerView: 1,
            effect: 'fade',
            fadeEffect: {
                crossFade: true,
            },
            className: cn(styles.swiper, {
                [styles.hidden]: fullScreen && !isVideo(currentImage?.src),
                [styles.fullScreenVideo]: fullScreen && isVideo(currentImage?.src),
                [styles.mobile]: isMobile,
                [styles.mobileVideo]: isMobile && isVideo(currentImage?.src),
            }),
            controller: { control: swiper },
            a11y: {
                slideRole: 'img',
            },
            initialSlide,
            simulateTouch: false,
            onSwiper: setSwiper,
            onSlideChange: handleSlideChange,
        }),
        [
            fullScreen,
            currentImage?.src,
            isMobile,
            swiper,
            initialSlide,
            setSwiper,
            handleSlideChange,
        ],
    );

    const showControls = !singleSlide && !fullScreen && !isMobile && !!images.length;

    const swiperWidth = swiper?.width || 1;
    const swiperHeight = swiper?.height || swiper?.width || 1;

    const swiperAspectRatio = swiperWidth / swiperHeight;

    return (
        /* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
        <div
            className={cn(styles.component, {
                [styles.singleSlide]: singleSlide,
                [styles.mobile]: isMobile,
                [styles.mobileVideo]: isMobile && isVideo(currentImage?.src),
            })}
            onClick={handleWrapperClick}
        >
            {showControls && (
                <div
                    className={cn(styles.arrow, {
                        [styles.focused]: leftArrowFocused,
                    })}
                    onClick={handlePrevClick}
                    role='button'
                    onKeyDown={handleArrowLeftKeyDown}
                    tabIndex={0}
                    ref={leftArrowRef}
                    aria-label='Предыдущее изображение'
                    data-test-id={TestIds.PREV_SLIDE_BUTTON}
                >
                    <ChevronBackHeavyMIcon />
                </div>
            )}

            {fullScreen && !isVideo(currentImage?.src) && (
                <img
                    src={currentImage?.src}
                    alt={currentImage ? getImageAlt(currentImage, currentSlideIndex) : ''}
                    className={styles.fullScreenImage}
                />
            )}

            <Swiper {...swiperProps}>
                {images.map((image, index) => {
                    const meta = imagesMeta[index];

                    const imageWidth = meta?.width || 1;
                    const imageHeight = meta?.height || 1;

                    const imageAspectRatio = imageWidth / imageHeight;

                    const slideVisible = index === currentSlideIndex;

                    return (
                        <SwiperSlide
                            key={getImageKey(image, index)}
                            style={{
                                pointerEvents: slideVisible ? 'auto' : 'none',
                                transitionProperty: 'opacity',
                            }}
                        >
                            {({ isActive }) => (
                                <Slide
                                    isActive={isActive}
                                    swiperAspectRatio={swiperAspectRatio}
                                    image={image}
                                    swiperHeight={swiperHeight}
                                    meta={meta}
                                    index={index}
                                    imageAspectRatio={imageAspectRatio}
                                    slideVisible={slideVisible}
                                    handleLoad={handleLoad}
                                    handleLoadError={handleLoadError}
                                />
                            )}
                        </SwiperSlide>
                    );
                })}
            </Swiper>

            {showControls && (
                <div
                    className={cn(styles.arrow, {
                        [styles.focused]: rightArrowFocused,
                    })}
                    onClick={handleNextClick}
                    role='button'
                    onKeyDown={handleArrowRightKeyDown}
                    tabIndex={0}
                    ref={rightArrowRef}
                    aria-label='Следующее изображение'
                    data-test-id={TestIds.NEXT_SLIDE_BUTTON}
                >
                    <ChevronForwardHeavyMIcon />
                </div>
            )}
        </div>
    );
};
