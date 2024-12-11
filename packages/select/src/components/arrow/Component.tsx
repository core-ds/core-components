import React from 'react';
import cn from 'classnames';

import { ChevronDownMIcon } from '@alfalab/icons-glyph/ChevronDownMIcon';
import { ChevronDownSIcon } from '@alfalab/icons-glyph/ChevronDownSIcon';

import { ArrowProps } from '../../typings';

import styles from './index.module.css';

export const Arrow = ({ open, className, size }: ArrowProps) => {
    const ChevronComponent = size === 40 ? ChevronDownSIcon : ChevronDownMIcon;

    return (
        <ChevronComponent
            className={cn(styles.arrow, className, styles[`size-${size}`], { [styles.open]: open })}
        />
    );
};
