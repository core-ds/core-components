import React, { type FC, useMemo } from 'react';

import { type TabBarIslandTabListProps } from '@alfalab/core-components-tab-bar-island/types';

import styles from './index.module.css';

export const TabBarIslandTabList: FC<TabBarIslandTabListProps> = ({
    activeKey,
    items = [],
    gap,
    Tab,
    onActiveKeyChange,
}) => {
    const activeKeyIndex = useMemo(
        () => items.findIndex((item) => item.key === activeKey),
        [activeKey, items],
    );
    const tabWidth = `calc(${100 / items.length}% ${Math.sign(gap) === 1 ? '-' : '+'} ${(Math.abs(gap) * (items.length - 1)) / items.length}px)`;

    return (
        <div role='tablist' className={styles.list}>
            <div className={styles.wrapper}>
                {items.map((tab, index) => {
                    const handleTabClick = () => {
                        onActiveKeyChange?.(tab.key);
                    };

                    return (
                        <Tab
                            key={tab.key}
                            style={{ marginLeft: index > 0 ? gap : undefined }}
                            tab={tab}
                            active={activeKey === tab.key}
                            onClick={handleTabClick}
                        />
                    );
                })}
            </div>
            <div className={styles.track}>
                {activeKeyIndex >= 0 && (
                    <div
                        className={styles.tracker}
                        style={{
                            width: tabWidth,
                            transform: `translateX(calc(${activeKeyIndex * 100}% + ${activeKeyIndex * gap}px))`,
                        }}
                    />
                )}
            </div>
        </div>
    );
};
