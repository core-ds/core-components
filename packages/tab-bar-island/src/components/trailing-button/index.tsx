import React, { type FC } from 'react';
import cn from 'classnames';

import { PassThroughComponent } from '@alfalab/core-components-shared';
import { TabBarIslandEntry } from '@alfalab/core-components-tab-bar-island/components/entry';
import { type TabBarIslandTrailingButtonProps } from '@alfalab/core-components-tab-bar-island/types';

import styles from './index.module.css';

export const TabBarIslandTrailingButton: FC<TabBarIslandTrailingButtonProps> = ({
    className,
    ...restProps
}) => (
    <TabBarIslandEntry
        {...restProps}
        role='button'
        className={cn(styles.component, className)}
        Content={PassThroughComponent}
    />
);
