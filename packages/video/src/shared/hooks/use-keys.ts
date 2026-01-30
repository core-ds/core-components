import { useCallback, useContext, useEffect } from 'react';

import { VideoContext } from '@alfalab/core-components-video/context';

export const useVideoHotkeys = () => {
    const { togglePause, enterFullscreen, skipForward, skipBackward, setVolume, exitFullscreen } =
        useContext(VideoContext);

    const changeVolume = useCallback(
        (delta: number) => {
            setVolume((prev) => {
                let next = prev + delta;

                if (next > 100) next = 100;
                if (next < 0) next = 0;

                return next;
            });
        },
        [setVolume],
    );

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const { key } = e;

            switch (key) {
                case ' ':
                    e.preventDefault();
                    togglePause();
                    break;
                case 'ArrowRight':
                    skipForward();
                    break;
                case 'ArrowLeft':
                    skipBackward();
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    changeVolume(5);
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    changeVolume(-5);
                    break;
                case 'f':
                    enterFullscreen();
                    break;
                case 'Escape':
                    exitFullscreen();
                    break;
                default:
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [togglePause, changeVolume, enterFullscreen, exitFullscreen, skipForward, skipBackward]);
};
