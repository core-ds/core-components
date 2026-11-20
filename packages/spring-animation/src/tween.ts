import {
    applyPxDefaults,
    type BezierDefinition,
    cubicBezierAsString,
    getComputedStyle,
    setStyle,
    supportedWaapiEasing,
} from 'motion';

import { type AnimationControls, type ValueName } from './animate';

export interface TweenTransition {
    duration?: number;
    delay?: number;
    ease?: BezierDefinition;
}

export type TweenTarget = { [K in ValueName]?: number | string };

export type TweenTransitions = { [K in ValueName]?: TweenTransition };

const states = new WeakMap<HTMLElement, Map<string, Animation>>();

const getState = (element: HTMLElement) => {
    const state = states.get(element) ?? new Map<string, Animation>();

    states.set(element, state);

    return state;
};

const stopAnimation = (element: HTMLElement, animation: Animation) => {
    if (element.isConnected) {
        animation.commitStyles();
    }

    animation.cancel();
};

export function tween(
    element: HTMLElement,
    target: TweenTarget,
    transition: TweenTransitions = {},
): AnimationControls {
    const state = getState(element);
    const names = Object.keys(target) as ValueName[];

    names.forEach((name) => {
        const running = state.get(name);

        if (running) {
            stopAnimation(element, running);
            state.delete(name);
        }
    });

    const definitions = names.map((name) => {
        const keyframes = [getComputedStyle(element, name), target[name] as number | string];

        applyPxDefaults(keyframes, name);

        return { name, keyframes };
    });

    const animations = definitions.map(({ name, keyframes }) => {
        const { duration = 300, delay = 0, ease } = transition[name] ?? {};
        const animation = element.animate({ [name]: keyframes } as PropertyIndexedKeyframes, {
            delay,
            duration,
            easing: ease ? cubicBezierAsString(ease) : supportedWaapiEasing.easeOut,
            fill: 'both',
            iterations: 1,
            direction: 'normal',
        });

        state.set(name, animation);

        return {
            name,
            animation,
            finished: new Promise<void>((resolve) => {
                animation.onfinish = () => {
                    setStyle(element, name, keyframes[keyframes.length - 1]);
                    animation.cancel();
                    state.delete(name);
                    resolve();
                };
            }),
        };
    });

    return {
        finished: Promise.all(animations.map(({ finished }) => finished)).then(() => undefined),
        stop: () => {
            animations.forEach(({ name, animation }) => {
                if (state.get(name) === animation) {
                    stopAnimation(element, animation);
                    state.delete(name);
                }
            });
        },
    };
}
