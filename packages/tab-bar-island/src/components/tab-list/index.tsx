import React, { type FC, useLayoutEffect, useMemo, useState } from 'react';
import cn from 'classnames';

import { usePrevious } from '@alfalab/core-components-shared';
import { type TabBarIslandTabListProps } from '@alfalab/core-components-tab-bar-island/types';

import styles from './index.module.css';

export const TabBarIslandTabList: FC<TabBarIslandTabListProps> = ({
    activeKey,
    items = [],
    gap,
    Tab,
    onActiveKeyChange,
}) => {
    const [phase, setPhase] = useState<number>();
    const activeKeyIndex = useMemo(
        () => (activeKey ? items.findIndex((item) => item.key === activeKey) : -1),
        [activeKey, items],
    );
    const prevActiveKeyIndex = usePrevious(activeKeyIndex) ?? -1;
    const tabWidth = `calc(${100 / items.length}% ${Math.sign(gap) === 1 ? '-' : '+'} ${(Math.abs(gap) * (items.length - 1)) / items.length}px)`;

    useLayoutEffect(() => {
        if (prevActiveKeyIndex >= 0) {
            setPhase((prevPhase = 0) => Math.abs(prevPhase - 1));
        }
    }, [prevActiveKeyIndex]);

    return (
        <div role='tablist' className={styles.list}>
            <div className={cn(styles.underlay, styles[`pulse${phase}`])} />
            <div className={cn(styles.wrapper, styles[`pulse${phase}`])}>
                {items.map((tab, index) => {
                    const isTabActive = tab.key === activeKey;
                    const handleTabClick = () => {
                        onActiveKeyChange?.(tab.key);
                    };

                    return (
                        <Tab
                            key={tab.key}
                            style={{ marginLeft: index > 0 ? gap : undefined }}
                            tab={tab}
                            active={isTabActive}
                            onClick={handleTabClick}
                            iconClassName={cn(isTabActive && styles[`icon${phase}`])}
                        />
                    );
                })}
            </div>
            <div className={styles.track}>
                {activeKeyIndex >= 0 && (
                    <div
                        className={styles.frame}
                        style={{
                            width: tabWidth,
                            transform: `translateX(calc(${activeKeyIndex * 100}% + ${activeKeyIndex * gap}px))`,
                        }}
                    >
                        <div
                            className={cn(
                                styles.tracker,
                                prevActiveKeyIndex >= 0 &&
                                    styles[
                                        `${prevActiveKeyIndex > activeKeyIndex ? 'trailing' : 'leading'}${phase}`
                                    ],
                            )}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};
