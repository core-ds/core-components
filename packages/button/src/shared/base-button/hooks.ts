import { useEffect, useRef, useState } from 'react';

const LOADER_MIN_DISPLAY_INTERVAL = 500;

export function useButtonLoading(loading: boolean | undefined) {
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
