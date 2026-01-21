import React from 'react';

import { type TabListProps } from '../../typings';
import { ScrollableContainerMobile } from '../scrollable-container/Component.mobile';

import { PrimaryTabList } from './Component';

import commonStyles from './index.module.css';
import mobileStyles from './mobile.module.css';

const styles = {
    ...commonStyles,
    ...mobileStyles,
};

export type PrimaryTabListMobileProps = Omit<TabListProps, 'size' | 'collapsedTabsIds'>;

export const PrimaryTabListMobile = (props: PrimaryTabListMobileProps) => (
    <PrimaryTabList
        {...props}
        ScrollableContainer={ScrollableContainerMobile}
        styles={styles}
        platform='mobile'
    />
);
