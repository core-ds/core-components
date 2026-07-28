import React, { type FC } from 'react';
import cn from 'classnames';

import { TabBarPrivateEntry } from '@alfalab/core-components-tab-bar-private/components/entry';
import { type TabBarPrivateTrailingIconButtonProps } from '@alfalab/core-components-tab-bar-private/types';

import styles from './index.module.css';

export const TabBarPrivateTrailingIconButton: FC<TabBarPrivateTrailingIconButtonProps> = ({
    className,
    ...restProps
}) => (
    <TabBarPrivateEntry {...restProps} role='button' className={cn(styles.component, className)} />
);
