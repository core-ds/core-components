import React from 'react';

import { resetValue } from './animate';
import {
    SpringTransition,
    type SpringTransitionProps,
    type ValueTransition,
} from './spring-transition';

type Dimension = 'height' | 'width';

const scrollProps = { height: 'scrollHeight', width: 'scrollWidth' } as const;

export interface SpringHeadlessCollapseProps<T extends HTMLElement>
    extends Pick<
        SpringTransitionProps<T>,
        'in' | 'nodeRef' | 'children' | 'onEntered' | 'onExited'
    > {
    dimension?: Dimension;
    transition?: Partial<Record<'enter' | 'exit', ValueTransition>>;
}

export function SpringHeadlessCollapse<T extends HTMLElement>({
    dimension = 'height',
    nodeRef,
    transition = {},
    onEntered,
    ...restProps
}: SpringHeadlessCollapseProps<T>) {
    const handleEntered = (isAppearing: boolean) => {
        const node = nodeRef.current;

        if (node) {
            node.style.removeProperty(dimension);
            resetValue(node, dimension);
        }

        onEntered?.(isAppearing);
    };

    return (
        <SpringTransition
            {...restProps}
            nodeRef={nodeRef}
            entering={(node) => ({ [dimension]: node[scrollProps[dimension]] })}
            exit={{ [dimension]: 0 }}
            transition={{
                enter: { [dimension]: transition.enter },
                exit: { [dimension]: transition.exit },
            }}
            onEntered={handleEntered}
        />
    );
}
