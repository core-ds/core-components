import { Ref, useEffect, useRef, useState } from 'react';

import { isNullable, noop } from '../fnUtils';

import { useResizeObserver } from './use-resize-observer';

export function createUseMeasure<T extends HTMLElement, U>(
    measure: (element: T) => U,
): (enabled?: boolean) => [U | undefined, Ref<T>];
export function createUseMeasure<T extends HTMLElement, U>(
    measure: (element: T) => U,
    initial: (() => U) | U,
): (enabled?: boolean) => [U, Ref<T>];
export function createUseMeasure<T extends HTMLElement, U>(
    measure: (element: T) => U,
    initial?: (() => U) | U,
) {
    return function useMeasure(enabled = true) {
        const [measurement, setMeasurement] = useState(initial);
        const [observeResize] = useResizeObserver();
        const ref = useRef<T | null>(null);

        useEffect(() => {
            const element = ref.current;

            // https://github.com/facebook/react/issues/21903#issuecomment-883390619
            if (!enabled || isNullable(element)) {
                return noop;
            }

            return observeResize(element, (measuredElement) =>
                setMeasurement(measure(measuredElement)),
            );
        }, [enabled, observeResize]);

        return [measurement, ref];
    };
}
