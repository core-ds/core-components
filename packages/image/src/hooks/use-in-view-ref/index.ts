import { type MutableRefObject, useEffect, useRef, useState } from 'react';

const defaultConfig: IntersectionObserverInit = {
    root: null,
    rootMargin: '0px 0px 0px 0px',
    threshold: [0, 1],
};

type Params = {
    inViewOption?: boolean;
} & Partial<IntersectionObserverInit>;

/**
 * Хук для ленивой загрузки: возвращает ref и флаг видимости элемента во viewport.
 */
export const useInViewRef = (
    options?: Params,
): [MutableRefObject<HTMLImageElement | null>, boolean] => {
    const enabled = options?.inViewOption;
    const [inView, setInView] = useState<boolean>(!enabled);
    const ref = useRef<HTMLImageElement | null>(null);

    useEffect(() => {
        const element = ref.current;

        if (!element || !enabled) {
            return undefined;
        }

        const observer = new IntersectionObserver(([entry], currentObserver) => {
            if (entry.isIntersecting) {
                setInView(true);
                currentObserver.disconnect();
            }
        }, options || defaultConfig);

        observer.observe(element);

        return () => {
            observer.disconnect();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [enabled]);

    return [ref, inView];
};
