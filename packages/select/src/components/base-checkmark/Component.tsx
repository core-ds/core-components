import React from 'react';
import { Checkbox } from '@balafla/core-components-checkbox';
import cn from 'classnames';

import { CheckmarkMIcon } from '@alfalab/icons-glyph/CheckmarkMIcon';

import { CheckmarkProps } from '../../typings';

import styles from './index.module.css';

export const BaseCheckmark = ({
    selected,
    disabled = false,
    className,
    multiple,
    align = 'center',
}: CheckmarkProps) => {
    const checkmarkClassNames = cn(styles.checkmark, styles[align], className, {
        [styles.single]: !multiple,
        [styles.selected]: selected,
    });

    return multiple ? (
        <Checkbox
            checked={selected}
            disabled={disabled}
            className={checkmarkClassNames}
            size='m'
            hiddenInput={true}
        />
    ) : (
        <CheckmarkMIcon className={checkmarkClassNames} />
    );
};
