import React from 'react';
import cn from 'classnames';

import { ChevronDownMIcon } from '@alfalab/icons-glyph/ChevronDownMIcon';
import { ChevronDownSIcon } from '@alfalab/icons-glyph/ChevronDownSIcon';

import { ArrowProps } from '../../typings';

import styles from './index.module.css';

export const Arrow = ({ open, className, size }: ArrowProps) => {
    if (size && size === 40) {
        return (
            <ChevronDownSIcon className={cn(styles.arrow, className, { [styles.open]: open })} />
        );
    }

    return <ChevronDownMIcon className={cn(styles.arrow, className, { [styles.open]: open })} />;
};
