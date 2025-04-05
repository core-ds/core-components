import React, { useEffect, useRef, useState } from 'react';

import { isNullable, noop } from '../fnUtils';

import { ResizeEntry, useResizeObserver } from './use-resize-observer';

export function createUseMeasure<T extends Element, U>(
    measure: (resizeEntry: ResizeEntry<T>) => U,
): <V extends T>(enabled?: boolean) => [U | undefined, React.Ref<V>];
export function createUseMeasure<T extends Element, U>(
    measure: (resizeEntry: ResizeEntry<T>) => U,
    initial: (() => U) | U,
): <V extends T>(enabled?: boolean) => [U, React.Ref<V>];
export function createUseMeasure<T extends Element, U>(
    measure: (resizeEntry: ResizeEntry<T>) => U,
    initial?: (() => U) | U,
) {
    return function useMeasure<V extends T>(enabled = true) {
        const [measurement, setMeasurement] = useState(initial);
        const [observeResize] = useResizeObserver();
        const ref = useRef<V>(null);

        useEffect(() => {
            const element = ref.current;

            // https://github.com/facebook/react/issues/21903#issuecomment-883390619
            if (!enabled || isNullable(element)) {
                return noop;
            }

            return observeResize(element, (resizeEntry) => setMeasurement(measure(resizeEntry)));
        }, [enabled, observeResize]);

        return [measurement, ref];
    };
}

export const useElementWidth = createUseMeasure(({ borderBoxSize: [{ inlineSize }] }) =>
    Math.ceil(inlineSize),
);
