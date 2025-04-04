import React, { FC, ReactNode, useContext } from 'react';
import { Spinner } from '@balafla/core-components-spinner';
import { Text } from '@balafla/core-components-typography';
import cn from 'classnames';

import { GalleryContext } from '../../context';
import { GalleryImage, ImageMeta } from '../../types';
import { getImageAlt, isSmallImage, isVideo, TestIds } from '../../utils';

import { useHandleImageViewer } from './hooks';
import { NoImagePaths } from './paths';
import { Video } from './video';

import styles from './index.module.css';

type SlideInnerProps = {
    active: boolean;
    broken: boolean;
    loading: boolean;
    children: ReactNode;
    isVideoView?: boolean;
};

const SlideInner: FC<SlideInnerProps> = ({ children, broken, loading, isVideoView }) => {
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

            <Text view='primary-small' color='static-secondary-light'>
                Не удалось загрузить {isVideoView ? 'видео' : 'изображение'}
            </Text>
        </div>
    ) : (
        children
    );

    return (
        <div className={cn(styles.slide, { [styles.slideLoading]: loading })}>
            {broken ? <div className={styles.placeholder}>{content}</div> : content}
            <Spinner className={styles.spinner} preset={48} visible={loading} />
        </div>
    );
};

type SlideProps = {
    isActive: boolean;
    image: GalleryImage;
    meta?: ImageMeta;
    containerAspectRatio: number;
    imageAspectRatio: number;
    index: number;
    containerHeight: number;
    slideVisible: boolean;
};

export const Slide: FC<SlideProps> = ({
    isActive,
    meta,
    containerAspectRatio,
    imageAspectRatio,
    image,
    index,
    containerHeight,
    slideVisible,
}) => {
    const { view } = useContext(GalleryContext);
    const { handleLoad, handleLoadError } = useHandleImageViewer();

    const broken = Boolean(meta?.broken);
    const small = isSmallImage(meta);
    const verticalImageFit = !small && containerAspectRatio > imageAspectRatio;
    const horizontalImageFit = !small && containerAspectRatio <= imageAspectRatio;

    if (isVideo(image.src)) {
        return (
            <SlideInner isVideoView={true} active={isActive} broken={broken} loading={!meta}>
                <Video url={image.src} index={index} isActive={isActive} />
            </SlideInner>
        );
    }

    return (
        <SlideInner active={isActive} broken={broken} loading={!meta}>
            <img
                src={image.src}
                alt={getImageAlt(image, index)}
                className={cn({
                    [styles.smallImage]: small,
                    [styles.image]: !small && meta,
                    [styles.mobile]: view === 'mobile',
                    [styles.verticalImageFit]: verticalImageFit,
                    [styles.horizontalImageFit]: horizontalImageFit,
                })}
                onLoad={(event) => handleLoad(event, index)}
                onError={() => handleLoadError(index)}
                style={{
                    maxHeight: `${containerHeight}px`,
                }}
                data-test-id={slideVisible ? TestIds.ACTIVE_IMAGE : undefined}
            />
        </SlideInner>
    );
};
