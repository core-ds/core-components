import React, { type FC, memo } from 'react';
import cn from 'classnames';

import { resolveBackground } from '../../shared/resolveBackground';
import { type SteppedProgressBarView } from '../../types';

import styles from './index.module.css';

interface StepBarProps {
    isDone: boolean;
    view?: SteppedProgressBarView | string;
    classNameStep?: string;
}

export const StepBar: FC<StepBarProps> = memo(({ isDone, view = 'positive', classNameStep }) => {
    const preset = resolveBackground(view);
    const isPreset = isDone && preset;
    const customBackground = isDone && !isPreset && typeof view === 'string' ? view : undefined;

    return (
        <span
            data-test-id={isDone ? 'on' : 'off'}
            className={cn(styles.bar, isPreset && styles[preset], classNameStep)}
            style={customBackground ? { background: customBackground } : undefined}
        />
    );
});
