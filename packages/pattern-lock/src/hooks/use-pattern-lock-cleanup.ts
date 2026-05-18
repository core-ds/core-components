import { useMemo } from 'react';

import { type TPatternLockInstance } from '@alfalab/react-canvas-pattern-lock';

export const usePatternLockCleanup = (
    patternLockRef: React.MutableRefObject<TPatternLockInstance | null>,
) => {
    const clear = useMemo(() => {
        if (patternLockRef.current) {
            patternLockRef.current.setInitialState();
        }
    }, [patternLockRef]);

    return {
        clear,
    };
};
