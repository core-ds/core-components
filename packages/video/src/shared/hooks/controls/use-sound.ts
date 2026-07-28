import { type RefObject, useCallback, useEffect, useRef, useState } from 'react';

export const useSound = (playerRef: RefObject<HTMLVideoElement>) => {
    const [isMuted, setIsMuted] = useState(() => {
        const saved = localStorage.getItem('video-muted');

        return saved ? saved === 'true' : true;
    });
    const [volume, setVolume] = useState(() => {
        const saved = localStorage.getItem('video-volume');

        return saved ? Math.round(Number(saved) * 100) : 50;
    });

    const muteChangedByToggle = useRef(false);
    const didInit = useRef(false);

    const toggleMute = useCallback(() => {
        muteChangedByToggle.current = true;
        setIsMuted((prev) => {
            if (prev && volume === 0) {
                setVolume(50);
            }

            return !prev;
        });
    }, [volume]);

    useEffect(() => {
        const video = playerRef.current;

        if (!video) return;

        video.muted = isMuted;
        video.volume = volume / 100;
    }, [isMuted, playerRef, volume]);

    useEffect(() => {
        if (!didInit.current) {
            didInit.current = true;

            return;
        }

        if (muteChangedByToggle.current) {
            muteChangedByToggle.current = false;

            return;
        }

        if (volume === 0 && !isMuted) {
            setIsMuted(true);
        } else if (volume > 0 && isMuted) {
            setIsMuted(false);
        }
    }, [volume, isMuted]);

    return { isMuted, setIsMuted, volume, setVolume, toggleMute };
};
