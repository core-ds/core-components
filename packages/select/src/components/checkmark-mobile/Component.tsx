import React from 'react';
import cn from 'classnames';

import { CheckmarkMIcon } from '@alfalab/icons-glyph/CheckmarkMIcon';

import { type CheckmarkProps } from '../../typings';

import styles from './index.module.css';

export const Checkmark = ({ selected, className }: CheckmarkProps) => (
    <div
        className={cn(styles.checkmark, className, {
            [styles.selected]: selected,
        })}
    >
        <CheckmarkMIcon className={styles.displayIcon} />
    </div>
);
