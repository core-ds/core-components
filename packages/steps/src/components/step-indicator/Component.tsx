import React from 'react';
import cn from 'classnames';

import { Badge, BadgeProps } from '@alfalab/core-components-badge';

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
