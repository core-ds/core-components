import { useEffect, useLayoutEffect, useState } from 'react';
import { ResizeObserver as ResizeObserverPolyfill } from '@juggle/resize-observer';

type FixedContainerSize = {
    height: number;
    safeAreaTop: number;
};

const INITIAL_SIZE: FixedContainerSize = { height: 0, safeAreaTop: 0 };

const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

export function useFixedContainerHeight(container: HTMLElement | null) {
    const [size, setSize] = useState<FixedContainerSize>(INITIAL_SIZE);

    useIsomorphicLayoutEffect(() => {
        if (!container) return undefined;

        const measure = () => {
            const { offsetHeight } = container;
            const safeAreaTop = parseFloat(window.getComputedStyle(container).paddingTop) || 0;

            setSize((prev) => {
                if (!offsetHeight && prev.height) return prev;

                const height = offsetHeight || window.innerHeight;

                return prev.height === height && prev.safeAreaTop === safeAreaTop
                    ? prev
                    : { height, safeAreaTop };
            });
        };

        const ResizeObserver = window.ResizeObserver || ResizeObserverPolyfill;
        const observer = new ResizeObserver(measure);

        measure();
        observer.observe(container);

        return () => observer.disconnect();
    }, [container]);

    return size;
}
