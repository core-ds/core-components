import React, {
    type MouseEvent,
    type ReactEventHandler,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react';
import cn from 'classnames';
import type Hls from 'hls.js';

import { Circle } from '@alfalab/core-components-icon-view/circle';
import PlayCompactMIcon from '@alfalab/icons-glyph/PlayCompactMIcon';

import { GalleryContext } from '../../../context';
import { BottomButton } from '../../bottom-button';
import { Subtitles } from '../../subtitles';

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
    const [hlsSupported, setHlsSupported] = useState<boolean>(true);

    const {
        setImageMeta,
        mutedVideo,
        view,
        playingVideo,
        setPlayingVideo,
        setHideNavigation,
        getCurrentImage,
    } = useContext(GalleryContext);

    const isMobile = view === 'mobile';
    const isDesktop = view === 'desktop';

    const image = getCurrentImage();

    useEffect(() => {
        setImageMeta({ player: playerRef }, index);
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [index]);

    const loadHlsLibrary = useCallback(
        async (attempt = 1, maxAttempts = 3): Promise<typeof Hls | null> => {
            try {
                const { default: HlsLib } = await import(
                    /* webpackChunkName: "hls-js-gallery" */ 'hls.js'
                );

                return HlsLib;
            } catch {
                if (attempt < maxAttempts) {
                    /* Экспоненциальная задержка ретрая: 300ms, 600ms, 1200ms */
                    await new Promise<void>((resolve) => {
                        setTimeout(
                            () => {
                                resolve();
                            },
                            300 * 2 ** (attempt - 1),
                        );
                    });

                    return loadHlsLibrary(attempt + 1, maxAttempts);
                }

                setHlsSupported(false);
                setImageMeta({ player: { current: null }, broken: true }, index);

                return null;
            }
        },
        [setImageMeta, index],
    );

    useEffect(() => {
        let hls: Hls | null = null;

        const initHls = async () => {
            try {
                const HlsLib = await loadHlsLibrary();

                if (!HlsLib || !playerRef.current) {
                    return;
                }

                if (!HlsLib.isSupported()) {
                    setHlsSupported(false);

                    return;
                }

                hls = new HlsLib();

                hls.on(HlsLib.Events.ERROR, (_, data) => {
                    if (data.fatal && hls) {
                        switch (data.type) {
                            case HlsLib.ErrorTypes.MEDIA_ERROR:
                                hls.recoverMediaError();
                                break;
                            case HlsLib.ErrorTypes.NETWORK_ERROR:
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
                    hls.subtitleDisplay = false;
                }
            } catch {
                setHlsSupported(false);
                setImageMeta({ player: { current: null }, broken: true }, index);
            }
        };

        initHls();

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

    useEffect(() => {
        const handleSpacePress = (e: KeyboardEvent) => {
            if ((e.key === ' ' || e.code === 'Space') && isActive) {
                if (playingVideo) {
                    setPlayingVideo(false);
                } else {
                    setPlayingVideo(true);
                }
            }
        };

        document.addEventListener('keyup', handleSpacePress);

        return () => {
            document.removeEventListener('keyup', handleSpacePress);
        };
    }, [isActive, playingVideo, setPlayingVideo]);

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

    const handleBottomButtonClick = useCallback(
        (e: MouseEvent) => {
            e.stopPropagation();
            if (image?.bottomButton) {
                image.bottomButton.onClick(e);
            }
        },
        [image?.bottomButton],
    );

    const onPlay: ReactEventHandler<HTMLVideoElement> = () => {
        image?.onPlay?.();

        if (timer.current) {
            clearTimeout(timer.current);
        }

        timer.current = setTimeout(() => {
            setHideNavigation(true);
        }, 3000);
    };

    const onPause: ReactEventHandler<HTMLVideoElement> = () => {
        image?.onPause?.();

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
                src={hlsSupported ? undefined : url}
                className={cn(styles.video, { [styles.mobile]: view === 'mobile' }, className)}
            >
                <track kind='captions' />
            </video>
            {isDesktop && !playingVideo && (
                <div className={styles.videoButton}>
                    <Circle size={64} shapeClassName={styles.iconShape}>
                        <PlayCompactMIcon className={styles.icon} />
                    </Circle>
                </div>
            )}
            {isDesktop && <Subtitles />}
            {isDesktop && image?.bottomButton && (
                <BottomButton
                    bottomButton={image.bottomButton}
                    onClick={handleBottomButtonClick}
                    className={styles.bottomButton}
                />
            )}
        </div>
    );
};
