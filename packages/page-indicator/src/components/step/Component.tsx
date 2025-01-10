import React, { FC } from 'react';
import cn from 'classnames';

import { PageIndicatorStepProps } from '../../types';

import defaultColors from './default.module.css';
import styles from './index.module.css';
import invertedColors from './inverted.module.css';

const colorsStyle = {
    inverted: invertedColors,
    default: defaultColors,
};

export const PageIndicatorStep: FC<PageIndicatorStepProps> = ({
    activeElement,
    elements: elementsCount = 10,
    size = 4,
    gap = 4,
    colors = 'default',
}) => (
    <ol className={styles.pageIndicator} style={{ height: size, gap }}>
        {Array.from({ length: elementsCount }, (_, index) => index).map((key, index) => (
            <li
                key={key}
                style={{ height: size, borderRadius: size / 2 }}
                className={cn(styles.element, colorsStyle[colors].element, {
                    [colorsStyle[colors].active]: index === activeElement,
                })}
            />
        ))}
    </ol>
);
