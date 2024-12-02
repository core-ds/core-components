import { useEffect, useRef, useState } from 'react';

const defaultConfig: IntersectionObserverInit = {
    root: null,
    rootMargin: '0px 0px 0px 0px',
    threshold: [0, 1],
};

export const useInViewRef = (
    options?: IntersectionObserver,
): [React.MutableRefObject<null>, boolean] => {
    const [inView, setInView] = useState<boolean>(false);
    const ref = useRef(null);

    // eslint-disable-next-line consistent-return
    useEffect(() => {
        if (ref.current) {
            const observer = new IntersectionObserver(([entry]) => {
                setInView(entry.isIntersecting);
            }, options || defaultConfig);

            observer.observe(ref.current);

            return () => {
                observer.disconnect();
            };
        }
    }, [options]);

    return [ref, inView];
};
