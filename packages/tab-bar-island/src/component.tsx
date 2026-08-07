import React, { type FC, useState } from 'react';
import cn from 'classnames';

import { TabBarIslandTab } from '@alfalab/core-components-tab-bar-island/components/tab';
import { TabBarIslandTabList } from '@alfalab/core-components-tab-bar-island/components/tab-list';
import {
    type TabBarIslandProps,
    type TabBarIslandTabKey,
} from '@alfalab/core-components-tab-bar-island/types';

import styles from './index.module.css';

export const TabBarIsland: FC<TabBarIslandProps> = ({
    items = [],
    gap = -10,
    activeKey: activeKeyFromProps,
    defaultActiveKey,
    onActiveKeyChange,
    trailingAddon,
    className,
}) => {
    const [activeKey, setActiveKey] = useState(
        () => activeKeyFromProps ?? defaultActiveKey ?? items.find((tab) => !tab.disabled)?.key,
    );
    const isUncontrolled = activeKeyFromProps === undefined;

    if (!isUncontrolled && activeKey !== activeKeyFromProps) {
        setActiveKey(activeKeyFromProps);
    }

    const handleActiveKeyChange = (nextActiveKey: TabBarIslandTabKey) => {
        onActiveKeyChange?.(nextActiveKey);

        if (isUncontrolled) {
            setActiveKey(nextActiveKey);
        }
    };

    return (
        <div
            className={cn(styles.component, className, {
                [styles.margin]: items.length >= 4 || (items.length === 3 && trailingAddon),
            })}
        >
            <TabBarIslandTabList
                activeKey={activeKey}
                Tab={TabBarIslandTab}
                items={items}
                gap={gap}
                onActiveKeyChange={handleActiveKeyChange}
            />
            {trailingAddon}
        </div>
    );
};
