import { type RefObject, useCallback, useEffect, useState } from 'react';

export const useFullscreen = (wrapperRef: RefObject<HTMLDivElement>) => {
    const [fullscreen, setFullscreen] = useState(false);

    const enterFullscreen = useCallback(() => {
        wrapperRef.current?.requestFullscreen().catch(() => {});
    }, [wrapperRef]);

    const exitFullscreen = useCallback(() => {
        document.exitFullscreen().catch(() => {});
    }, []);

    const toggleFullscreen = useCallback(() => {
        if (fullscreen) {
            exitFullscreen();
        } else {
            enterFullscreen();
        }
    }, [enterFullscreen, exitFullscreen, fullscreen]);

    useEffect(() => {
        const handleFullscreenChange = () => {
            setFullscreen(document.fullscreenElement === wrapperRef.current);
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);

        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
        };
    }, [wrapperRef]);

    return { fullscreen, setFullscreen, toggleFullscreen, enterFullscreen, exitFullscreen };
};
