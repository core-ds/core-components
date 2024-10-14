import { useEffect, useRef } from 'react';

import { shallowEqual } from '../fnUtils';

export function useDidUpdate<S>(state: S, didUpdate?: (prevState: S, state: S) => void) {
    const prevStateRef = useRef(state);

    useEffect(() => {
        const prevState = prevStateRef.current;

        if (shallowEqual(prevState, state)) {
            return;
        }
        prevStateRef.current = state;
        didUpdate?.(prevState, state);
    }, [didUpdate, state]);
}
