import React, { FC } from 'react';
import cn from 'classnames';

import { Spinner } from '../Component';
import { SpinnerPresetProps } from '../types';

import styles from './index.module.css';

const PRESET_CONFIG = {
    16: [2, 14, 'size-16'],
    24: [2, 20, 'size-24'],
    48: [4, 40, 'size-48'],
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
