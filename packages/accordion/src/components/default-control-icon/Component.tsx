import React, { type FC, type RefObject, useRef } from 'react';
import cn from 'classnames';

import { SpringTransition } from '@alfalab/core-components-animation-private';
import { ChevronDownMIcon } from '@alfalab/icons-glyph/ChevronDownMIcon';
import { ChevronRightMIcon } from '@alfalab/icons-glyph/ChevronRightMIcon';

import styles from './index.module.css';

type Props = {
    expanded: boolean;
    startPosition: boolean;
};

const rotateSpring = { stiffness: 798, damping: 39, mass: 1 };

export const DefaultControlIcon: FC<Props> = ({ expanded, startPosition }) => {
    const iconRef = useRef<SVGSVGElement>(null);

    const Icon = startPosition ? ChevronRightMIcon : ChevronDownMIcon;

    return (
        <SpringTransition
            in={expanded}
            nodeRef={iconRef as unknown as RefObject<HTMLElement>}
            enter={{ rotate: startPosition ? 90 : 180 }}
            exit={{ rotate: 0 }}
            spring={{ enter: rotateSpring, exit: rotateSpring }}
        >
            {(status) => (
                <Icon
                    ref={iconRef}
                    className={cn({
                        [styles.expanded]: status === 'entered',
                        [styles.startPosition]: startPosition,
                    })}
                />
            )}
        </SpringTransition>
    );
};
