import { useRef } from 'react';

export const usePassCode = () => {
    const inputProgressRef = useRef<HTMLDivElement>(null);

    return { inputProgressRef };
};
