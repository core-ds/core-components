import { type ReactElement, type RefObject, useRef, useState } from 'react';

import { useLayoutEffect_SAFE_FOR_SSR } from '@alfalab/hooks';

import { animate, type AnimationTarget, type AnimationTransition } from './animate';

type Target<T extends HTMLElement> = AnimationTarget | ((node: T) => AnimationTarget);

export type TransitionStatus = 'entering' | 'entered' | 'exiting' | 'exited';

export interface SpringTransitionProps<T extends HTMLElement> {
    nodeRef: RefObject<T>;
    in: boolean;
    enter: Target<T>;
    exit: Target<T>;
    spring?: Partial<Record<'enter' | 'exit', AnimationTransition>>;
    children: (status: TransitionStatus) => ReactElement;
}

const resolveTarget = <T extends HTMLElement>(target: Target<T>, node: T) =>
    typeof target === 'function' ? target(node) : target;

export function SpringTransition<T extends HTMLElement>({
    nodeRef,
    in: inProp,
    enter,
    exit,
    spring = {},
    children,
}: SpringTransitionProps<T>) {
    const [status, setStatus] = useState<TransitionStatus>(inProp ? 'entered' : 'exited');
    const previous = useRef(inProp);
    const runs = useRef(0);

    useLayoutEffect_SAFE_FOR_SSR(() => {
        const node = nodeRef.current;

        if (previous.current === inProp || !node) {
            return;
        }

        previous.current = inProp;
        runs.current += 1;

        const run = runs.current;
        const { finished } = animate(
            node,
            resolveTarget(inProp ? enter : exit, node),
            inProp ? spring.enter : spring.exit,
        );

        setStatus(inProp ? 'entering' : 'exiting');

        finished.then(() => {
            if (run === runs.current) {
                setStatus(inProp ? 'entered' : 'exited');
            }
        });
    }, [inProp]);

    return children(status);
}
