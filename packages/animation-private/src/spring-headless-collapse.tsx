import React from 'react';

import { type AnimationControls, type AnimationTarget, resetValue } from './animate';
import { SpringTransition, type SpringTransitionProps } from './spring-transition';

type Dimension = 'height' | 'width';

const scrollProps = { height: 'scrollHeight', width: 'scrollWidth' } as const;

export interface SpringHeadlessCollapseProps<T extends HTMLElement>
    extends Pick<SpringTransitionProps<T>, 'in' | 'nodeRef' | 'spring' | 'children' | 'onEntered'> {
    dimension?: Dimension;
    enterThreshold?: number;
    onEnterThreshold?: () => void;
}

export function SpringHeadlessCollapse<T extends HTMLElement>({
    dimension = 'height',
    nodeRef,
    enterThreshold = 0,
    onEnterThreshold,
    onEntered,
    ...restProps
}: SpringHeadlessCollapseProps<T>) {
    const handleEnterStart = (controls: AnimationControls, target: AnimationTarget) => {
        if (onEnterThreshold) {
            controls
                .passed(dimension, (target[dimension] ?? 0) * enterThreshold)
                .then(onEnterThreshold);
        }
    };

    const handleEntered = (isAppearing: boolean) => {
        const node = nodeRef.current;

        if (node) {
            node.style.removeProperty(dimension);
            resetValue(node, dimension);
        }

        onEnterThreshold?.();
        onEntered?.(isAppearing);
    };

    return (
        <SpringTransition
            {...restProps}
            nodeRef={nodeRef}
            entering={(node) => ({ [dimension]: node[scrollProps[dimension]] })}
            exit={{ [dimension]: 0 }}
            onEnterStart={handleEnterStart}
            onEntered={handleEntered}
        />
    );
}
