import { Ref, useEffect, useRef, useState } from 'react';
import { ResizeObserver as ResizeObserverPolyfill } from '@juggle/resize-observer';

import { isClient } from '@alfalab/core-components-shared';

function createUseMeasureHook<T extends HTMLElement, U>(
    measure: (element: T) => U,
): () => [U | undefined, Ref<T>];
function createUseMeasureHook<T extends HTMLElement, U>(
    measure: (element: T) => U,
    initial: (() => U) | U,
): () => [U, Ref<T>];
function createUseMeasureHook<T extends HTMLElement, U>(
    measure: (element: T) => U,
    initial?: (() => U) | U,
) {
    return function useMeasureHook() {
        const [element, setElement] = useState<T | null>(null);
        const [measurement, setMeasurement] = useState(initial);
        const resizeObserver = useRef<ResizeObserver | null>(null);

        if (isClient() && !resizeObserver.current) {
            const ResizeObserver = window.ResizeObserver || ResizeObserverPolyfill;

            resizeObserver.current = new ResizeObserver(([{ target }]) => {
                // we know it's `element` so cast to the right type
                setMeasurement(measure(target as T));
            });
        }

        // eslint-disable-next-line consistent-return
        useEffect(() => {
            if (element) {
                resizeObserver.current?.observe(element);

                return () => {
                    resizeObserver.current?.unobserve(element);
                };
            }
        }, [element]);

        useEffect(() => resizeObserver.current?.disconnect(), []);

        return [measurement, setElement];
    };
}

export const useMeasureHeight = createUseMeasureHook(
    (element: HTMLDivElement) => element.offsetHeight,
    0,
);
