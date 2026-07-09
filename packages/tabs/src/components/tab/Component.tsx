import React, { type AriaAttributes, type FC } from 'react';
import cn from 'classnames';

import { type TabProps } from '../../typings';

import styles from './index.module.css';

export const Tab: FC<TabProps> = ({
    children,
    hidden,
    className,
    disabled,
    dataTestId,
    // useless props
    id,
    title,
    rightAddons,
    ...restProps
}) =>
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
            {...(restProps as AriaAttributes)}
        >
            {children}
        </div>
    ) : null;
