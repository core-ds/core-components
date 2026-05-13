import React from 'react';

import { type TabListProps } from '../../typings';

import { PrimaryTabList } from './Component';

import styles from './index.module.css';

export const PrimaryTabListDesktop = ({ size = 'm', ...restProps }: TabListProps) => (
    <PrimaryTabList {...restProps} size={size} styles={styles} platform='desktop' />
);
