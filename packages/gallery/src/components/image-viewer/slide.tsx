import React, { type FC, type ReactNode, useCallback, useContext } from 'react';
import cn from 'classnames';

import { Spinner } from '@alfalab/core-components-spinner';
import { TypographyText } from '@alfalab/core-components-typography';

import { GalleryContext } from '../../context';
import { type GalleryImage, type ImageMeta } from '../../types';
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

            <TypographyText view='primary-small' color='static-secondary-light'>
                Не удалось загрузить {isVideoView ? 'видео' : 'изображение'}
            </TypographyText>
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
    fullScreen?: boolean;
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
    fullScreen,
}) => {
    const { view } = useContext(GalleryContext);
    const { handleLoad, handleLoadError } = useHandleImageViewer();

    const broken = Boolean(meta?.broken);
    const small = isSmallImage(meta);
    const verticalImageFit = !small && containerAspectRatio > imageAspectRatio;
    const horizontalImageFit = !small && containerAspectRatio <= imageAspectRatio;
    const imageStyle =
        fullScreen || !containerHeight ? undefined : { maxHeight: `${containerHeight}px` };

    const handleImageRef = useCallback(
        (node: HTMLImageElement | null) => {
            if (node?.complete && node.naturalWidth > 0 && !meta) {
                handleLoad(
                    { currentTarget: node } as React.SyntheticEvent<HTMLImageElement>,
                    index,
                );
            }
        },
        [handleLoad, index, meta],
    );

    if (isVideo(image.src)) {
        return (
            <SlideInner isVideoView={true} active={isActive} broken={broken} loading={!meta}>
                <Video
                    url={image.src}
                    index={index}
                    isActive={isActive}
                    className={cn({ [styles.fullScreenMedia]: fullScreen })}
                />
            </SlideInner>
        );
    }

    return (
        <SlideInner active={isActive} broken={broken} loading={!meta}>
            <img
                ref={handleImageRef}
                src={image.src}
                alt={getImageAlt(image, index)}
                className={cn({
                    [styles.smallImage]: small,
                    [styles.image]: !small && meta,
                    [styles.mobile]: view === 'mobile',
                    [styles.fullScreenMedia]: fullScreen,
                    [styles.verticalImageFit]: verticalImageFit,
                    [styles.horizontalImageFit]: horizontalImageFit,
                })}
                onLoad={(event) => handleLoad(event, index)}
                onError={() => handleLoadError(index)}
                style={imageStyle}
                data-test-id={slideVisible ? TestIds.ACTIVE_IMAGE : undefined}
            />
        </SlideInner>
    );
};
