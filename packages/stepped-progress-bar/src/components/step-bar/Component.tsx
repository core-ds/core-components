import React, { type FC, memo } from 'react';
import cn from 'classnames';

import { type SteppedProgressBarViewValue } from '../../Component';

import styles from './index.module.css';

interface StepBarProps {
    isDone: boolean;
    view?: SteppedProgressBarViewValue;
    classNameStep?: string;
}

export const StepBar: FC<StepBarProps> = memo(({ isDone, view = 'positive', classNameStep }) => {
    const isCustomView = typeof view === 'object' && !Array.isArray(view);
    const isPreset = isDone && typeof view === 'string';
    const background = isDone && isCustomView ? view.background : undefined;

    return (
        <span
            data-test-id={isDone ? 'on' : 'off'}
            className={cn(styles.bar, isPreset && styles[view], classNameStep)}
            style={{ background }}
        />
    );
});
