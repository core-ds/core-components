import React, { FC, ReactNode, SyntheticEvent } from 'react';
import cn from 'classnames';

import { Typography } from '@alfalab/core-components-typography';

import { GalleryImage, ImageMeta } from '../../types';
import { getImageAlt, isSmallImage, TestIds } from '../../utils';

import { NoImagePaths } from './paths';

import styles from './index.module.css';

type SlideInnerProps = {
    active: boolean;
    broken: boolean;
    withPlaceholder: boolean;
    loading: boolean;
    children: ReactNode;
};

const SlideInner: FC<SlideInnerProps> = ({ children, broken, loading, withPlaceholder }) => {
    const content = broken ? (
        <div className={styles.brokenImgWrapper}>
            <div className={styles.brokenImgIcon}>
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='80'
                    height='80'
                    viewBox='0 0 80 80'
                    fill='none'
                >
                    <rect width='80' height='80' fill='none' />
                    <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d={NoImagePaths.baseImage}
                        fill='#89898A'
                    />
                    <path d={NoImagePaths.triangleImage} fill='#89898A' />
                </svg>
            </div>

            <Typography.Text view='primary-small' color='static-secondary-light'>
                Не удалось загрузить изображение
            </Typography.Text>
        </div>
    ) : (
        children
    );

    return (
        <div className={cn(styles.slide, { [styles.slideLoading]: loading })}>
            {withPlaceholder ? <div className={styles.placeholder}>{content}</div> : content}
        </div>
    );
};

type SlideProps = {
    isActive: boolean;
    image: GalleryImage;
    meta?: ImageMeta;
    swiperAspectRatio: number;
    imageAspectRatio: number;
    index: number;
    swiperHeight: number;
    slideVisible: boolean;
    handleLoad: (event: SyntheticEvent<HTMLImageElement>, index: number) => void;
    handleLoadError: (index: number) => void;
};

export const Slide: FC<SlideProps> = ({
    isActive,
    meta,
    swiperAspectRatio,
    imageAspectRatio,
    image,
    index,
    swiperHeight,
    slideVisible,
    handleLoad,
    handleLoadError,
}) => {
    const broken = Boolean(meta?.broken);
    const small = isSmallImage(meta);
    const verticalImageFit = !small && swiperAspectRatio > imageAspectRatio;
    const horizontalImageFit = !small && swiperAspectRatio <= imageAspectRatio;

    return (
        <SlideInner
            active={isActive}
            broken={broken}
            loading={!meta}
            withPlaceholder={small || broken}
        >
            <img
                src={image.src}
                alt={getImageAlt(image, index)}
                className={cn({
                    [styles.smallImage]: small,
                    [styles.image]: !small && meta,
                    [styles.verticalImageFit]: verticalImageFit,
                    [styles.horizontalImageFit]: horizontalImageFit,
                })}
                onLoad={(event) => handleLoad(event, index)}
                onError={() => handleLoadError(index)}
                style={{
                    maxHeight: `${swiperHeight}px`,
                }}
                data-test-id={slideVisible ? TestIds.ACTIVE_IMAGE : undefined}
            />
        </SlideInner>
    );
};
