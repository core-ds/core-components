import { type RefObject, useCallback, useEffect, useRef } from 'react';
import { spring } from 'motion';
import { animate } from 'motion/mini';

import { type AnimationValues, type SpringOptions } from './spring-options';

type UseSpringTransitionCallbacks = {
    onEntered?: () => void;
    onExited?: () => void;
};

export function useSpringTransition<T extends HTMLElement>(
    ref: RefObject<T | null>,
    springOptions: SpringOptions,
    enter: AnimationValues,
    exit: AnimationValues,
    callbacks?: UseSpringTransitionCallbacks,
): {
    playEnter: () => void;
    playExit: () => void;
} {
    const animationRef = useRef<ReturnType<typeof animate> | null>(null);
    const callbacksRef = useRef(callbacks);

    callbacksRef.current = callbacks;

    const springOptionsRef = useRef(springOptions);

    springOptionsRef.current = springOptions;

    const playEnter = useCallback(() => {
        if (!ref.current) return;
        const merged = { ...springOptionsRef.current };

        animationRef.current?.cancel();

        animationRef.current = animate(ref.current, enter, {
            type: spring,
            ...merged,
        });
        animationRef.current.then(() => {
            callbacksRef.current?.onEntered?.();
        });
    }, [enter, ref]);

    const playExit = useCallback(() => {
        if (!ref.current) return;
        const merged = { ...springOptionsRef.current };

        animationRef.current?.cancel();

        animationRef.current = animate(ref.current, exit, {
            type: spring,
            ...merged,
        });
        animationRef.current.then(() => {
            callbacksRef.current?.onExited?.();
        });
    }, [exit, ref]);

    useEffect(
        () => () => {
            animationRef.current?.cancel();
        },
        [],
    );

    return { playEnter, playExit };
}
