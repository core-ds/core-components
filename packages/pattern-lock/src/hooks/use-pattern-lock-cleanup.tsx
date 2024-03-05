import type { TPatternLockInstance } from 'react-canvas-pattern-lock';

export const usePatternLockCleanup = (
    patternLockRef: React.MutableRefObject<TPatternLockInstance | null>,
) => {
    const clearPatternLock = () => {
        if (patternLockRef.current) {
            patternLockRef.current.setInitialState();
        }
    };

    return {
        clearPatternLock,
    };
};
