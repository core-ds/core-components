import React, { FC } from 'react';
import cn from 'classnames';

import { Spinner, SpinnerProps } from '../Component';

import styles from './index.module.css';

export type SpinnerPresetProps = Omit<SpinnerProps, 'size' | 'lineWidth'> & {
    /**
     * Преднастроенный вариант
     * @default 24
     */
    preset?: 16 | 24 | 48;
};

const PRESET_CONFIG = {
    16: [2, 14, 'preset16'],
    24: [2, 20, 'preset24'],
    48: [4, 40, 'preset48'],
} as const;

export const SpinnerPreset: FC<SpinnerPresetProps> = ({ preset = 24, className, ...restProps }) => {
    const [lineWidth, size, styleKey] = PRESET_CONFIG[preset];

    return (
        <Spinner
            {...restProps}
            lineWidth={lineWidth}
            size={size}
            className={cn(styles[styleKey], className)}
        />
    );
};
