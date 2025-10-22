import { type RefObject, useCallback, useEffect, useRef, useState } from 'react';

import { type SeekIndicator } from '@alfalab/core-components-video/types';

export const useSeek = (
    url: string,
    playerRef: RefObject<HTMLVideoElement>,
    startFrom?: number,
    skipForwardStep?: number,
    skipBackwardStep?: number,
) => {
    const [seekTime, setSeekTime] = useState(0);
    const [currentTime, setCurrentTime] = useState(() => {
        const saved = localStorage.getItem(`video-progress-${url}`);

        return saved ? Number(saved) : (startFrom ?? 0);
    });

    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const [seekIndicator, setSeekIndicator] = useState<SeekIndicator>({
        direction: 'forward',
        amount: 0,
        visible: false,
    });

    const showSeekIndicator = (direction: 'forward' | 'backward', amount: number) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        setSeekIndicator({ direction, amount, visible: true });
        timeoutRef.current = setTimeout(
            () => setSeekIndicator((prev) => ({ ...prev, visible: false })),
            800,
        );
    };

    const skipForward = useCallback(() => {
        if (!playerRef.current || !skipForwardStep) return;

        setCurrentTime((prev) => Math.min(prev + skipForwardStep, playerRef.current!.duration));
        showSeekIndicator('forward', skipForwardStep);
    }, [skipForwardStep, playerRef]);

    const skipBackward = useCallback(() => {
        if (!playerRef.current || !skipBackwardStep) return;

        setCurrentTime((prev) => Math.max(prev - skipBackwardStep, 0));
        showSeekIndicator('backward', skipBackwardStep);
    }, [skipBackwardStep, playerRef]);

    const handleSeek = (value: number) => {
        if (playerRef.current) {
            setCurrentTime(value);
        }
    };

    useEffect(() => {
        if (playerRef.current && Math.abs(playerRef.current.currentTime - currentTime) > 0.1) {
            // eslint-disable-next-line no-param-reassign
            playerRef.current.currentTime = currentTime;
        }
    }, [currentTime, playerRef]);

    return {
        seekTime,
        setSeekTime,
        seekIndicator,
        showSeekIndicator,
        handleSeek,
        skipBackward,
        skipForward,
        currentTime,
        setCurrentTime,
    };
};
