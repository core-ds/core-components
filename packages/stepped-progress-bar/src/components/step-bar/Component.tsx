import React, { FC, memo } from 'react';
import cn from 'classnames';

import { SteppedProgressBarView } from '../../Component';

import styles from './index.module.css';

type StepBarProps = {
    isDone: boolean;
    view?: SteppedProgressBarView;
};

export const StepBar: FC<StepBarProps> = memo(({ isDone, view = 'positive' }) => (
    <span data-test-id={isDone ? 'on' : 'off'} className={cn(styles.bar, isDone && styles[view])} />
));
