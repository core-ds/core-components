import React, { useCallback } from 'react';
import cn from 'classnames';

import { Checkbox, type CheckboxProps } from '@alfalab/core-components-checkbox';
import { StatusBadge } from '@alfalab/core-components-status-badge';
import CheckmarkMIcon from '@alfalab/icons-glyph/CheckmarkMIcon';

import { type CheckmarkProps } from '../../typings';

import styles from './index.module.css';

export const Checkmark = ({
    selected,
    disabled = false,
    className,
    multiple,
    position = 'before',
    content,
}: CheckmarkProps) => {
    const single = !multiple;

    const checkmarkClassNames = cn(styles.checkmark, className, styles[position], {
        [styles.multiple]: !single,
        [styles.single]: single,
        [styles.selected]: selected,
    });

    const handleCheckboxClick = useCallback<Required<CheckboxProps>['onClick']>(
        (event) => event.stopPropagation(),
        [],
    );

    return single ? (
        <div className={checkmarkClassNames}>
            {position === 'before' ? (
                <StatusBadge className={styles.after} view='neutral-cross' size={24} />
            ) : (
                <CheckmarkMIcon className={cn(styles.displayIcon)} />
            )}
        </div>
    ) : (
        <Checkbox
            checked={selected}
            disabled={disabled}
            className={checkmarkClassNames}
            size={24}
            label={content}
            onClick={handleCheckboxClick}
        />
    );
};
