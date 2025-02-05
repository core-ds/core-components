import React, { useCallback, useEffect, useRef, useState } from 'react';

import { isNonNullable } from '../fnUtils';

import { ResizeEntry, useResizeObserver } from './use-resize-observer';

export function createUseMeasure<T extends Element, U>(
    measure: (entries: Array<ResizeEntry<T>>) => U,
): <V extends T>(enabled?: boolean) => [U | undefined, React.Ref<V>];
export function createUseMeasure<T extends Element, U>(
    measure: (entries: Array<ResizeEntry<T>>) => U,
    initialValue: (() => U) | U,
): <V extends T>(enabled?: boolean) => [U, React.Ref<V>];
export function createUseMeasure<T extends Element, U>(
    measure: (entries: Array<ResizeEntry<T>>) => U,
    initialValue?: (() => U) | U,
) {
    return function useMeasure<V extends T>(enabled = true): [U | undefined, React.Ref<V>] {
        const [value, setValue] = useState(initialValue);
        const [observeResize] = useResizeObserver();
        const cleanUpRef = useRef<(() => void) | null>(null);
        // https://github.com/facebook/react/issues/21903
        const refCallback = useCallback<React.RefCallback<V>>(
            (element) => {
                if (isNonNullable(cleanUpRef.current)) {
                    cleanUpRef.current();
                    cleanUpRef.current = null;
                }

                if (isNonNullable(element)) {
                    cleanUpRef.current = observeResize(element, (entries) =>
                        setValue(measure(entries)),
                    );
                }
            },
            [observeResize],
        );

        useEffect(() => {
            if (enabled) {
                return;
            }

            setValue(initialValue);
        }, [enabled]);

        return [value, enabled ? refCallback : null];
    };
}

export const useElementWidth = createUseMeasure(
    ([
        {
            borderBoxSize: [{ inlineSize }],
        },
    ]) => Math.ceil(inlineSize),
);

export const useElementHeight = createUseMeasure(
    ([
        {
            borderBoxSize: [{ blockSize }],
        },
    ]) => Math.ceil(blockSize),
);
