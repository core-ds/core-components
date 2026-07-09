import { useCallback, useEffect, useRef } from 'react';

import { usePrevious } from '@alfalab/hooks';

type Params = {
    open: boolean;
    delay: number;
    onTimeout: () => void;
};

export const useTimer = ({ open, delay, onTimeout }: Params) => {
    const timerId = useRef(0);
    const prevOpen = usePrevious(open);

    const start = useCallback(() => {
        clearTimeout(timerId.current);

        timerId.current = window.setTimeout(() => {
            onTimeout?.();
        }, delay);
    }, [delay, onTimeout]);

    const stop = useCallback(() => {
        clearTimeout(timerId.current);
    }, []);

    useEffect(() => {
        if (open !== prevOpen && open) {
            start();
        }

        return () => {
            clearTimeout(timerId.current);
        };
    }, [open, prevOpen, start, stop]);

    return { start, stop };
};
