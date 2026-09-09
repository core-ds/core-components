import React, { type FC, useMemo, useState } from 'react';

import { usePillAnimation } from '@alfalab/core-components-tab-bar-island/hooks/use-pill-animation';
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
        () => (activeKey ? items.findIndex((item) => item.key === activeKey) : -1),
        [activeKey, items],
    );
    const tabWidth = `calc(${100 / items.length}% ${Math.sign(gap) === 1 ? '-' : '+'} ${(Math.abs(gap) * (items.length - 1)) / items.length}px)`;

    /*
     * Стартовая позиция пилюли по-прежнему задаётся в разметке — она нужна до
     * того, как отработает usePillAnimation (SSR, первый кадр до гидратации).
     * Индекс фиксируем на первом рендере: дальше позицию покадрово пишет
     * анимация, и React не должен перетирать её своим transform.
     */
    const [initialKeyIndex] = useState(activeKeyIndex);
    const initialTransform = `translateX(calc(${initialKeyIndex * 100}% + ${initialKeyIndex * gap}px))`;

    const {
        listRef,
        underlayRef,
        wrapperRef,
        trackRef,
        frameRef,
        trackerRef,
        handlePointerDown,
        handlePointerUp,
    } = usePillAnimation({ activeKeyIndex, items, gap, iconClassName: styles.icon });

    return (
        <div role='tablist' className={styles.list} ref={listRef}>
            <div className={styles.underlay} ref={underlayRef} />
            <div
                className={styles.wrapper}
                ref={wrapperRef}
                onPointerDown={handlePointerDown}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                onPointerLeave={handlePointerUp}
            >
                {items.map((tab, index) => (
                    <Tab
                        key={tab.key}
                        style={{ marginLeft: index > 0 ? gap : undefined }}
                        tab={tab}
                        active={tab.key === activeKey}
                        onClick={() => onActiveKeyChange?.(tab.key)}
                        iconClassName={styles.icon}
                    />
                ))}
            </div>
            <div className={styles.track} ref={trackRef}>
                {activeKeyIndex >= 0 && (
                    <div
                        className={styles.frame}
                        ref={frameRef}
                        style={{ width: tabWidth, transform: initialTransform }}
                    >
                        <div className={styles.tracker} ref={trackerRef} />
                    </div>
                )}
            </div>
        </div>
    );
};
