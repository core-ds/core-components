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

export function useModalSpringTransition<T extends HTMLElement>(
    ref: RefObject<T | null>,
    enter: AnimationParams,
    exit: AnimationParams,
    callbacks?: UseSpringTransitionCallbacks,
    contentRef?: RefObject<T | null>,
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
                delay: 0.08,
            },
        );

        const scaleAnim = animate(
            ref.current,
            { scale: isFirstEnter ? [0.98, 1] : 1 },
            { stiffness: 406, damping: 35, mass: 1, delay: 0.08 },
        );

        const blurAnim = animate(
            ref.current,
            { filter: isFirstEnter ? ['blur(8px)', 'blur(0px)'] : 'blur(0px)' },
            {
                duration: 0.2,
                delay: 0.08,
                ease: [0.22, 1, 0.36, 1],
            },
        );

        const opacityContentAnim = animate(
            contentRef?.current,
            { opacity: isFirstEnter ? [0, 1] : 1 },
            {
                duration: 0.26,
                ease: [0.22, 1, 0.36, 1],
            },
        );

        const group = new GroupAnimation([
            transformAnim,
            opacityAnim,
            scaleAnim,
            blurAnim,
            opacityContentAnim,
        ]);

        animationRef.current = group;

        group.finished.then(() => {
            callbacksRef.current?.onEntered?.();
        });
    }, [contentRef, enter.springOptions, enter.translate, ref]);

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
                duration: 0.34,
                ease: [0.22, 1, 0.36, 1],
            },
        );

        const scaleAnim = animate(
            ref.current,
            { scale: 0.98 },
            { stiffness: 235, damping: 31, mass: 1 },
        );

        const blurAnim = animate(
            ref.current,
            { filter: 'blur(8px)' },
            {
                duration: 0.2,
                ease: [0.22, 1, 0.36, 1],
            },
        );

        const opacityContentAnim = animate(
            contentRef?.current,
            { opacity: 0 },
            {
                duration: 0.26,
                ease: [0.22, 1, 0.36, 1],
            },
        );

        const group = new GroupAnimation([
            transformAnim,
            opacityAnim,
            scaleAnim,
            blurAnim,
            opacityContentAnim,
        ]);

        animationRef.current = group;

        group.finished.then(() => {
            callbacksRef.current?.onExited?.();
        });
    }, [contentRef, exit.springOptions, exit.translate, ref]);

    useEffect(
        () => () => {
            animationRef.current?.cancel();
        },
        [],
    );

    return { playEnter, playExit };
}
