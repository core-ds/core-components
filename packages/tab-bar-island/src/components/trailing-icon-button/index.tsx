import React, { type FC } from 'react';
import cn from 'classnames';

import { TabBarIslandEntry } from '@alfalab/core-components-tab-bar-island/components/entry';
import { Underlay } from '@alfalab/core-components-tab-bar-island/components/underlay';
import { type TabBarIslandTrailingIconButtonProps } from '@alfalab/core-components-tab-bar-island/types';

import styles from './index.module.css';

export const TabBarIslandTrailingIconButton: FC<TabBarIslandTrailingIconButtonProps> = ({
    className,
    ...restProps
}) => (
    <div className={styles.component}>
        <Underlay className={styles.underlay} />
        <TabBarIslandEntry {...restProps} role='button' className={cn(styles.button, className)} />
    </div>
);
