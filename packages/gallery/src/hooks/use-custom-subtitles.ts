import { useContext, useEffect, useState } from 'react';

import { GalleryContext } from '../context';

const SUBTITLES_FADE_DURATION_SECONDS = 0.5;

export const useCustomSubtitles = () => {
    const { getCurrentImageMeta } = useContext(GalleryContext);

    const meta = getCurrentImageMeta();

    const [showSub, setShowSub] = useState(false);
    const [currentSub, setCurrentSub] = useState('');

    const player = meta?.player?.current;

    useEffect(() => {
        if (!player) {
            return undefined;
        }

        const { textTracks } = player;

        let textTrack: TextTrack | undefined;
        let hideTimeoutId: ReturnType<typeof setTimeout> | undefined;

        const clearHideTimeout = () => {
            if (hideTimeoutId !== undefined) {
                clearTimeout(hideTimeoutId);
                hideTimeoutId = undefined;
            }
        };

        const syncSubtitles = () => {
            clearHideTimeout();

            const activeCue = textTrack?.activeCues?.[0] as VTTCue | undefined;

            if (!activeCue?.text) {
                setShowSub(false);

                return;
            }

            const fadeStartTime = activeCue.endTime - SUBTITLES_FADE_DURATION_SECONDS;
            const isVisible = player.currentTime <= fadeStartTime;

            setCurrentSub(activeCue.text);
            setShowSub(isVisible);

            if (!isVisible || player.paused || player.playbackRate <= 0) {
                return;
            }

            const timeUntilFadeMs =
                ((fadeStartTime - player.currentTime) / player.playbackRate) * 1000;

            hideTimeoutId = setTimeout(() => {
                setShowSub(false);
            }, timeUntilFadeMs);
        };

        const connectTextTrack = () => {
            const nextTextTrack = Array.from(textTracks).find(
                (track) => track.kind === 'subtitles',
            );

            if (nextTextTrack === textTrack) {
                syncSubtitles();

                return;
            }

            textTrack?.removeEventListener('cuechange', syncSubtitles);
            textTrack = nextTextTrack;
            textTrack?.addEventListener('cuechange', syncSubtitles);
            syncSubtitles();
        };

        player.addEventListener('play', syncSubtitles);
        player.addEventListener('playing', syncSubtitles);
        player.addEventListener('pause', clearHideTimeout);
        player.addEventListener('waiting', clearHideTimeout);
        player.addEventListener('seeking', clearHideTimeout);
        player.addEventListener('seeked', syncSubtitles);
        player.addEventListener('ratechange', syncSubtitles);
        textTracks.addEventListener('addtrack', connectTextTrack);
        textTracks.addEventListener('change', connectTextTrack);

        connectTextTrack();

        return () => {
            clearHideTimeout();
            textTrack?.removeEventListener('cuechange', syncSubtitles);
            player.removeEventListener('play', syncSubtitles);
            player.removeEventListener('playing', syncSubtitles);
            player.removeEventListener('pause', clearHideTimeout);
            player.removeEventListener('waiting', clearHideTimeout);
            player.removeEventListener('seeking', clearHideTimeout);
            player.removeEventListener('seeked', syncSubtitles);
            player.removeEventListener('ratechange', syncSubtitles);
            textTracks.removeEventListener('addtrack', connectTextTrack);
            textTracks.removeEventListener('change', connectTextTrack);
        };
    }, [player]);

    return {
        showSub,
        currentSub,
    };
};
