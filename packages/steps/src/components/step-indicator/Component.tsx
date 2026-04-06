import React from 'react';
import cn from 'classnames';

import { type BadgeProps } from '@alfalab/core-components-badge';
import { StatusBadge, type StatusBadgeProps } from '@alfalab/core-components-status-badge';

import styles from './index.module.css';

/** @description В `@alfalab/core-components@51.0.0` тип будет изменен на Pick<StatusBadgeProps, 'view' | 'className' | 'colors'> */
export type StepIndicatorProps = Pick<BadgeProps, 'content' | 'iconColor' | 'className'>;

type StatusBadgeIndicatorProps = Pick<StatusBadgeProps, 'view' | 'className' | 'colors'>;

export const StepIndicator: React.FC<StatusBadgeIndicatorProps> = ({ view, className, colors }) => (
    <StatusBadge
        size={24}
        view={view}
        colors={colors}
        className={cn(styles.component, className)}
    />
);
