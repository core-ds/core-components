import React from 'react';

import { TabListProps } from '../../typings';

import { CollapsiblePrimaryTabList } from './Component.collapsible';

import styles from './index.module.css';

export const CollapsiblePrimaryTabListDesktop = ({ size = 'm', ...restProps }: TabListProps) => (
    <CollapsiblePrimaryTabList {...restProps} size={size} styles={styles} />
);
