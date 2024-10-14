import { useEffect, useRef } from 'react';

import { assert, isNonNullable, isNullable, noop } from '../fnUtils';
import { isClient } from '../isClient';

export interface ResizeEntry<T> extends Omit<ResizeObserverEntry, 'target'> {
    target: T;
}

type ResizeListener<T> = (resizeEntry: ResizeEntry<T>) => void;

interface Controller {
    map: Map<Element, Set<ResizeListener<Element>>>;
    resizeObserver: ResizeObserver | null;
    observeResize: <T extends Element>(element: T, listener: ResizeListener<T>) => () => void;
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

                let listeners: Set<ResizeListener<Element>>;

                if (map.has(element)) {
                    const listenersFromMap = map.get(element);

                    assert(isNonNullable(listenersFromMap));
                    listeners = listenersFromMap;
                } else {
                    listeners = new Set();
                    map.set(element, listeners);
                }

                listeners.add(listener as ResizeListener<Element>);
                resizeObserver.observe(element);

                return () => {
                    listeners.delete(listener as ResizeListener<Element>);
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

            map?.forEach((listeners, element) => {
                entries
                    .filter(({ target }) => target === element)
                    .forEach((entry) => {
                        listeners.forEach((listener) => {
                            listener(entry);
                        });
                    });
            });
        });
    }

    useEffect(() => () => controllerRef.current?.resizeObserver?.disconnect(), []);

    return [controllerRef.current.observeResize] as const;
}
