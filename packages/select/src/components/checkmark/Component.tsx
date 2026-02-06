import React, { useCallback } from 'react';
import cn from 'classnames';

import { Badge } from '@alfalab/core-components-badge';
import { Checkbox, type CheckboxProps } from '@alfalab/core-components-checkbox';
import { CheckmarkCircleMIcon } from '@alfalab/icons-glyph/CheckmarkCircleMIcon';
import CheckmarkMIcon from '@alfalab/icons-glyph/CheckmarkMIcon';

import { type CheckmarkProps } from '../../typings';

import styles from './index.module.css';

export const Checkmark = ({
    selected,
    disabled = false,
    className,
    multiple,
    position = 'before',
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
                <Badge
                    className={styles.after}
                    view='icon'
                    size='m'
                    iconColor='positive'
                    content={<CheckmarkCircleMIcon className={styles.colorIcon} />}
                />
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
            onClick={handleCheckboxClick}
        />
    );
};
