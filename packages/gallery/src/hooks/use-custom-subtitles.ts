import { useContext, useEffect, useState } from 'react';

import { GalleryContext } from '../context';

const SUBTITLES_ANIMATION_SPEED = 0.5;

export const useCustomSubtitles = () => {
    const { getCurrentImageMeta } = useContext(GalleryContext);

    const meta = getCurrentImageMeta();

    const [showSub, setShowSub] = useState(false);
    const [currentSub, setCurrentSub] = useState('');

    const player = meta?.player?.current;

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (!player) {
                return;
            }

            const textTrack = [...(Array.from(player.textTracks) || [])].find(
                (track) => track.kind === 'subtitles',
            );
            const activeCue = textTrack?.activeCues?.[0] as VTTCue | undefined;

            if (!activeCue?.text) {
                setShowSub(false);

                return;
            }

            const isVisible =
                player?.currentTime >= activeCue.startTime &&
                player?.currentTime <= activeCue.endTime - SUBTITLES_ANIMATION_SPEED;

            setCurrentSub(activeCue.text);
            setShowSub(isVisible);
        });

        return () => {
            clearInterval(intervalId);
        };
    }, [player]);

    return {
        showSub,
        currentSub,
    };
};
