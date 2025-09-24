import { type RefObject, useCallback, useEffect, useState } from 'react';
import type Hls from 'hls.js';

import { Events } from '@alfalab/core-components-video/hls-types';

// TODO: доработать смену качества
export const useQuality = (
    hlsRef: RefObject<Hls | undefined>,
    playerRef: RefObject<HTMLVideoElement>,
    levels: Hls['levels'],
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    togglePause: (force?: boolean | undefined) => void,
) => {
    const [currentQuality, setCurrentQuality] = useState(-1);
    const [qualities, setQualities] = useState<Array<{ index: number; height: number }>>([]);

    const setQuality = useCallback(
        (index: number) => {
            const video = playerRef.current;
            const hls = hlsRef.current;

            if (!hls || !video) return;

            setIsLoading(true);
            togglePause(true);

            hls.once(Events.LEVEL_SWITCHED, () => {
                setIsLoading(false);
                togglePause(false);
                setCurrentQuality(index);
            });

            hls.currentLevel = index;
        },
        [hlsRef, playerRef, setIsLoading, togglePause],
    );

    const setAutoQuality = useCallback(() => {
        if (!hlsRef.current) return;

        // eslint-disable-next-line no-param-reassign
        hlsRef.current.currentLevel = -1;
        setCurrentQuality(-1);
    }, [hlsRef]);

    useEffect(() => {
        if (levels.length > 0) {
            setQualities(levels.map((level, index) => ({ index, height: level.height })));
        }
    }, [levels]);

    useEffect(() => {
        const hls = hlsRef.current;

        if (!hls) return;

        const handleLevelSwitch = (_: Events.LEVEL_SWITCHED, data: { level: number }) => {
            setCurrentQuality(data.level);
        };

        hls.on(Events.LEVEL_SWITCHED, handleLevelSwitch);

        // eslint-disable-next-line consistent-return
        return () => {
            hls.off(Events.LEVEL_SWITCHED, handleLevelSwitch);
        };
    }, [hlsRef]);

    useEffect(() => {
        const hls = hlsRef.current;
        const video = playerRef.current;

        if (!hls || !video) return;

        const handleLevelSwitching = () => {
            setIsLoading(true);
            // togglePause(true);
            video.pause();
        };

        const handleFragLoaded = () => {
            if (video.readyState >= 3) {
                setIsLoading(false);
                togglePause(false);
            }
        };

        hls.on(Events.LEVEL_SWITCHING, handleLevelSwitching);
        hls.on(Events.FRAG_LOADED, handleFragLoaded);

        // eslint-disable-next-line consistent-return
        return () => {
            hls.off(Events.LEVEL_SWITCHING, handleLevelSwitching);
            hls.off(Events.FRAG_LOADED, handleFragLoaded);
        };
    }, [hlsRef, playerRef, setIsLoading, togglePause]);

    return { qualities, currentQuality, setQuality, setAutoQuality };
};
