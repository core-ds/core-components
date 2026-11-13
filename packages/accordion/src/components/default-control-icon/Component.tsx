import React, { type FC, type RefObject, useRef } from 'react';
import cn from 'classnames';

import { rotateSpring, SpringTransition } from '@alfalab/core-components-spring-animation';
import { ChevronDownMIcon } from '@alfalab/icons-glyph/ChevronDownMIcon';

import styles from './index.module.css';

type Props = {
    expanded: boolean;
    startPosition: boolean;
};

export const DefaultControlIcon: FC<Props> = ({ expanded, startPosition }) => {
    const iconRef = useRef<SVGSVGElement>(null);

    return (
        <SpringTransition
            in={expanded}
            nodeRef={iconRef as unknown as RefObject<HTMLElement>}
            enter={{ rotate: startPosition ? 90 : 180 }}
            exit={{ rotate: 0 }}
            transition={{ enter: { rotate: rotateSpring }, exit: { rotate: rotateSpring } }}
        >
            {(status) => (
                <ChevronDownMIcon
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
