import React from 'react';
import cn from 'classnames';

import { TabListProps } from '../../typings';

import { PrimaryTabList } from './Component';

import commonStyles from './index.module.css';
import mobileStyles from './mobile.module.css';

const styles = {
    ...commonStyles,
    ...mobileStyles,
};

export type PrimaryTabListMobileProps = Omit<TabListProps, 'size' | 'collapsedTabsIds'>;

export const PrimaryTabListMobile = ({ className, ...restProps }: PrimaryTabListMobileProps) => (
    <PrimaryTabList
        {...restProps}
        styles={styles}
        className={cn(className, styles.mobile)}
        platform='mobile'
    />
);
