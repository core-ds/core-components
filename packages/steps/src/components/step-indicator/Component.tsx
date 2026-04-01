import React from 'react';
import cn from 'classnames';

import { StatusBadge, type StatusBadgeProps } from '@alfalab/core-components-status-badge';

import styles from './index.module.css';

export type StepIndicatorProps = Pick<StatusBadgeProps, 'view' | 'className' | 'colors'>;

export const StepIndicator: React.FC<StepIndicatorProps> = ({ view, className, colors }) => (
    <StatusBadge
        size={24}
        view={view}
        colors={colors}
        className={cn(styles.component, className)}
    />
);
