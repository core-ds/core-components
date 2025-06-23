import React, { FC, useContext, useRef } from 'react';
import cn from 'classnames';

import { GalleryContext } from '../../context';
import { getImageAlt, isVideo } from '../../utils';

import { useHandleImageViewer } from './hooks';
import { Slide } from './slide';

import styles from './index.module.css';

export const Single: FC = () => {
    const { fullScreen, currentSlideIndex, getCurrentImage, getCurrentImageMeta } =
        useContext(GalleryContext);

    const { handleWrapperClick, isMobile } = useHandleImageViewer();

    const wrapperRef = useRef<HTMLDivElement>(null);

    const currentImage = getCurrentImage();
    const currentImageMeta = getCurrentImageMeta();

    if (!currentImage) return null;

    const imageWidth = currentImageMeta?.width || 1;
    const imageHeight = currentImageMeta?.height || 1;

    const imageAspectRatio = imageWidth / imageHeight;

    const wrapperRect = wrapperRef.current?.getBoundingClientRect();

    const wrapperAspectRatio = (wrapperRect?.width || 1) / (wrapperRect?.height || 1);

    return (
        /* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
        <div className={styles.component} onClick={handleWrapperClick}>
            {fullScreen && !isVideo(currentImage?.src) ? (
                <img
                    src={currentImage?.src}
                    alt={currentImage ? getImageAlt(currentImage, currentSlideIndex) : ''}
                    className={styles.fullScreenImage}
                />
            ) : (
                <div
                    className={cn(styles.singleSlideContainer, {
                        [styles.mobile]: isMobile,
                        [styles.mobileVideo]: isMobile && isVideo(currentImage?.src),
                    })}
                    ref={wrapperRef}
                >
                    <Slide
                        isActive={true}
                        containerAspectRatio={wrapperAspectRatio}
                        image={currentImage}
                        containerHeight={wrapperRect?.height || 0}
                        meta={currentImageMeta}
                        index={0}
                        imageAspectRatio={imageAspectRatio}
                        slideVisible={true}
                    />
                </div>
            )}
        </div>
    );
};
