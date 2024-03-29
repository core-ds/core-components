import React from 'react';
import cn from 'classnames';

import { TabProps } from '../../typings';

import styles from './index.module.css';

export const Tab = ({ children, hidden, className, disabled, dataTestId }: TabProps) =>
    children ? (
        <div
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
    ) : null;
