import React, { type FC } from 'react';
import cn from 'classnames';

import { Indicator } from '@alfalab/core-components-indicator';
import { type TabBarIslandEntryContentProps } from '@alfalab/core-components-tab-bar-island/types';

import styles from './index.module.css';

export const TabBarIslandEntryContent: FC<TabBarIslandEntryContentProps> = ({
    Icon = 'div',
    icon,
    iconClassName,
    indicator,
    label,
    Label = 'div',
}) => {
    const isNumberIndicator = typeof indicator === 'number';
    const showIndicator = isNumberIndicator ? indicator > 0 : indicator;
    const indicatorSize = isNumberIndicator ? 16 : 8;

    return (
        <React.Fragment>
            <Icon className={cn(styles.icon, iconClassName)}>
                {icon}
                {showIndicator && (
                    <Indicator
                        className={cn(styles.indicator, styles[`size${indicatorSize}`])}
                        value={isNumberIndicator ? indicator : undefined}
                        size={indicatorSize}
                    />
                )}
            </Icon>
            <Label className={styles.label}>{label}</Label>
        </React.Fragment>
    );
};
