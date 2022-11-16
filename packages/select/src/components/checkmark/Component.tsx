import React, { useCallback } from 'react';
import cn from 'classnames';

import { Checkbox, CheckboxProps } from '@alfalab/core-components-checkbox';
import { Badge } from '@alfalab/core-components/badge';
import { CheckmarkCircleMIcon } from '@alfalab/icons-glyph/CheckmarkCircleMIcon';
import { CheckmarkProps } from '../../typings';

import styles from './index.module.css';

export const Checkmark = ({
    selected,
    disabled = false,
    className,
    multiple,
    position = 'before',
}: CheckmarkProps) => {
    const single = !multiple || position === 'after';

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
            <Badge
                className={styles.after}
                view='icon'
                size='m'
                iconColor='positive'
                content={<CheckmarkCircleMIcon className={styles.colorIcon} />}
            />
        </div>
    ) : (
        <Checkbox
            checked={selected}
            disabled={disabled}
            className={checkmarkClassNames}
            size='m'
            onClick={handleCheckboxClick}
        />
    );
};
