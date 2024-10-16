import React, { FC } from 'react';
import cn from 'classnames';

import { PageIndicatorRunnerProps } from '../../types';

import defaultColors from './default.module.css';
import styles from './index.module.css';
import invertedColors from './inverted.module.css';

const colorsStyle = {
    inverted: invertedColors,
    default: defaultColors,
};

export const PageIndicatorRunner: FC<PageIndicatorRunnerProps> = ({
    activeElement,
    elements: elementsCount = 10,
    size = 4,
    colors = 'default',
}) => (
    <div
        className={cn(styles.pageIndicator, colorsStyle[colors].pageIndicator)}
        style={{ height: size, borderRadius: size / 2 }}
    >
        <div
            style={{
                transform: `translate(${activeElement * 100}%, 0)`,
                height: size,
                width: `${100 / elementsCount}%`,
                borderRadius: size / 2,
            }}
            className={cn(styles.element, colorsStyle[colors].element)}
        />
    </div>
);
