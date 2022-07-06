import React from 'react';

import { TabsProps } from '../../../typings';
import { PrimaryTabListMobile } from '../../primary-tablist/Component.mobile';
import { SecondaryTabListMobile } from '../../secondary-tablist/Component.mobile';
import { Tabs } from '../Component';
import styles from './index.module.css';

const views = {
    primary: PrimaryTabListMobile,
    secondary: SecondaryTabListMobile,
};

export type TabsMobileProps = Omit<TabsProps, 'TabList' | 'size'> & {
    /**
     * Игнорировать паддинги страницы в 16px
     */
    fullWidth?: boolean;
};

export const TabsMobile = ({
    view = 'primary',
    scrollable = true,
    fullWidth = false,
    ...restProps
}: TabsMobileProps) => {
    const Component = <Tabs TabList={views[view]} scrollable={scrollable} {...restProps} />;

    return fullWidth ? <div className={styles.wrapper}>{Component}</div> : Component;
};
