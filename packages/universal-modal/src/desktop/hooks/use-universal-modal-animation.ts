import { type RefObject, useCallback, useEffect, useRef } from 'react';
import { animate, GroupAnimation, spring } from 'motion';

import { type SpringOptions } from '@alfalab/core-components-base-modal';

type UseSpringTransitionCallbacks = {
    onEntered?: () => void;
    onExited?: () => void;
};

export type AnimationParams = {
    translate: [string, string];
    springOptions: SpringOptions;
};

export function useSpringTransition<T extends HTMLElement>(
    ref: RefObject<T | null>,
    enter: AnimationParams,
    exit: AnimationParams,
    callbacks?: UseSpringTransitionCallbacks,
): {
    playEnter: () => void;
    playExit: () => void;
} {
    const animationRef = useRef<GroupAnimation | null>(null);
    const callbacksRef = useRef(callbacks);
    const hasEnteredRef = useRef(false);

    callbacksRef.current = callbacks;

    const playEnter = useCallback(() => {
        if (!ref.current) {
            return;
        }

        animationRef.current?.stop();

        /*
         * при самом первом появлении элементу неоткуда взять "from" (нет ни CSS,
         * ни предыдущей анимации), поэтому задаём его явно; при прерывании же
         * используем текущее визуальное состояние, зафиксированное stop()
         */
        const isFirstEnter = !hasEnteredRef.current;

        hasEnteredRef.current = true;

        const transformAnim = animate(
            ref.current,
            { translate: isFirstEnter ? enter.translate : enter.translate[1] },
            {
                type: spring,
                ...enter.springOptions,
                delay: 0.01,
            },
        );

        const opacityAnim = animate(
            ref.current,
            { opacity: isFirstEnter ? [0, 1] : 1 },
            {
                duration: 0.2,
                ease: [0.22, 1, 0.36, 1],
            },
        );

        const blurAnim = animate(
            ref.current,
            { filter: isFirstEnter ? ['blur(8px)', 'blur(0px)'] : 'blur(0px)' },
            {
                duration: 0.2,
                delay: 0.06,
                ease: [0.22, 1, 0.36, 1],
            },
        );

        const group = new GroupAnimation([transformAnim, opacityAnim, blurAnim]);

        animationRef.current = group;

        group.finished.then(() => {
            callbacksRef.current?.onEntered?.();
        });
    }, [enter.springOptions, enter.translate, ref]);

    const playExit = useCallback(() => {
        if (!ref.current) {
            return;
        }

        animationRef.current?.stop();

        const transformAnim = animate(
            ref.current,
            {
                translate: exit.translate[1],
            },
            {
                type: spring,
                ...exit.springOptions,
            },
        );

        const opacityAnim = animate(
            ref.current,
            { opacity: 0 },
            {
                duration: 0.25,
                ease: [0.32, 0, 0.2, 1],
            },
        );

        const blurAnim = animate(
            ref.current,
            { filter: 'blur(8px)' },
            {
                duration: 0.28,
                ease: [0.32, 0, 0.2, 1],
            },
        );

        const group = new GroupAnimation([transformAnim, opacityAnim, blurAnim]);

        animationRef.current = group;

        group.finished.then(() => {
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
