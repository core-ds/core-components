import React from 'react';
import cn from 'classnames';

import { TabListProps } from '../../typings';

import { CollapsiblePrimaryTabList } from './Component.collapsible';

import commonStyles from './index.module.css';
import mobileStyles from './mobile.module.css';

const styles = {
    ...commonStyles,
    ...mobileStyles,
};

export type CollapsiblePrimaryTabListMobileProps = Omit<TabListProps, 'size'>;

export const CollapsiblePrimaryTabListMobile = ({
    className,
    ...restProps
}: CollapsiblePrimaryTabListMobileProps) => (
    <CollapsiblePrimaryTabList
        {...restProps}
        styles={styles}
        className={cn(className, styles.mobile)}
    />
);
