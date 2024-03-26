import React, { forwardRef } from 'react';
import cn from 'classnames';

import styles from './index.module.css';

interface Props {
    view?: 'regular' | 'primary' | 'tertiary';
    children: React.ReactNode;
    className?: string;
    contentClassName?: string;
}

export const BlurredUnderlay = forwardRef<HTMLDivElement, Props>(
    ({ children, view = 'regular', className, contentClassName }, ref) => (
        <div ref={ref} className={cn(className, styles.component, styles[view])}>
            <div className={cn(styles.content, contentClassName)}>{children}</div>
        </div>
    ),
);
