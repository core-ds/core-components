import React, { type RefObject, useRef } from 'react';
import { Transition } from 'react-transition-group';
import { type TransitionProps } from 'react-transition-group/Transition';

import { isFn } from '@alfalab/core-components-shared';

import {
    animate,
    type AnimationControls,
    type AnimationTarget,
    type AnimationTransition,
} from './animate';

type Target<T extends HTMLElement> = AnimationTarget | ((node: T) => AnimationTarget);

export interface SpringTransitionProps<T extends HTMLElement>
    extends Pick<TransitionProps<T>, 'children' | 'onEntered' | 'onExited'> {
    in?: boolean;
    nodeRef: RefObject<T>;
    enter: Target<T>;
    exit: Target<T>;
    spring?: Partial<Record<'enter' | 'exit', AnimationTransition>>;
    onEnterStart?: (controls: AnimationControls, target: AnimationTarget) => void;
}

const resolveTarget = <T extends HTMLElement>(target: Target<T>, node: T) =>
    isFn(target) ? target(node) : target;

export function SpringTransition<T extends HTMLElement>({
    in: inProp,
    nodeRef,
    enter,
    exit,
    spring = {},
    onEnterStart,
    onEntered,
    onExited,
    children,
}: SpringTransitionProps<T>) {
    const finished = useRef<Promise<void>>();

    const start =
        (target: Target<T>, options?: AnimationTransition, onStart?: typeof onEnterStart) => () => {
            const node = nodeRef.current;

            if (!node) {
                finished.current = undefined;

                return;
            }

            const resolved = resolveTarget(target, node);
            const controls = animate(node, resolved, options);

            finished.current = controls.finished;
            onStart?.(controls, resolved);
        };

    const handleEndListener = (done: () => void) => {
        (finished.current ?? Promise.resolve()).then(done);
    };

    return (
        <Transition
            in={inProp}
            nodeRef={nodeRef}
            onEnter={start(enter, spring.enter, onEnterStart)}
            onExit={start(exit, spring.exit)}
            onEntered={onEntered}
            onExited={onExited}
            addEndListener={handleEndListener}
        >
            {children}
        </Transition>
    );
}
