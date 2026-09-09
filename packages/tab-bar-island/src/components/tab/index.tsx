import React, { type FC } from 'react';
import cn from 'classnames';

import { TabBarIslandEntry } from '@alfalab/core-components-tab-bar-island/components/entry';
import { type TabBarIslandTabProps } from '@alfalab/core-components-tab-bar-island/types';

import styles from './index.module.css';

export const TabBarIslandTab: FC<TabBarIslandTabProps> = ({
    tab: { icon, label, disabled, indicator },
    active,
    ...restProps
}) => (
    <TabBarIslandEntry
        {...restProps}
        role='tab'
        aria-selected={active}
        className={cn(styles.tab, { [styles.active]: active, [styles.disabled]: disabled })}
        icon={icon}
        label={label}
        indicator={indicator}
    />
);
