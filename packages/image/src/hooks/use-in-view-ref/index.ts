import { useEffect, useRef, useState } from 'react';

const defaultConfig: IntersectionObserverInit = {
    root: null,
    rootMargin: '0px 0px 0px 0px',
    threshold: [0, 1],
};

type Params = {
    inViewOption?: boolean;
} & Partial<IntersectionObserverInit>;

export const useInViewRef = (options?: Params): [React.MutableRefObject<null>, boolean] => {
    const enabled = options?.inViewOption;
    const [inView, setInView] = useState<boolean>(!enabled);
    const ref = useRef(null);

    // eslint-disable-next-line consistent-return
    useEffect(() => {
        if (ref.current && enabled) {
            const observer = new IntersectionObserver(([entry], observer) => {
                if (entry.isIntersecting) {
                    setInView(entry.isIntersecting);
                    observer.disconnect();
                }
            }, options || defaultConfig);

            observer.observe(ref.current);

            return () => {
                observer.disconnect();
            };
        }
    }, [options, ref.current]);

    return [ref, inView];
};
