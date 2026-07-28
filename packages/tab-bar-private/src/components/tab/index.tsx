import React, { type FC } from 'react';
import cn from 'classnames';

import { TabBarPrivateEntry } from '@alfalab/core-components-tab-bar-private/components/entry';
import { type TabBarPrivateTabProps } from '@alfalab/core-components-tab-bar-private/types';

import styles from './index.module.css';

export const TabBarPrivateTab: FC<TabBarPrivateTabProps> = ({
    tab: { icon, label, disabled, indicator },
    active,
    ...restProps
}) => (
    <TabBarPrivateEntry
        {...restProps}
        role='tab'
        aria-selected={active}
        className={cn(styles.tab, { [styles.active]: active, [styles.disabled]: disabled })}
        icon={icon}
        label={label}
        indicator={indicator}
    />
);
