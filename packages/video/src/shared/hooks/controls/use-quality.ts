import { type RefObject, useCallback, useEffect, useState } from 'react';
import type Hls from 'hls.js';

import { Events } from '@alfalab/core-components-video/hls-types';

export const useQuality = (
    hlsRef: RefObject<Hls | undefined>,
    playerRef: RefObject<HTMLVideoElement>,
    levels: Hls['levels'],
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    togglePause: (force?: boolean | undefined) => void,
) => {
    const [qualities, setQualities] = useState<Array<{ index: number; height: number }>>([]);
    const [currentLevel, setCurrentLevel] = useState<number | null>(null);
    const [isAutoQuality, setIsAutoQuality] = useState(true);

    const [isQualitySwitching, setIsQualitySwitching] = useState(false);

    const setQuality = useCallback(
        (index: number) => {
            const video = playerRef.current;
            const hls = hlsRef.current;

            if (!hls || !video) return;

            if (isAutoQuality && currentLevel === index) {
                setIsAutoQuality(false);

                return;
            }

            if (currentLevel === index) return;

            setIsLoading(true);
            togglePause(true);
            setIsAutoQuality(false);
            setIsQualitySwitching(true);

            hls.currentLevel = index;
        },
        [isAutoQuality, currentLevel, hlsRef, playerRef, setIsLoading, togglePause],
    );

    const setAutoQuality = useCallback(() => {
        const hls = hlsRef.current;

        if (!hls) return;

        hls.currentLevel = -1;
        setIsAutoQuality(true);
    }, [hlsRef]);

    useEffect(() => {
        if (levels.length > 0) {
            setQualities(levels.map((level, index) => ({ index, height: level.height })));
        }
    }, [levels]);

    useEffect(() => {
        const hls = hlsRef.current;

        if (!hls || levels.length === 0) return;

        const updateState = () => {
            setCurrentLevel(hls.currentLevel);
        };

        hls.on(Events.LEVEL_SWITCHED, updateState);

        // eslint-disable-next-line consistent-return
        return () => {
            hls.off(Events.LEVEL_SWITCHED, updateState);
        };
    }, [levels, hlsRef]);

    useEffect(() => {
        const hls = hlsRef.current;

        if (!hls) return;

        const handleFragBuffered = () => {
            if (isQualitySwitching) {
                setTimeout(() => {
                    setIsLoading(false);
                    togglePause(false);
                    setIsQualitySwitching(false);
                }, 200);
            }
        };

        hls.on(Events.BUFFER_APPENDED, handleFragBuffered);

        // eslint-disable-next-line consistent-return
        return () => {
            hls.off(Events.BUFFER_APPENDED, handleFragBuffered);
        };
    }, [hlsRef, isQualitySwitching, setIsLoading, togglePause]);

    useEffect(() => {
        const hls = hlsRef.current;

        if (!hls) return;

        setIsAutoQuality(hls.autoLevelEnabled);
        if (hls.currentLevel >= 0) {
            setCurrentLevel(hls.currentLevel);
        }
    }, [hlsRef]);

    return {
        qualities,
        currentLevel,
        isAutoQuality,
        setQuality,
        setAutoQuality,
    };
};
