import { useEffect, useState } from 'react';
import { ResizeObserver as ResizeObserverPolyfill } from '@juggle/resize-observer';

type FixedContainerSize = {
    height: number;
    safeAreaTop: number;
};

const INITIAL_SIZE: FixedContainerSize = { height: 0, safeAreaTop: 0 };

export function useFixedContainerHeight() {
    const [size, setSize] = useState<FixedContainerSize>(INITIAL_SIZE);

    useEffect(() => {
        const probe = document.createElement('div');

        probe.style.cssText =
            'position:fixed;top:0;bottom:0;box-sizing:border-box;' +
            'padding-top:env(safe-area-inset-top);visibility:hidden;pointer-events:none';
        document.body.appendChild(probe);

        const measure = () => {
            const height = probe.offsetHeight || window.innerHeight;
            const safeAreaTop = parseFloat(window.getComputedStyle(probe).paddingTop) || 0;

            setSize((prev) =>
                prev.height === height && prev.safeAreaTop === safeAreaTop
                    ? prev
                    : { height, safeAreaTop },
            );
        };

        const ResizeObserver = window.ResizeObserver || ResizeObserverPolyfill;
        const observer = new ResizeObserver(measure);

        measure();
        observer.observe(probe);

        return () => {
            observer.disconnect();
            probe.remove();
        };
    }, []);

    return size;
}
