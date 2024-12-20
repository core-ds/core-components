import React, { MouseEvent, ReactEventHandler, useContext, useEffect, useRef } from 'react';
import cn from 'classnames';
import type HlsType from 'hls.js';
import type { ErrorData, Events } from 'hls.js';
import Hls from 'hls.js/dist/hls.light.mjs';

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
    const timer = useRef<ReturnType<typeof setTimeout>>();

    const { setImageMeta, mutedVideo, view, playingVideo, setPlayingVideo, setHideNavigation } =
        useContext(GalleryContext);

    const isMobile = view === 'mobile';

    useEffect(() => {
        setImageMeta({ player: playerRef }, index);
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [index]);

    useEffect(() => {
        const hls = new Hls() as HlsType;

        if (Hls.isSupported()) {
            hls.on(Hls.Events.ERROR, (_: Events.ERROR, data: ErrorData) => {
                if (data.fatal) {
                    switch (data.type) {
                        case Hls.ErrorTypes.MEDIA_ERROR:
                            hls.recoverMediaError();
                            break;
                        case Hls.ErrorTypes.NETWORK_ERROR:
                            setImageMeta({ player: { current: null }, broken: true }, index);
                            break;
                        default:
                            hls.destroy();
                            break;
                    }
                }
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
            if (timer.current) {
                clearTimeout(timer.current);
            }
        };
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [url, index]);

    const handleWrapperClick = (e: MouseEvent) => {
        e.stopPropagation();

        if (isMobile) {
            setHideNavigation(false);

            if (playingVideo) {
                if (timer.current) {
                    clearTimeout(timer.current);
                }
                timer.current = setTimeout(() => {
                    setHideNavigation(true);
                }, 3000);
            }

            return;
        }

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

        if (timer.current) {
            clearTimeout(timer.current);
        }

        timer.current = setTimeout(() => {
            setHideNavigation(true);
        }, 3000);
    };

    const onPause: ReactEventHandler<HTMLVideoElement> = (e) => {
        const customEvent = new CustomEvent(GALLERY_EVENTS.ON_PAUSE, {
            detail: { player: e.target },
        });

        dispatchEvent(customEvent);
        if (timer.current) {
            clearTimeout(timer.current);
            timer.current = undefined;
        }
        setHideNavigation(false);
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
                loop={true}
                src={Hls.isSupported() ? undefined : url}
                className={cn(styles.video, { [styles.mobile]: view === 'mobile' }, className)}
            >
                <track kind='captions' />
            </video>
            {view === 'desktop' && !playingVideo && (
                <div className={styles.videoButton}>
                    <Circle size={64} shapeClassName={styles.iconShape}>
                        <PlayCompactMIcon className={styles.icon} />
                    </Circle>
                </div>
            )}
        </div>
    );
};
