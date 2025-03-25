import React, { useRef, useState } from 'react';
import { ResizeObserver as ResizeObserverPolyfill } from '@juggle/resize-observer';

import { useLayoutEffect_SAFE_FOR_SSR } from '@alfalab/hooks';

import { isNullable, noop } from '../fnUtils';
import { isClient } from '../isClient';

interface RefCallbackController<T> {
    /**
     * @private
     */
    target: T;
    subscribe: (target: T) => void;
    unsubscribe: () => void;
}

interface UseMeasureController<T> extends RefCallbackController<T> {
    /**
     * @private
     */
    resizeObserver: ResizeObserver | null;
    unsafeUnsubscribe: (resetToInitialValue?: boolean) => void;
}

export function createUseMeasure<T extends Element, U>(props: {
    measure: (entries: ResizeObserverEntry[]) => U;
}): <V extends T>(
    enabled?: boolean,
) => [
    value: U | undefined,
    ref: React.RefCallback<V>,
    unsubscribe: (resetToInitialValue?: boolean) => void,
];
export function createUseMeasure<T extends Element, U>(props: {
    measure: (entries: ResizeObserverEntry[]) => U;
    initialValue: (() => U) | U;
}): <V extends T>(
    enabled?: boolean,
) => [value: U, ref: React.RefCallback<V>, unsubscribe: (resetToInitialValue?: boolean) => void];
export function createUseMeasure<T extends Element, U>({
    measure,
    initialValue,
}: {
    measure: (entries: ResizeObserverEntry[]) => U;
    initialValue?: (() => U) | U;
}) {
    return function useMeasure<V extends T>(
        enabled = true,
    ): [
        value: U | undefined,
        ref: React.RefCallback<V>,
        unsubscribe: (resetToInitialValue?: boolean) => void,
    ] {
        const [value, setValue] = useState(initialValue);
        const ctrlRef = useRef<UseMeasureController<V | null> | null>(null);

        if (isNullable(ctrlRef.current)) {
            const ctrl: UseMeasureController<V | null> = {
                target: null,
                resizeObserver: isClient()
                    ? new (window.ResizeObserver ?? ResizeObserverPolyfill)((entries) =>
                          setValue(measure(entries)),
                      )
                    : null,
                subscribe: (target) => {
                    if (isNullable(target) || target === ctrl.target) {
                        return;
                    }

                    ctrl.unsubscribe();

                    ctrl.resizeObserver?.observe(target);
                    ctrl.target = target;
                },
                unsubscribe: () => ctrlRef.current?.unsafeUnsubscribe(),
                unsafeUnsubscribe: (resetToInitialValue = false) => {
                    if (resetToInitialValue) {
                        setValue(initialValue);
                    }

                    const { target } = ctrl;

                    if (isNullable(target)) {
                        return;
                    }

                    ctrl.resizeObserver?.unobserve(target);
                    ctrl.target = null;
                },
            };

            ctrlRef.current = ctrl;
        }

        useLayoutEffect_SAFE_FOR_SSR(() => {
            if (enabled) {
                return () => ctrlRef.current?.unsubscribe();
            }

            setValue(initialValue);

            return noop;
        }, [enabled]);

        return [
            value,
            enabled ? ctrlRef.current.subscribe : ctrlRef.current.unsubscribe,
            ctrlRef.current.unsafeUnsubscribe,
        ];
    };
}

export const useElementWidth = createUseMeasure({
    measure: (entries) => {
        const [
            {
                borderBoxSize: [{ inlineSize }],
            },
        ] = entries;

        return Math.ceil(inlineSize);
    },
});

export const useElementHeight = createUseMeasure({
    measure: (entries) => {
        const [
            {
                borderBoxSize: [{ blockSize }],
            },
        ] = entries;

        return Math.ceil(blockSize);
    },
});
