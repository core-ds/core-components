import React, { forwardRef, type ReactNode } from 'react';
import cn from 'classnames';

import styles from './index.module.css';

export interface UnderlayProps {
    className?: string;
    children?: ReactNode;
}

export const Underlay = forwardRef<HTMLDivElement, UnderlayProps>(
    ({ className, children }, ref) => (
        <div ref={ref} className={cn(styles.component, className)}>
            <div className={styles.border} data-position='start' />
            {children}
            <div className={styles.border} data-position='end' />
        </div>
    ),
);
