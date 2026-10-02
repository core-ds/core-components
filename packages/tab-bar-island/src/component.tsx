import React, { type FC, Fragment } from 'react';
import cn from 'classnames';

import { TabBarIslandSkeleton } from '@alfalab/core-components-tab-bar-island/components/skeleton';
import { TabBarIslandTab } from '@alfalab/core-components-tab-bar-island/components/tab';
import { TabBarIslandTabList } from '@alfalab/core-components-tab-bar-island/components/tab-list';
import { type TabBarIslandProps } from '@alfalab/core-components-tab-bar-island/types';

import styles from './index.module.css';

export const TabBarIsland: FC<TabBarIslandProps> = ({
    items = [],
    gap = -12,
    activeKey,
    defaultActiveKey,
    onActiveKeyChange,
    trailingAddon,
    className,
    iconAnimation = true,
    showSkeleton,
}) => (
    <div className={cn(styles.component, className)}>
        {showSkeleton ? (
            <TabBarIslandSkeleton gap={gap} />
        ) : (
            <Fragment>
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
            </Fragment>
        )}
    </div>
);
