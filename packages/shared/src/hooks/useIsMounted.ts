import { type RefObject, useEffect, useRef } from 'react';

import { fnUtils } from '../fnUtils';

export const useIsMounted = (): [
    isMountedRef: RefObject<boolean>,
    runIfMounted: (callback: () => void) => void,
] => {
    const isMountedRef = useRef(true);
    const runIfMounted = useRef<null | ((callback: () => void) => void)>(null);

    // safe to use in useEffect deps - once initiated it never changes
    if (fnUtils.isNil(runIfMounted.current)) {
        runIfMounted.current = (callback: () => void) => {
            if (!isMountedRef.current) return;
            callback();
        };
    }

    useEffect(
        () => () => {
            isMountedRef.current = false;
        },
        [],
    );

    return [isMountedRef, runIfMounted.current];
};
