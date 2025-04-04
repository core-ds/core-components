import React from 'react';
import { Badge, BadgeProps } from '@balafla/core-components-badge';
import cn from 'classnames';

import styles from './index.module.css';

export type StepIndicatorProps = Pick<BadgeProps, 'content' | 'iconColor' | 'className'>;

export const StepIndicator: React.FC<StepIndicatorProps> = ({ content, iconColor, className }) => (
    <Badge
        size='l'
        view='icon'
        iconColor={iconColor}
        className={cn(styles.component, className)}
        content={content}
    />
);
