import {
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';

export const useLoader = (loading: boolean, timeout: number) => {
    const timerId = useRef(0);

    const [loaderTimePassed, setLoaderTimePassed] = useState(true);

    const showLoader = useMemo(() => loading || !loaderTimePassed, [loading, loaderTimePassed]);

    useEffect(() => {
        if (loading) {
            setLoaderTimePassed(false);

            timerId.current = window.setTimeout(() => {
                setLoaderTimePassed(true);
            }, timeout);
        }
    }, [loading, timeout]);

    useEffect(() => {
        return () => {
            window.clearTimeout(timerId.current);
        };
    }, []);

    return { showLoader };
};
