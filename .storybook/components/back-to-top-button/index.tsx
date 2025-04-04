import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { IconButton } from '@balafla/core-components-icon-button';
import { ArrowUpMIcon } from '@alfalab/icons-glyph/ArrowUpMIcon';

import styles from './index.module.css';

type BackToTopProps = {
    onClick: () => void;
    visible: boolean;
};

export const BackToTopButton: React.FC<BackToTopProps> = ({ onClick, visible }) => {
    const [show, setShow] = useState(visible);
    const [transitionClass, setTransitionClass] = useState('');
    const timeoutRef = useRef<number>();

    useEffect(() => {
        if (visible) {
            setShow(true);
            timeoutRef.current = window.setTimeout(() => setTransitionClass(styles.appear), 50);
        } else {
            timeoutRef.current = window.setTimeout(() => setShow(false), 300);
            setTransitionClass('');
        }

        return () => window.clearTimeout(timeoutRef.current);
    }, [visible]);

    return show ? (
        <IconButton
            icon={ArrowUpMIcon}
            className={cn(styles.component, transitionClass)}
            colors='inverted'
            onClick={onClick}
        />
    ) : null;
};
