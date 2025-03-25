import { useEffect, useRef } from 'react';
import { ResizeObserver as ResizeObserverPolyfill } from '@juggle/resize-observer';

import { assert, isNonNullable, isNullable, noop } from '../fnUtils';
import { isClient } from '../isClient';

export interface ResizeEntry<T extends Element> extends Omit<ResizeObserverEntry, 'target'> {
    target: T;
}

type ResizeListener<T extends Element> = (resizeEntries: Array<ResizeEntry<T>>) => void;

interface Controller {
    elementListenersMap: Map<Element, Set<ResizeListener<Element>>>;
    resizeObserver: ResizeObserver | null;
    observeResize: <T extends Element>(
        element: T,
        listener: ResizeListener<T>,
        options?: ResizeObserverOptions,
    ) => () => void;
}

export function useResizeObserver(): [
    observeResize: <T extends Element>(
        element: T,
        listener: ResizeListener<T>,
        options?: ResizeObserverOptions,
    ) => () => void,
] {
    const controllerRef = useRef<Controller | null>(null);

    if (isNullable(controllerRef.current)) {
        controllerRef.current = {
            elementListenersMap: new Map(),
            resizeObserver: isClient()
                ? new (window.ResizeObserver ?? ResizeObserverPolyfill)((entries) => {
                      controllerRef.current?.elementListenersMap?.forEach((listeners, element) => {
                          const targetEntries = entries.filter(({ target }) => target === element);

                          if (targetEntries.length === 0) {
                              return;
                          }

                          listeners.forEach((listener) => listener(targetEntries));
                      });
                  })
                : null,
            observeResize: <T extends Element>(
                element: T,
                listener: ResizeListener<T>,
                options?: ResizeObserverOptions,
            ) => {
                const resizeObserver = controllerRef.current?.resizeObserver;

                if (isNullable(resizeObserver)) {
                    return noop;
                }

                const elementListenersMap = controllerRef.current?.elementListenersMap;

                assert(isNonNullable(elementListenersMap));

                let listeners: Set<ResizeListener<T>>;

                if (elementListenersMap.has(element)) {
                    const listenersFromMap = elementListenersMap.get(element);

                    assert(isNonNullable(listenersFromMap));
                    listeners = listenersFromMap;
                } else {
                    listeners = new Set();
                    elementListenersMap.set(element, listeners as Set<ResizeListener<Element>>);
                }

                listeners.add(listener);
                resizeObserver.observe(element, options);

                return () => {
                    listeners.delete(listener);
                    if (listeners.size === 0) {
                        elementListenersMap.delete(element);
                    }
                    resizeObserver.unobserve(element);
                };
            },
        };
    }

    useEffect(() => () => controllerRef.current?.resizeObserver?.disconnect(), []);

    return [controllerRef.current.observeResize];
}
