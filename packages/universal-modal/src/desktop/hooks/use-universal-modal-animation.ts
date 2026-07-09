import { type RefObject, useCallback, useEffect, useRef } from 'react';
import { GroupAnimation, spring } from 'motion';
import { animate } from 'motion/mini';

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

    callbacksRef.current = callbacks;

    const playEnter = useCallback(() => {
        if (!ref.current) {
            return;
        }

        animationRef.current?.cancel();

        const transformAnim = animate(
            ref.current,
            { translate: enter.translate },
            {
                type: spring,
                ...enter.springOptions,
                delay: 0.01,
            },
        );

        const opacityAnim = animate(
            ref.current,
            { opacity: [0, 1] },
            {
                duration: 0.2,
                ease: [0.22, 1, 0.36, 1],
            },
        );

        const blurAnim = animate(
            ref.current,
            { filter: ['blur(8px)', 'blur(0px)'] },
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

        animationRef.current?.cancel();

        const transformAnim = animate(
            ref.current,
            {
                translate: exit.translate,
            },
            {
                type: spring,
                ...exit.springOptions,
            },
        );

        const opacityAnim = animate(
            ref.current,
            { opacity: [1, 0] },
            {
                duration: 0.25,
                ease: [0.32, 0, 0.2, 1],
            },
        );

        const blurAnim = animate(
            ref.current,
            { filter: ['blur(0px)', 'blur(8px)'] },
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
