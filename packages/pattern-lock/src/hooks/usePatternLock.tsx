import { useRef } from 'react';

export const usePatternLock = () => {
    const inputProgressRef = useRef<HTMLDivElement>(null);

    return { inputProgressRef };
};
