import React from 'react';
import cn from 'classnames';

import { Checkbox } from '@alfalab/core-components-checkbox';
import { CheckmarkMIcon } from '@alfalab/icons-glyph/CheckmarkMIcon';

import { type CheckmarkProps } from '../../typings';

import styles from './index.module.css';

export const BaseCheckmark = ({
    selected,
    disabled = false,
    className,
    multiple,
    align = 'center',
    position = 'before',
    content,
}: CheckmarkProps) => {
    const checkmarkClassNames = cn(styles.checkmark, styles[align], styles[position], className, {
        [styles.single]: !multiple,
        [styles.selected]: selected,
    });

    console.log('BaseCheckmark', { multiple, content });

    return multiple ? (
        <Checkbox
            block={true}
            checked={selected}
            disabled={disabled}
            className={checkmarkClassNames}
            size='m'
            position={position}
            label={content}
            hiddenInput={true}
        />
    ) : (
        // todo: тут я что-то сломал и поэтому приходится явно пробрасывать контент
        <React.Fragment>
            <CheckmarkMIcon className={checkmarkClassNames} />
            <div>{content}</div>
        </React.Fragment>
    );
};
