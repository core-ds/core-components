import React, { type FC, useCallback, useContext } from 'react';
import cn from 'classnames';

import { GalleryContext } from '../../context';
import { type GalleryImage, type ImageMeta } from '../../types';
import { getImageAlt, isSmallImage, isVideo, TestIds } from '../../utils';

import { SlideView } from './slide-view/component';
import { useHandleImageViewer } from './hooks';
import { Video } from './video';

import styles from './index.module.css';

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
    const video = isVideo(image.src);
    const small = isSmallImage(meta);
    const verticalImageFit = Boolean(meta) && !small && containerAspectRatio > imageAspectRatio;
    const horizontalImageFit = Boolean(meta) && !small && containerAspectRatio <= imageAspectRatio;
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

    const videoContent = (
        <Video
            url={image.src}
            index={index}
            isActive={isActive}
            className={cn({ [styles.fullScreenMedia]: fullScreen })}
        />
    );

    const imageContent = (
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
            data-content-area='true'
            data-test-id={slideVisible ? TestIds.ACTIVE_IMAGE : undefined}
        />
    );

    return (
        <SlideView
            loading={!meta}
            broken={broken}
            isVideoView={video}
            imageContent={imageContent}
            videoContent={videoContent}
        />
    );
};
