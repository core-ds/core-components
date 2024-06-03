import { useRef } from 'react';

export const usePatternLock = () => {
    const patternLockRef = useRef<HTMLDivElement>(null);

    return { patternLockRef };
};
