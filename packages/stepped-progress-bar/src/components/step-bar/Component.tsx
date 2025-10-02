import React, { type FC, memo } from 'react';
import cn from 'classnames';

import { type SteppedProgressBarView } from '../../Component';

import styles from './index.module.css';

type StepBarProps = {
    isDone: boolean;
    view?: SteppedProgressBarView;
    classNameStep?: string;
};

export const StepBar: FC<StepBarProps> = memo(({ isDone, view = 'positive', classNameStep }) => (
    <span
        data-test-id={isDone ? 'on' : 'off'}
        className={cn(styles.bar, isDone && styles[view], classNameStep)}
    />
));
