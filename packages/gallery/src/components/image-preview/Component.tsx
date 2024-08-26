import React, { FC, KeyboardEventHandler, useContext, useEffect, useRef } from 'react';
import cn from 'classnames';

import { useFocus } from '@alfalab/hooks';

import { GalleryContext } from '../../context';
import { GalleryImage } from '../../types';
import { getImageAlt, isVideo } from '../../utils';

import { NoImagePaths } from './paths';

import styles from './index.module.css';

type Props = {
    image: GalleryImage;
    index: number;
    active?: boolean;
    onSelect: (index: number) => void;
    className: string;
};

export const ImagePreview: FC<Props> = ({ image, active = false, index, onSelect, className }) => {
    const { imagesMeta, view } = useContext(GalleryContext);

    const isMobile = view === 'mobile';

    const previewWidth = isMobile ? 36 : 56;
    const previewHeight = isMobile ? 46 : 56;

    const ref = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const video = imagesMeta[index]?.player?.current;
        const context = canvas?.getContext('2d');
        const drawPreview = () => {
            if (video) {
                context?.drawImage(video, 0, 0, video.videoWidth / 12, video.videoHeight / 12);
            }
        };

        drawPreview();

        if (isVideo(image.src)) {
            video?.addEventListener('canplay', drawPreview);
        }

        return () => {
            if (isVideo(image.src)) {
                video?.removeEventListener('canplay', drawPreview);
            }
        };
    }, [image.src, imagesMeta, index]);

    const handleClick = () => {
        onSelect(index);
    };

    const handleKeyDown: KeyboardEventHandler = (event) => {
        if (event.key === 'Enter') {
            onSelect(index);
        }
    };

    const [focused] = useFocus(ref, 'keyboard');

    const meta = imagesMeta[index];

    const isBroken = Boolean(meta?.broken);

    return (
        <div
            className={cn(
                styles.component,
                { [styles.active]: active, [styles.focused]: focused, [styles.mobile]: isMobile },
                className,
            )}
            onClick={handleClick}
            role='button'
            onKeyDown={handleKeyDown}
            tabIndex={0}
            ref={ref}
            aria-label={`Перейти к ${index + 1} элементу`}
        >
            {isBroken ? (
                <div
                    className={cn(
                        styles.preview,
                        { [styles.mobile]: isMobile, [styles.active]: active },
                        styles.brokenImageWrapper,
                    )}
                >
                    <div className={cn(styles.brokenIcon)}>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width={previewWidth}
                            height={previewHeight}
                            viewBox={`${isMobile ? -6 : 0} ${
                                isMobile ? -12 : 0
                            } ${previewWidth} ${previewHeight}`}
                            fill='none'
                        >
                            <rect fill='none' />
                            <path
                                fillRule='evenodd'
                                clipRule='evenodd'
                                d={isMobile ? NoImagePaths.mobileImage : NoImagePaths.baseImage}
                                fill='#89898A'
                            />
                            <path
                                d={
                                    isMobile
                                        ? NoImagePaths.mobileTriangle
                                        : NoImagePaths.triangleImage
                                }
                                fill='#89898A'
                            />
                        </svg>
                    </div>
                </div>
            ) : (
                <div
                    className={cn(styles.preview, styles.image, {
                        [styles.loading]: !meta,
                        [styles.mobile]: isMobile,
                    })}
                >
                    {isVideo(image.src) ? (
                        <canvas
                            className={cn(styles.canvasPreview, { [styles.mobile]: isMobile })}
                            data-testid='canvas'
                            width={previewWidth}
                            height={previewHeight}
                            ref={canvasRef}
                        />
                    ) : (
                        <img src={image.src} alt={getImageAlt(image, index)} />
                    )}
                </div>
            )}
        </div>
    );
};
