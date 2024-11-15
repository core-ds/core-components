import React, {
    FC,
    MouseEventHandler,
    SyntheticEvent,
    useCallback,
    useContext,
    useEffect,
    useRef,
} from 'react';
import cn from 'classnames';
import elementClosest from 'element-closest';

import { GalleryContext } from '../../context';
import { getImageAlt, isVideo } from '../../utils';

import { Slide } from './slide';

import styles from './index.module.css';

export const SingleImageViewer: FC = () => {
    const {
        fullScreen,
        currentSlideIndex,
        onClose,
        setImageMeta,
        getCurrentImage,
        getCurrentImageMeta,
        view,
    } = useContext(GalleryContext);

    const isMobile = view === 'mobile';

    const leftArrowRef = useRef<HTMLDivElement>(null);
    const rightArrowRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        elementClosest(window);
    }, []);

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
                        handleLoad={handleLoad}
                        handleLoadError={handleLoadError}
                    />
                </div>
            )}
        </div>
    );
};
