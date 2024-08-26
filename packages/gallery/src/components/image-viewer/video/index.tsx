import React, { useContext, useEffect, useRef } from 'react';
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

    const { setImageMeta, mutedVideo, view, playingVideo, setPlayingVideo, setHideNavigation } =
        useContext(GalleryContext);

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
        setPlayingVideo(!playingVideo);
    };

    const handleWrapperClick = () => {
        setHideNavigation(false);
    };

    useEffect(() => {
        if (playerRef.current) {
            if (playingVideo) {
                playerRef.current.play();
            } else {
                playerRef.current.pause();
            }
        }
    }, [playingVideo]);

    return (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
        <div onClick={handleWrapperClick} className={styles.videoWrapper}>
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
            {view === 'desktop' && (
                <Button className={styles.videoButton} view='text' onClick={handleClick}>
                    <Circle className={styles.videoButtonIcon} size={64}>
                        {playingVideo ? <PauseCompactMIcon /> : <PlayCompactMIcon />}
                    </Circle>
                </Button>
            )}
        </div>
    );
};
