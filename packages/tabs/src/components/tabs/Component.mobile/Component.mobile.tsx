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
}: TabsMobileProps) =>
    fullWidth ? (
        <div className={styles.wrapper}>
            <Tabs TabList={views[view]} scrollable={scrollable} {...restProps} />
        </div>
    ) : (
        <Tabs TabList={views[view]} scrollable={scrollable} {...restProps} />
    );
