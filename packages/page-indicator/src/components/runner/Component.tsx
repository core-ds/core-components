import React from 'react';
import cn from 'classnames';

import { type PageIndicatorRunnerProps } from '../../types';

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

export const PageIndicatorRunner: React.FC<PageIndicatorRunnerProps> = ({
    activeElement,
    elements: count = 10,
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
                width: `${100 / count}%`,
                borderRadius: size / 2,
            }}
            className={cn(styles.element, colorsStyle[colors].element)}
        />
    </div>
);
