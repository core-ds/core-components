import React, { useContext, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import Hls from 'hls.js';

import { Circle } from '@alfalab/core-components/icon-view/circle';
import { Button } from '@alfalab/core-components-button';
import PauseCompactMIcon from '@alfalab/icons-glyph/PauseCompactMIcon';
import PlayCompactMIcon from '@alfalab/icons-glyph/PlayCompactMIcon';

import { GalleryContext } from '../../../context';

import styles from './index.module.css';

type Props = {
    url: string;
    index: number;
    className?: string;
};

export const Video = ({ url, index, className }: Props) => {
    const playerRef = useRef<HTMLVideoElement>(null);

    const [isPlaying, setIsPlaying] = useState(false);

    const { setImageMeta, mutedVideo, view } = useContext(GalleryContext);

    useEffect(() => {
        if (playerRef.current) {
            playerRef.current.muted = mutedVideo;
        }
    }, [mutedVideo]);

    useEffect(() => {
        setImageMeta({ player: playerRef }, index);
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [index]);

    useEffect(() => {
        const hls = new Hls();

        if (Hls.isSupported()) {
            hls.on(Hls.Events.ERROR, () => {
                setImageMeta({ player: { current: null }, broken: true }, index);
            });

            hls.loadSource(url);
            if (playerRef.current) {
                hls.attachMedia(playerRef.current);
            }
        } else if (playerRef.current) {
            playerRef.current.src = url;
        }

        return () => {
            if (hls) {
                hls.destroy();
            }
        };
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [url, index]);

    const handleClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        if (playerRef.current) {
            if (isPlaying) {
                playerRef.current.pause();
                setIsPlaying(false);
            } else {
                playerRef.current.play().then(() => setIsPlaying(true));
            }
        }
    };

    return (
        <div className={styles.videoWrapper}>
            <video
                ref={playerRef}
                className={classNames(
                    styles.video,
                    { [styles.mobile]: view === 'mobile' },
                    className,
                )}
            >
                <track kind='captions' />
            </video>
            <Button className={styles.videoButton} view='text' onClick={handleClick}>
                <Circle className={styles.videoButtonIcon} size={64}>
                    {isPlaying ? <PauseCompactMIcon /> : <PlayCompactMIcon />}
                </Circle>
            </Button>
        </div>
    );
};
