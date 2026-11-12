import React, { type RefObject, useRef } from 'react';
import { Transition } from 'react-transition-group';
import { type TransitionProps } from 'react-transition-group/Transition';

import { isFn } from '@alfalab/core-components-shared';

import {
    animate,
    type AnimationTarget,
    type AnimationTransition,
    type AnimationTransitions,
    type ValueName,
} from './animate';
import { tween, type TweenTarget, type TweenTransition, type TweenTransitions } from './tween';

export type ValueTransition =
    | (AnimationTransition & { type?: 'spring' })
    | (TweenTransition & { type: 'tween' });

export type ValueTransitions = { [K in ValueName]?: ValueTransition };

type Target<T extends HTMLElement> = TweenTarget | ((node: T) => TweenTarget);

export interface SpringTransitionProps<T extends HTMLElement>
    extends Pick<TransitionProps<T>, 'children' | 'onEntered' | 'onExited'> {
    in?: boolean;
    nodeRef: RefObject<T>;
    enter?: Target<T>;
    entering?: Target<T>;
    exit: Target<T>;
    transition?: Partial<Record<'enter' | 'exit', ValueTransitions>>;
}

const resolveTarget = <T extends HTMLElement>(target: Target<T>, node: T) =>
    isFn(target) ? target(node) : target;

const splitTarget = (target: TweenTarget, transition: ValueTransitions = {}) => {
    const springs: AnimationTarget = {};
    const springTransitions: AnimationTransitions = {};
    const tweens: TweenTarget = {};
    const tweenTransitions: TweenTransitions = {};

    (Object.keys(target) as ValueName[]).forEach((name) => {
        const value = target[name];
        const { type, ...options } = transition[name] ?? {};

        if (type === 'tween' || typeof value === 'string') {
            tweens[name] = value;
            tweenTransitions[name] = options;
        } else {
            springs[name] = value;
            springTransitions[name] = options;
        }
    });

    return { springs, springTransitions, tweens, tweenTransitions };
};

export function SpringTransition<T extends HTMLElement>({
    in: inProp,
    nodeRef,
    enter,
    entering,
    exit,
    transition = {},
    onEntered,
    onExited,
    children,
}: SpringTransitionProps<T>) {
    const finished = useRef<Promise<void>>();

    const start = (target: Target<T>, options?: ValueTransitions) => () => {
        const node = nodeRef.current;

        if (!node) {
            finished.current = undefined;

            return;
        }

        const { springs, springTransitions, tweens, tweenTransitions } = splitTarget(
            resolveTarget(target, node),
            options,
        );

        finished.current = Promise.all([
            animate(node, springs, springTransitions).finished,
            tween(node, tweens, tweenTransitions).finished,
        ]).then(() => undefined);
    };

    const handleEndListener = (done: () => void) => {
        (finished.current ?? Promise.resolve()).then(done);
    };

    return (
        <Transition
            in={inProp}
            nodeRef={nodeRef}
            onEnter={enter && start(enter, transition.enter)}
            onEntering={entering && start(entering, transition.enter)}
            onExit={start(exit, transition.exit)}
            onEntered={onEntered}
            onExited={onExited}
            addEndListener={handleEndListener}
            appear={false}
            mountOnEnter={false}
            unmountOnExit={false}
        >
            {children}
        </Transition>
    );
}
