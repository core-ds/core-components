import { type RefObject, useCallback, useEffect, useRef, useState } from 'react';
import { animate } from 'motion';

import { type SpringOptions } from '../typings';

export type AnimationType =
    | 'shake'
    | 'pulse'
    | 'bounce'
    | 'wobble'
    | 'jelly'
    | 'swing'
    | 'pop'
    | 'nod'
    | 'rubber';

type AnimationValues = Record<string, [number, number]>;

type AnimationPreset = {
    defaultSpring: Required<SpringOptions>;
    steps: AnimationValues[];
};

const PRESETS: Record<AnimationType, AnimationPreset> = {
    shake: {
        defaultSpring: { stiffness: 100, damping: 10, mass: 1 },
        steps: [{ x: [0, 10] }, { x: [10, -10] }, { x: [-10, 0] }],
    },
    pulse: {
        defaultSpring: { stiffness: 300, damping: 15, mass: 1 },
        steps: [{ scale: [1, 1.08] }, { scale: [1.08, 1] }],
    },
    bounce: {
        defaultSpring: { stiffness: 200, damping: 12, mass: 1 },
        steps: [{ y: [0, -14] }, { y: [-14, 0] }],
    },
    wobble: {
        defaultSpring: { stiffness: 150, damping: 8, mass: 1 },
        steps: [{ rotate: [0, -6] }, { rotate: [-6, 6] }, { rotate: [6, -3] }, { rotate: [-3, 0] }],
    },
    jelly: {
        defaultSpring: { stiffness: 300, damping: 10, mass: 1 },
        steps: [
            { scaleX: [1, 1.25], scaleY: [1, 0.75] },
            { scaleX: [1.25, 0.85], scaleY: [0.75, 1.15] },
            { scaleX: [0.85, 1], scaleY: [1.15, 1] },
        ],
    },
    swing: {
        defaultSpring: { stiffness: 100, damping: 8, mass: 1 },
        steps: [
            { rotate: [0, -12] },
            { rotate: [-12, 8] },
            { rotate: [8, -4] },
            { rotate: [-4, 0] },
        ],
    },
    pop: {
        defaultSpring: { stiffness: 400, damping: 20, mass: 1 },
        steps: [{ scale: [1, 1.15] }, { scale: [1.15, 0.95] }, { scale: [0.95, 1] }],
    },
    nod: {
        defaultSpring: { stiffness: 200, damping: 12, mass: 1 },
        steps: [{ y: [0, 8] }, { y: [8, 0] }],
    },
    rubber: {
        defaultSpring: { stiffness: 250, damping: 12, mass: 1 },
        steps: [{ scaleX: [1, 0.85] }, { scaleX: [0.85, 1.1] }, { scaleX: [1.1, 1] }],
    },
};

type UseSpringAnimationCallbacks = {
    onStart?: (cancel: () => void) => void;
    onEnd?: () => void;
};

export function useSpringAnimation<T extends HTMLElement>(
    ref: RefObject<T | null>,
    type: AnimationType,
    springOptions?: SpringOptions,
    callbacks?: UseSpringAnimationCallbacks,
): {
    trigger: () => void;
    cancel: () => void;
    isPlaying: boolean;
} {
    const isPlayingRef = useRef(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const animationRef = useRef<ReturnType<typeof animate> | null>(null);

    const callbacksRef = useRef(callbacks);
    callbacksRef.current = callbacks;

    const springOptionsRef = useRef(springOptions);
    springOptionsRef.current = springOptions;

    const cancel = useCallback(() => {
        animationRef.current?.cancel();
        animationRef.current = null;
        if (ref.current) {
            animate(
                ref.current,
                { x: 0, y: 0, scale: 1, scaleX: 1, scaleY: 1, rotate: 0 },
                { duration: 0 },
            );
        }
        if (isPlayingRef.current) {
            isPlayingRef.current = false;
            setIsPlaying(false);
            callbacksRef.current?.onEnd?.();
        }
    }, [ref]);

    const trigger = useCallback(() => {
        if (!ref.current || isPlayingRef.current) return;

        const el = ref.current;
        const preset = PRESETS[type];
        const merged = { ...preset.defaultSpring, ...springOptionsRef.current };
        const springOpts = { type: 'spring' as const, ...merged };

        isPlayingRef.current = true;
        setIsPlaying(true);
        callbacksRef.current?.onStart?.(cancel);

        const { steps } = preset;

        const runStep = (index: number): void => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            animationRef.current = animate(el, steps[index] as any, springOpts);

            if (index < steps.length - 1) {
                animationRef.current.then(() => runStep(index + 1));
            } else {
                animationRef.current.then(() => {
                    if (isPlayingRef.current) {
                        isPlayingRef.current = false;
                        setIsPlaying(false);
                        callbacksRef.current?.onEnd?.();
                    }
                });
            }
        };

        runStep(0);
    }, [ref, type, cancel]);

    useEffect(
        () => () => {
            animationRef.current?.cancel();
        },
        [],
    );

    return { trigger, cancel, isPlaying };
}
