import React, { type FC, useState } from 'react';
import cn from 'classnames';

import { TabBarPrivateTab } from '@alfalab/core-components-tab-bar-private/components/tab';
import { TabBarPrivateTabList } from '@alfalab/core-components-tab-bar-private/components/tab-list';
import {
    type TabBarPrivateProps,
    type TabKey,
} from '@alfalab/core-components-tab-bar-private/types';

import styles from './index.module.css';

export const TabBarPrivate: FC<TabBarPrivateProps> = ({
    items = [],
    gap = -10,
    activeKey: activeKeyFromProps,
    defaultActiveKey,
    onActiveKeyChange,
    trailingAddon,
}) => {
    const [activeKey, setActiveKey] = useState(
        () => activeKeyFromProps ?? defaultActiveKey ?? items.find((tab) => !tab.disabled)?.key,
    );
    const isUncontrolled = activeKeyFromProps === undefined;

    if (!isUncontrolled && activeKey !== activeKeyFromProps) {
        setActiveKey(activeKeyFromProps);
    }

    const handleActiveKeyChange = (nextActiveKey: TabKey) => {
        onActiveKeyChange?.(nextActiveKey);

        if (isUncontrolled) {
            setActiveKey(nextActiveKey);
        }
    };

    return (
        <div
            className={cn(styles.component, {
                [styles.margin]: items.length >= 4 || (items.length === 3 && trailingAddon),
            })}
        >
            <TabBarPrivateTabList
                activeKey={activeKey}
                Tab={TabBarPrivateTab}
                items={items}
                gap={gap}
                onActiveKeyChange={handleActiveKeyChange}
            />
            {trailingAddon}
        </div>
    );
};
