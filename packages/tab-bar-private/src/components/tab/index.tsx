import React, { type FC } from 'react';
import cn from 'classnames';

import { Indicator } from '@alfalab/core-components-indicator';
import { type TabBarPrivateTabProps } from '@alfalab/core-components-tab-bar-private/types';

import styles from './index.module.css';

export const TabBarPrivateTab: FC<TabBarPrivateTabProps> = ({
    tab: { icon, label, disabled, indicator },
    active,
    style,
    onClick,
    onKeyDown,
}) => {
    const isNumberIndicator = typeof indicator === 'number';
    const showIndicator = isNumberIndicator ? indicator > 0 : indicator;

    return (
        <div
            role='tab'
            aria-selected={active}
            aria-disabled={disabled}
            tabIndex={disabled ? -1 : 0}
            style={style}
            onClick={disabled ? undefined : onClick}
            onKeyDown={disabled ? undefined : onKeyDown}
            className={cn(styles.tab, { [styles.active]: active, [styles.disabled]: disabled })}
        >
            <div className={styles.icon}>
                {icon}
                {showIndicator && (
                    <Indicator
                        className={styles.indicator}
                        value={isNumberIndicator ? indicator : undefined}
                        size={isNumberIndicator ? 16 : 8}
                    />
                )}
            </div>
            <div className={styles.label}>{label}</div>
        </div>
    );
};
