import React, { type FC, type KeyboardEventHandler, type ReactNode, type RefObject } from 'react';
import cn from 'classnames';

import styles from '../image-viewer/index.module.css';

type NavigationArrowProps = {
    arrowRef: RefObject<HTMLDivElement>;
    children: ReactNode;
    enabled: boolean;
    focused: boolean;
    label: string;
    onActivate: () => void;
    testId: string;
};

export const NavigationArrow: FC<NavigationArrowProps> = ({
    arrowRef,
    children,
    enabled,
    focused,
    label,
    onActivate,
    testId,
}) => {
    const handleKeyDown: KeyboardEventHandler = (event) => {
        if (event.key === 'Enter') {
            onActivate();
        }
    };

    return (
        <div
            className={cn(styles.arrow, {
                [styles.focused]: focused,
                [styles.arrowHidden]: !enabled,
            })}
            onClick={enabled ? onActivate : undefined}
            role='button'
            onKeyDown={enabled ? handleKeyDown : undefined}
            tabIndex={enabled ? 0 : -1}
            ref={arrowRef}
            aria-label={label}
            aria-hidden={!enabled}
            data-test-id={testId}
        >
            {children}
        </div>
    );
};
