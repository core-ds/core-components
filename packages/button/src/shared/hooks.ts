import { useEffect, useRef, useState } from 'react';

import { LOADER_MIN_DISPLAY_INTERVAL } from '../constants/loader-min-display-interval';

export function useLoading(loading: boolean | undefined = false) {
    const [loaderTimePassed, setLoaderTimePassed] = useState(true);
    const timer = useRef<number>();

    useEffect(() => {
        if (loading) {
            setLoaderTimePassed(false);
            clearTimeout(timer.current);

            timer.current = window.setTimeout(() => {
                setLoaderTimePassed(true);
                timer.current = undefined;
            }, LOADER_MIN_DISPLAY_INTERVAL);
        }
    }, [loading]);

    useEffect(() => () => clearTimeout(timer.current), []);

    return loading || !loaderTimePassed;
}
