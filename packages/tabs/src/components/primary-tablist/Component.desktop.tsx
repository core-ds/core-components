import React from 'react';

import { type TabListProps } from '../../typings';
import { ScrollableContainerDesktop } from '../scrollable-container/Component.desktop';

import { PrimaryTabList } from './Component';

import styles from './index.module.css';

export const PrimaryTabListDesktop = ({ size = 'm', ...restProps }: TabListProps) => (
    <PrimaryTabList
        {...restProps}
        ScrollableContainer={ScrollableContainerDesktop}
        size={size}
        styles={styles}
        platform='desktop'
    />
);
