import React, { type FC } from 'react';

import { TabBarIslandEntry } from '@alfalab/core-components-tab-bar-island/components/entry';
import { Underlay } from '@alfalab/core-components-tab-bar-island/components/underlay';

import styles from './index.module.css';

export interface TabBarIslandSkeletonProps {
    gap?: number;
}

const SKELETION_ITEMS_COUNT = 4;

export const TabBarIslandSkeleton: FC<TabBarIslandSkeletonProps> = ({ gap }) => (
    <div className={styles.list}>
        <Underlay className={styles.underlay} />
        <div className={styles.wrapper}>
            {Array.from({ length: SKELETION_ITEMS_COUNT }).map((_, index) => (
                <TabBarIslandEntry
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    tabIndex={-1}
                    className={styles.item}
                    style={{ marginLeft: index > 0 ? gap : undefined }}
                    icon={<div className={styles.icon} />}
                    label={<div className={styles.label} />}
                />
            ))}
        </div>
    </div>
);
