import React from 'react';

import { type AnimationControls, type AnimationTarget, resetValue } from './animate';
import { SpringTransition, type SpringTransitionProps } from './spring-transition';

type Dimension = 'height' | 'width';

const scrollProps = { height: 'scrollHeight', width: 'scrollWidth' } as const;

export interface SpringHeadlessCollapseProps<T extends HTMLElement>
    extends Pick<SpringTransitionProps<T>, 'in' | 'nodeRef' | 'spring' | 'children'> {
    dimension?: Dimension;
    threshold?: number;
    onThreshold?: () => void;
}

export function SpringHeadlessCollapse<T extends HTMLElement>({
    dimension = 'height',
    nodeRef,
    threshold = 0,
    onThreshold,
    ...restProps
}: SpringHeadlessCollapseProps<T>) {
    const handleEnterStart = (controls: AnimationControls, target: AnimationTarget) => {
        if (onThreshold) {
            controls.passed(dimension, (target[dimension] ?? 0) * threshold).then(onThreshold);
        }
    };

    const handleEntered = () => {
        const node = nodeRef.current;

        if (node) {
            node.style.removeProperty(dimension);
            resetValue(node, dimension);
        }

        onThreshold?.();
    };

    return (
        <SpringTransition
            {...restProps}
            nodeRef={nodeRef}
            enter={(node) => ({ [dimension]: node[scrollProps[dimension]] })}
            exit={{ [dimension]: 0 }}
            onEnterStart={handleEnterStart}
            onEntered={handleEntered}
        />
    );
}
