import React, {
    MouseEvent,
    ReactEventHandler,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react';
import cn from 'classnames';
import Hls from 'hls.js';

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
    const [videoLoaded, setVideoLoaded] = useState(false);
    const playerRef = useRef<HTMLVideoElement>(null);
    const timer = useRef<ReturnType<typeof setTimeout>>();
    const abortController = useRef(new AbortController());
    const [videoError, setVideoError] = useState(false);

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

    useEffect(() => () => abortController.current.abort(), []);

    useEffect(() => {
        const video = playerRef.current;

        if (!video) {
            return;
        }

        const { signal } = abortController.current;

        const handleCanPlay = () => {
            setVideoLoaded(true);
            setVideoError(false);
            setImageMeta(
                {
                    player: playerRef,
                    width: video.videoWidth || 1920,
                    height: video.videoHeight || 1080,
                    loaded: true,
                },
                index,
            );
        };

        const handleError = () => {
            setVideoError(true);
            setVideoLoaded(false);
            setImageMeta({ player: { current: null }, broken: true, loaded: true }, index);
        };

        const handleLoadStart = () => {
            setVideoLoaded(false);
            setVideoError(false);
        };

        video.addEventListener('canplay', handleCanPlay, { signal });
        video.addEventListener('error', handleError, { signal });
        video.addEventListener('loadstart', handleLoadStart, { signal });
    }, [setImageMeta, index]);

    useEffect(() => {
        const hls = new Hls();

        if (Hls.isSupported()) {
            hls.on(Hls.Events.ERROR, (_, data) => {
                if (data.fatal) {
                    switch (data.type) {
                        case Hls.ErrorTypes.MEDIA_ERROR:
                            hls.recoverMediaError();
                            break;
                        case Hls.ErrorTypes.NETWORK_ERROR:
                            setVideoError(true);
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
        const { signal } = abortController.current;

        const handleSpacePress = (e: KeyboardEvent) => {
            if ((e.key === ' ' || e.code === 'Space') && isActive) {
                e.preventDefault();
                e.stopPropagation();
                if (playingVideo) {
                    setPlayingVideo(false);
                } else {
                    setPlayingVideo(true);
                }
            }
        };

        document.addEventListener('keydown', handleSpacePress, { signal });
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
        } else {
            setPlayingVideo(!playingVideo);
        }
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
        if (image && image.onPlay) {
            image.onPlay();
        }

        if (timer.current) {
            clearTimeout(timer.current);
        }

        timer.current = setTimeout(() => {
            setHideNavigation(true);
        }, 3000);
    };

    const onPause: ReactEventHandler<HTMLVideoElement> = () => {
        if (image && image.onPause) {
            image.onPause();
        }

        if (timer.current) {
            clearTimeout(timer.current);
            timer.current = undefined;
        }

        setHideNavigation(false);
    };

    return (
        <div
            aria-hidden={true}
            onClick={handleWrapperClick}
            data-content-area='true'
            className={cn(styles.videoWrapper, {
                [styles.loading]: !videoLoaded && !videoError,
            })}
        >
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
            {isDesktop && !playingVideo && videoLoaded && (
                <div className={styles.videoButton}>
                    <Circle size={64} shapeClassName={styles.iconShape}>
                        <PlayCompactMIcon className={styles.icon} />
                    </Circle>
                </div>
            )}
            {isDesktop && <Subtitles />}
            {isDesktop && image?.bottomButton && videoLoaded && (
                <BottomButton
                    bottomButton={image.bottomButton}
                    onClick={handleBottomButtonClick}
                    className={styles.bottomButton}
                />
            )}
        </div>
    );
};
