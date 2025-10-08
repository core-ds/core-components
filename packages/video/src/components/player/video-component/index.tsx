import React, { forwardRef } from 'react';
import cn from 'classnames';

import { type FitMode, type Position } from '@alfalab/core-components-video/types';

import styles from './index.module.css';

type VideoComponentProps = {
    autoplay: boolean;
    isMuted: boolean;
    fitMode?: FitMode;
    position?: Position;
};

export const VideoComponent = forwardRef<HTMLVideoElement, VideoComponentProps>(
    ({ fitMode = 'contain', position = 'center', isMuted, autoplay }, ref) => {
        const coverAndPositionStyles = {
            [styles.contain]: fitMode === 'contain',
            [styles.fill]: fitMode === 'fill',
            [styles.cover]: fitMode === 'cover',

            [styles.left]: position === 'left',
            [styles.right]: position === 'right',
            [styles.top]: position === 'top',
            [styles.bottom]: position === 'bottom',
            [styles.center]: position === 'center',
        };

        return (
            // eslint-disable-next-line jsx-a11y/media-has-caption
            <video
                ref={ref}
                className={cn(styles.video, coverAndPositionStyles)}
                muted={isMuted}
                controls={false}
                autoPlay={autoplay}
            />
        );
    },
);

VideoComponent.displayName = 'VideoComponent';
