import { type RefObject, useCallback, useEffect, useState } from 'react';

export const usePause = (playerRef: RefObject<HTMLVideoElement>) => {
    const [isPaused, setIsPaused] = useState(() => {
        const video = playerRef.current;

        return video ? video.paused : true;
    });

    const togglePause = useCallback((force?: boolean) => {
        setIsPaused((prev) => {
            if (typeof force === 'boolean') {
                return force;
            }

            return !prev;
        });
    }, []);

    useEffect(() => {
        const video = playerRef.current;

        if (!video) return;

        if (isPaused) {
            video.pause();
        } else {
            video.play().catch(() => {});
        }
    }, [isPaused, playerRef]);

    return { isPaused, setIsPaused, togglePause };
};
