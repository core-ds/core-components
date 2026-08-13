import { useEffect, useState } from 'react';

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

const getPrefersReducedMotion = () =>
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia(REDUCED_MOTION_QUERY).matches;

const getDocumentVisible = () =>
    typeof document === 'undefined' || document.visibilityState !== 'hidden';

export const useAnimationEnvironment = () => {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(getPrefersReducedMotion);
    const [documentVisible, setDocumentVisible] = useState(getDocumentVisible);

    useEffect(() => {
        const mediaQuery =
            typeof window.matchMedia === 'function'
                ? window.matchMedia(REDUCED_MOTION_QUERY)
                : undefined;
        const handleMotionChange = (event: MediaQueryListEvent) => {
            setPrefersReducedMotion(event.matches);
        };
        const handleVisibilityChange = () => {
            setDocumentVisible(getDocumentVisible());
        };

        setPrefersReducedMotion(Boolean(mediaQuery?.matches));
        setDocumentVisible(getDocumentVisible());

        if (mediaQuery) {
            if (typeof mediaQuery.addEventListener === 'function') {
                mediaQuery.addEventListener('change', handleMotionChange);
            } else {
                mediaQuery.addListener(handleMotionChange);
            }
        }

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            if (mediaQuery) {
                if (typeof mediaQuery.removeEventListener === 'function') {
                    mediaQuery.removeEventListener('change', handleMotionChange);
                } else {
                    mediaQuery.removeListener(handleMotionChange);
                }
            }

            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);

    return { prefersReducedMotion, documentVisible };
};
