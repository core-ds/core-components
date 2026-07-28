import { type RefObject, useEffect } from 'react';

interface SaveStateOptions {
    volume: number;
    isMuted: boolean;
    currentTime: number;
    setCurrentTime: (v: number) => void;
}

export const useSaveState = (
    playerRef: RefObject<HTMLVideoElement>,
    url: string,
    { volume, isMuted, currentTime, setCurrentTime }: SaveStateOptions,
) => {
    useEffect(() => {
        const video = playerRef.current;

        if (!video) return;

        const handleTimeUpdate = () => setCurrentTime(video.currentTime);

        video.addEventListener('timeupdate', handleTimeUpdate);

        // eslint-disable-next-line consistent-return
        return () => video.removeEventListener('timeupdate', handleTimeUpdate);
    }, [playerRef, setCurrentTime, url]);

    useEffect(() => {
        localStorage.setItem(`video-progress-${url}`, String(currentTime));
        localStorage.setItem('video-volume', String(volume / 100));
        localStorage.setItem('video-muted', String(isMuted));
    }, [currentTime, volume, isMuted, url]);
};
