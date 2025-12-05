import { type RefObject, useEffect, useState } from 'react';

import { speeds } from '@alfalab/core-components-video/constants';

export const useSpeed = (playerRef: RefObject<HTMLVideoElement>) => {
    const [playbackRate, setPlaybackRate] = useState(1);

    useEffect(() => {
        const video = playerRef.current;

        if (!video) return;

        // eslint-disable-next-line no-param-reassign
        playerRef.current.playbackRate = speeds[playbackRate];
    }, [playbackRate, playerRef]);

    return { playbackRate, setPlaybackRate };
};
