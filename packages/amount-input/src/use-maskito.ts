import { type Ref, useRef, useState } from 'react';
import {
    Maskito,
    MASKITO_DEFAULT_ELEMENT_PREDICATE,
    type MaskitoElement,
    type MaskitoElementPredicate,
    type MaskitoOptions,
} from '@maskito/core';
import noop from 'lodash/noop';

import { useLayoutEffect_SAFE_FOR_SSR } from '@alfalab/hooks';

function adaptReactControlledElement(element: MaskitoElement): MaskitoElement {
    const valueSetter = Object.getOwnPropertyDescriptor(getPrototype(element), 'value')?.set;

    if (!valueSetter) {
        return element;
    }

    const adapter = {
        set value(value: string) {
            /**
             * Mimics exactly what happens when a browser silently changes the value property.
             * Bypass the React monkey-patching.
             */
            valueSetter.call(element, value);
        },
    };

    return new Proxy(element, {
        get(target, prop: keyof HTMLElement) {
            const nativeProperty = target[prop];

            return typeof nativeProperty === 'function'
                ? nativeProperty.bind(target)
                : nativeProperty;
        },
        set(target, prop: keyof HTMLElement, val, receiver) {
            return Reflect.set(prop in adapter ? adapter : target, prop, val, receiver);
        },
    });
}

function getPrototype(
    element: MaskitoElement,
): HTMLInputElement | HTMLTextAreaElement | null | undefined {
    const win = element.ownerDocument.defaultView;

    switch (element.nodeName) {
        case 'INPUT':
            return win?.HTMLInputElement?.prototype;
        case 'TEXTAREA':
            return win?.HTMLTextAreaElement?.prototype;
        default:
            return null;
    }
}

function isThenable<T = unknown>(x: PromiseLike<T> | T): x is PromiseLike<T> {
    return x && typeof x === 'object' && 'then' in x;
}

export const useMaskito = ({
    options = null,
    elementPredicate = MASKITO_DEFAULT_ELEMENT_PREDICATE,
}: {
    options?: MaskitoOptions | null;
    elementPredicate?: MaskitoElementPredicate;
} = {}): Ref<HTMLElement> => {
    const hostElementRef = useRef<HTMLElement | null>(null);
    const [element, setElement] = useState<MaskitoElement | null>(null);
    const elementPredicateRef = useRef(elementPredicate);

    useLayoutEffect_SAFE_FOR_SSR(() => {
        elementPredicateRef.current = elementPredicate;
    }, [elementPredicate]);

    useLayoutEffect_SAFE_FOR_SSR(() => {
        const hostElement = hostElementRef.current;

        if (!hostElement) {
            if (element) {
                setElement(null);
            }

            return;
        }

        const latestElementPredicate = elementPredicateRef.current;
        const elementOrPromise = latestElementPredicate(hostElement);

        if (isThenable(elementOrPromise)) {
            elementOrPromise.then((resolvedElement) => {
                if (
                    resolvedElement !== element &&
                    latestElementPredicate === elementPredicateRef.current &&
                    hostElement === hostElementRef.current
                ) {
                    setElement(resolvedElement);
                }
            });
        } else if (elementOrPromise !== element) {
            setElement(elementOrPromise);
        }
    });

    useLayoutEffect_SAFE_FOR_SSR(() => {
        if (!element || !options) {
            return noop;
        }

        const maskedElement = new Maskito(adaptReactControlledElement(element), options);

        return () => {
            maskedElement.destroy();
        };
    }, [options, element]);

    return hostElementRef;
};
