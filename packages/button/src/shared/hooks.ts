import { useEffect, useRef, useState } from 'react';

import { isNonNullable } from '@alfalab/core-components-shared';

import { LOADER_MIN_DISPLAY_INTERVAL } from '../constants/loader-min-display-interval';

export function useLoading(loading: boolean | undefined = false) {
    const [loaderTimePassed, setLoaderTimePassed] = useState(true);
    const timerId = useRef<number | null>(null);

    useEffect(() => {
        if (loading) {
            setLoaderTimePassed(false);

            timerId.current = window.setTimeout(() => {
                setLoaderTimePassed(true);
                timerId.current = null;
            }, LOADER_MIN_DISPLAY_INTERVAL);
        }
    }, [loading]);

    useEffect(
        () => () => {
            if (isNonNullable(timerId.current)) {
                window.clearTimeout(timerId.current);
            }
        },
        [],
    );

    return loading || !loaderTimePassed;
}
