import React, {
    type Dispatch,
    type FC,
    type SetStateAction,
    useLayoutEffect,
    useMemo,
    useReducer,
    useRef,
    useState,
} from 'react';
import cn from 'classnames';

import { type TabBarIslandTabListProps } from '@alfalab/core-components-tab-bar-island/types';

import styles from './index.module.css';

const phaseReducer = (prevPhase = 0): number | undefined => Math.abs(prevPhase - 1);

function usePreviousActiveTabIndex(
    activeTabIndex: number,
): [number, Dispatch<SetStateAction<number>>] {
    const ref = useRef(activeTabIndex);
    const [prev, setPrev] = useState(-1);

    if (ref.current !== activeTabIndex) {
        setPrev(ref.current);
        ref.current = activeTabIndex;
    }

    return [prev, setPrev];
}

export const TabBarIslandTabList: FC<TabBarIslandTabListProps> = ({
    activeKey,
    items = [],
    gap,
    Tab,
    onActiveKeyChange,
}) => {
    const [phase, nextPhase] = useReducer(phaseReducer, undefined);
    const activeKeyIndex = useMemo(
        () => (activeKey ? items.findIndex((item) => item.key === activeKey) : -1),
        [activeKey, items],
    );
    const [prevActiveKeyIndex, setPrevActiveKeyIndex] = usePreviousActiveTabIndex(activeKeyIndex);
    const tabWidth = `calc(${100 / items.length}% ${Math.sign(gap) === 1 ? '-' : '+'} ${(Math.abs(gap) * (items.length - 1)) / items.length}px)`;
    const isPrevActiveIndexEqualActiveIndex = prevActiveKeyIndex === activeKeyIndex;

    useLayoutEffect(() => {
        if (prevActiveKeyIndex >= 0) {
            nextPhase();
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

                        if (isTabActive) {
                            setPrevActiveKeyIndex(activeKeyIndex);
                            nextPhase();
                        }
                    };

                    return (
                        <Tab
                            key={tab.key}
                            style={{ marginLeft: index > 0 ? gap : undefined }}
                            tab={tab}
                            active={isTabActive}
                            onClick={handleTabClick}
                            iconClassName={cn(
                                isTabActive &&
                                    !isPrevActiveIndexEqualActiveIndex &&
                                    styles[`icon${phase}`],
                            )}
                        />
                    );
                })}
            </div>
            <div
                className={cn(
                    styles.track,
                    isPrevActiveIndexEqualActiveIndex && styles[`pulse${phase}`],
                )}
            >
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
                                    !isPrevActiveIndexEqualActiveIndex &&
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
