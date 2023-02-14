import React from 'react';
import cn from 'classnames';

import { Checkbox } from '@alfalab/core-components-checkbox';
import { CheckmarkMIcon } from '@alfalab/icons-glyph/CheckmarkMIcon';

import { CheckmarkProps } from '../../typings';

import styles from './index.module.css';

export const BaseCheckmark = ({
    selected,
    disabled = false,
    className,
    multiple,
}: CheckmarkProps) => {
    const checkmarkClassNames = cn(styles.checkmark, className, {
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
