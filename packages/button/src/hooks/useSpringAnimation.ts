import { type RefObject, useCallback, useEffect, useRef, useState } from 'react';
import { spring } from 'motion';
import { animate } from 'motion/mini';

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

type AnimationValues = Record<string, [number | string, number | string]>;

type AnimationPreset = {
    defaultSpring: Required<SpringOptions>;
    steps: AnimationValues[];
};

const PRESETS: Record<AnimationType, AnimationPreset> = {
    shake: {
        defaultSpring: { stiffness: 100, damping: 10, mass: 1 },
        steps: [
            { translate: ['0px', '10px'] },
            { translate: ['10px', '-10px'] },
            { translate: ['-10px', '0px'] },
        ],
    },
    pulse: {
        defaultSpring: { stiffness: 300, damping: 15, mass: 1 },
        steps: [{ scale: [1, 1.08] }, { scale: [1.08, 1] }],
    },
    bounce: {
        defaultSpring: { stiffness: 200, damping: 12, mass: 1 },
        steps: [{ translate: ['0px 0px', '0px -14px'] }, { translate: ['0px -14px', '0px 0px'] }],
    },
    wobble: {
        defaultSpring: { stiffness: 150, damping: 8, mass: 1 },
        steps: [
            { rotate: ['0deg', '-6deg'] },
            { rotate: ['-6deg', '6deg'] },
            { rotate: ['6deg', '-3deg'] },
            { rotate: ['-3deg', '0deg'] },
        ],
    },
    jelly: {
        defaultSpring: { stiffness: 300, damping: 10, mass: 1 },
        steps: [
            { scale: ['1 1', '1.25 0.75'] },
            { scale: ['1.25 0.75', '0.85 1.15'] },
            { scale: ['0.85 1.15', '1 1'] },
        ],
    },
    swing: {
        defaultSpring: { stiffness: 100, damping: 8, mass: 1 },
        steps: [
            { rotate: ['0deg', '-12deg'] },
            { rotate: ['-12deg', '8deg'] },
            { rotate: ['8deg', '-4deg'] },
            { rotate: ['-4deg', '0deg'] },
        ],
    },
    pop: {
        defaultSpring: { stiffness: 400, damping: 20, mass: 1 },
        steps: [{ scale: [1, 1.15] }, { scale: [1.15, 0.95] }, { scale: [0.95, 1] }],
    },
    nod: {
        defaultSpring: { stiffness: 200, damping: 12, mass: 1 },
        steps: [{ translate: ['0px 0px', '0px 8px'] }, { translate: ['0px 8px', '0px 0px'] }],
    },
    rubber: {
        defaultSpring: { stiffness: 250, damping: 12, mass: 1 },
        steps: [
            { scale: ['1 1', '0.85 1'] },
            { scale: ['0.85 1', '1.1 1'] },
            { scale: ['1.1 1', '1 1'] },
        ],
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
                { translate: '0px 0px', scale: '1 1', rotate: '0deg' },
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
        const springOpts = { type: spring, ...merged };

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
