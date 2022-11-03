import React from 'react';
import cn from 'classnames';

import { Badge } from '@alfalab/core-components/badge';
import { CheckmarkCircleMIcon } from '@alfalab/icons-glyph/CheckmarkCircleMIcon';
import { CheckmarkMIcon } from '@alfalab/icons-glyph/CheckmarkMIcon';
import { CheckmarkProps } from '../../../typings';

import styles from './index.module.css';

export const Checkmark = ({ selected, className }: CheckmarkProps) => (
    <span
        className={cn(styles.checkmark, className, {
            [styles.selected]: selected,
        })}
    >
        <CheckmarkMIcon className={styles.displayIcon} />

        <Badge
            className={styles.displayBadge}
            view='icon'
            size='m'
            iconColor='positive'
            content={<CheckmarkCircleMIcon />}
        />
    </span>
);
