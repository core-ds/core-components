import React, {
    type CSSProperties,
    type FC,
    Fragment,
    useLayoutEffect,
    useRef,
    useState,
} from 'react';
import cn from 'classnames';
import { Mousewheel } from 'swiper/modules';
import { Swiper, type SwiperClass, SwiperSlide, type SwiperSlideProps } from 'swiper/react';

import { PageIndicatorBullet } from '@alfalab/core-components-page-indicator';
import { isObject } from '@alfalab/core-components-shared';
import { ArrowLeftMIcon } from '@alfalab/icons-glyph/ArrowLeftMIcon';
import { ArrowRightMIcon } from '@alfalab/icons-glyph/ArrowRightMIcon';

import { NavigationButton } from './navigation-button';

import styles from './index.module.css';

type ItemProps = Pick<SwiperSlideProps, 'children'>;

export interface CarouselProps extends Pick<CSSProperties, 'height'> {
    activeIndex?: number;
    defaultActiveIndex?: number;
    onChange?: (activeIndex: number) => void;
    gap?: number;
    visibleItems?: 'auto' | number;
    items: ItemProps[];
    pagination?: boolean;
    navigation?: boolean | 'hover';
    colors?: 'default' | 'inverted';
}

type SwiperEventHandler = (swiper: SwiperClass) => void;

export const Carousel: FC<CarouselProps> = ({
    activeIndex,
    defaultActiveIndex = 0,
    onChange,
    visibleItems = 1,
    gap,
    height = 'auto',
    items,
    navigation = false,
    pagination,
    colors = 'default',
}) => {
    const hasNavigation = navigation !== false;
    const swiperRef = useRef<SwiperClass | null>(null);
    const [paginationState, setPaginationState] = useState(() => ({ current: 0, total: 0 }));

    useLayoutEffect(() => {
        const swiper = swiperRef.current;

        if (typeof activeIndex === 'number') {
            swiper?.slideTo(activeIndex);
        }
    }, [activeIndex]);

    const handleActiveIndexChange: SwiperEventHandler = (swiper) => {
        const nextActiveIndex = swiper.activeIndex;

        onChange?.(nextActiveIndex);
    };

    const handlePaginationChange: SwiperEventHandler = (swiper) => {
        const { loop, slidesPerGroup } = swiper.params;
        const slidesCount =
            swiper.virtual && isObject(swiper.params.virtual) && swiper.params.virtual?.enabled
                ? swiper.virtual.slides.length
                : swiper.slides.length;

        let total = loop ? Math.ceil(slidesCount / slidesPerGroup!) : swiper.snapGrid.length;

        const { freeMode } = swiper.params;

        if ((isObject(freeMode) ? freeMode.enabled : freeMode) && total > slidesCount) {
            total = slidesCount;
        }

        let current: number;

        if (loop) {
            current =
                slidesPerGroup! > 1
                    ? Math.floor(swiper.realIndex / slidesPerGroup!)
                    : swiper.realIndex;
        } else if (typeof swiper.snapIndex === 'number') {
            current = swiper.snapIndex;
        } else {
            current = swiper.activeIndex || 0;
        }

        setPaginationState({ total, current });
    };

    const handleUpdate: SwiperEventHandler = (swiper) => {
        [handlePaginationChange, handleActiveIndexChange].forEach((callback) => callback(swiper));
    };

    return (
        <div className={cn(styles.component, { [styles.navigation]: navigation === 'hover' })}>
            <div className={styles.wrapper}>
                <Swiper
                    className={styles.swiper}
                    modules={[Mousewheel]}
                    mousewheel={true}
                    initialSlide={defaultActiveIndex}
                    spaceBetween={gap}
                    slidesPerView={visibleItems}
                    onSlideChange={handleUpdate}
                    onActiveIndexChange={handleUpdate}
                    onInit={(swiper) => {
                        swiperRef.current = swiper;
                        handleUpdate(swiper);
                    }}
                    onUpdate={handleUpdate}
                    onDestroy={() => {
                        swiperRef.current = null;
                    }}
                    style={{ height }}
                >
                    {items.map((item, i) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <SwiperSlide key={i}>{item.children}</SwiperSlide>
                    ))}
                </Swiper>
                {hasNavigation && (
                    <Fragment>
                        <NavigationButton
                            colors={colors}
                            className={cn(styles.navButton, styles.prev)}
                            icon={ArrowLeftMIcon}
                            onClick={() => {
                                swiperRef.current?.slidePrev();
                            }}
                        />
                        <NavigationButton
                            colors={colors}
                            className={cn(styles.navButton, styles.next)}
                            icon={ArrowRightMIcon}
                            onClick={() => {
                                swiperRef.current?.slideNext();
                            }}
                        />
                    </Fragment>
                )}
            </div>
            {pagination && (
                <PageIndicatorBullet
                    colors={colors}
                    slot='container-end'
                    className={styles.pagination}
                    activeElement={paginationState.current}
                    elements={paginationState.total}
                />
            )}
        </div>
    );
};
