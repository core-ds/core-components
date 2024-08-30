import React, { MouseEvent, ReactEventHandler, useContext, useEffect, useRef } from 'react';
import classNames from 'classnames';
import Hls from 'hls.js';

import { Circle } from '@alfalab/core-components/icon-view/circle';
import PlayCompactMIcon from '@alfalab/icons-glyph/PlayCompactMIcon';

import { GalleryContext } from '../../../context';
import { GALLERY_EVENTS } from '../../../utils/constants';

import styles from './index.module.css';

type Props = {
    url: string;
    index: number;
    isActive: boolean;
    className?: string;
};

export const Video = ({ url, index, className, isActive }: Props) => {
    const playerRef = useRef<HTMLVideoElement>(null);

    const { setImageMeta, mutedVideo, view, playingVideo, setPlayingVideo, setHideNavigation } =
        useContext(GalleryContext);

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
        }

        return () => {
            if (hls) {
                hls.destroy();
            }
        };
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [url, index]);

    const handleWrapperClick = (e: MouseEvent) => {
        e.stopPropagation();
        setHideNavigation(false);
        setPlayingVideo(!playingVideo);
    };

    useEffect(() => {
        if (playerRef.current && isActive) {
            if (playingVideo) {
                playerRef.current.play();
            } else {
                playerRef.current.pause();
            }
        }
        if (playerRef.current && !isActive) {
            playerRef.current.pause();
            playerRef.current.currentTime = 0;
        }
    }, [isActive, playingVideo]);

    const onPlay: ReactEventHandler<HTMLVideoElement> = (e) => {
        const customEvent = new CustomEvent(GALLERY_EVENTS.ON_PLAY, {
            detail: { player: e.target },
        });

        dispatchEvent(customEvent);
    };

    const onPause: ReactEventHandler<HTMLVideoElement> = (e) => {
        const customEvent = new CustomEvent(GALLERY_EVENTS.ON_PAUSE, {
            detail: { player: e.target },
        });

        dispatchEvent(customEvent);
    };

    return (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
        <div onClick={handleWrapperClick} className={styles.videoWrapper}>
            <video
                onPlay={onPlay}
                onPause={onPause}
                ref={playerRef}
                playsInline={true}
                muted={mutedVideo}
                src={Hls.isSupported() ? undefined : url}
                className={classNames(
                    styles.video,
                    { [styles.mobile]: view === 'mobile' },
                    className,
                )}
            >
                <track kind='captions' />
            </video>
            {view === 'desktop' && !playingVideo && (
                <div className={styles.videoButton}>
                    <Circle size={64}>
                        <PlayCompactMIcon />
                    </Circle>
                </div>
            )}
        </div>
    );
};
