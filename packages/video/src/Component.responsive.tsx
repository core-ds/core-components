import React, { type FC, useCallback, useMemo, useRef } from 'react';

import { useIsDesktop } from '@alfalab/core-components-mq';

import { DesktopControlsLayer } from './components/controls/layers/desktop';
import { MobileControlsLayer } from './components/controls/layers/mobile';
import { VideoError } from './components/player/error';
import { VideoComponent } from './components/player/video-component';
import { VideoWrapper } from './components/player/video-wrapper';
import { useVideoHotkeys } from './shared/hooks/use-keys';
import { VideoContext } from './context';
import { useSaveState, useVideoControls, useVideoLoader } from './shared';
import { type FitMode, type Position } from './types';

export type VideoProps = {
    /**
     * Ссылка на видео
     */
    url: string;
    /**
     * Название видео
     */
    videoName?: string;
    /**
     * Автовоспроизведение
     */
    autoplay?: boolean;
    /**
     * Зацикленность
     */
    loop?: boolean;
    /**
     * Величина перемотки вперед
     */
    skipForwardStep?: number;
    /**
     * Величина перемотки назад
     */
    skipBackwardStep?: number;
    /**
     * Тайминг показа
     */
    startFrom?: number;
    /**
     * Режим растяжения: 'cover' | 'fill' | 'contain'
     */
    fitMode?: FitMode;
    /**
     * Режим позиционирование: 'center' | 'top' | 'bottom' | 'left' | 'right'
     */
    position?: Position;
    /**
     * Требуется ли параметр для ориентации видео?
     */
};

export const Video: FC<VideoProps> = ({
    url,
    videoName,
    autoplay = false,
    loop = true,
    skipForwardStep,
    skipBackwardStep,
    startFrom,
    fitMode = 'cover',
    position = 'center',
}) => {
    const isDesktop = useIsDesktop();

    const wrapperRef = useRef<HTMLDivElement>(null);

    const { playerRef, hlsRef, levels, isLoading, error, setIsLoading } = useVideoLoader({
        src: url,
        onFatalError: useCallback(() => {}, []),
    });

    const videoControls = useVideoControls(
        url,
        playerRef,
        wrapperRef,
        hlsRef,
        levels,
        setIsLoading,
        {
            loop,
            autoplay,
            skipForwardStep,
            skipBackwardStep,
            startFrom,
        },
    );

    const { volume, isMuted, currentTime, setCurrentTime } = videoControls;

    useSaveState(playerRef, url, { volume, isMuted, currentTime, setCurrentTime });

    useVideoHotkeys();

    const contextValue = useMemo(
        () => ({
            ...videoControls,
            skipBackwardStep,
            skipForwardStep,
            isLoading,
            isDesktop,
        }),
        [videoControls, skipBackwardStep, skipForwardStep, isDesktop, isLoading],
    );

    if (error) {
        return (
            <VideoWrapper ref={wrapperRef}>
                <VideoError />
            </VideoWrapper>
        );
    }

    return (
        <VideoContext.Provider value={contextValue}>
            <VideoWrapper ref={wrapperRef}>
                <VideoComponent
                    isMuted={isMuted}
                    ref={playerRef}
                    fitMode={fitMode}
                    position={position}
                    autoplay={autoplay}
                />

                {isDesktop ? (
                    <DesktopControlsLayer videoName={videoName} />
                ) : (
                    <MobileControlsLayer videoName={videoName} />
                )}
            </VideoWrapper>

            <p>кнопочки для смены качества</p>
            <button
                type='button'
                onClick={() => {
                    contextValue.setQuality(1);
                }}
            >
                1
            </button>
            <button
                type='button'
                onClick={() => {
                    contextValue.setQuality(2);
                }}
            >
                2
            </button>
            <button
                type='button'
                onClick={() => {
                    contextValue.setQuality(3);
                }}
            >
                3 (720)
            </button>
            <button
                type='button'
                onClick={() => {
                    contextValue.setQuality(4);
                }}
            >
                4 (1080)
            </button>
        </VideoContext.Provider>
    );
};
