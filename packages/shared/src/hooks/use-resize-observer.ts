import { useEffect, useRef } from 'react';

import { assert, isNonNullable, isNullable, noop } from '../fnUtils';
import { isClient } from '../isClient';

type Listener<T> = (element: T) => void;

interface Controller {
    map: Map<Element, Set<Listener<Element>>>;
    resizeObserver: ResizeObserver | null;
    observeResize: <T extends Element>(element: T, listener: Listener<T>) => () => void;
}

export function useResizeObserver() {
    const controllerRef = useRef<Controller | null>(null);

    if (isNullable(controllerRef.current)) {
        controllerRef.current = {
            map: new Map(),
            resizeObserver: null,
            observeResize: (element, listener) => {
                const resizeObserver = controllerRef.current?.resizeObserver;

                if (isNullable(resizeObserver)) {
                    return noop;
                }

                const map = controllerRef.current?.map;

                assert(isNonNullable(map));

                if (!map.has(element)) {
                    map.set(element, new Set());
                }

                const listeners = map.get(element);

                assert(isNonNullable(listeners));

                listeners.add(listener as Listener<Element>);
                resizeObserver.observe(element);

                return () => {
                    listeners.delete(listener as Listener<Element>);
                    if (listeners.size === 0) {
                        map.delete(element);
                    }
                    resizeObserver.unobserve(element);
                };
            },
        };
    }

    if (isClient() && isNullable(controllerRef.current.resizeObserver)) {
        controllerRef.current.resizeObserver = new ResizeObserver((entries) => {
            const map = controllerRef.current?.map;

            entries.forEach(({ target }) => {
                map?.get(target)?.forEach((listener) => {
                    listener(target);
                });
            });
        });
    }

    useEffect(() => () => controllerRef.current?.resizeObserver?.disconnect(), []);

    return [controllerRef.current.observeResize] as const;
}
