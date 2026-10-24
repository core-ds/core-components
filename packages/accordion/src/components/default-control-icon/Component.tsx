import React, { type FC, type RefObject, useRef } from 'react';
import cn from 'classnames';

import { SpringTransition } from '@alfalab/core-components-animation-private';

import styles from './index.module.css';

type Props = {
    expanded: boolean;
    startPosition: boolean;
};

const rotateSpring = { stiffness: 798, damping: 39, mass: 1 };

export const DefaultControlIcon: FC<Props> = ({ expanded, startPosition }) => {
    const iconRef = useRef<SVGSVGElement>(null);

    return (
        <SpringTransition
            in={expanded}
            nodeRef={iconRef as unknown as RefObject<HTMLElement>}
            enter={{ rotate: startPosition ? 0 : 180 }}
            exit={{ rotate: startPosition ? -90 : 0 }}
            spring={{ enter: rotateSpring, exit: rotateSpring }}
        >
            {(status) => (
                <svg
                    ref={iconRef}
                    role='img'
                    focusable='false'
                    fill='currentColor'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    className={cn({
                        [styles.expanded]: status === 'entered',
                        [styles.startPosition]: startPosition,
                    })}
                >
                    <path d='M12 14L6.5 8.5 5 10l7 7 7-7-1.5-1.5L12 14z' />
                </svg>
            )}
        </SpringTransition>
    );
};
