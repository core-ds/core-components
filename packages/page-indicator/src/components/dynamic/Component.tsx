import React, { FC, useState } from 'react';
import cn from 'classnames';

import { useAnimation } from '@alfalab/core-components-shared';

import { PageIndicatorDynamicProps } from '../../types';

import defaultColors from './default.module.css';
import styles from './index.module.css';
import invertedColors from './inverted.module.css';

const colorsStyle = {
    inverted: invertedColors,
    default: defaultColors,
};

export const PageIndicatorDynamic: FC<PageIndicatorDynamicProps> = (props) => {
    const {
        defaultActiveElement: defaultActiveElementIndex = 0,
        activeElement: activeElementIndexFromProps,
        size = 8,
        gap = 8,
        activeElementSize = size * 7,
        elements: elementsCount = 10,
        duration = 3000,
        onActiveElementChange,
        cycle = false,
        active = true,
        colors = 'default',
    } = props;
    const [activeElementIndex, setActiveElementIndex] = useState<number | undefined>(
        activeElementIndexFromProps ?? defaultActiveElementIndex,
    );

    if ('activeElement' in props && !(activeElementIndex === activeElementIndexFromProps)) {
        setActiveElementIndex(activeElementIndexFromProps);
    }

    const [setAnimatedElement] = useAnimation<HTMLDivElement, { initialWidth: string }>({
        initContext: (element) => ({ initialWidth: element.style.getPropertyValue('width') }),
        duration,
        animate: (element, progress) => element.style.setProperty('width', `${progress * 100}%`),
        enabled: () => active,
        onDestroy: (element, { initialWidth }) => element.style.setProperty('width', initialWidth),
        onFinish: () => {
            if (!(typeof activeElementIndex === 'number')) {
                return;
            }

            let nextActiveElementIndex: number;

            if (activeElementIndex === elementsCount - 1) {
                if (cycle) {
                    nextActiveElementIndex = 0;
                } else {
                    return;
                }
            } else {
                nextActiveElementIndex = activeElementIndex + 1;
            }

            onActiveElementChange?.(nextActiveElementIndex);

            if ('activeElement' in props) return;
            setActiveElementIndex(nextActiveElementIndex);
        },
    });

    return (
        <ol className={styles.pageIndicator} style={{ height: size, gap }}>
            {Array.from({ length: elementsCount }, (_, index) => index).map((key, index) => {
                const isActiveElement = index === activeElementIndex;
                const width = isActiveElement ? activeElementSize : size;

                return (
                    <li
                        key={key}
                        style={{ width, borderRadius: size / 2 }}
                        className={cn(styles.element, colorsStyle[colors].element, {
                            [colorsStyle[colors].active]: isActiveElement,
                        })}
                    >
                        <div
                            ref={isActiveElement ? setAnimatedElement : undefined}
                            className={cn(styles.progress, colorsStyle[colors].progress, {
                                [styles.visible]: isActiveElement,
                            })}
                        />
                    </li>
                );
            })}
        </ol>
    );
};
