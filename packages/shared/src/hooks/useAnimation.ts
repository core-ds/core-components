import { RefCallback, useEffect, useRef } from 'react';

import { fnUtils } from '../fnUtils';

interface BaseOptions {
    enabled: () => boolean;
    duration: number;
}

interface Options<T> extends BaseOptions {
    animate: (el: T, progress: number) => void;
    onFinish?: (el: T) => void;
    onDestroy?: (el: T) => void;
}

interface ContextedOptions<T, C> extends BaseOptions {
    animate: (el: T, progress: number, ctx: C) => void;
    onFinish?: (el: T, ctx: C) => void;
    onDestroy?: (el: T, ctx: C) => void;
    initContext: (el: T) => C;
}

interface Animation<T, C> {
    animate(options: ContextedOptions<T, C> | Options<T>): void;
    cancel(): void;
}

function createAnimation<T, C>(element: T): Animation<T, C> {
    let state: 'idle' | 'initial' | 'playing' | 'paused' | 'finished' = 'initial';

    let options: ContextedOptions<T, C> | Options<T>;
    let ctx: C;
    let duration: number;

    let timerId: number;
    let startTime: number;
    let pauseDiff = 0;

    function animate(nextOptions: ContextedOptions<T, C> | Options<T>) {
        options = nextOptions;
        if (state === 'initial') {
            if ('initContext' in options) {
                ctx = options.initContext(element);
            }

            duration = options.duration;

            state = 'idle';
        }

        if (options.enabled()) {
            const idle = state === 'idle';
            const paused = state === 'paused';

            if (idle) {
                startTime = performance.now();
            }
            if (paused) {
                pauseDiff -= performance.now();
            }
            if (idle || paused) {
                state = 'playing';
                timerId = window.requestAnimationFrame(rafCallback);
            }
        } else if (state === 'playing') {
            state = 'paused';
            pauseDiff += performance.now();
            window.cancelAnimationFrame(timerId);
        }
    }

    function rafCallback(timestamp: number) {
        const progress = Math.min((timestamp - startTime + pauseDiff) / duration, 1);

        options.animate(element, progress, ctx);

        if (progress === 1) {
            state = 'finished';
            options.onFinish?.(element, ctx);
        } else {
            timerId = window.requestAnimationFrame(rafCallback);
        }
    }

    function cancel() {
        if (state === 'playing') {
            window.cancelAnimationFrame(timerId);
        }
        options.onDestroy?.(element, ctx);
    }

    return { animate, cancel };
}

export function useAnimation<T>(options: Options<T>): [RefCallback<T>];
export function useAnimation<T, C>(options: ContextedOptions<T, C>): [RefCallback<T>];
export function useAnimation<T, C>(options: ContextedOptions<T, C> | Options<T>): [RefCallback<T>] {
    const animationRef = useRef<Animation<T, C> | null>(null);
    const refCallbackRef = useRef<RefCallback<T> | null>(null);

    if (fnUtils.isNil(refCallbackRef.current)) {
        refCallbackRef.current = (element) => {
            animationRef.current?.cancel();

            if (fnUtils.isNil(element)) {
                return;
            }

            animationRef.current = createAnimation<T, C>(element);
        };
    }

    useEffect(() => {
        animationRef.current?.animate(options);
    });

    return [refCallbackRef.current];
}
