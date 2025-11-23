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
    content,
}) => {
    const renderCheckmarkIcon = () => (
        <CheckmarkMIcon
            className={cn(styles.singleIcon, styles[position], {
                [styles.selected]: selected,
            })}
        />
    );

    return multiple ? (
        <Checkbox
            block={true}
            checked={selected}
            disabled={disabled}
            className={cn(styles.checkmark, styles[align], className, {
                [styles.selected]: selected,
            })}
            size={24}
            position={position}
            label={content}
            hiddenInput={true}
        />
    ) : (
        <div className={cn(styles.container, styles[align], className)}>
            {position === 'before' && renderCheckmarkIcon()}

            <div className={styles.content}>{content}</div>

            {position === 'after' && renderCheckmarkIcon()}
        </div>
    );
};
