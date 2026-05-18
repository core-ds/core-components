import React from 'react';
import cn from 'classnames';

import { type PageIndicatorStepProps } from '../../types';

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

export const PageIndicatorStep: React.FC<PageIndicatorStepProps> = ({
    activeElement,
    elements: count = 10,
    size = 4,
    gap = 4,
    colors = 'default',
}) => (
    <ol className={styles.pageIndicator} style={{ height: size, gap }}>
        {Array.from({ length: count }, (_, index) => (
            <li
                key={index}
                style={{ height: size, borderRadius: size / 2 }}
                className={cn(styles.element, colorsStyle[colors].element, {
                    [colorsStyle[colors].active]: index === activeElement,
                })}
            />
        ))}
    </ol>
);
