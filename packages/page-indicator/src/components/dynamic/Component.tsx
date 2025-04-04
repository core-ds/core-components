import React, { useEffect, useState } from 'react';
import {
    hasOwnProperty,
    isFn,
    isNonNullable,
    isNullable,
    noop,
} from '@balafla/core-components-shared';
import cn from 'classnames';

import { PageIndicatorDynamicProps } from '../../types';

import defaultColors from './default.module.css';
import styles from './index.module.css';
import invertedColors from './inverted.module.css';
import staticColors from './static.module.css';
import staticInvertedColors from './static-inverted.module.css';

const colorsStyle = {
    inverted: invertedColors,
    default: defaultColors,
    static: staticColors,
    'static-inverted': staticInvertedColors,
} as const;

const FULL_PROGRESS = 100;

export const PageIndicatorDynamic: React.FC<PageIndicatorDynamicProps> = (props) => {
    const {
        size: height = 8,
        gap = 8,
        activeElementWidth = height * 7,
        elements: count = 10,
        activeElement: indexFromProps,
        onActiveElementChange,
        defaultActiveElement: defaultIndex = 0,
        active = true,
        duration: durationFromProps = 3000,
        cycle = false,
        colors = 'default',
    } = props;
    const [activeIndex, setActiveIndex] = useState<number | undefined>(
        indexFromProps ?? defaultIndex,
    );
    const [progress, setProgress] = useState(0);
    const inProgress = progress < FULL_PROGRESS;
    const activeIndexInProps = hasOwnProperty(props, 'activeElement');
    let duration: number;

    if (active && isNonNullable(activeIndex) && inProgress) {
        duration = isFn(durationFromProps) ? durationFromProps(activeIndex) : durationFromProps;
    } else {
        duration = -1;
    }

    // getDerivedStateFromProps
    if (activeIndexInProps && !(activeIndex === indexFromProps)) {
        setActiveIndex(indexFromProps);
        setProgress(0);
    }

    useEffect(() => {
        if (duration === -1) {
            return noop;
        }

        const interval = duration / FULL_PROGRESS;
        const timer = setInterval(
            () => setProgress((prevProgress) => Math.min(prevProgress + 1, FULL_PROGRESS)),
            interval,
        );

        return () => clearInterval(timer);
    }, [duration]);

    useEffect(() => {
        const isLast = activeIndex === count - 1;

        if (inProgress || isNullable(activeIndex) || (isLast && !cycle)) {
            return;
        }

        const nextActiveIndex = isLast && cycle ? 0 : activeIndex + 1;

        onActiveElementChange?.(nextActiveIndex);

        if (activeIndexInProps) {
            return;
        }

        setActiveIndex(nextActiveIndex);
        setProgress(0);
    }, [activeIndex, activeIndexInProps, count, cycle, inProgress, onActiveElementChange]);

    return (
        <ol className={styles.pageIndicator} style={{ height, gap }}>
            {Array.from({ length: count }, (_, index) => {
                const isActive = index === activeIndex;
                const style: React.CSSProperties = {
                    width: isActive ? activeElementWidth : height,
                    borderRadius: height / 2,
                };
                const progressStyle: React.CSSProperties | undefined = isActive
                    ? { transform: `translateX(${progress - FULL_PROGRESS}%)` }
                    : undefined;

                return (
                    <li
                        key={index}
                        style={style}
                        className={cn(styles.element, colorsStyle[colors].element, {
                            [styles.active]: isActive,
                            [colorsStyle[colors].active]: isActive,
                        })}
                    >
                        <div
                            style={progressStyle}
                            className={cn(styles.progress, colorsStyle[colors].progress)}
                        />
                    </li>
                );
            })}
        </ol>
    );
};
