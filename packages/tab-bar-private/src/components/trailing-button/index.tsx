import React, { type FC } from 'react';
import cn from 'classnames';

import { PassThroughComponent } from '@alfalab/core-components-shared';
import { TabBarPrivateEntry } from '@alfalab/core-components-tab-bar-private/components/entry';
import { type TabBarPrivateTrailingButtonProps } from '@alfalab/core-components-tab-bar-private/types';

import styles from './index.module.css';

export const TabBarPrivateTrailingButton: FC<TabBarPrivateTrailingButtonProps> = ({
    className,
    ...restProps
}) => (
    <TabBarPrivateEntry
        {...restProps}
        role='button'
        className={cn(styles.component, className)}
        Content={PassThroughComponent}
    />
);
