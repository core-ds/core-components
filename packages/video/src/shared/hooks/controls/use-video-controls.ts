import { type RefObject, useEffect, useState } from 'react';
import type Hls from 'hls.js';

import { useFullscreen, usePause, useQuality, useSeek, useSound, useSpeed } from '.';

type ControlsSettings = {
    loop: boolean;
    autoplay: boolean;
    skipForwardStep?: number;
    skipBackwardStep?: number;
    startFrom?: number;
};

export const useVideoControls = (
    url: string,
    playerRef: RefObject<HTMLVideoElement>,
    wrapperRef: RefObject<HTMLDivElement>,
    hlsRef: RefObject<Hls | undefined>,
    levels: Hls['levels'],
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    { loop, autoplay, skipForwardStep, skipBackwardStep, startFrom }: ControlsSettings,
) => {
    const [duration, setDuration] = useState(0);
    const [buffer, setBuffer] = useState(0);

    const { playbackRate, setPlaybackRate } = useSpeed(playerRef);

    const { isPaused, setIsPaused, togglePause } = usePause(playerRef);

    const { qualities, currentLevel, isAutoQuality, setQuality, setAutoQuality } = useQuality(
        hlsRef,
        playerRef,
        levels,
        setIsLoading,
        togglePause,
    );

    const { isMuted, volume, setIsMuted, setVolume, toggleMute } = useSound(playerRef);

    const { fullscreen, toggleFullscreen, enterFullscreen, exitFullscreen } =
        useFullscreen(wrapperRef);

    const {
        seekTime,
        setSeekTime,
        seekIndicator,
        showSeekIndicator,
        handleSeek,
        skipBackward,
        skipForward,
        currentTime,
        setCurrentTime,
    } = useSeek(url, playerRef, startFrom, skipForwardStep, skipBackwardStep);

    useEffect(() => {
        const video = playerRef.current;

        if (!video) return;

        const onLoadedMetadata = () => setDuration(video.duration);
        const onTimeUpdate = () => setCurrentTime(video.currentTime);
        const handleEnded = () => {
            if (loop) {
                video.currentTime = 0;
                video.play();
            }
        };

        video.addEventListener('loadedmetadata', onLoadedMetadata);
        video.addEventListener('timeupdate', onTimeUpdate);
        video.addEventListener('ended', handleEnded);

        // eslint-disable-next-line consistent-return
        return () => {
            video.removeEventListener('loadedmetadata', onLoadedMetadata);
            video.removeEventListener('timeupdate', onTimeUpdate);
            video.removeEventListener('ended', handleEnded);
        };
    }, [loop, playerRef, setCurrentTime]);

    useEffect(() => {
        // эффект необходимый для поддержания консистентности между состоянием браузера и состоянием реакта
        const video = playerRef.current;

        if (!video) return;

        if (autoplay && video.paused) {
            video.play().catch(() => {});
        }

        const handlePlay = () => setIsPaused(false);
        const handlePause = () => setIsPaused(true);
        const handleVolumeChange = () => {
            setVolume(Math.round(video.volume * 100));
            setIsMuted(video.muted);
        };
        const handleTimeUpdate = () => setCurrentTime(video.currentTime);

        video.addEventListener('play', handlePlay);
        video.addEventListener('pause', handlePause);
        video.addEventListener('volumechange', handleVolumeChange);
        video.addEventListener('timeupdate', handleTimeUpdate);

        // eslint-disable-next-line consistent-return
        return () => {
            video.removeEventListener('play', handlePlay);
            video.removeEventListener('pause', handlePause);
            video.removeEventListener('volumechange', handleVolumeChange);
            video.removeEventListener('timeupdate', handleTimeUpdate);
        };
    }, [autoplay, playerRef, setCurrentTime, setIsMuted, setIsPaused, setVolume]);

    useEffect(() => {
        // TODO: Посмотреть события FRAG_BUFFERED, BUFFER_APPENDED для работы с буфером
        const video = playerRef.current;

        if (!video) return;

        const updateBuffer = () => {
            if (!video.buffered.length) {
                setBuffer(0);

                return;
            }

            const bufferedEnd = video.buffered.end(video.buffered.length - 1);

            setBuffer(bufferedEnd);
        };

        video.addEventListener('progress', updateBuffer);

        // eslint-disable-next-line consistent-return
        return () => {
            video.removeEventListener('progress', updateBuffer);
        };
    }, [playerRef]);

    return {
        isPaused,
        fullscreen,
        isMuted,
        volume,
        currentTime,
        playbackRate,
        duration,
        qualities,
        currentLevel,
        seekIndicator,
        seekTime,
        buffer,
        isAutoQuality,
        togglePause,
        setIsMuted,
        toggleMute,
        setVolume,
        setCurrentTime,
        setPlaybackRate,
        skipForward,
        skipBackward,
        toggleFullscreen,
        enterFullscreen,
        exitFullscreen,
        handleSeek,
        setQuality,
        setAutoQuality,
        showSeekIndicator,
        setSeekTime,
    };
};
