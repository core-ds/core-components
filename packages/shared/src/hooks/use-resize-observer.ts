import { useEffect, useRef } from 'react';

import { assert, isNonNullable, isNullable, noop } from '../fnUtils';
import { isClient } from '../isClient';

type Listener<T> = (element: T) => void;

interface Controller {
    listeners: Map<Element, Listener<Element>>;
    resizeObserver: ResizeObserver | null;
    observeResize: <T extends Element>(element: T, listener: Listener<T>) => () => void;
}

export function useResizeObserver() {
    const controllerRef = useRef<Controller | null>(null);

    if (isNullable(controllerRef.current)) {
        controllerRef.current = {
            listeners: new Map(),
            resizeObserver: null,
            observeResize: (element, listener) => {
                const resizeObserver = controllerRef.current?.resizeObserver;

                if (isNullable(resizeObserver)) {
                    return noop;
                }

                const listeners = controllerRef.current?.listeners;

                assert(isNonNullable(listeners));

                listeners.set(element, listener as Listener<Element>);
                resizeObserver.observe(element);

                return () => {
                    listeners.delete(element);
                    resizeObserver.unobserve(element);
                };
            },
        };
    }

    if (isClient() && isNullable(controllerRef.current.resizeObserver)) {
        controllerRef.current.resizeObserver = new ResizeObserver((entries) => {
            const listeners = controllerRef.current?.listeners;

            assert(isNonNullable(listeners));

            entries.forEach(({ target }) => {
                const listener = listeners.get(target);

                listener?.(target);
            });
        });
    }

    useEffect(() => () => controllerRef.current?.resizeObserver?.disconnect(), []);

    return [controllerRef.current.observeResize] as const;
}
