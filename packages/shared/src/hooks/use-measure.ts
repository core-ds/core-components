import { Ref, RefCallback, useCallback, useEffect, useRef, useState } from 'react';

import { isNullable, noop } from '../fnUtils';

import { useResizeObserver } from './use-resize-observer';

export function createUseMeasure<T extends HTMLElement, U>(
    measure: (element: T) => U,
): () => [U | undefined, Ref<T>];
export function createUseMeasure<T extends HTMLElement, U>(
    measure: (element: T) => U,
    initial: (() => U) | U,
): () => [U, Ref<T>];
export function createUseMeasure<T extends HTMLElement, U>(
    measure: (element: T) => U,
    initial?: (() => U) | U,
) {
    return function useMeasure() {
        const [measurement, setMeasurement] = useState(initial);
        const [observeResize] = useResizeObserver();
        // see https://github.com/facebook/react/issues/21903#issuecomment-884212599
        const cleanupRef = useRef(noop);
        const refCallback = useCallback<RefCallback<T>>(
            (element) => {
                cleanupRef.current();

                const subscription = isNullable(element)
                    ? noop
                    : observeResize(element, (measuredElement) =>
                          setMeasurement(measure(measuredElement)),
                      );

                cleanupRef.current = () => {
                    subscription();
                    cleanupRef.current = noop;
                };
            },
            [observeResize],
        );

        useEffect(() => cleanupRef.current, []);

        return [measurement, refCallback];
    };
}
