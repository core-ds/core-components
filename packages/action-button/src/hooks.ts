import {
    useEffect,
    useRef,
    useState,
} from 'react';

export const useLoader = (loading: boolean, timeout: number) => {
    const timerId = useRef(0);

    const [loaderTimePassed, setLoaderTimePassed] = useState(true);

    const showLoader = loading || !loaderTimePassed;

    useEffect(() => {
        if (loading) {
            setLoaderTimePassed(false);

            if (timerId.current) {
                window.clearTimeout(timerId.current);
            }

            timerId.current = window.setTimeout(() => {
                setLoaderTimePassed(true);
            }, timeout);
        }
    }, [loading, timeout]);

    useEffect(() => {
        if (timerId.current) {
            window.clearTimeout(timerId.current);
        }
    }, []);

    return { showLoader };
};
