import React, { type FC, useCallback, useContext, useMemo } from 'react';
import cn from 'classnames';
import { A11y, Controller } from 'swiper/modules';
import { Swiper, type SwiperProps, SwiperSlide } from 'swiper/react';

import { useFocus } from '@alfalab/hooks';
import { ChevronBackHeavyMIcon } from '@alfalab/icons-glyph/ChevronBackHeavyMIcon';
import { ChevronForwardHeavyMIcon } from '@alfalab/icons-glyph/ChevronForwardHeavyMIcon';

import { GalleryContext } from '../../context';
import { getImageKey, isVideo, TestIds } from '../../utils';
import { NavigationArrow } from '../navigation-arrow/Component';
import { PaginationBoundary } from '../pagination-boundary/Component';

import { useHandleImageViewer } from './hooks';
import { Slide } from './slide';

import styles from './index.module.css';

export const ImageViewer: FC = () => {
    const {
        images,
        imagesMeta,
        fullScreen,
        currentSlideIndex,
        initialSlide,
        setCurrentSlideIndex,
        getSwiper,
        setSwiper,
        slidePrev,
        slideNext,
        getCurrentImage,
        canSlideNext,
        canSlidePrev,
    } = useContext(GalleryContext);

    const { handleWrapperClick, isMobile, rightArrowRef, leftArrowRef } = useHandleImageViewer();

    const [leftArrowFocused] = useFocus(leftArrowRef, 'keyboard');
    const [rightArrowFocused] = useFocus(rightArrowRef, 'keyboard');

    const swiper = getSwiper();
    const currentImage = getCurrentImage();
    const handleSlideChange = useCallback(() => {
        setCurrentSlideIndex?.(swiper?.activeIndex ?? initialSlide);
    }, [setCurrentSlideIndex, swiper, initialSlide]);

    const swiperProps = useMemo<SwiperProps>(
        () => ({
            slidesPerView: 1,
            effect: 'slide',
            spaceBetween: isMobile ? 16 : 0,
            className: cn(styles.swiper, {
                [styles.hidden]: fullScreen && !isVideo(currentImage?.src),
                [styles.fullScreenVideo]: fullScreen && isVideo(currentImage?.src),
                [styles.mobile]: isMobile,
                [styles.mobileVideo]: isMobile && isVideo(currentImage?.src),
            }),
            modules: [A11y, Controller],
            controller: { control: swiper },
            a11y: {
                slideRole: 'img',
            },
            initialSlide,
            simulateTouch: false,
            zoom: { maxRatio: 4, minRatio: 1, toggle: true },
            onSwiper: setSwiper,
            onSlideChange: handleSlideChange,
            lazy: { loadPrevNext: true },
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

    const showControls = !fullScreen && !isMobile && !!images.length;

    const swiperWidth = swiper?.width || 1;
    const swiperHeight = swiper?.height || swiper?.width || 1;

    const swiperAspectRatio = swiperWidth / swiperHeight;

    return (
        <div
            className={cn(styles.component, {
                [styles.mobile]: isMobile,
                [styles.mobileVideo]: isMobile && isVideo(currentImage?.src),
            })}
            aria-hidden={true}
            onClick={handleWrapperClick}
        >
            {showControls && (
                <NavigationArrow
                    arrowRef={leftArrowRef}
                    enabled={canSlidePrev}
                    focused={leftArrowFocused}
                    label='Предыдущее изображение'
                    onActivate={slidePrev}
                    testId={TestIds.PREV_SLIDE_BUTTON}
                >
                    <ChevronBackHeavyMIcon />
                </NavigationArrow>
            )}

            {fullScreen && currentImage && !isVideo(currentImage.src) && (
                <div className={styles.fullScreenFrame}>
                    <Slide
                        isActive={true}
                        containerAspectRatio={swiperAspectRatio}
                        image={currentImage}
                        containerHeight={swiperHeight}
                        meta={imagesMeta[currentSlideIndex]}
                        index={currentSlideIndex}
                        imageAspectRatio={
                            (imagesMeta[currentSlideIndex]?.width || 1) /
                            (imagesMeta[currentSlideIndex]?.height || 1)
                        }
                        slideVisible={false}
                        fullScreen={true}
                    />
                </div>
            )}

            <div
                className={cn(styles.swiperFrame, {
                    [styles.mobile]: isMobile,
                    [styles.mobileVideo]: isMobile && isVideo(currentImage?.src),
                    [styles.fullScreenFrame]: fullScreen,
                    [styles.hiddenFrame]: fullScreen && !isVideo(currentImage?.src),
                })}
            >
                <PaginationBoundary>
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
                                            containerAspectRatio={swiperAspectRatio}
                                            image={image}
                                            containerHeight={swiperHeight}
                                            meta={meta}
                                            index={index}
                                            imageAspectRatio={imageAspectRatio}
                                            slideVisible={slideVisible}
                                            fullScreen={fullScreen && isVideo(image.src)}
                                        />
                                    )}
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </PaginationBoundary>
            </div>

            {showControls && (
                <NavigationArrow
                    arrowRef={rightArrowRef}
                    enabled={canSlideNext}
                    focused={rightArrowFocused}
                    label='Следующее изображение'
                    onActivate={slideNext}
                    testId={TestIds.NEXT_SLIDE_BUTTON}
                >
                    <ChevronForwardHeavyMIcon />
                </NavigationArrow>
            )}
        </div>
    );
};
