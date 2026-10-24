import React from 'react';

import { SpringTransition, type SpringTransitionProps } from './spring-transition';

type Dimension = 'height' | 'width';

const scrollProps = { height: 'scrollHeight', width: 'scrollWidth' } as const;

export interface SpringHeadlessCollapseProps<T extends HTMLElement>
    extends Pick<SpringTransitionProps<T>, 'in' | 'nodeRef' | 'spring' | 'children'> {
    dimension?: Dimension;
}

export function SpringHeadlessCollapse<T extends HTMLElement>({
    dimension = 'height',
    nodeRef,
    ...restProps
}: SpringHeadlessCollapseProps<T>) {
    const resetDimension = () => {
        nodeRef.current?.style.removeProperty(dimension);
    };

    return (
        <SpringTransition
            {...restProps}
            nodeRef={nodeRef}
            enter={(node) => ({ [dimension]: node[scrollProps[dimension]] })}
            exit={{ [dimension]: 0 }}
            onEntered={resetDimension}
        />
    );
}
