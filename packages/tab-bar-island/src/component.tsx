import React, { type FC } from 'react';
import cn from 'classnames';

import { TabBarIslandTab } from '@alfalab/core-components-tab-bar-island/components/tab';
import { TabBarIslandTabList } from '@alfalab/core-components-tab-bar-island/components/tab-list';
import { type TabBarIslandProps } from '@alfalab/core-components-tab-bar-island/types';

import styles from './index.module.css';

export const TabBarIsland: FC<TabBarIslandProps> = ({
    items = [],
    gap = -10,
    activeKey,
    defaultActiveKey,
    onActiveKeyChange,
    trailingAddon,
    className,
    iconAnimation = true,
}) => (
    <div className={cn(styles.component, className)}>
        {items.length > 0 && (
            <TabBarIslandTabList
                activeKey={activeKey}
                defaultActiveKey={defaultActiveKey}
                Tab={TabBarIslandTab}
                items={items}
                gap={gap}
                onActiveKeyChange={onActiveKeyChange}
                content={items.length === 2 && trailingAddon ? 'fill' : 'fit'}
                iconAnimation={iconAnimation}
            />
        )}
        {trailingAddon}
    </div>
);
