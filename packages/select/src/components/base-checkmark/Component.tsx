import React, { type FC } from 'react';
import cn from 'classnames';

import { Checkbox } from '@alfalab/core-components-checkbox';
import { CheckmarkMIcon } from '@alfalab/icons-glyph/CheckmarkMIcon';

import { type CheckmarkProps } from '../../typings';

import styles from './index.module.css';

export const BaseCheckmark: FC<CheckmarkProps> = ({
    selected,
    disabled = false,
    className,
    multiple,
    align = 'center',
    position = 'before',
}) =>
    multiple ? (
        <Checkbox
            checked={selected}
            disabled={disabled}
            className={cn(styles.checkmark, styles[position], styles[align], className, {
                [styles.selected]: selected,
            })}
            size={24}
            hiddenInput={true}
        />
    ) : (
        <CheckmarkMIcon
            className={cn(styles.singleIcon, styles[position], styles[align], className, {
                [styles.selected]: selected,
            })}
        />
    );
