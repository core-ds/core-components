import React from 'react';

import { Typography } from '@alfalab/core-components-typography';

import arrowsLeftIcon from '../../../assets/arrows_left.svg';
import arrowsRightIcon from '../../../assets/arrows_right.svg';

import styles from './index.module.css';

type SeekIndicatorProps = {
    direction: 'forward' | 'backward';
    amount: number;
    visible: boolean;
};

export const SeekIndicator = ({ direction, amount, visible }: SeekIndicatorProps) => {
    if (!visible) return null;

    return (
        <div
            className={styles.seek}
            style={{
                right: direction === 'forward' ? '12px' : 'auto',
                left: direction === 'backward' ? '12px' : 'auto',
            }}
        >
            <Typography.Text view='primary-small' color='primary-inverted'>
                {amount} сек
            </Typography.Text>
            <img
                src={direction === 'forward' ? arrowsRightIcon : arrowsLeftIcon}
                alt='arrows'
                className={styles.arrows}
            />
        </div>
    );
};
