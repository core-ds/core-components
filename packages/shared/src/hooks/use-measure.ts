import React, { useRef, useState } from 'react';
import { ResizeObserver as ResizeObserverPolyfill } from '@juggle/resize-observer';

import { useLayoutEffect_SAFE_FOR_SSR } from '@alfalab/hooks';

import { isNonNullable, isNullable } from '../fnUtils';

interface RefController<T> {
    /**
     * @private
     */
    target: T;
    subscribe: (target: T) => void;
    unsubscribe: () => void;
}

interface UseMeasureController<T> extends RefController<T> {
    /**
     * @private
     */
    resizeObserver: ResizeObserver;
}

export function createUseMeasure<T extends Element, U>(
    measure: (entries: ResizeObserverEntry[]) => U,
): (<V extends T>() => [value: U | undefined, ref: React.Ref<V>]) &
    (<V extends T>(initialValue: (() => U) | U) => [value: U, ref: React.Ref<V>]);
export function createUseMeasure<T extends Element, U>(
    measure: (entries: ResizeObserverEntry[]) => U,
) {
    return function useMeasure<V extends T>(
        initialValue?: (() => U) | U,
    ): [value: U | undefined, ref: React.Ref<V>] {
        const [value, setValue] = useState(initialValue);
        const ctrlRef = useRef<UseMeasureController<V | null> | null>(null);
        const ref = useRef<V>(null);

        useLayoutEffect_SAFE_FOR_SSR(() => {
            const ctrl: UseMeasureController<V | null> = {
                target: null,
                resizeObserver: new (window.ResizeObserver ?? ResizeObserverPolyfill)((entries) =>
                    setValue(measure(entries)),
                ),
                subscribe: (target) => {
                    if (isNullable(target) || target === ctrl.target) {
                        return;
                    }

                    ctrl.unsubscribe();

                    ctrl.resizeObserver.observe(target);
                    ctrl.target = target;
                },
                unsubscribe: () => {
                    const { target } = ctrl;

                    if (isNullable(target)) {
                        return;
                    }

                    ctrl.resizeObserver.unobserve(target);
                    ctrl.target = null;
                },
            };

            ctrlRef.current = ctrl;

            return ctrl.unsubscribe;
        }, []);

        useLayoutEffect_SAFE_FOR_SSR(() => {
            const ctrl = ctrlRef.current;
            const element = ref.current;

            if (isNonNullable(element)) {
                ctrl?.subscribe(element);
            } else {
                if (isNonNullable(ctrl?.target)) {
                    setValue(initialValue);
                }

                ctrl?.unsubscribe();
            }
        });

        return [value, ref];
    };
}

export const useElementWidth = createUseMeasure((entries) => {
    const [
        {
            borderBoxSize: [{ inlineSize }],
        },
    ] = entries;

    return Math.ceil(inlineSize);
});

export const useElementHeight = createUseMeasure((entries) => {
    const [
        {
            borderBoxSize: [{ blockSize }],
        },
    ] = entries;

    return Math.ceil(blockSize);
});
