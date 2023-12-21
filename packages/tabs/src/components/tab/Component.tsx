import React, { forwardRef } from 'react';
import cn from 'classnames';

import { TabProps } from '../../typings';

import styles from './index.module.css';

export const Tab = forwardRef<HTMLDivElement, TabProps>(({ children, hidden, className, disabled, dataTestId }, ref) =>
    children ? (
        <div
            ref={ref}
            className={cn(
                styles.component,
                {
                    [styles.hidden]: hidden,
                },
                className,
            )}
            hidden={hidden}
            role='tabpanel'
            tabIndex={disabled ? -1 : 0}
            data-test-id={dataTestId}
        >
            {children}
        </div>
    ) : null);
