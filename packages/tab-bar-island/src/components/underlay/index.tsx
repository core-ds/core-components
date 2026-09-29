import React, { forwardRef } from 'react';
import cn from 'classnames';

import styles from './index.module.css';

export interface UnderlayProps {
    className?: string;
}

export const Underlay = forwardRef<HTMLDivElement, UnderlayProps>(({ className }, ref) => (
    <div ref={ref} className={cn(styles.component, className)}>
        <div className={styles.border} data-position='start' />
        <div className={styles.border} data-position='end' />
    </div>
));
